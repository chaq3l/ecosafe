/* ════════════════════════════════════════════════════════════
   OfferMenu — rozwijalna „Oferta" w nawigacji ECOSAFE
   3 grupy: Środowisko · BHP · Doskonalenie zawodowe
   ════════════════════════════════════════════════════════════ */

const OM_Chev = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const OfferMenu = ({ route, setRoute, lang }) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const t = window.COPY[lang].pillars;

  const firmRoutes = (t.firm_items || []).map(i => i.route);
  const proRoutes = (t.pro_items || []).map(i => i.route);
  const allRoutes = [...firmRoutes, ...proRoutes];
  const isActive = allRoutes.includes(route);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (item) => {
    setOpen(false);
    setRoute(item.route);
    if (item.anchor) {
      setTimeout(() => {
        const el = document.getElementById(item.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // Podział firm_items na środowisko (bez "bhp") + bhp
  const osItems = (t.firm_items || []).filter(i => i.route !== "bhp");
  const bhpItems = (t.firm_items || []).filter(i => i.route === "bhp");
  const proItems = t.pro_items || [];

  const L = {
    pl: {
      label: "Oferta",
      os: "Środowisko",
      bhp: "BHP",
      pro: "Doskonalenie zawodowe",
      pro_sub: "Akademia Pro",
      soon: "Wkrótce",
    },
    en: {
      label: "Offer",
      os: "Environment",
      bhp: "Safety",
      pro: "Pro development",
      pro_sub: "Academy Pro",
      soon: "Soon",
    },
  }[lang] || { label: "Oferta", os: "Środowisko", bhp: "BHP", pro: "Doskonalenie zawodowe", pro_sub: "Akademia Pro", soon: "Wkrótce" };

  const Group = ({ title, sub, items, accent }) => (
    <div className="om-group">
      <div className="om-group-head">
        <span className="om-group-title">{title}</span>
        {sub && <span className="om-group-sub">· {sub}</span>}
      </div>
      <div className="om-group-items">
        {items.map((it) => (
          <button
            key={it.route + (it.anchor || "")}
            className={"om-item " + (accent || "")}
            onClick={() => go(it)}
            role="menuitem"
          >
            <span className="om-item-n">{it.n}</span>
            <span className="om-item-body">
              <span className="om-item-title">
                {it.title}
                {it.coming_soon && <span className="om-item-soon">{L.soon}</span>}
              </span>
              <span className="om-item-tag">{it.tag}</span>
            </span>
            <svg className="om-item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="om-wrap" ref={wrapRef}>
      <button
        type="button"
        className={"nav-link om-trigger " + (open ? "open " : "") + (isActive ? "active" : "")}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {L.label}
        <span className="om-chev"><OM_Chev/></span>
      </button>
      {open && (
        <div className="om-popover" role="menu">
          <Group title={L.os} items={osItems} />
          <Group title={L.bhp} items={bhpItems} />
          <Group title={L.pro} sub={L.pro_sub} items={proItems} accent="om-item-pro" />
        </div>
      )}
    </div>
  );
};

window.OfferMenu = OfferMenu;
