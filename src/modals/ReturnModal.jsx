import React, { useState } from "react";
import Modal from "../components/Modal";

export default function ReturnModal({ part, onClose, onSave }) {
  const [kind, setKind] = useState("customer");
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("Wrong part");
  return (
    <Modal title="Process Return" onClose={onClose}>
      <div style={{ fontSize: 13, marginBottom: 14 }}>{part.name} · Current Stock <span className="f-mono" style={{ fontWeight: 600 }}>{part.stock}</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <button className={`btn ${kind === "customer" ? "btn-primary" : "btn-panel"}`} onClick={() => setKind("customer")}>Customer Return</button>
        <button className={`btn ${kind === "supplier" ? "btn-primary" : "btn-panel"}`} onClick={() => setKind("supplier")}>Supplier Return</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Quantity</div>
        <input className="input" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Reason</div>
        <input className="input" value={reason} onChange={(e) => setReason(e.target.value)} placeholder={kind === "customer" ? "e.g. Wrong part" : "e.g. Damaged on arrival"} />
      </div>
      <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginBottom: 14 }}>
        Stock will {kind === "customer" ? "increase" : "decrease"} by {qty} once saved.
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(part, qty, kind, reason)}>Process Return</button>
      </div>
    </Modal>
  );
}
