import React from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, ClipboardList, IndianRupee, Package } from "lucide-react";
import PageHeader from "../components/PageHeader";
import KpiCard from "../components/KpiCard";
import POStatusBadge from "../components/POStatusBadge";
import { fmtDate, fmtMoney } from "../lib/format";

export default function SupplierDetail({ supplier, parts, purchaseOrders, goto, setSelectedPOId }) {
  const supplierParts = parts.filter((p) => p.supplierId === supplier.id);
  const supplierPOs = purchaseOrders.filter((po) => po.supplierId === supplier.id);
  const totalPurchases = supplierPOs.filter((po) => po.status === "RECEIVED").reduce((s, po) => s + po.items.reduce((a, it) => a + it.receivedQuantity * it.unitCost, 0), 0);
  const pending = supplierPOs.filter((po) => ["DRAFT", "ORDERED", "PARTIALLY_RECEIVED"].includes(po.status));
  const outstanding = pending.reduce((sum, po) => sum + po.items.reduce((a, it) => a + (it.orderedQuantity - it.receivedQuantity) * it.unitCost, 0), 0);

  return (
    <div>
      <div className="btn btn-ghost btn-sm" style={{ marginBottom: 14, width: "fit-content" }} onClick={() => goto("suppliers")}><ChevronLeft size={14} /> Back to Suppliers</div>
      <PageHeader title={supplier.name} subtitle={`${supplier.address} · GSTIN ${supplier.gstin}`} />
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <KpiCard label="Total Purchases" value={fmtMoney(totalPurchases)} icon={IndianRupee} />
        <KpiCard label="Pending Orders" value={pending.length} icon={ClipboardList} tone="var(--blue)" />
        <KpiCard label="Outstanding" value={fmtMoney(outstanding)} icon={AlertTriangle} tone="var(--amber)" />
        <KpiCard label="Parts Supplied" value={supplierParts.length} icon={Package} />
      </div>
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 8 }}>Contact</div>
        <div style={{ fontSize: 13, color: "var(--text-mute)", lineHeight: 1.8 }}>
          {supplier.phone}<br />{supplier.email}<br />Payment Terms: {supplier.paymentTerms}
        </div>
      </div>
      <div className="card" style={{ padding: 0, marginBottom: 16 }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>PURCHASE ORDERS</div></div>
        <table className="grg-table">
          <thead><tr><th>PO Number</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {supplierPOs.map((po) => (
              <tr key={po.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { setSelectedPOId(po.id); goto("poDetail"); }}>
                <td className="f-mono">{po.id}</td>
                <td style={{ color: "var(--text-mute)" }}>{fmtDate(po.createdAt)}</td>
                <td>{po.items.length}</td>
                <td className="f-mono">{fmtMoney(po.items.reduce((s, i) => s + i.orderedQuantity * i.unitCost, 0))}</td>
                <td><POStatusBadge status={po.status} /></td>
                <td><ChevronRight size={15} color="var(--text-dim)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>PARTS SUPPLIED</div></div>
        <table className="grg-table">
          <thead><tr><th>Part</th><th>SKU</th><th>Stock</th><th>Cost</th></tr></thead>
          <tbody>
            {supplierParts.map((p) => (
              <tr key={p.id} className="row-hover"><td>{p.name}</td><td className="f-mono" style={{ color: "var(--text-mute)" }}>{p.sku}</td><td>{p.stock}</td><td className="f-mono">{fmtMoney(p.costPrice)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
