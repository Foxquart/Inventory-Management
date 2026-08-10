import React, { useState } from "react";
import { ChevronRight, ClipboardList } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import POStatusBadge from "../components/POStatusBadge";
import { supplierById } from "../lib/lookup";
import { fmtDate, fmtMoney } from "../lib/format";

export default function PurchaseOrdersPage({ purchaseOrders, parts, goto, setSelectedPOId }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = purchaseOrders.filter((po) => statusFilter === "all" || po.status === statusFilter);
  return (
    <div>
      <PageHeader title="Purchase Orders" subtitle={`${purchaseOrders.length} orders on record`} />
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {["all", "DRAFT", "ORDERED", "PARTIALLY_RECEIVED", "RECEIVED", "CANCELLED"].map((s) => (
          <button key={s} className={`btn btn-sm ${statusFilter === s ? "btn-panel" : "btn-ghost"}`} onClick={() => setStatusFilter(s)}>
            {s === "all" ? "All" : s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        {filtered.length === 0 ? (
          <EmptyState icon={ClipboardList} title="No purchase orders" body="Create your first purchase order to replenish stock." />
        ) : (
          <table className="grg-table">
            <thead><tr><th>PO Number</th><th>Supplier</th><th>Date</th><th>Expected</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((po) => (
                <tr key={po.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { setSelectedPOId(po.id); goto("poDetail"); }}>
                  <td className="f-mono">{po.id}</td>
                  <td>{supplierById(po.supplierId)?.name}</td>
                  <td style={{ color: "var(--text-mute)" }}>{fmtDate(po.createdAt)}</td>
                  <td style={{ color: "var(--text-mute)" }}>{fmtDate(po.expectedDate)}</td>
                  <td>{po.items.length}</td>
                  <td className="f-mono">{fmtMoney(po.items.reduce((s, i) => s + i.orderedQuantity * i.unitCost, 0))}</td>
                  <td><POStatusBadge status={po.status} /></td>
                  <td><ChevronRight size={15} color="var(--text-dim)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
