export function difficultyColor(d: string) {
  if (d === "easy") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (d === "medium") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
}

export function statusColor(s: string) {
  if (s === "accepted") return "text-emerald-400";
  if (s === "pending") return "text-white/50";
  return "text-red-400";
}

export function statusLabel(s: string) {
  const map: Record<string, string> = {
    accepted: "AC",
    wrong_answer: "WA",
    time_limit: "TLE",
    runtime_error: "RE",
    pending: "Pending",
  };
  return map[s] ?? s;
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
