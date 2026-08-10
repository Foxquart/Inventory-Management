import React, { useState } from "react";
import { Check } from "lucide-react";
import Modal from "../components/Modal";
import { fmtMoney } from "../lib/format";

export default function CheckoutModal({ cartLines, subtotal, gst, total, onClose, onComplete }) {
  const [method, setMethod] = useState("Cash");
  return (
    <Modal title="Take Payment" onClose={onClose} width={380}>
      <div style={{ fontSize: 13, color: "var(--text-mute)", marginBottom: 14 }}>{cartLines.length} item(s) · Total <span className="f-mono" style={{ color: "var(--text)" }}>{fmtMoney(total)}</span></div>
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8, textTransform: "uppercase" }}>Payment Method</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
        {["Cash", "UPI", "Card", "Bank Transfer"].map((m) => (
          <button key={m} className={`btn ${method === m ? "btn-primary" : "btn-panel"}`} onClick={() => setMethod(m)}>{m}</button>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onComplete(method)}><Check size={15} /> Complete Sale</button>
    </Modal>
  );
}
