/* ════════════════════════════════════════════════════════════════════
   BrandSwitcher — przełącznik produktów ECOSAFE ↔ Akademia
   Współdzielony między ecosafe.pl (index.html) a akademia.ecosafe.pl
   ════════════════════════════════════════════════════════════════════ */

const BS_Grid = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
    <circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
  </svg>
);
const BS_Chev = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const BS_ArrowOut = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const BrandSwitcherPopover = ({ current, onClose }) => {
  const onEcosafe = current === "ecosafe";
  return (
    <div className="bs-popover" role="menu" aria-label="Przełącz produkt">
      <div className="bs-popover-label">Rodzina ECOSAFE</div>
      <div className="bs-popover-grid">
        <a
          href="index.html"
          className={"bs-product-tile " + (onEcosafe ? "current" : "")}
          aria-current={onEcosafe ? "page" : undefined}
          onClick={onEcosafe ? (e) => { e.preventDefault(); onClose(); } : undefined}
          role="menuitem"
        >
          <div className="bs-tile-mark bs-tile-mark-ecosafe">
            <img src="assets/ecosafe-logo.png" alt=""/>
          </div>
          <div className="bs-tile-body">
            <div className="bs-tile-title">
              <span>ECOSAFE</span>
              {onEcosafe && <span className="bs-tile-current">tu jesteś</span>}
            </div>
            <div className="bs-tile-desc">Usługi BHP, BDO i ochrony środowiska — dla firm</div>
          </div>
          {!onEcosafe && <span className="bs-tile-arrow"><BS_ArrowOut size={14}/></span>}
        </a>
        <a
          href="akademia.html"
          className={"bs-product-tile " + (!onEcosafe ? "current" : "")}
          aria-current={!onEcosafe ? "page" : undefined}
          onClick={!onEcosafe ? (e) => { e.preventDefault(); onClose(); } : undefined}
          role="menuitem"
        >
          <div className="bs-tile-mark bs-tile-mark-akademia">
            <img src="assets/ecosafe-logo.png" alt=""/>
          </div>
          <div className="bs-tile-body">
            <div className="bs-tile-title">
              <span>ECOSAFE <em>Akademia</em></span>
              {!onEcosafe && <span className="bs-tile-current">tu jesteś</span>}
            </div>
            <div className="bs-tile-desc">Kursy BHP online — dla osób indywidualnych i firm</div>
          </div>
          {onEcosafe && <span className="bs-tile-arrow"><BS_ArrowOut size={14}/></span>}
        </a>
      </div>
    </div>
  );
};

/* Public component.
   Props:
     current: "ecosafe" | "akademia" — which product user is currently on
     variant: "default" | "compact" — visual size (default for main nav, compact for akademia)
*/
const BrandSwitcher = ({ current = "ecosafe", variant = "default" }) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

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

  const onAkademia = current === "akademia";
  const otherLabel = onAkademia ? "ecosafe.pl" : "Akademia";

  return (
    <div className={"bs-wrap bs-" + variant + " " + (onAkademia ? "bs-on-akademia" : "bs-on-ecosafe")} ref={wrapRef}>
      <button
        type="button"
        className={"bs-trigger " + (open ? "open" : "")}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={"Przełącz produkt. Obecnie: " + (onAkademia ? "Akademia" : "ECOSAFE")}
      >
        <span className="bs-launcher"><BS_Grid size={13}/></span>
        <span className="bs-trigger-label">
          <span className="bs-trigger-other">{otherLabel}</span>
          <span className="bs-trigger-hint">przełącz</span>
        </span>
        <span className="bs-chev"><BS_Chev size={10}/></span>
      </button>
      {open && <BrandSwitcherPopover current={current} onClose={() => setOpen(false)}/>}
    </div>
  );
};

window.BrandSwitcher = BrandSwitcher;
