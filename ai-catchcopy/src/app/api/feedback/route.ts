import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { type, message, repo } = await request.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const validTypes = ["bug", "feature", "other"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  if (!repo || !/^[a-zA-Z0-9_.-]+$/.test(repo)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  const labels: Record<string, string> = {
    bug: "bug",
    feature: "enhancement",
    other: "feedback",
  };

  const title = `[${type}] ${message.slice(0, 80)}${message.length > 80 ? "..." : ""}`;
  const body = `## User Feedback\n\n**Type:** ${type}\n\n**Message:**\n${message}\n\n---\n*Auto-created from in-app feedback widget*`;

  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      await fetch(`https://api.github.com/repos/Michey0495/${repo}/issues`, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          labels: [labels[type] || "feedback"],
        }),
      });
    } catch (e) {
      console.error("Failed to create GitHub issue:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
