import React from "react";
import { CircleCheck } from "lucide-react";
import { fmtMoney } from "../lib/format";

export default function Receipt({ invoice, onClose }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <CircleCheck size={30} color="var(--green)" />
        <div className="f-disp" style={{ fontSize: 16, marginTop: 6 }}>Sale Recorded</div>
        <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{new Date(invoice.createdAt).toLocaleString("en-IN")}</div>
      </div>
      <div style={{ borderTop: "1px dashed var(--border)", borderBottom: "1px dashed var(--border)", padding: "10px 0", marginBottom: 10 }}>
        {invoice.lines.map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
            <span>{l.name} × {l.qty}</span><span className="f-mono">{fmtMoney(l.price * l.qty)}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-mute)", display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span className="f-mono">{fmtMoney(invoice.subtotal)}</span></div>
      <div style={{ fontSize: 13, color: "var(--text-mute)", display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span>GST</span><span className="f-mono">{fmtMoney(invoice.gst)}</span></div>
      <div style={{ fontSize: 15, fontWeight: 700, display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span>Total</span><span className="f-mono">{fmtMoney(invoice.total)}</span></div>
      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Paid via {invoice.paymentMethod} · Invoice {invoice.id}</div>
      <button className="btn btn-panel" style={{ width: "100%", justifyContent: "center", marginTop: 14 }} onClick={onClose}>Done</button>
    </div>
  );
}
