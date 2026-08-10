import React from "react";
import { ChevronRight, Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { SUPPLIERS } from "../data/catalog";
import { fmtMoney } from "../lib/format";

export default function SuppliersPage({ parts, purchaseOrders, goto, setSelectedSupplierId, setAddSupplierOpen }) {
  return (
    <div>
      <PageHeader title="Suppliers" subtitle={`${SUPPLIERS.length} suppliers on file`} action={<button className="btn btn-primary" onClick={() => setAddSupplierOpen(true)}><Plus size={14} /> Add Supplier</button>} />
      <div className="card" style={{ padding: 0 }}>
        <table className="grg-table">
          <thead><tr><th>Supplier</th><th>Contact</th><th>Parts Supplied</th><th>Pending PO</th><th>Outstanding</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {SUPPLIERS.map((s) => {
              const partsSupplied = parts.filter((p) => p.supplierId === s.id).length;
              const pending = purchaseOrders.filter((po) => po.supplierId === s.id && ["DRAFT", "ORDERED", "PARTIALLY_RECEIVED"].includes(po.status));
              const outstanding = pending.reduce((sum, po) => sum + po.items.reduce((a, it) => a + (it.orderedQuantity - it.receivedQuantity) * it.unitCost, 0), 0);
              return (
                <tr key={s.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { setSelectedSupplierId(s.id); goto("supplierDetail"); }}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "var(--text-mute)", fontSize: 12.5 }} className="f-mono">{s.phone}</td>
                  <td>{partsSupplied}</td>
                  <td>{pending.length}</td>
                  <td className="f-mono">{fmtMoney(outstanding)}</td>
                  <td><span className="badge badge-healthy">Active</span></td>
                  <td><ChevronRight size={15} color="var(--text-dim)" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
