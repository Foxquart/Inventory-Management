import React, { useState } from "react";
import { Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import BinTag from "../components/BinTag";
import { stockStatus } from "../lib/stock";
import { fmtMoney } from "../lib/format";

export default function POSPage({ parts, cart, cartLines, cartSubtotal, cartGst, cartTotal, addToCart, updateCartQty, removeFromCart, setCheckoutOpen }) {
  const [q, setQ] = useState("");
  const results = q.trim() ? parts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase())).slice(0, 20) : parts.slice(0, 20);

  return (
    <div>
      <PageHeader title="Counter Sales" subtitle="Sell parts directly over the counter, no job card required." />
      <div className="grid-pos">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-dim)" }} />
            <input className="input" style={{ paddingLeft: 30 }} placeholder="Search parts to add…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="grg-scroll" style={{ maxHeight: 520, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
            {results.map((p) => {
              const status = stockStatus(p);
              return (
                <div key={p.id} className="row-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "10px 12px", border: "1px solid var(--border-lo)", borderRadius: 4 }}>
                  <div>
                    <div style={{ fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-dim)", display: "flex", gap: 8, alignItems: "center", marginTop: 2, flexWrap: "wrap" }}>
                      <span className="f-mono">{fmtMoney(p.sellingPrice)}</span> · Stock: {p.stock} <BinTag rack={p.rack} shelf={p.shelf} bin={p.bin} />
                    </div>
                  </div>
                  <button className="btn btn-panel btn-sm" disabled={status === "out"} onClick={() => addToCart(p, 1)}><Plus size={13} /> Add</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column" }}>
          <div className="f-disp" style={{ fontSize: 15, marginBottom: 10 }}>Current Sale</div>
          {cartLines.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="Cart is empty" body="Add parts from the left to start a counter sale." />
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {cartLines.map((l) => (
                <div key={l.partId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid var(--border-lo)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{l.part.name}</div>
                    <div className="f-mono" style={{ fontSize: 11.5, color: "var(--text-dim)" }}>{fmtMoney(l.part.sellingPrice)} × {l.qty} = {fmtMoney(l.part.sellingPrice * l.qty)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: 4 }} onClick={() => updateCartQty(l.partId, l.qty - 1)}><Minus size={12} /></button>
                    <span className="f-mono" style={{ width: 20, textAlign: "center" }}>{l.qty}</span>
                    <button className="btn btn-ghost btn-sm" style={{ padding: 4 }} onClick={() => updateCartQty(l.partId, l.qty + 1)}><Plus size={12} /></button>
                    <X size={14} style={{ cursor: "pointer", color: "var(--text-dim)", marginLeft: 4 }} onClick={() => removeFromCart(l.partId)} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: "var(--text-mute)" }}><span>Subtotal</span><span className="f-mono">{fmtMoney(cartSubtotal)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--text-mute)" }}><span>GST</span><span className="f-mono">{fmtMoney(cartGst)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, marginBottom: 12 }}><span>Total</span><span className="f-mono">{fmtMoney(cartTotal)}</span></div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={cartLines.length === 0} onClick={() => setCheckoutOpen(true)}>Take Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
