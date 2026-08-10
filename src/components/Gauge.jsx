import React from "react";

export default function Gauge({ healthy, low, out }) {
  const total = healthy + low + out || 1;
  const r = 54, c = 2 * Math.PI * r;
  const segs = [
    { v: healthy, color: "var(--green)" },
    { v: low, color: "var(--amber)" },
    { v: out, color: "var(--red)" },
  ];
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" width={140} height={140}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--panel-hi)" strokeWidth="14" />
      {segs.map((s, i) => {
        const len = (s.v / total) * c;
        const el = (
          <circle key={i} cx="70" cy="70" r={r} fill="none" stroke={s.color} strokeWidth="14"
            strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} transform="rotate(-90 70 70)" strokeLinecap="butt" />
        );
        offset += len;
        return el;
      })}
      <text x="70" y="66" textAnchor="middle" fontFamily="Oswald" fontSize="26" fill="var(--text)" fontWeight="600">{total}</text>
      <text x="70" y="84" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="var(--text-dim)" letterSpacing="1">SKUs</text>
    </svg>
  );
}
