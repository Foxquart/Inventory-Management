import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Modal from "../components/Modal";

export default function AdjustStockModal({ part, onClose, onSave }) {
  const [direction, setDirection] = useState("remove");
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("Damaged");
  const [notes, setNotes] = useState("");
  const newStock = Math.max(0, part.stock + (direction === "add" ? qty : -qty));
  return (
    <Modal title="Adjust Stock" onClose={onClose}>
      <div style={{ fontSize: 13, marginBottom: 14 }}>{part.name} · Current Stock <span className="f-mono" style={{ fontWeight: 600 }}>{part.stock}</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <button className={`btn ${direction === "add" ? "btn-primary" : "btn-panel"}`} onClick={() => setDirection("add")}><Plus size={14} /> Add Stock</button>
        <button className={`btn ${direction === "remove" ? "btn-primary" : "btn-panel"}`} onClick={() => setDirection("remove")}><Minus size={14} /> Remove Stock</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Quantity</div>
        <input className="input" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Reason</div>
        <select className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
          {["Damaged", "Lost", "Found", "Correction", "Other"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Notes</div>
        <textarea className="input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional context…" />
      </div>
      <div className="card" style={{ padding: 10, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--panel-alt)" }}>
        <span style={{ fontSize: 13, color: "var(--text-mute)" }}>Stock: {part.stock} → <span style={{ color: "var(--text)", fontWeight: 600 }}>{newStock}</span></span>
        <span style={{ fontSize: 12, color: "var(--text-dim)" }}>Reason: {reason}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(part, direction, qty, reason, notes)}>Save Adjustment</button>
      </div>
    </Modal>
  );
}
