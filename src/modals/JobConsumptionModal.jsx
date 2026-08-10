import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "../components/Modal";

export default function JobConsumptionModal({ part, onClose, onSave, onReorder }) {
  const [qty, setQty] = useState(1);
  const [jobRef, setJobRef] = useState(`JOB-${Math.floor(1000 + Math.random() * 90)}`);
  const insufficient = qty > part.stock;
  return (
    <Modal title="Log Job Consumption" onClose={onClose}>
      <div style={{ fontSize: 13, marginBottom: 14 }}>{part.name} · Available Stock <span className="f-mono" style={{ fontWeight: 600 }}>{part.stock}</span></div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Job Reference</div>
        <input className="input" value={jobRef} onChange={(e) => setJobRef(e.target.value)} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>Quantity Used</div>
        <input className="input" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
      </div>
      {insufficient ? (
        <div className="card" style={{ padding: 12, marginBottom: 14, borderColor: "var(--red)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--red)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}><AlertTriangle size={15} /> Insufficient Stock</div>
          <div style={{ fontSize: 12.5, color: "var(--text-mute)" }}>Available: {part.stock} · Requested: {qty} · You need {qty - part.stock} more units.</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn btn-panel btn-sm" onClick={onReorder}>Create Reorder</button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginBottom: 14 }}>Remaining after use: <span style={{ color: "var(--text)", fontWeight: 600 }}>{part.stock - qty}</span></div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" disabled={insufficient} onClick={() => onSave(part, qty, jobRef)}>Log Consumption</button>
      </div>
    </Modal>
  );
}
