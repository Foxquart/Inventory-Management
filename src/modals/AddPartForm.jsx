import React, { useState } from "react";
import { CATEGORIES, SUPPLIERS } from "../data/catalog";

export default function AddPartForm({ onCancel, onSave }) {
  const [form, setForm] = useState({
    name: "", sku: "", oemNumber: "", categoryId: CATEGORIES[0].id, brand: "",
    costPrice: 0, sellingPrice: 0, taxRate: 18, stock: 0, minimumStock: 5, reorderQuantity: 10,
    unit: "pc", supplierId: SUPPLIERS[0].id, rack: "", shelf: "", bin: "", compatibleVehicles: [],
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setNum = (k) => (e) => setForm((f) => ({ ...f, [k]: Number(e.target.value) }));
  const valid = form.name.trim() && form.sku.trim();
  return (
    <div>
      <div className="grid-form" style={{ marginBottom: 10 }}>
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Part Name</div>
          <input className="input" value={form.name} onChange={set("name")} placeholder="e.g. Front Brake Pad — R15 V4" />
        </div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>SKU</div><input className="input" value={form.sku} onChange={set("sku")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>OEM Number</div><input className="input" value={form.oemNumber} onChange={set("oemNumber")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Category</div>
          <select className="input" value={form.categoryId} onChange={set("categoryId")}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Brand</div><input className="input" value={form.brand} onChange={set("brand")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Cost Price</div><input className="input" type="number" value={form.costPrice} onChange={setNum("costPrice")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Selling Price</div><input className="input" type="number" value={form.sellingPrice} onChange={setNum("sellingPrice")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Opening Stock</div><input className="input" type="number" value={form.stock} onChange={setNum("stock")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Minimum Stock</div><input className="input" type="number" value={form.minimumStock} onChange={setNum("minimumStock")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Reorder Qty</div><input className="input" type="number" value={form.reorderQuantity} onChange={setNum("reorderQuantity")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Unit</div><input className="input" value={form.unit} onChange={set("unit")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Preferred Supplier</div>
          <select className="input" value={form.supplierId} onChange={set("supplierId")}>{SUPPLIERS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        </div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Rack</div><input className="input" value={form.rack} onChange={set("rack")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Shelf</div><input className="input" value={form.shelf} onChange={set("shelf")} /></div>
        <div><div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Bin</div><input className="input" value={form.bin} onChange={set("bin")} /></div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" disabled={!valid} onClick={() => onSave(form)}>Save Part</button>
      </div>
    </div>
  );
}
