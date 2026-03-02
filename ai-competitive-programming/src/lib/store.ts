import { Problem, Submission, AgentRanking, SubmissionStatus } from "./types";
import { problems as initialProblems, submissions as initialSubmissions } from "./data";

class Store {
  private problems: Problem[] = [...initialProblems];
  private submissions: Submission[] = [...initialSubmissions];

  getProblems(difficulty?: string): Problem[] {
    if (difficulty) {
      return this.problems.filter((p) => p.difficulty === difficulty);
    }
    return this.problems;
  }

  getProblem(id: string): Problem | undefined {
    return this.problems.find((p) => p.id === id);
  }

  getSubmissions(filters?: { problemId?: string; agentName?: string }): Submission[] {
    let result = [...this.submissions];
    if (filters?.problemId) {
      result = result.filter((s) => s.problemId === filters.problemId);
    }
    if (filters?.agentName) {
      result = result.filter((s) => s.agentName === filters.agentName);
    }
    return result.sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }

  addSubmission(params: {
    problemId: string;
    agentName: string;
    language: string;
    code: string;
  }): Submission | { error: string } {
    const problem = this.getProblem(params.problemId);
    if (!problem) {
      return { error: "Problem not found" };
    }

    const id = `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const submission: Submission = {
      id,
      problemId: params.problemId,
      problemTitle: problem.title,
      agentName: params.agentName,
      language: params.language,
      status: "pending",
      runtime: null,
      memory: null,
      code: params.code,
      submittedAt: new Date().toISOString(),
    };

    this.submissions.unshift(submission);
    problem.submissionCount++;

    // Simulate judging asynchronously
    this.judgeSubmission(submission, problem);

    return submission;
  }

  private judgeSubmission(submission: Submission, problem: Problem): void {
    const delay = 500 + Math.random() * 2000;
    setTimeout(() => {
      const sub = this.submissions.find((s) => s.id === submission.id);
      if (!sub) return;

      const result = this.simulateJudge(sub.code, problem);
      sub.status = result.status;
      sub.runtime = result.runtime;
      sub.memory = result.memory;

      if (result.status === "accepted") {
        problem.acceptedCount++;
      }
    }, delay);
  }

  private simulateJudge(
    code: string,
    problem: Problem
  ): { status: SubmissionStatus; runtime: number | null; memory: number | null } {
    if (!code || code.trim().length < 10) {
      return { status: "runtime_error", runtime: null, memory: null };
    }

    // Simple heuristic simulation based on code quality signals
    const codeLen = code.length;
    const hasLoop = /for|while|map|reduce|filter/.test(code);
    const hasReturn = /return/.test(code);
    const hasFunction = /function|def |=>|fn /.test(code);

    // Base acceptance probability by difficulty
    const difficultyRate: Record<string, number> = {
      easy: 0.85,
      medium: 0.65,
      hard: 0.45,
    };
    let acceptProb = difficultyRate[problem.difficulty] ?? 0.5;

    // Adjust by code quality signals
    if (hasFunction) acceptProb += 0.05;
    if (hasLoop) acceptProb += 0.05;
    if (hasReturn) acceptProb += 0.05;
    if (codeLen > 200) acceptProb += 0.05;
    if (codeLen < 30) acceptProb -= 0.3;

    acceptProb = Math.min(0.95, Math.max(0.1, acceptProb));

    const roll = Math.random();
    if (roll < acceptProb) {
      const baseRuntime = problem.difficulty === "easy" ? 30 : problem.difficulty === "medium" ? 50 : 80;
      const runtime = Math.round(baseRuntime + Math.random() * 60);
      const memory = Math.round((12 + Math.random() * 10) * 10) / 10;
      return { status: "accepted", runtime, memory };
    }

    // Determine failure type
    if (roll < acceptProb + 0.15) {
      return { status: "wrong_answer", runtime: null, memory: null };
    }
    if (roll < acceptProb + 0.25) {
      const runtime = problem.timeLimit + Math.round(Math.random() * 1000);
      return { status: "time_limit", runtime, memory: null };
    }
    return { status: "runtime_error", runtime: null, memory: null };
  }

  getRankings(): AgentRanking[] {
    const agentMap = new Map<
      string,
      { solved: Set<string>; total: number; accepted: number; runtimes: number[] }
    >();

    for (const sub of this.submissions) {
      if (!agentMap.has(sub.agentName)) {
        agentMap.set(sub.agentName, { solved: new Set(), total: 0, accepted: 0, runtimes: [] });
      }
      const agent = agentMap.get(sub.agentName)!;
      agent.total++;
      if (sub.status === "accepted") {
        agent.accepted++;
        agent.solved.add(sub.problemId);
        if (sub.runtime !== null) {
          agent.runtimes.push(sub.runtime);
        }
      }
    }

    const rankings: AgentRanking[] = [];
    for (const [name, data] of agentMap) {
      const acceptRate = data.total > 0 ? Math.round((data.accepted / data.total) * 1000) / 10 : 0;
      const avgRuntime =
        data.runtimes.length > 0
          ? Math.round(data.runtimes.reduce((a, b) => a + b, 0) / data.runtimes.length)
          : 0;

      // Score: solved problems weighted by difficulty + speed bonus
      let score = 0;
      for (const pid of data.solved) {
        const p = this.getProblem(pid);
        if (p) {
          const diffScore = p.difficulty === "easy" ? 300 : p.difficulty === "medium" ? 500 : 800;
          score += diffScore;
        }
      }
      // Speed bonus
      if (avgRuntime > 0 && avgRuntime < 100) {
        score += Math.round((100 - avgRuntime) * 2);
      }
      // Consistency bonus
      score += Math.round(acceptRate * 3);

      rankings.push({
        rank: 0,
        agentName: name,
        solvedCount: data.solved.size,
        totalSubmissions: data.total,
        acceptRate,
        avgRuntime,
        score,
      });
    }

    rankings.sort((a, b) => b.score - a.score);
    rankings.forEach((r, i) => (r.rank = i + 1));

    return rankings;
  }

  getStats() {
    const rankings = this.getRankings();
    return {
      problemCount: this.problems.length,
      submissionCount: this.submissions.length,
      agentCount: rankings.length,
      avgAcceptRate:
        rankings.length > 0
          ? Math.round(rankings.reduce((a, r) => a + r.acceptRate, 0) / rankings.length)
          : 0,
    };
  }
}

// Singleton
export const store = new Store();
