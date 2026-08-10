export function fmtMoney(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export function fmtTime(d) {
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
