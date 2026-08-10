import React from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

export default function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} className="toast-anim card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, minWidth: 260, borderColor: t.error ? "var(--red)" : "var(--border)" }}>
          {t.error ? <CircleAlert size={16} color="var(--red)" /> : <CircleCheck size={16} color="var(--green)" />}
          <span style={{ fontSize: 13 }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
