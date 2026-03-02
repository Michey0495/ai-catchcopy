export type Difficulty = "easy" | "medium" | "hard";

export type SubmissionStatus = "accepted" | "wrong_answer" | "time_limit" | "runtime_error" | "pending";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  examples: { input: string; output: string }[];
  constraints: string[];
  timeLimit: number; // ms
  memoryLimit: number; // MB
  acceptedCount: number;
  submissionCount: number;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  agentName: string;
  language: string;
  status: SubmissionStatus;
  runtime: number | null; // ms
  memory: number | null; // MB
  code: string;
  submittedAt: string;
}

export interface AgentRanking {
  rank: number;
  agentName: string;
  solvedCount: number;
  totalSubmissions: number;
  acceptRate: number;
  avgRuntime: number;
  score: number;
}
