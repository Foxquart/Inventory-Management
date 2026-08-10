import React from "react";
import { STATUS_LABEL } from "../lib/stock";

export default function StatusBadge({ status }) {
  const cls = status === "healthy" ? "badge-healthy" : status === "low" ? "badge-low" : "badge-out";
  return <span className={`badge ${cls}`}><span className="dot" style={{ background: "currentColor" }} />{STATUS_LABEL[status]}</span>;
}
