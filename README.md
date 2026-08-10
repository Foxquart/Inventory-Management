# Six Mile Motor Works — Spares Control Center

A motorcycle workshop spare-parts inventory system: catalog, stock ledger, purchasing,
suppliers, counter sales, and reports. Next.js App Router, no backend — all data is
in-memory demo data seeded at startup, so a page refresh resets the state.

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Layout

```
src/
  app/                 Next.js App Router entry (layout, page, global reset)
  App.jsx              Root SPA: all shared state, the transaction engine, view routing
  views/               One file per screen (dashboard, catalog, PO detail, POS, reports, …)
  modals/              Stock adjustment, job consumption, returns, checkout, receipt, add-part
  components/          Shared UI primitives (Modal, PageHeader, KpiCard, StatusBadge, Gauge, …)
  data/
    catalog.js         Categories, suppliers, bike models, and the 37 seeded parts
    seeds.js           Historical stock ledger + seeded purchase orders
    sequences.js       Running counters for PO / invoice / adjustment / return references
  lib/                 stockStatus + transaction metadata, entity lookups, money & date formatting
  styles/GlobalStyle.jsx   Design tokens and component CSS, injected as a <style> tag
```

`src/views/` is deliberately not named `src/pages/` — that name is reserved by the
Next.js Pages Router and would be picked up as routes.

## How stock moves

Every stock change goes through `addTransaction` in [src/App.jsx](src/App.jsx), which
updates the part and appends a ledger entry recording type, quantity, before/after stock,
a reference (PO / job card / invoice / adjustment), and a reason. Nothing mutates stock
outside that path, so the Transactions ledger always explains the current number.

The page is rendered client-only (`ssr: false` in [src/app/page.jsx](src/app/page.jsx)):
the seed ledger derives its timestamps from `Date.now()` at state-init, which would
otherwise differ between the server render and client hydration.
# Inventory-Management
