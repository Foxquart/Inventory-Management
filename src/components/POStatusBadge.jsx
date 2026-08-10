import React from "react";

export default function POStatusBadge({ status }) {
  const map = {
    DRAFT: ["badge-neutral", "Draft"],
    ORDERED: ["badge-blue", "Ordered"],
    PARTIALLY_RECEIVED: ["badge-low", "Partially Received"],
    RECEIVED: ["badge-healthy", "Received"],
    CANCELLED: ["badge-out", "Cancelled"],
  };
  const [cls, label] = map[status] || ["badge-neutral", status];
  return <span className={`badge ${cls}`}>{label}</span>;
}
