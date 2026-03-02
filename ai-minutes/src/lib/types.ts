export interface MinutesInput {
  title: string;
  date: string;
  participants: string;
  notes: string;
}

export interface ActionItem {
  assignee: string;
  task: string;
  deadline: string;
}

export interface MinutesResult {
  id: string;
  input: MinutesInput;
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
  keyPoints: string[];
  nextSteps: string;
  createdAt: string;
}
