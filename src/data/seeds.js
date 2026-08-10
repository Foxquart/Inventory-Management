/* Seed data for the demo ledger and purchase orders. */

// seed historical transactions (won't mutate live stock; purely illustrative ledger)
export function seedTransactions() {
  const now = Date.now();
  const day = 86400000;
  const entries = [
    ["part-1", "JOB_CONSUMPTION", -1, 3, 2, "JOB-1048", "Used on repair job"],
    ["part-5", "COUNTER_SALE", -2, 26, 24, "POS-443", "Sold over counter"],
    ["part-3", "PURCHASE_RECEIVED", 20, 0, 20, "PO-198", "Received from supplier"],
    ["part-6", "ADJUSTMENT", -1, 5, 4, "ADJ-91", "Damaged"],
    ["part-2", "PURCHASE_RECEIVED", 12, 0, 12, "PO-192", "Received from supplier"],
    ["part-2", "JOB_CONSUMPTION", -2, 14, 12, "JOB-1039", "Used on repair job"],
    ["part-9", "COUNTER_SALE", -1, 10, 9, "POS-431", "Sold over counter"],
    ["part-10", "PURCHASE_RECEIVED", 8, 0, 5, "PO-190", "Partial receipt"],
    ["part-4", "JOB_CONSUMPTION", -1, 1, 0, "JOB-1021", "Used on repair job"],
    ["part-19", "OPENING_STOCK", 6, 0, 6, "OPEN-01", "Initial stock load"],
    ["part-17", "COUNTER_SALE", -2, 10, 8, "POS-418", "Sold over counter"],
    ["part-25", "CUSTOMER_RETURN", 1, 1, 2, "RTN-22", "Wrong part returned"],
    ["part-1", "OPENING_STOCK", 5, 0, 5, "OPEN-01", "Initial stock load"],
  ];
  return entries.map(([partId, type, quantity, previousStock, newStock, referenceId, reason], i) => ({
    id: `txn-seed-${i}`,
    partId, type, quantity, previousStock, newStock,
    referenceType: type, referenceId,
    reason,
    createdAt: new Date(now - (entries.length - i) * (day / 3) - i * 900000).toISOString(),
  }));
}

export function seedPurchaseOrders() {
  return [
    { id: "PO-198", supplierId: "sup-5", status: "RECEIVED", createdAt: "2026-07-28", expectedDate: "2026-08-01",
      items: [
        { partId: "part-3", orderedQuantity: 20, receivedQuantity: 20, unitCost: 180 },
      ] },
    { id: "PO-192", supplierId: "sup-2", status: "RECEIVED", createdAt: "2026-07-20", expectedDate: "2026-07-24",
      items: [
        { partId: "part-2", orderedQuantity: 12, receivedQuantity: 12, unitCost: 720 },
      ] },
    { id: "PO-190", supplierId: "sup-6", status: "PARTIALLY_RECEIVED", createdAt: "2026-07-18", expectedDate: "2026-07-22",
      items: [
        { partId: "part-10", orderedQuantity: 8, receivedQuantity: 5, unitCost: 1450 },
      ] },
    { id: "PO-201", supplierId: "sup-3", status: "ORDERED", createdAt: "2026-08-06", expectedDate: "2026-08-13",
      items: [
        { partId: "part-4", orderedQuantity: 10, receivedQuantity: 0, unitCost: 2100 },
        { partId: "part-24", orderedQuantity: 6, receivedQuantity: 0, unitCost: 950 },
      ] },
    { id: "PO-202", supplierId: "sup-1", status: "DRAFT", createdAt: "2026-08-08", expectedDate: "2026-08-15",
      items: [
        { partId: "part-9", orderedQuantity: 15, receivedQuantity: 0, unitCost: 150 },
      ] },
    { id: "PO-188", supplierId: "sup-4", status: "CANCELLED", createdAt: "2026-07-10", expectedDate: "2026-07-15",
      items: [
        { partId: "part-14", orderedQuantity: 12, receivedQuantity: 0, unitCost: 220 },
      ] },
  ];
}
