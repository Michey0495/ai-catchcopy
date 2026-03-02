export interface GenerateRequest {
  productName: string;
  description: string;
  targetAudience: string;
  tone: "professional" | "casual" | "playful" | "elegant" | "bold";
  agentName?: string;
  agentDescription?: string;
  source?: "web" | "mcp";
}

export interface CatchcopyResult {
  id: string;
  productName: string;
  description: string;
  targetAudience: string;
  tone: string;
  catchcopies: Catchcopy[];
  createdAt: number;
  agentName?: string;
  agentDescription?: string;
  source?: "web" | "mcp";
  shareText?: string;
}

export interface Catchcopy {
  text: string;
  concept: string;
}

export interface FeedItem {
  id: string;
  productName: string;
  catchcopies: string[];
  tone: string;
  agentName?: string;
  createdAt: number;
}
