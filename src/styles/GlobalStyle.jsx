import React from "react";

/* ============================== DESIGN TOKENS ============================== */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

    .grg {
      --bg: #14171A;
      --panel: #1C2024;
      --panel-alt: #22262B;
      --panel-hi: #2A2F35;
      --border: #2E3338;
      --border-lo: #24282D;
      --text: #ECE7DD;
      --text-mute: #9BA1A6;
      --text-dim: #656B70;
      --rust: #C4551C;
      --rust-hi: #DD6A2E;
      --amber: #E3A23C;
      --green: #4F9C6C;
      --red: #D1453D;
      --blue: #4C7EA8;
      --font-display: 'Oswald', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      width: 100%;
    }
    .grg * { box-sizing: border-box; }
    .grg ::selection { background: var(--rust); color: #fff; }
    .grg-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .grg-scroll::-webkit-scrollbar-track { background: transparent; }
    .grg-scroll::-webkit-scrollbar-thumb { background: var(--panel-hi); border-radius: 4px; }

    .f-disp { font-family: var(--font-display); letter-spacing: 0.02em; }
    .f-mono { font-family: var(--font-mono); }

    .btn {
      font-family: var(--font-body); font-weight: 600; font-size: 13px;
      padding: 9px 16px; border-radius: 3px; border: 1px solid transparent;
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
      transition: all .12s ease; white-space: nowrap;
    }
    .btn-primary { background: var(--rust); color: #fff; }
    .btn-primary:hover { background: var(--rust-hi); }
    .btn-ghost { background: transparent; color: var(--text-mute); border-color: var(--border); }
    .btn-ghost:hover { color: var(--text); border-color: var(--text-dim); }
    .btn-panel { background: var(--panel-hi); color: var(--text); }
    .btn-panel:hover { background: #333940; }
    .btn-danger { background: transparent; color: var(--red); border-color: rgba(209,69,61,0.4); }
    .btn-danger:hover { background: rgba(209,69,61,0.1); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .btn-sm { padding: 5px 10px; font-size: 12px; }

    .card { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; }
    .input {
      background: var(--panel-alt); border: 1px solid var(--border); color: var(--text);
      border-radius: 3px; padding: 8px 10px; font-size: 13px; font-family: var(--font-body);
      outline: none; width: 100%;
    }
    .input:focus { border-color: var(--rust); }
    .input::placeholder { color: var(--text-dim); }

    .badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600;
      padding: 3px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-healthy { background: rgba(79,156,108,0.15); color: var(--green); }
    .badge-low { background: rgba(227,162,60,0.15); color: var(--amber); }
    .badge-out { background: rgba(209,69,61,0.15); color: var(--red); }
    .badge-neutral { background: var(--panel-hi); color: var(--text-mute); }
    .badge-blue { background: rgba(76,126,168,0.15); color: var(--blue); }

    .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }

    /* physical parts-bin tag */
    .bin-tag {
      display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono);
      font-size: 11.5px; color: var(--text-mute); background: var(--panel-alt);
      border: 1px dashed var(--border); border-radius: 3px; padding: 4px 9px 4px 6px;
      position: relative;
    }
    .bin-tag::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--bg);
      border: 1px solid var(--border); flex-shrink: 0;
    }

    .row-hover:hover { background: var(--panel-alt); }
    table.grg-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    table.grg-table th { text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em;
      color: var(--text-dim); font-weight: 600; padding: 10px 14px; border-bottom: 1px solid var(--border); white-space: nowrap; }
    table.grg-table td { padding: 11px 14px; border-bottom: 1px solid var(--border-lo); vertical-align: middle; }
    table.grg-table tr:last-child td { border-bottom: none; }

    .kpi-num { font-family: var(--font-display); font-size: 30px; font-weight: 600; line-height: 1; }

    @keyframes toastIn { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform:translateY(0);} }
    .toast-anim { animation: toastIn .18s ease; }

    .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border-radius: 4px;
      color: var(--text-mute); font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .12s; }
    .nav-item:hover { background: var(--panel-alt); color: var(--text); }
    .nav-item.active { background: var(--panel-alt); color: var(--text); border-left: 2px solid var(--rust); }

    .gauge-track { stroke: var(--panel-hi); }

    /* ============================== LAYOUT ============================== */
    .sidebar {
      width: 224px; flex-shrink: 0; overflow: hidden; background: var(--panel);
      border-right: 1px solid var(--border); transition: width .15s;
    }
    .sidebar.closed { width: 0; }
    .sidebar-backdrop { display: none; }

    .topbar {
      display: flex; align-items: center; gap: 14px; padding: 12px 20px;
      border-bottom: 1px solid var(--border); background: var(--panel); position: relative;
    }
    .topbar-search { flex: 1; max-width: 420px; position: relative; }
    .topbar-spacer { flex: 1; }
    .page-body { flex: 1; overflow-y: auto; padding: 24px; }

    /* Grid tracks collapse to a single column as the viewport narrows. */
    .grid-aside { display: grid; grid-template-columns: 260px 1fr; gap: 16px; }
    .grid-pos { display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

    @media (max-width: 1000px) {
      .grid-aside, .grid-pos, .grid-3 { grid-template-columns: 1fr; }

      /* Grid children default to min-width:auto, which would stretch a track to
         its table's intrinsic width instead of letting the table scroll. */
      .grid-aside > *, .grid-pos > *, .grid-2 > *, .grid-3 > * { min-width: 0; }

      /* Wide tables scroll inside their card rather than stretching the page. */
      table.grg-table { display: block; overflow-x: auto; }
      table.grg-table td { white-space: nowrap; }
    }

    @media (max-width: 760px) {
      .grid-2, .grid-form { grid-template-columns: 1fr; }

      /* Off-canvas sidebar: slides over the content instead of squeezing it. */
      .sidebar {
        position: fixed; top: 0; left: 0; bottom: 0; width: 224px; z-index: 140;
        transform: translateX(0); transition: transform .18s;
      }
      .sidebar.closed { width: 224px; transform: translateX(-100%); }
      .sidebar-backdrop { display: block; position: fixed; inset: 0; background: rgba(10,11,12,0.6); z-index: 130; }

      .topbar { padding: 10px 12px; gap: 10px; }
      .topbar-search { max-width: none; }
      .topbar-spacer { display: none; }
      .btn-label-wide { display: none; }
      .page-body { padding: 14px; }
      .kpi-num { font-size: 24px; }
    }

    @media (max-width: 420px) {
      .page-body { padding: 10px; }
      .bin-tag { font-size: 10.5px; padding: 3px 7px 3px 5px; }
    }
  `}</style>
);

export default GlobalStyle;
