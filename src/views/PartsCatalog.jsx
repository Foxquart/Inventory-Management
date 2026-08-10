import React, { useState } from "react";
import { ChevronRight, Package, Plus, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import BinTag from "../components/BinTag";
import { CATEGORIES } from "../data/catalog";
import { categoryById } from "../lib/lookup";
import { stockStatus } from "../lib/stock";
import { fmtMoney } from "../lib/format";

export default function PartsCatalog({ parts, goto, setSelectedPartId, setAddPartOpen }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = parts.filter((p) => {
    if (statusFilter !== "all" && stockStatus(p) !== statusFilter) return false;
    if (categoryFilter !== "all" && p.categoryId !== categoryFilter) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      if (!(p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s) || p.oemNumber.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.compatibleVehicles.some((v) => v.toLowerCase().includes(s)))) return false;
    }
    return true;
  });

  return (
    <div>
      <PageHeader title="Spare Parts Catalog" subtitle={`${parts.length} parts tracked across ${CATEGORIES.length} categories`}
        action={<button className="btn btn-primary" onClick={() => setAddPartOpen(true)}><Plus size={14} /> Add Part</button>} />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-dim)" }} />
          <input className="input" style={{ paddingLeft: 30 }} placeholder="Search name, SKU, OEM, bike model…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="input" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Stock Status</option>
          <option value="healthy">Healthy</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
        <select className="input" style={{ width: 170 }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {filtered.length === 0 ? (
          <EmptyState icon={Package} title="No parts match" body="Try a different search term or clear filters." />
        ) : (
          <div className="grg-scroll" style={{ overflowX: "auto" }}>
            <table className="grg-table">
              <thead><tr><th>Part</th><th>SKU</th><th>Category</th><th>Brand</th><th>Stock</th><th>Min</th><th>Cost</th><th>Sell</th><th>Location</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filtered.map((p) => {
                  const status = stockStatus(p);
                  return (
                    <tr key={p.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { setSelectedPartId(p.id); goto("partDetail"); }}>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td className="f-mono" style={{ color: "var(--text-mute)" }}>{p.sku}</td>
                      <td style={{ color: "var(--text-mute)" }}>{categoryById(p.categoryId)?.name}</td>
                      <td style={{ color: "var(--text-mute)" }}>{p.brand}</td>
                      <td style={{ fontWeight: 600, color: status === "out" ? "var(--red)" : status === "low" ? "var(--amber)" : "var(--text)" }}>{p.stock}</td>
                      <td style={{ color: "var(--text-dim)" }}>{p.minimumStock}</td>
                      <td className="f-mono">{fmtMoney(p.costPrice)}</td>
                      <td className="f-mono">{fmtMoney(p.sellingPrice)}</td>
                      <td><BinTag rack={p.rack} shelf={p.shelf} bin={p.bin} /></td>
                      <td><StatusBadge status={status} /></td>
                      <td><ChevronRight size={15} color="var(--text-dim)" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
