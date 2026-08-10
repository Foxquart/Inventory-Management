"use client";

import dynamic from "next/dynamic";

// The demo seeds its ledger from Date.now() at state-init, so server-rendered
// timestamps would not match the client's. Render the SPA on the client only.
const App = dynamic(() => import("../App"), { ssr: false });

export default function Page() {
  return <App />;
}
