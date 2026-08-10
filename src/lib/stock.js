export function stockStatus(part) {
  if (part.stock <= 0) return "out";
  if (part.stock <= part.minimumStock) return "low";
  return "healthy";
}

export const STATUS_LABEL = { healthy: "Healthy", low: "Low Stock", out: "Out of Stock" };

export const TX_TYPE_META = {
  PURCHASE_RECEIVED: { label: "Purchase Received", color: "var(--green)" },
  JOB_CONSUMPTION: { label: "Job Consumption", color: "var(--blue)" },
  COUNTER_SALE: { label: "Counter Sale", color: "var(--amber)" },
  CUSTOMER_RETURN: { label: "Customer Return", color: "var(--green)" },
  SUPPLIER_RETURN: { label: "Supplier Return", color: "var(--red)" },
  ADJUSTMENT: { label: "Adjustment", color: "var(--text-mute)" },
  DAMAGE: { label: "Damaged", color: "var(--red)" },
  LOSS: { label: "Lost", color: "var(--red)" },
  FOUND: { label: "Found", color: "var(--green)" },
  OPENING_STOCK: { label: "Opening Stock", color: "var(--text-mute)" },
};
