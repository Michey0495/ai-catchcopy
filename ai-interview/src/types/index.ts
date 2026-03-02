export interface InterviewInput {
  position: string;
  industry: string;
  experience: string;
  selfpr: string;
  motivation: string;
}

export interface InterviewEvaluation {
  question: string;
  evaluation: string;
  score: string;
}

export interface InterviewResult {
  id: string;
  input: InterviewInput;
  rank: string;
  verdict: string;
  evaluations: InterviewEvaluation[];
  summary: string;
  advice: string;
  createdAt: string;
}
