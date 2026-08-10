import React from "react";

export default function KpiCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card" style={{ padding: 16, flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
        <Icon size={15} color={tone || "var(--text-dim)"} />
      </div>
      <div className="kpi-num" style={{ marginTop: 8, color: tone || "var(--text)" }}>{value}</div>
    </div>
  );
}
