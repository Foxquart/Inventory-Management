import React from "react";
import {
  AlertTriangle, ChevronRight, ClipboardList, IndianRupee, Package, PackageCheck, PackageX,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import KpiCard from "../components/KpiCard";
import Gauge from "../components/Gauge";
import { fmtMoney, fmtTime } from "../lib/format";
import { partById, supplierById } from "../lib/lookup";
import { TX_TYPE_META } from "../lib/stock";

export default function Dashboard({ totalSKUs, inventoryValue, lowStockParts, outOfStockParts, pendingPOs, receivedTodayValue, parts, criticalParts, recentTx, fastMoving, maxFastMoving, goto, setSelectedPartId, createReorderPO }) {
  const healthy = parts.length - lowStockParts.length - outOfStockParts.length;
  return (
    <div>
      <PageHeader title="Inventory Dashboard" subtitle="Real-time view of what's on the shelf, what's short, and what's moving." />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard label="Total SKUs" value={totalSKUs} icon={Package} />
        <KpiCard label="Inventory Value" value={fmtMoney(inventoryValue)} icon={IndianRupee} />
        <KpiCard label="Low Stock" value={lowStockParts.length} icon={AlertTriangle} tone="var(--amber)" />
        <KpiCard label="Out of Stock" value={outOfStockParts.length} icon={PackageX} tone="var(--red)" />
        <KpiCard label="Pending POs" value={pendingPOs.length} icon={ClipboardList} tone="var(--blue)" />
        <KpiCard label="Received Today" value={fmtMoney(receivedTodayValue)} icon={PackageCheck} tone="var(--green)" />
      </div>

      <div className="grid-aside" style={{ marginBottom: 16 }}>
        <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="f-disp" style={{ fontSize: 13, alignSelf: "flex-start", color: "var(--text-mute)", marginBottom: 8 }}>STOCK HEALTH</div>
          <Gauge healthy={healthy} low={lowStockParts.length} out={outOfStockParts.length} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", marginTop: 14 }}>
            {[["Healthy", healthy, "var(--green)"], ["Low Stock", lowStockParts.length, "var(--amber)"], ["Out of Stock", outOfStockParts.length, "var(--red)"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: c }} />{l}</span>
                <span className="f-mono" style={{ color: "var(--text-mute)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>CRITICAL STOCK</div>
            <span className="btn btn-ghost btn-sm" onClick={() => goto("lowStock")}>View all <ChevronRight size={13} /></span>
          </div>
          <table className="grg-table">
            <thead><tr><th>Part</th><th>SKU</th><th>Stock</th><th>Min</th><th>Reorder</th><th>Supplier</th><th></th></tr></thead>
            <tbody>
              {criticalParts.slice(0, 5).map((p) => (
                <tr key={p.id} className="row-hover">
                  <td style={{ cursor: "pointer" }} onClick={() => { setSelectedPartId(p.id); goto("partDetail"); }}>{p.name}</td>
                  <td className="f-mono" style={{ color: "var(--text-mute)" }}>{p.sku}</td>
                  <td style={{ color: p.stock === 0 ? "var(--red)" : "var(--amber)", fontWeight: 600 }}>{p.stock}</td>
                  <td style={{ color: "var(--text-mute)" }}>{p.minimumStock}</td>
                  <td style={{ color: "var(--text-mute)" }}>{p.reorderQuantity}</td>
                  <td style={{ color: "var(--text-mute)", fontSize: 12 }}>{supplierById(p.supplierId)?.name}</td>
                  <td><button className="btn btn-panel btn-sm" onClick={() => createReorderPO(p)}>Reorder</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>RECENT TRANSACTIONS</div>
          </div>
          <table className="grg-table">
            <thead><tr><th>Time</th><th>Part</th><th>Type</th><th>Qty</th><th>Reference</th></tr></thead>
            <tbody>
              {recentTx.map((t) => {
                const p = partById(parts, t.partId);
                const meta = TX_TYPE_META[t.type];
                return (
                  <tr key={t.id} className="row-hover">
                    <td className="f-mono" style={{ color: "var(--text-mute)", fontSize: 12 }}>{fmtTime(t.createdAt)}</td>
                    <td>{p?.name || "—"}</td>
                    <td><span style={{ color: meta.color, fontSize: 12 }}>{meta.label}</span></td>
                    <td style={{ color: t.quantity < 0 ? "var(--red)" : "var(--green)", fontWeight: 600 }}>{t.quantity > 0 ? `+${t.quantity}` : t.quantity}</td>
                    <td className="f-mono" style={{ color: "var(--text-dim)", fontSize: 12 }}>{t.referenceId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="f-disp" style={{ fontSize: 13, color: "var(--text-mute)" }}>FAST MOVING PARTS</div>
          </div>
          <div style={{ padding: "8px 18px 16px" }}>
            {fastMoving.map((f) => (
              <div key={f.part.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                  <span>{f.part.name}</span>
                  <span className="f-mono" style={{ color: "var(--text-mute)" }}>{f.qty} used · stock {f.part.stock}</span>
                </div>
                <div style={{ height: 6, background: "var(--panel-hi)", borderRadius: 3 }}>
                  <div style={{ height: 6, width: `${(f.qty / maxFastMoving) * 100}%`, background: "var(--rust)", borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
