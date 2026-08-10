/* Module-level running counters for the document references the demo mints at runtime. */

let poSeq = 205;
let txnSeq = 1000;
let posSeq = 500;
let adjSeq = 95;
let rtnSeq = 30;

export const nextPurchaseOrderId = () => `PO-${++poSeq}`;
export const nextTransactionId = () => `txn-${++txnSeq}`;
export const nextInvoiceId = () => `POS-${++posSeq}`;
export const nextAdjustmentRef = () => `ADJ-${++adjSeq}`;
export const nextReturnRef = () => `RTN-${++rtnSeq}`;
