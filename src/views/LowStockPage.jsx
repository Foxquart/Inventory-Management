import React from "react";
import { CircleCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { supplierById } from "../lib/lookup";
import { stockStatus } from "../lib/stock";

export default function LowStockPage({ criticalParts, goto, setSelectedPartId, createReorderPO }) {
  return (
    <div>
      <PageHeader title="Low Stock" subtitle={`${criticalParts.length} parts require attention`} />
      <div className="card" style={{ padding: 0 }}>
        {criticalParts.length === 0 ? (
          <EmptyState icon={CircleCheck} title="No low-stock parts" body="Great — all tracked parts are above their minimum stock level." action={<button className="btn btn-panel" onClick={() => goto("parts")}>View Inventory</button>} />
        ) : (
          <table className="grg-table">
            <thead><tr><th>Part</th><th>Current</th><th>Minimum</th><th>Reorder Qty</th><th>Supplier</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {criticalParts.map((p) => (
                <tr key={p.id} className="row-hover">
                  <td style={{ cursor: "pointer" }} onClick={() => { setSelectedPartId(p.id); goto("partDetail"); }}>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div className="f-mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>{p.sku}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: p.stock === 0 ? "var(--red)" : "var(--amber)" }}>{p.stock}</td>
                  <td style={{ color: "var(--text-mute)" }}>{p.minimumStock}</td>
                  <td style={{ color: "var(--text-mute)" }}>{p.reorderQuantity}</td>
                  <td style={{ color: "var(--text-mute)", fontSize: 12.5 }}>{supplierById(p.supplierId)?.name}</td>
                  <td><StatusBadge status={stockStatus(p)} /></td>
                  <td><button className="btn btn-primary btn-sm" onClick={() => createReorderPO(p)}>Reorder</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
