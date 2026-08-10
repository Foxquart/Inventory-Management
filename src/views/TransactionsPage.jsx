import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { partById } from "../lib/lookup";
import { TX_TYPE_META } from "../lib/stock";
import { fmtDate, fmtTime } from "../lib/format";

export default function TransactionsPage({ transactions, parts, setSelectedPartId, goto }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [q, setQ] = useState("");
  const filtered = transactions.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (q.trim()) {
      const p = partById(parts, t.partId);
      if (!p || !(p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))) return false;
    }
    return true;
  });
  return (
    <div>
      <PageHeader title="Stock Transaction Ledger" subtitle="Every stock movement, with a reason and reference." />
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <input className="input" style={{ maxWidth: 260 }} placeholder="Search part…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" style={{ width: 200 }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          {Object.entries(TX_TYPE_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table className="grg-table">
          <thead><tr><th>Date</th><th>Part</th><th>Type</th><th>Qty</th><th>Before</th><th>After</th><th>Reference</th><th>Reason</th></tr></thead>
          <tbody>
            {filtered.map((t) => {
              const p = partById(parts, t.partId);
              const meta = TX_TYPE_META[t.type];
              return (
                <tr key={t.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { if (p) { setSelectedPartId(p.id); goto("partDetail"); } }}>
                  <td className="f-mono" style={{ fontSize: 12, color: "var(--text-mute)" }}>{fmtDate(t.createdAt)} {fmtTime(t.createdAt)}</td>
                  <td>{p?.name || "—"}</td>
                  <td><span style={{ color: meta.color }}>{meta.label}</span></td>
                  <td style={{ fontWeight: 600, color: t.quantity < 0 ? "var(--red)" : "var(--green)" }}>{t.quantity > 0 ? `+${t.quantity}` : t.quantity}</td>
                  <td className="f-mono" style={{ color: "var(--text-dim)" }}>{t.previousStock}</td>
                  <td className="f-mono">{t.newStock}</td>
                  <td className="f-mono" style={{ color: "var(--text-mute)" }}>{t.referenceId}</td>
                  <td style={{ color: "var(--text-mute)", fontSize: 12.5 }}>{t.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
