import { CATEGORIES, SUPPLIERS } from "../data/catalog";

export const partById = (parts, id) => parts.find((p) => p.id === id);
export const supplierById = (id) => SUPPLIERS.find((s) => s.id === id);
export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);
