import React, { useState } from "react";
import { ChevronLeft, CircleCheck, PackageCheck } from "lucide-react";
import POStatusBadge from "../components/POStatusBadge";
import { partById, supplierById } from "../lib/lookup";
import { fmtDate, fmtMoney } from "../lib/format";

export default function PODetail({ po, parts, goto, onPlaceOrder, onReceive }) {
  const [receiveMap, setReceiveMap] = useState({});
  const supplier = supplierById(po.supplierId);
  const subtotal = po.items.reduce((s, i) => s + i.orderedQuantity * i.unitCost, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const canReceive = ["ORDERED", "PARTIALLY_RECEIVED"].includes(po.status);

  return (
    <div>
      <div className="btn btn-ghost btn-sm" style={{ marginBottom: 14, width: "fit-content" }} onClick={() => goto("purchaseOrders")}><ChevronLeft size={14} /> Back to Purchase Orders</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="f-disp" style={{ fontSize: 24 }}>{po.id}</div>
          <div style={{ fontSize: 13, color: "var(--text-mute)", marginTop: 4 }}>Supplier: {supplier?.name} · Expected {fmtDate(po.expectedDate)}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <POStatusBadge status={po.status} />
          {po.status === "DRAFT" && <button className="btn btn-primary btn-sm" onClick={() => onPlaceOrder(po.id)}>Place Order</button>}
        </div>
      </div>

      <div className="card" style={{ padding: 0, marginBottom: 16 }}>
        <table className="grg-table">
          <thead><tr><th>Part</th><th>Ordered</th><th>Received</th><th>Remaining</th><th>Unit Cost</th><th>Line Total</th>{canReceive && <th>Receive Now</th>}</tr></thead>
          <tbody>
            {po.items.map((it) => {
              const part = partById(parts, it.partId);
              const remaining = it.orderedQuantity - it.receivedQuantity;
              return (
                <tr key={it.partId} className="row-hover">
                  <td>{part?.name}</td>
                  <td>{it.orderedQuantity}</td>
                  <td style={{ color: "var(--green)" }}>{it.receivedQuantity}</td>
                  <td style={{ color: remaining > 0 ? "var(--amber)" : "var(--text-dim)" }}>{remaining}</td>
                  <td className="f-mono">{fmtMoney(it.unitCost)}</td>
                  <td className="f-mono">{fmtMoney(it.orderedQuantity * it.unitCost)}</td>
                  {canReceive && (
                    <td>
                      <input className="input" type="number" min={0} max={remaining} style={{ width: 80 }}
                        value={receiveMap[it.partId] ?? remaining}
                        onChange={(e) => setReceiveMap((m) => ({ ...m, [it.partId]: Math.max(0, Math.min(remaining, Number(e.target.value))) }))} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 24 }}>
          <div style={{ fontSize: 13, color: "var(--text-mute)" }}>Subtotal <span className="f-mono" style={{ color: "var(--text)", marginLeft: 6 }}>{fmtMoney(subtotal)}</span></div>
          <div style={{ fontSize: 13, color: "var(--text-mute)" }}>GST (18%) <span className="f-mono" style={{ color: "var(--text)", marginLeft: 6 }}>{fmtMoney(gst)}</span></div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Total <span className="f-mono" style={{ marginLeft: 6 }}>{fmtMoney(total)}</span></div>
        </div>
      </div>

      {canReceive && (
        <button className="btn btn-primary" onClick={() => { onReceive(po.id, receiveMap); setReceiveMap({}); }}>
          <PackageCheck size={15} /> Receive Stock
        </button>
      )}
      {po.status === "RECEIVED" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--green)", fontSize: 13 }}><CircleCheck size={16} /> Stock received successfully — inventory has been updated.</div>
      )}
    </div>
  );
}
