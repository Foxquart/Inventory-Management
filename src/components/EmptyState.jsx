import React from "react";

export default function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div style={{ textAlign: "center", padding: "56px 20px", color: "var(--text-mute)" }}>
      <Icon size={30} style={{ marginBottom: 12, opacity: 0.6 }} />
      <div className="f-disp" style={{ fontSize: 17, color: "var(--text)", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 360, margin: "0 auto 16px" }}>{body}</div>
      {action}
    </div>
  );
}
