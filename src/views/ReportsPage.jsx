import React from "react";
import PageHeader from "../components/PageHeader";
import { SUPPLIERS } from "../data/catalog";
import { stockStatus } from "../lib/stock";
import { fmtMoney } from "../lib/format";

export default function ReportsPage({ parts, transactions, purchaseOrders, inventoryValue, retailValue, fastMoving, slowMoving }) {
  const lowStock = parts.filter((p) => stockStatus(p) === "low").length;
  const outStock = parts.filter((p) => stockStatus(p) === "out").length;
  const movement = {
    Purchases: transactions.filter((t) => t.type === "PURCHASE_RECEIVED").reduce((s, t) => s + t.quantity, 0),
    "Job Consumption": Math.abs(transactions.filter((t) => t.type === "JOB_CONSUMPTION").reduce((s, t) => s + t.quantity, 0)),
    "Counter Sales": Math.abs(transactions.filter((t) => t.type === "COUNTER_SALE").reduce((s, t) => s + t.quantity, 0)),
    Returns: transactions.filter((t) => t.type === "CUSTOMER_RETURN").reduce((s, t) => s + t.quantity, 0),
    Adjustments: transactions.filter((t) => ["ADJUSTMENT", "DAMAGE", "LOSS", "FOUND"].includes(t.type)).reduce((s, t) => s + t.quantity, 0),
  };
  const supplierPurchases = SUPPLIERS.map((s) => {
    const pos = purchaseOrders.filter((po) => po.supplierId === s.id);
    const amount = pos.reduce((sum, po) => sum + po.items.reduce((a, it) => a + it.receivedQuantity * it.unitCost, 0), 0);
    const pendingAmt = pos.reduce((sum, po) => sum + po.items.reduce((a, it) => a + (it.orderedQuantity - it.receivedQuantity) * it.unitCost, 0), 0);
    return { supplier: s, amount, pendingAmt, count: pos.length };
  }).filter((x) => x.count > 0);

  return (
    <div>
      <PageHeader title="Inventory Reports" subtitle="A quick read on stock value, movement, and where money is tied up." />
      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)", marginBottom: 10 }}>INVENTORY SUMMARY</div>
          {[["Total SKUs", parts.length], ["Total Units", parts.reduce((s, p) => s + p.stock, 0)], ["Stock Value (Cost)", fmtMoney(inventoryValue)], ["Potential Retail Value", fmtMoney(retailValue)], ["Potential Margin", fmtMoney(retailValue - inventoryValue)], ["Low Stock", lowStock], ["Out of Stock", outStock]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid var(--border-lo)" }}><span style={{ color: "var(--text-mute)" }}>{l}</span><span className="f-mono">{v}</span></div>
          ))}
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)", marginBottom: 10 }}>STOCK MOVEMENT</div>
          {Object.entries(movement).map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid var(--border-lo)" }}><span style={{ color: "var(--text-mute)" }}>{l}</span><span className="f-mono">{v} units</span></div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 0, marginBottom: 16 }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>SUPPLIER PURCHASES</div></div>
        <table className="grg-table">
          <thead><tr><th>Supplier</th><th>Purchase Amount</th><th>Pending Amount</th><th>POs</th></tr></thead>
          <tbody>
            {supplierPurchases.map((row) => (
              <tr key={row.supplier.id} className="row-hover"><td>{row.supplier.name}</td><td className="f-mono">{fmtMoney(row.amount)}</td><td className="f-mono" style={{ color: "var(--amber)" }}>{fmtMoney(row.pendingAmt)}</td><td>{row.count}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid-2">
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>FAST MOVING</div></div>
          <table className="grg-table"><thead><tr><th>Part</th><th>Units Consumed</th><th>Revenue</th></tr></thead>
            <tbody>{fastMoving.map((f) => (<tr key={f.part.id} className="row-hover"><td>{f.part.name}</td><td>{f.qty}</td><td className="f-mono">{fmtMoney(f.qty * f.part.sellingPrice)}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>SLOW MOVING</div></div>
          <table className="grg-table"><thead><tr><th>Part</th><th>Current Stock</th></tr></thead>
            <tbody>{slowMoving.map((p) => (<tr key={p.id} className="row-hover"><td>{p.name}</td><td>{p.stock}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
