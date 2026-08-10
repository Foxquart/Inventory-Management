import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children, width = 480 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,11,12,0.7)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div className="card grg-scroll" style={{ width, maxWidth: "100%", maxHeight: "88vh", overflowY: "auto", padding: 0 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div className="f-disp" style={{ fontSize: 16 }}>{title}</div>
          <X size={18} style={{ cursor: "pointer", color: "var(--text-mute)" }} onClick={onClose} />
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}
