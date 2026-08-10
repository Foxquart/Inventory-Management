"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search, Bell, Plus, Package, AlertTriangle, Truck, ShoppingCart, FileText,
  Wrench, BarChart3, Layers, ClipboardList, Home, Menu,
} from "lucide-react";

import GlobalStyle from "./styles/GlobalStyle";
import { PARTS } from "./data/catalog";
import { seedPurchaseOrders, seedTransactions } from "./data/seeds";
import {
  nextAdjustmentRef, nextInvoiceId, nextPurchaseOrderId, nextReturnRef, nextTransactionId,
} from "./data/sequences";
import { partById, supplierById } from "./lib/lookup";
import { stockStatus } from "./lib/stock";

import Modal from "./components/Modal";
import Toast from "./components/Toast";
import StatusBadge from "./components/StatusBadge";

import Dashboard from "./views/Dashboard";
import PartsCatalog from "./views/PartsCatalog";
import PartDetail from "./views/PartDetail";
import LowStockPage from "./views/LowStockPage";
import SuppliersPage from "./views/SuppliersPage";
import SupplierDetail from "./views/SupplierDetail";
import PurchaseOrdersPage from "./views/PurchaseOrdersPage";
import PODetail from "./views/PODetail";
import POSPage from "./views/POSPage";
import TransactionsPage from "./views/TransactionsPage";
import ReportsPage from "./views/ReportsPage";
import CategoriesPage from "./views/CategoriesPage";

import AdjustStockModal from "./modals/AdjustStockModal";
import JobConsumptionModal from "./modals/JobConsumptionModal";
import ReturnModal from "./modals/ReturnModal";
import CheckoutModal from "./modals/CheckoutModal";
import Receipt from "./modals/Receipt";
import AddPartForm from "./modals/AddPartForm";

export default function App() {
  const [parts, setParts] = useState(PARTS);
  const [transactions, setTransactions] = useState(seedTransactions());
  const [purchaseOrders, setPurchaseOrders] = useState(seedPurchaseOrders());
  const [salesHistory, setSalesHistory] = useState([]);

  const [view, setView] = useState("dashboard");
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [selectedPOId, setSelectedPOId] = useState(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  // Below the breakpoint the sidebar becomes an overlay, so it starts closed.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => { setIsNarrow(mq.matches); setSidebarOpen(!mq.matches); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const [adjustModalPart, setAdjustModalPart] = useState(null);
  const [jobModalPart, setJobModalPart] = useState(null);
  const [returnModalPart, setReturnModalPart] = useState(null);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);

  const [cart, setCart] = useState([]); // {partId, qty}
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((message, error = false) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, error }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const goto = (v, extra) => {
    setView(v);
    if (extra) extra();
    setQuickActionOpen(false);
    if (isNarrow) setSidebarOpen(false);
  };

  /* ---------- core transaction engine ---------- */
  const addTransaction = useCallback((partId, type, quantity, referenceId, reason) => {
    setParts((prev) => prev.map((p) => {
      if (p.id !== partId) return p;
      const newStock = Math.max(0, p.stock + quantity);
      const id = nextTransactionId();
      setTransactions((tx) => [{
        id, partId, type, quantity,
        previousStock: p.stock, newStock, referenceType: type, referenceId, reason,
        createdAt: new Date().toISOString(),
      }, ...tx]);
      return { ...p, stock: newStock };
    }));
  }, []);

  const adjustStock = (part, direction, qty, reason, notes) => {
    const delta = direction === "add" ? Math.abs(qty) : -Math.abs(qty);
    const ref = nextAdjustmentRef();
    addTransaction(part.id, reason === "Damaged" ? "DAMAGE" : reason === "Lost" ? "LOSS" : reason === "Found" ? "FOUND" : "ADJUSTMENT", delta, ref, notes || reason);
    pushToast(`Stock adjusted for ${part.name}: ${part.stock} → ${Math.max(0, part.stock + delta)}`);
    setAdjustModalPart(null);
  };

  const logJobConsumption = (part, qty, jobRef) => {
    if (qty > part.stock) { pushToast("Insufficient stock to log consumption", true); return; }
    addTransaction(part.id, "JOB_CONSUMPTION", -qty, jobRef, "Used on repair job");
    pushToast(`${qty} × ${part.name} consumed on ${jobRef}`);
    setJobModalPart(null);
  };

  const processReturn = (part, qty, kind, reason) => {
    if (kind === "customer") {
      addTransaction(part.id, "CUSTOMER_RETURN", qty, nextReturnRef(), reason);
      pushToast(`Customer return recorded: +${qty} ${part.name}`);
    } else {
      if (qty > part.stock) { pushToast("Cannot return more than in stock", true); return; }
      addTransaction(part.id, "SUPPLIER_RETURN", -qty, nextReturnRef(), reason);
      pushToast(`Supplier return recorded: -${qty} ${part.name}`);
    }
    setReturnModalPart(null);
  };

  /* ---------- purchase orders ---------- */
  const createReorderPO = (part) => {
    const id = nextPurchaseOrderId();
    const po = {
      id, supplierId: part.supplierId, status: "DRAFT",
      createdAt: new Date().toISOString().slice(0, 10),
      expectedDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      items: [{ partId: part.id, orderedQuantity: part.reorderQuantity, receivedQuantity: 0, unitCost: part.costPrice }],
    };
    setPurchaseOrders((prev) => [po, ...prev]);
    setSelectedPOId(id);
    setView("poDetail");
    pushToast(`Draft purchase order ${id} created for ${part.name}`);
  };

  const placeOrder = (poId) => {
    setPurchaseOrders((prev) => prev.map((po) => po.id === poId ? { ...po, status: "ORDERED" } : po));
    pushToast(`${poId} placed with supplier`);
  };

  const receiveStock = (poId, receivedMap) => {
    setPurchaseOrders((prev) => prev.map((po) => {
      if (po.id !== poId) return po;
      const items = po.items.map((it) => {
        const recv = receivedMap[it.partId] ?? 0;
        if (recv > 0) addTransaction(it.partId, "PURCHASE_RECEIVED", recv, poId, "Received from supplier");
        return { ...it, receivedQuantity: Math.min(it.orderedQuantity, it.receivedQuantity + recv) };
      });
      const allReceived = items.every((it) => it.receivedQuantity >= it.orderedQuantity);
      const anyReceived = items.some((it) => it.receivedQuantity > 0);
      const status = allReceived ? "RECEIVED" : anyReceived ? "PARTIALLY_RECEIVED" : po.status;
      pushToast(`Stock received for ${poId}`);
      return { ...po, items, status };
    }));
  };

  /* ---------- POS ---------- */
  const addToCart = (part, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.partId === part.id);
      const currentQty = existing ? existing.qty : 0;
      if (currentQty + qty > part.stock) {
        pushToast(`Only ${part.stock} in stock for ${part.name}`, true);
        return prev;
      }
      if (existing) return prev.map((c) => c.partId === part.id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { partId: part.id, qty }];
    });
  };
  const updateCartQty = (partId, qty) => {
    const part = partById(parts, partId);
    if (qty > part.stock) { pushToast(`Only ${part.stock} in stock`, true); return; }
    if (qty <= 0) { setCart((prev) => prev.filter((c) => c.partId !== partId)); return; }
    setCart((prev) => prev.map((c) => c.partId === partId ? { ...c, qty } : c));
  };
  const removeFromCart = (partId) => setCart((prev) => prev.filter((c) => c.partId !== partId));

  const cartLines = cart.map((c) => ({ ...c, part: partById(parts, c.partId) }));
  const cartSubtotal = cartLines.reduce((s, l) => s + l.part.sellingPrice * l.qty, 0);
  const cartGst = cartLines.reduce((s, l) => s + l.part.sellingPrice * l.qty * (l.part.taxRate / 100), 0);
  const cartTotal = cartSubtotal + cartGst;

  const completeSale = (paymentMethod) => {
    const invoiceId = nextInvoiceId();
    cartLines.forEach((l) => addTransaction(l.partId, "COUNTER_SALE", -l.qty, invoiceId, "Sold over counter"));
    const invoice = { id: invoiceId, lines: cartLines.map((l) => ({ name: l.part.name, qty: l.qty, price: l.part.sellingPrice })), subtotal: cartSubtotal, gst: cartGst, total: cartTotal, paymentMethod, createdAt: new Date().toISOString() };
    setSalesHistory((prev) => [invoice, ...prev]);
    setReceipt(invoice);
    setCart([]);
    setCheckoutOpen(false);
  };

  /* ---------- derived ---------- */
  const totalSKUs = parts.length;
  const inventoryValue = parts.reduce((s, p) => s + p.stock * p.costPrice, 0);
  const retailValue = parts.reduce((s, p) => s + p.stock * p.sellingPrice, 0);
  const lowStockParts = parts.filter((p) => stockStatus(p) === "low");
  const outOfStockParts = parts.filter((p) => stockStatus(p) === "out");
  const criticalParts = [...lowStockParts, ...outOfStockParts].sort((a, b) => a.stock - b.stock);
  const pendingPOs = purchaseOrders.filter((po) => ["DRAFT", "ORDERED", "PARTIALLY_RECEIVED"].includes(po.status));
  const receivedToday = transactions.filter((t) => t.type === "PURCHASE_RECEIVED" && new Date(t.createdAt).toDateString() === new Date().toDateString());
  const receivedTodayValue = receivedToday.reduce((s, t) => { const p = partById(parts, t.partId); return s + (p ? p.costPrice * t.quantity : 0); }, 0);

  const consumptionByPart = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (["JOB_CONSUMPTION", "COUNTER_SALE"].includes(t.type)) {
        map[t.partId] = (map[t.partId] || 0) + Math.abs(t.quantity);
      }
    });
    return map;
  }, [transactions]);
  const fastMoving = useMemo(() => {
    return Object.entries(consumptionByPart)
      .map(([partId, qty]) => ({ part: partById(parts, partId), qty }))
      .filter((x) => x.part)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 7);
  }, [consumptionByPart, parts]);
  const maxFastMoving = Math.max(1, ...fastMoving.map((f) => f.qty));

  const slowMoving = useMemo(() => {
    return parts.filter((p) => !consumptionByPart[p.id] && p.stock > 0).slice(0, 6);
  }, [parts, consumptionByPart]);

  const recentTx = transactions.slice(0, 8);

  /* ---------- global search ---------- */
  const searchResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const q = globalSearch.toLowerCase();
    return parts.filter((p) =>
      p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) ||
      p.oemNumber.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
      p.compatibleVehicles.some((v) => v.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [globalSearch, parts]);

  const selectedPart = selectedPartId ? partById(parts, selectedPartId) : null;
  const selectedPO = selectedPOId ? purchaseOrders.find((po) => po.id === selectedPOId) : null;
  const selectedSupplier = selectedSupplierId ? supplierById(selectedSupplierId) : null;

  /* ============================== NAV ============================== */
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "parts", label: "Parts", icon: Package },
    { id: "lowStock", label: "Low Stock", icon: AlertTriangle, count: criticalParts.length },
    { id: "suppliers", label: "Suppliers", icon: Truck },
    { id: "purchaseOrders", label: "Purchase Orders", icon: ClipboardList, count: pendingPOs.length },
    { id: "pos", label: "Counter Sales", icon: ShoppingCart },
    { id: "transactions", label: "Transactions", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "categories", label: "Categories", icon: Layers },
  ];

  /* ============================== RENDER ============================== */
  return (
    <div className="grg" style={{ display: "flex" }}>
      <GlobalStyle />
      {/* SIDEBAR */}
      {isNarrow && sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
      <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div style={{ padding: "18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 4, background: "var(--rust)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#fff" />
            </div>
            <div>
              <div className="f-disp" style={{ fontSize: 15, lineHeight: 1 }}>SIX MILE MOTOR WORKS</div>
              <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1 }}>SPARES CONTROL CENTER</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => (
            <div key={n.id} className={`nav-item ${view === n.id || (view === "partDetail" && n.id === "parts") || (view === "poDetail" && n.id === "purchaseOrders") || (view === "supplierDetail" && n.id === "suppliers") ? "active" : ""}`}
              onClick={() => goto(n.id)}>
              <n.icon size={15} />
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.count > 0 && <span style={{ fontSize: 10, background: "var(--panel-hi)", color: "var(--text-mute)", padding: "1px 6px", borderRadius: 10 }}>{n.count}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <div className="topbar">
          <Menu size={18} style={{ cursor: "pointer", color: "var(--text-mute)", flexShrink: 0 }} onClick={() => setSidebarOpen((s) => !s)} />
          <div className="topbar-search">
            <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-dim)" }} />
            <input className="input" style={{ paddingLeft: 30 }} placeholder="Search parts, SKU, OEM number, bike model…"
              value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
            {searchResults.length > 0 && (
              <div className="card grg-scroll" style={{ position: "absolute", top: 38, left: 0, right: 0, zIndex: 60, maxHeight: 320, overflowY: "auto" }}>
                {searchResults.map((p) => (
                  <div key={p.id} className="row-hover" style={{ padding: "9px 12px", cursor: "pointer", borderBottom: "1px solid var(--border-lo)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    onClick={() => { setSelectedPartId(p.id); setView("partDetail"); setGlobalSearch(""); }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{p.name}</div>
                      <div className="f-mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>{p.sku} · {p.brand}</div>
                    </div>
                    <StatusBadge status={stockStatus(p)} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="topbar-spacer" />
          <Bell size={17} style={{ color: "var(--text-mute)", cursor: "pointer", flexShrink: 0 }} />
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button className="btn btn-primary" onClick={() => setQuickActionOpen((s) => !s)}><Plus size={14} /> <span className="btn-label-wide">Quick Action</span></button>
            {quickActionOpen && (
              <div className="card" style={{ position: "absolute", right: 0, top: 40, width: 210, padding: 6, zIndex: 60 }}>
                {[
                  ["Add Part", () => setAddPartOpen(true)],
                  ["Adjust Stock", () => { setView("parts"); setQuickActionOpen(false); pushToast("Pick a part, then Adjust Stock"); }],
                  ["Receive Stock", () => goto("purchaseOrders")],
                  ["Create Purchase Order", () => goto("purchaseOrders")],
                  ["Counter Sale", () => goto("pos")],
                  ["Add Supplier", () => setAddSupplierOpen(true)],
                ].map(([label, fn]) => (
                  <div key={label} className="nav-item" style={{ padding: "8px 10px" }} onClick={() => { fn(); setQuickActionOpen(false); }}>{label}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PAGE BODY */}
        <div className="grg-scroll page-body">
          {view === "dashboard" && (
            <Dashboard {...{ totalSKUs, inventoryValue, lowStockParts, outOfStockParts, pendingPOs, receivedTodayValue, parts, criticalParts, recentTx, fastMoving, maxFastMoving, goto, setSelectedPartId, createReorderPO }} />
          )}
          {view === "parts" && (
            <PartsCatalog {...{ parts, goto, setSelectedPartId, setAddPartOpen }} />
          )}
          {view === "partDetail" && selectedPart && (
            <PartDetail part={selectedPart} transactions={transactions} goto={goto}
              onAdjust={() => setAdjustModalPart(selectedPart)}
              onJob={() => setJobModalPart(selectedPart)}
              onReturn={() => setReturnModalPart(selectedPart)}
              onReorder={() => createReorderPO(selectedPart)} />
          )}
          {view === "lowStock" && (
            <LowStockPage {...{ criticalParts, goto, setSelectedPartId, createReorderPO }} />
          )}
          {view === "suppliers" && (
            <SuppliersPage {...{ parts, purchaseOrders, goto, setSelectedSupplierId, setAddSupplierOpen }} />
          )}
          {view === "supplierDetail" && selectedSupplier && (
            <SupplierDetail supplier={selectedSupplier} parts={parts} purchaseOrders={purchaseOrders} goto={goto} setSelectedPOId={setSelectedPOId} />
          )}
          {view === "purchaseOrders" && (
            <PurchaseOrdersPage {...{ purchaseOrders, parts, goto, setSelectedPOId }} />
          )}
          {view === "poDetail" && selectedPO && (
            <PODetail po={selectedPO} parts={parts} goto={goto} onPlaceOrder={placeOrder} onReceive={receiveStock} />
          )}
          {view === "pos" && (
            <POSPage {...{ parts, cart, cartLines, cartSubtotal, cartGst, cartTotal, addToCart, updateCartQty, removeFromCart, setCheckoutOpen }} />
          )}
          {view === "transactions" && (
            <TransactionsPage transactions={transactions} parts={parts} setSelectedPartId={setSelectedPartId} goto={goto} />
          )}
          {view === "reports" && (
            <ReportsPage {...{ parts, transactions, purchaseOrders, inventoryValue, retailValue, fastMoving, slowMoving }} />
          )}
          {view === "categories" && (
            <CategoriesPage parts={parts} goto={goto} setSelectedPartId={setSelectedPartId} />
          )}
        </div>
      </div>

      {/* MODALS */}
      {adjustModalPart && (
        <AdjustStockModal part={adjustModalPart} onClose={() => setAdjustModalPart(null)} onSave={adjustStock} />
      )}
      {jobModalPart && (
        <JobConsumptionModal part={jobModalPart} onClose={() => setJobModalPart(null)} onSave={logJobConsumption} onReorder={() => { createReorderPO(jobModalPart); setJobModalPart(null); }} />
      )}
      {returnModalPart && (
        <ReturnModal part={returnModalPart} onClose={() => setReturnModalPart(null)} onSave={processReturn} />
      )}
      {addPartOpen && (
        <Modal title="Add New Part" onClose={() => setAddPartOpen(false)} width={520}>
          <AddPartForm onCancel={() => setAddPartOpen(false)} onSave={(part) => {
            setParts((prev) => [{ ...part, id: `part-${Date.now()}` }, ...prev]);
            setAddPartOpen(false);
            pushToast(`${part.name} added to catalog`);
          }} />
        </Modal>
      )}
      {addSupplierOpen && (
        <Modal title="Add Supplier" onClose={() => setAddSupplierOpen(false)} width={440}>
          <div style={{ color: "var(--text-mute)", fontSize: 13 }}>
            Supplier onboarding isn't wired up in this demo — the six seeded suppliers cover the full purchasing flow.
          </div>
          <div style={{ marginTop: 16, textAlign: "right" }}><button className="btn btn-panel" onClick={() => setAddSupplierOpen(false)}>Close</button></div>
        </Modal>
      )}
      {checkoutOpen && (
        <CheckoutModal cartLines={cartLines} subtotal={cartSubtotal} gst={cartGst} total={cartTotal} onClose={() => setCheckoutOpen(false)} onComplete={completeSale} />
      )}
      {receipt && (
        <Modal title={`Receipt — ${receipt.id}`} onClose={() => setReceipt(null)} width={380}>
          <Receipt invoice={receipt} onClose={() => setReceipt(null)} />
        </Modal>
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
