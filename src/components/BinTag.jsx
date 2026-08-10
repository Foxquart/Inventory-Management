import React from "react";
import { MapPin } from "lucide-react";

export default function BinTag({ rack, shelf, bin }) {
  return <span className="bin-tag"><MapPin size={11} />Rack {rack} / Shelf {shelf} / Bin {bin}</span>;
}
