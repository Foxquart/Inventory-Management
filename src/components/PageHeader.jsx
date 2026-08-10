import React from "react";

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
      <div>
        <div className="f-disp" style={{ fontSize: 24, fontWeight: 600 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: "var(--text-mute)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}
