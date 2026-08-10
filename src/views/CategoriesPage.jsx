import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { CATEGORIES } from "../data/catalog";
import { stockStatus } from "../lib/stock";

export default function CategoriesPage({ parts, goto, setSelectedPartId }) {
  const [openCat, setOpenCat] = useState(null);
  return (
    <div>
      <PageHeader title="Categories" subtitle={`${CATEGORIES.length} categories`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CATEGORIES.map((c) => {
          const catParts = parts.filter((p) => p.categoryId === c.id);
          const open = openCat === c.id;
          return (
            <div key={c.id} className="card" style={{ padding: 0 }}>
              <div className="row-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer" }} onClick={() => setOpenCat(open ? null : c.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  <span className="f-disp" style={{ fontSize: 14 }}>{c.name}</span>
                </div>
                <span className="badge badge-neutral">{catParts.length} parts</span>
              </div>
              {open && (
                <table className="grg-table">
                  <tbody>
                    {catParts.map((p) => (
                      <tr key={p.id} className="row-hover" style={{ cursor: "pointer" }} onClick={() => { setSelectedPartId(p.id); goto("partDetail"); }}>
                        <td>{p.name}</td><td className="f-mono" style={{ color: "var(--text-mute)" }}>{p.sku}</td><td>{p.stock} in stock</td><td><StatusBadge status={stockStatus(p)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
