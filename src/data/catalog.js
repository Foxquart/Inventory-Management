/* Static catalog data: categories, suppliers, bike models, and the seeded parts list. */

export const CATEGORIES = [
  { id: "cat-engine", name: "Engine" },
  { id: "cat-brakes", name: "Brakes" },
  { id: "cat-trans", name: "Transmission" },
  { id: "cat-elec", name: "Electrical" },
  { id: "cat-susp", name: "Suspension" },
  { id: "cat-tyres", name: "Tyres" },
  { id: "cat-consum", name: "Consumables" },
  { id: "cat-acc", name: "Accessories" },
];

export const SUPPLIERS = [
  { id: "sup-1", name: "North East Auto Parts", phone: "+91 98640 11223", email: "sales@neap.in", address: "GS Road, Guwahati, Assam", gstin: "18AACFN1234K1Z5", paymentTerms: "Net 15" },
  { id: "sup-2", name: "Speedline Motors", phone: "+91 94350 22114", email: "orders@speedline.in", address: "Zoo Road, Guwahati, Assam", gstin: "18AABCS5678L1Z2", paymentTerms: "Net 30" },
  { id: "sup-3", name: "Moto Spares Hub", phone: "+91 97060 33445", email: "hub@motospares.in", address: "Fancy Bazar, Guwahati, Assam", gstin: "18AAGCM9012M1Z7", paymentTerms: "COD" },
  { id: "sup-4", name: "Assam Bike Traders", phone: "+91 90850 44556", email: "contact@abtraders.in", address: "Beltola, Guwahati, Assam", gstin: "18AAJCA3456N1Z9", paymentTerms: "Net 15" },
  { id: "sup-5", name: "RE Genuine Parts Co.", phone: "+91 96780 55667", email: "genuine@repartsco.in", address: "Christian Basti, Guwahati, Assam", gstin: "18AAKCR7890P1Z1", paymentTerms: "Net 30" },
  { id: "sup-6", name: "Guwahati Auto Distributors", phone: "+91 88760 66778", email: "gad@gwhauto.in", address: "Six Mile, Guwahati, Assam", gstin: "18AALCG2345Q1Z4", paymentTerms: "Net 7" },
];

export const BIKES = [
  "Royal Enfield Classic 350", "Royal Enfield Hunter 350", "Royal Enfield Bullet 350", "Royal Enfield Meteor 350",
  "Yamaha R15 V4", "Yamaha MT-15", "Yamaha FZ-S",
  "Honda Activa 6G", "Honda Shine", "Honda SP 125",
  "Bajaj Pulsar 150", "Bajaj Pulsar NS200", "Bajaj Platina",
  "TVS Apache RTR 160", "TVS Jupiter", "TVS Raider 125",
  "Suzuki Access 125", "Suzuki Gixxer",
  "Hero Splendor Plus", "Hero Glamour",
  "KTM Duke 200",
];

let partSeq = 1;
const P = (o) => ({ id: `part-${partSeq++}`, ...o });

export const PARTS = [
  P({ sku: "BP-RE-350-R", oemNumber: "RE-BP-8831", name: "Rear Brake Pad — Classic 350", categoryId: "cat-brakes", brand: "Royal Enfield", costPrice: 600, sellingPrice: 850, taxRate: 18, stock: 2, minimumStock: 5, reorderQuantity: 10, unit: "set", supplierId: "sup-1", rack: "B", shelf: "03", bin: "12", compatibleVehicles: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350", "Royal Enfield Meteor 350"] }),
  P({ sku: "BP-R15-V4-F", oemNumber: "YM-BP-4471", name: "Front Brake Pad — R15 V4", categoryId: "cat-brakes", brand: "Yamaha", costPrice: 720, sellingPrice: 1050, taxRate: 18, stock: 12, minimumStock: 5, reorderQuantity: 10, unit: "set", supplierId: "sup-2", rack: "A", shelf: "02", bin: "05", compatibleVehicles: ["Yamaha R15 V4", "Yamaha R15 V3"] }),
  P({ sku: "OF-RE-350", oemNumber: "RE-OF-2210", name: "Oil Filter — Classic 350", categoryId: "cat-engine", brand: "Royal Enfield", costPrice: 180, sellingPrice: 300, taxRate: 18, stock: 3, minimumStock: 8, reorderQuantity: 20, unit: "pc", supplierId: "sup-5", rack: "C", shelf: "01", bin: "04", compatibleVehicles: ["Royal Enfield Classic 350", "Royal Enfield Bullet 350"] }),
  P({ sku: "CK-R15-V4", oemNumber: "YM-CK-9981", name: "Chain Kit — R15 V4", categoryId: "cat-trans", brand: "Yamaha", costPrice: 2100, sellingPrice: 2850, taxRate: 18, stock: 0, minimumStock: 3, reorderQuantity: 10, unit: "set", supplierId: "sup-3", rack: "D", shelf: "02", bin: "09", compatibleVehicles: ["Yamaha R15 V4"] }),
  P({ sku: "EO-10W40", oemNumber: "GEN-EO-1040", name: "Engine Oil 10W40", categoryId: "cat-engine", brand: "Generic", costPrice: 520, sellingPrice: 650, taxRate: 18, stock: 24, minimumStock: 10, reorderQuantity: 30, unit: "litre", supplierId: "sup-4", rack: "C", shelf: "02", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "SP-NGK-STD", oemNumber: "NGK-CPR8EA9", name: "Spark Plug — NGK Standard", categoryId: "cat-engine", brand: "NGK", costPrice: 140, sellingPrice: 220, taxRate: 18, stock: 4, minimumStock: 10, reorderQuantity: 20, unit: "pc", supplierId: "sup-6", rack: "C", shelf: "03", bin: "07", compatibleVehicles: BIKES.slice(0, 10) }),
  P({ sku: "AF-ACT-01", oemNumber: "HN-AF-3321", name: "Air Filter — Activa", categoryId: "cat-engine", brand: "Honda", costPrice: 200, sellingPrice: 320, taxRate: 18, stock: 1, minimumStock: 5, reorderQuantity: 15, unit: "pc", supplierId: "sup-2", rack: "C", shelf: "04", bin: "02", compatibleVehicles: ["Honda Activa 6G"] }),
  P({ sku: "CL-CHN-100", oemNumber: "GEN-CL-100", name: "Chain Lubricant Spray", categoryId: "cat-consum", brand: "Generic", costPrice: 160, sellingPrice: 260, taxRate: 18, stock: 18, minimumStock: 8, reorderQuantity: 20, unit: "pc", supplierId: "sup-4", rack: "E", shelf: "01", bin: "03", compatibleVehicles: BIKES }),
  P({ sku: "BF-DOT4-500", oemNumber: "GEN-BF-500", name: "Brake Fluid DOT 4 500ml", categoryId: "cat-brakes", brand: "Generic", costPrice: 150, sellingPrice: 240, taxRate: 18, stock: 9, minimumStock: 6, reorderQuantity: 15, unit: "bottle", supplierId: "sup-1", rack: "B", shelf: "01", bin: "06", compatibleVehicles: BIKES }),
  P({ sku: "BAT-12V9AH", oemNumber: "AMR-BAT-129", name: "Battery 12V 9Ah", categoryId: "cat-elec", brand: "Amaron", costPrice: 1450, sellingPrice: 2100, taxRate: 18, stock: 5, minimumStock: 3, reorderQuantity: 8, unit: "pc", supplierId: "sup-6", rack: "F", shelf: "01", bin: "01", compatibleVehicles: BIKES.slice(3, 12) }),
  P({ sku: "HL-BULB-H4", oemNumber: "GEN-HL-H4", name: "Headlight Bulb H4", categoryId: "cat-elec", brand: "Generic", costPrice: 90, sellingPrice: 150, taxRate: 18, stock: 22, minimumStock: 10, reorderQuantity: 20, unit: "pc", supplierId: "sup-3", rack: "F", shelf: "02", bin: "04", compatibleVehicles: BIKES }),
  P({ sku: "FUSE-15A", oemNumber: "GEN-FS-15", name: "Fuse 15A (pack of 5)", categoryId: "cat-elec", brand: "Generic", costPrice: 30, sellingPrice: 60, taxRate: 18, stock: 40, minimumStock: 15, reorderQuantity: 30, unit: "pack", supplierId: "sup-3", rack: "F", shelf: "03", bin: "02", compatibleVehicles: BIKES }),
  P({ sku: "HRN-12V", oemNumber: "GEN-HRN-12", name: "Horn 12V Universal", categoryId: "cat-elec", brand: "Generic", costPrice: 180, sellingPrice: 300, taxRate: 18, stock: 7, minimumStock: 5, reorderQuantity: 10, unit: "pc", supplierId: "sup-3", rack: "F", shelf: "04", bin: "05", compatibleVehicles: BIKES }),
  P({ sku: "FO-FRK-STD", oemNumber: "GEN-FO-STD", name: "Fork Oil 10W Standard", categoryId: "cat-susp", brand: "Generic", costPrice: 220, sellingPrice: 340, taxRate: 18, stock: 6, minimumStock: 6, reorderQuantity: 12, unit: "litre", supplierId: "sup-4", rack: "G", shelf: "01", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "FSK-R15-V3", oemNumber: "YM-FSK-2201", name: "Fork Seal Kit — R15 V3", categoryId: "cat-susp", brand: "Yamaha", costPrice: 380, sellingPrice: 560, taxRate: 18, stock: 3, minimumStock: 4, reorderQuantity: 8, unit: "set", supplierId: "sup-2", rack: "G", shelf: "02", bin: "03", compatibleVehicles: ["Yamaha R15 V3", "Yamaha R15 V4"] }),
  P({ sku: "SA-PULS-NS", oemNumber: "BJ-SA-7712", name: "Shock Absorber — Pulsar NS200", categoryId: "cat-susp", brand: "Bajaj", costPrice: 1100, sellingPrice: 1650, taxRate: 18, stock: 2, minimumStock: 3, reorderQuantity: 6, unit: "pc", supplierId: "sup-5", rack: "G", shelf: "03", bin: "02", compatibleVehicles: ["Bajaj Pulsar NS200"] }),
  P({ sku: "TYR-F-90-90-17", oemNumber: "MRF-F9017", name: "Front Tyre 90/90-17", categoryId: "cat-tyres", brand: "MRF", costPrice: 1350, sellingPrice: 1900, taxRate: 18, stock: 8, minimumStock: 4, reorderQuantity: 8, unit: "pc", supplierId: "sup-1", rack: "H", shelf: "01", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "TYR-R-100-90-17", oemNumber: "MRF-R10017", name: "Rear Tyre 100/90-17", categoryId: "cat-tyres", brand: "MRF", costPrice: 1600, sellingPrice: 2250, taxRate: 18, stock: 6, minimumStock: 4, reorderQuantity: 8, unit: "pc", supplierId: "sup-1", rack: "H", shelf: "02", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "TUBE-STD-17", oemNumber: "GEN-TB-17", name: "Tube 17 inch Standard", categoryId: "cat-tyres", brand: "Generic", costPrice: 220, sellingPrice: 350, taxRate: 18, stock: 14, minimumStock: 8, reorderQuantity: 20, unit: "pc", supplierId: "sup-4", rack: "H", shelf: "03", bin: "02", compatibleVehicles: BIKES }),
  P({ sku: "GR-MULTI-100", oemNumber: "GEN-GR-100", name: "Multipurpose Grease 100g", categoryId: "cat-consum", brand: "Generic", costPrice: 60, sellingPrice: 110, taxRate: 18, stock: 30, minimumStock: 10, reorderQuantity: 20, unit: "pc", supplierId: "sup-6", rack: "E", shelf: "02", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "CLN-CONTACT-200", oemNumber: "GEN-CC-200", name: "Contact Cleaner Spray 200ml", categoryId: "cat-consum", brand: "Generic", costPrice: 130, sellingPrice: 210, taxRate: 18, stock: 11, minimumStock: 6, reorderQuantity: 15, unit: "pc", supplierId: "sup-6", rack: "E", shelf: "03", bin: "02", compatibleVehicles: BIKES }),
  P({ sku: "CP-PULS-150", oemNumber: "BJ-CP-4451", name: "Clutch Plate Set — Pulsar 150", categoryId: "cat-trans", brand: "Bajaj", costPrice: 780, sellingPrice: 1150, taxRate: 18, stock: 3, minimumStock: 3, reorderQuantity: 6, unit: "set", supplierId: "sup-5", rack: "D", shelf: "03", bin: "05", compatibleVehicles: ["Bajaj Pulsar 150"] }),
  P({ sku: "SPR-APACHE-160", oemNumber: "TVS-SPR-3301", name: "Sprocket Set — Apache RTR 160", categoryId: "cat-trans", brand: "TVS", costPrice: 650, sellingPrice: 980, taxRate: 18, stock: 4, minimumStock: 3, reorderQuantity: 6, unit: "set", supplierId: "sup-2", rack: "D", shelf: "04", bin: "01", compatibleVehicles: ["TVS Apache RTR 160"] }),
  P({ sku: "MIR-UNIV-STD", oemNumber: "GEN-MR-STD", name: "Mirror Set Universal", categoryId: "cat-acc", brand: "Generic", costPrice: 220, sellingPrice: 380, taxRate: 18, stock: 1, minimumStock: 4, reorderQuantity: 10, unit: "set", supplierId: "sup-3", rack: "J", shelf: "01", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "MHL-CLAMP", oemNumber: "GEN-MHL-01", name: "Mobile Holder Clamp Mount", categoryId: "cat-acc", brand: "Generic", costPrice: 140, sellingPrice: 250, taxRate: 18, stock: 9, minimumStock: 5, reorderQuantity: 10, unit: "pc", supplierId: "sup-3", rack: "J", shelf: "02", bin: "02", compatibleVehicles: BIKES }),
  P({ sku: "SC-CLASSIC-350", oemNumber: "RE-SC-1102", name: "Seat Cover — Classic 350", categoryId: "cat-acc", brand: "Royal Enfield", costPrice: 380, sellingPrice: 620, taxRate: 18, stock: 2, minimumStock: 3, reorderQuantity: 6, unit: "pc", supplierId: "sup-5", rack: "J", shelf: "03", bin: "01", compatibleVehicles: ["Royal Enfield Classic 350"] }),
  P({ sku: "CG-DUKE-200", oemNumber: "KTM-CG-2201", name: "Crash Guard — Duke 200", categoryId: "cat-acc", brand: "KTM", costPrice: 950, sellingPrice: 1450, taxRate: 18, stock: 0, minimumStock: 2, reorderQuantity: 5, unit: "pc", supplierId: "sup-2", rack: "J", shelf: "04", bin: "03", compatibleVehicles: ["KTM Duke 200"] }),
  P({ sku: "RLY-12V-STD", oemNumber: "GEN-RLY-12", name: "Relay 12V Standard", categoryId: "cat-elec", brand: "Generic", costPrice: 70, sellingPrice: 130, taxRate: 18, stock: 16, minimumStock: 8, reorderQuantity: 15, unit: "pc", supplierId: "sup-3", rack: "F", shelf: "05", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "BD-R15-F", oemNumber: "YM-BD-5541", name: "Brake Disc — R15 (Front)", categoryId: "cat-brakes", brand: "Yamaha", costPrice: 1250, sellingPrice: 1800, taxRate: 18, stock: 3, minimumStock: 2, reorderQuantity: 5, unit: "pc", supplierId: "sup-2", rack: "B", shelf: "02", bin: "07", compatibleVehicles: ["Yamaha R15 V3", "Yamaha R15 V4"] }),
  P({ sku: "GSK-TOPEND-RE", oemNumber: "RE-GSK-6612", name: "Top End Gasket Set — Classic 350", categoryId: "cat-engine", brand: "Royal Enfield", costPrice: 340, sellingPrice: 520, taxRate: 18, stock: 5, minimumStock: 4, reorderQuantity: 8, unit: "set", supplierId: "sup-5", rack: "C", shelf: "05", bin: "03", compatibleVehicles: ["Royal Enfield Classic 350", "Royal Enfield Bullet 350"] }),
  P({ sku: "COOL-1L-GEN", oemNumber: "GEN-COOL-1L", name: "Engine Coolant 1L", categoryId: "cat-consum", brand: "Generic", costPrice: 150, sellingPrice: 240, taxRate: 18, stock: 13, minimumStock: 8, reorderQuantity: 20, unit: "litre", supplierId: "sup-4", rack: "E", shelf: "04", bin: "01", compatibleVehicles: BIKES }),
  P({ sku: "BP-PULS-NS200-F", oemNumber: "BJ-BP-8834", name: "Front Brake Pad — Pulsar NS200", categoryId: "cat-brakes", brand: "Bajaj", costPrice: 640, sellingPrice: 920, taxRate: 18, stock: 7, minimumStock: 5, reorderQuantity: 10, unit: "set", supplierId: "sup-1", rack: "B", shelf: "04", bin: "09", compatibleVehicles: ["Bajaj Pulsar NS200"] }),
  P({ sku: "OF-ACT-6G", oemNumber: "HN-OF-1102", name: "Oil Filter — Activa 6G", categoryId: "cat-engine", brand: "Honda", costPrice: 120, sellingPrice: 200, taxRate: 18, stock: 2, minimumStock: 6, reorderQuantity: 15, unit: "pc", supplierId: "sup-6", rack: "C", shelf: "01", bin: "08", compatibleVehicles: ["Honda Activa 6G"] }),
  P({ sku: "CP-OLD-RX100", oemNumber: "YM-CP-1980", name: "Clutch Plate — RX100 (Legacy)", categoryId: "cat-trans", brand: "Yamaha", costPrice: 420, sellingPrice: 680, taxRate: 18, stock: 6, minimumStock: 2, reorderQuantity: 4, unit: "set", supplierId: "sup-2", rack: "D", shelf: "05", bin: "08", compatibleVehicles: ["Yamaha RX100"] }),
  P({ sku: "MIR-RARE-VESPA", oemNumber: "VSP-MR-3302", name: "Rare Mirror Set — Vintage Vespa", categoryId: "cat-acc", brand: "Vespa", costPrice: 480, sellingPrice: 780, taxRate: 18, stock: 4, minimumStock: 1, reorderQuantity: 2, unit: "set", supplierId: "sup-6", rack: "J", shelf: "05", bin: "04", compatibleVehicles: ["Vespa PX150"] }),
  P({ sku: "FRG-OLD-CD100", oemNumber: "HN-FRG-2201", name: "Old Fairing Panel — CD100", categoryId: "cat-acc", brand: "Hero", costPrice: 560, sellingPrice: 850, taxRate: 18, stock: 2, minimumStock: 1, reorderQuantity: 2, unit: "pc", supplierId: "sup-6", rack: "J", shelf: "06", bin: "01", compatibleVehicles: ["Hero CD100"] }),
];
