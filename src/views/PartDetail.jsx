import React from "react";
import { ChevronLeft, FileText } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import BinTag from "../components/BinTag";
import EmptyState from "../components/EmptyState";
import { categoryById, supplierById } from "../lib/lookup";
import { stockStatus, TX_TYPE_META } from "../lib/stock";
import { fmtDate, fmtMoney } from "../lib/format";

export default function PartDetail({ part, transactions, goto, onAdjust, onJob, onReturn, onReorder }) {
  const status = stockStatus(part);
  const supplier = supplierById(part.supplierId);
  const category = categoryById(part.categoryId);
  const partTx = transactions.filter((t) => t.partId === part.id);

  return (
    <div>
      <div className="btn btn-ghost btn-sm" style={{ marginBottom: 14, width: "fit-content" }} onClick={() => goto("parts")}><ChevronLeft size={14} /> Back to Parts</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="f-disp" style={{ fontSize: 24 }}>{part.name}</div>
          <div className="f-mono" style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 4 }}>SKU {part.sku} · OEM {part.oemNumber}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-panel btn-sm" onClick={onAdjust}>Adjust Stock</button>
          <button className="btn btn-panel btn-sm" onClick={onJob}>Log Job Use</button>
          <button className="btn btn-panel btn-sm" onClick={onReturn}>Return</button>
          {(status === "low" || status === "out") && <button className="btn btn-primary btn-sm" onClick={onReorder}>Reorder</button>}
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase" }}>Current Stock</div>
          <div className="kpi-num" style={{ marginTop: 6, color: status === "out" ? "var(--red)" : status === "low" ? "var(--amber)" : "var(--green)" }}>{part.stock} <span style={{ fontSize: 13, color: "var(--text-mute)" }}>{part.unit}</span></div>
          <div style={{ marginTop: 8 }}><StatusBadge status={status} /></div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase" }}>Pricing</div>
          <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
            <div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Cost</div><div className="f-mono" style={{ fontSize: 17 }}>{fmtMoney(part.costPrice)}</div></div>
            <div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Sell</div><div className="f-mono" style={{ fontSize: 17, color: "var(--green)" }}>{fmtMoney(part.sellingPrice)}</div></div>
            <div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Tax</div><div className="f-mono" style={{ fontSize: 17 }}>{part.taxRate}%</div></div>
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase" }}>Minimum / Reorder</div>
          <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
            <div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Minimum</div><div className="f-mono" style={{ fontSize: 17 }}>{part.minimumStock}</div></div>
            <div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Reorder Qty</div><div className="f-mono" style={{ fontSize: 17 }}>{part.reorderQuantity}</div></div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 14, marginBottom: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 }}>Where it lives</div>
          <BinTag rack={part.rack} shelf={part.shelf} bin={part.bin} />
          <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--text-mute)" }}>Category: {category?.name} · Brand: {part.brand}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 }}>Preferred Supplier</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{supplier?.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 4 }}>{supplier?.phone} · {supplier?.paymentTerms}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 }}>Compatible Motorcycles</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {part.compatibleVehicles.slice(0, 20).map((v) => (
            <span key={v} className="badge badge-neutral" style={{ textTransform: "none" }}>{v}</span>
          ))}
          {part.compatibleVehicles.length > 20 && <span className="badge badge-neutral">+{part.compatibleVehicles.length - 20} more</span>}
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
          <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>TRANSACTION HISTORY — every number has a reason</div>
        </div>
        {partTx.length === 0 ? (
          <EmptyState icon={FileText} title="No transactions yet" body="Purchases, job consumption, and sales for this part will show up here." />
        ) : (
          <table className="grg-table">
            <thead><tr><th>Date</th><th>Type</th><th>Qty</th><th>Before</th><th>After</th><th>Reference</th><th>Reason</th></tr></thead>
            <tbody>
              {partTx.map((t) => {
                const meta = TX_TYPE_META[t.type];
                return (
                  <tr key={t.id} className="row-hover">
                    <td className="f-mono" style={{ fontSize: 12, color: "var(--text-mute)" }}>{fmtDate(t.createdAt)}</td>
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
        )}
      </div>
    </div>
  );
}
