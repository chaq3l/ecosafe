/* Brand switcher — 3 warianty × 2 konteksty (ECOSAFE / Akademia)
   Wszystkie współdzielą design system z styles.css i akademia.css */

const LogoMark = ({ size = 30 }) => (
  <img src="assets/ecosafe-logo.png" alt="ECOSAFE" style={{ height: size, width: "auto", display: "block" }} />
);

const ChevDown = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
);

const Grid3 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>
);

const ArrowOut = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
);

/* ════════════════════════════════════════════════════════════════════
   WARIANT A — Pill switcher zintegrowany z logo w nawigacji
   ════════════════════════════════════════════════════════════════════ */
const NavA = ({ context }) => {
  const isAkademia = context === "akademia";
  return (
    <nav className={"sw-nav " + (isAkademia ? "sw-nav-akademia" : "sw-nav-ecosafe")}>
      <div className="sw-nav-inner">
        <div className="sw-brand-pill">
          <LogoMark size={32} />
          <div className="sw-pill-group" role="tablist" aria-label="Wybierz produkt ECOSAFE">
            <a className={"sw-pill " + (!isAkademia ? "active" : "")} href="#" role="tab" aria-selected={!isAkademia}>
              ECOSAFE
            </a>
            <a className={"sw-pill " + (isAkademia ? "active" : "")} href="#" role="tab" aria-selected={isAkademia}>
              Akademia
            </a>
          </div>
        </div>
        <div className="sw-nav-links">
          {(isAkademia
            ? ["Katalog", "Ścieżki", "Dla firm", "Cennik"]
            : ["BDO", "Doradztwo", "BHP", "Kontakt"]
          ).map((l, i) => (
            <a key={l} href="#" className={"sw-nav-link " + (i === 0 ? "active" : "")}>{l}</a>
          ))}
          <a href="#" className={"sw-btn " + (isAkademia ? "sw-btn-apricot" : "sw-btn-ink")}>
            {isAkademia ? "Zaloguj się" : "Zapytaj o ofertę"}
          </a>
        </div>
      </div>
    </nav>
  );
};

const HeroPreviewA = ({ context }) => {
  const isAkademia = context === "akademia";
  return (
    <div className="sw-hero-preview">
      <div className="sw-eyebrow" style={{ color: isAkademia ? "var(--apricot)" : "var(--ink-muted)" }}>
        {isAkademia ? "Kursy BHP online · 24/7" : "BHP · BDO · Ochrona środowiska"}
      </div>
      <h1 className="sw-hero-h">
        {isAkademia ? (
          <React.Fragment>Naucz się BHP <em>po swojemu.</em></React.Fragment>
        ) : (
          <React.Fragment>Bezpieczeństwo <em>na poważnie.</em></React.Fragment>
        )}
      </h1>
    </div>
  );
};

const VariantA = ({ context }) => (
  <div className={"sw-stage " + (context === "akademia" ? "ctx-akademia" : "ctx-ecosafe")}>
    <NavA context={context} />
    <HeroPreviewA context={context} />
  </div>
);

/* ════════════════════════════════════════════════════════════════════
   WARIANT B — Top utility bar nad główną nawigacją
   ════════════════════════════════════════════════════════════════════ */
const TopBarB = ({ context }) => {
  const isAkademia = context === "akademia";
  return (
    <div className={"sw-topbar " + (isAkademia ? "sw-topbar-akademia" : "sw-topbar-ecosafe")}>
      <div className="sw-topbar-inner">
        <span className="sw-topbar-label">Rodzina ECOSAFE</span>
        <div className="sw-topbar-tabs">
          <a href="#" className={"sw-topbar-tab " + (!isAkademia ? "active" : "")}>
            <span className="sw-topbar-dot" />
            <span>
              <strong>ECOSAFE</strong>
              <em>Usługi dla firm</em>
            </span>
          </a>
          <a href="#" className={"sw-topbar-tab " + (isAkademia ? "active" : "")}>
            <span className="sw-topbar-dot sw-topbar-dot-apricot" />
            <span>
              <strong>ECOSAFE Akademia</strong>
              <em>Kursy online</em>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const NavB = ({ context }) => {
  const isAkademia = context === "akademia";
  return (
    <nav className={"sw-nav " + (isAkademia ? "sw-nav-akademia" : "sw-nav-ecosafe")}>
      <div className="sw-nav-inner">
        <div className="sw-brand-simple">
          <LogoMark size={36} />
          {isAkademia && <span className="sw-brand-sublabel">Akademia</span>}
        </div>
        <div className="sw-nav-links">
          {(isAkademia
            ? ["Katalog", "Ścieżki", "Dla firm", "Cennik"]
            : ["BDO", "Doradztwo", "BHP", "Kontakt"]
          ).map((l, i) => (
            <a key={l} href="#" className={"sw-nav-link " + (i === 0 ? "active" : "")}>{l}</a>
          ))}
          <a href="#" className={"sw-btn " + (isAkademia ? "sw-btn-apricot" : "sw-btn-ink")}>
            {isAkademia ? "Zaloguj się" : "Zapytaj o ofertę"}
          </a>
        </div>
      </div>
    </nav>
  );
};

const VariantB = ({ context }) => (
  <div className={"sw-stage " + (context === "akademia" ? "ctx-akademia" : "ctx-ecosafe")}>
    <TopBarB context={context} />
    <NavB context={context} />
    <HeroPreviewA context={context} />
  </div>
);

/* ════════════════════════════════════════════════════════════════════
   WARIANT C — Brand + popover „app switcher" (jak Google apps)
   ════════════════════════════════════════════════════════════════════ */
const PopoverC = ({ context }) => {
  const isAkademia = context === "akademia";
  return (
    <div className="sw-popover">
      <div className="sw-popover-label">Przełącz produkt</div>
      <div className="sw-popover-grid">
        <a href="#" className={"sw-product-tile " + (!isAkademia ? "current" : "")}>
          <div className="sw-tile-mark sw-tile-mark-ecosafe">
            <LogoMark size={26} />
          </div>
          <div className="sw-tile-body">
            <div className="sw-tile-title">
              ECOSAFE
              {!isAkademia && <span className="sw-tile-current">tu jesteś</span>}
            </div>
            <div className="sw-tile-desc">Usługi BHP, BDO i ochrony środowiska dla firm</div>
          </div>
          {isAkademia && <ArrowOut size={14} />}
        </a>
        <a href="#" className={"sw-product-tile " + (isAkademia ? "current" : "")}>
          <div className="sw-tile-mark sw-tile-mark-akademia">
            <LogoMark size={26} />
          </div>
          <div className="sw-tile-body">
            <div className="sw-tile-title">
              ECOSAFE <em>Akademia</em>
              {isAkademia && <span className="sw-tile-current">tu jesteś</span>}
            </div>
            <div className="sw-tile-desc">Kursy BHP online — dla osób i firm</div>
          </div>
          {!isAkademia && <ArrowOut size={14} />}
        </a>
      </div>
    </div>
  );
};

const NavC = ({ context }) => {
  const isAkademia = context === "akademia";
  const [open, setOpen] = React.useState(true); // pokazane domyślnie żeby user zobaczył
  return (
    <nav className={"sw-nav " + (isAkademia ? "sw-nav-akademia" : "sw-nav-ecosafe")}>
      <div className="sw-nav-inner">
        <div className="sw-brand-c-wrap">
          <button className="sw-brand-c" onClick={() => setOpen(!open)} aria-expanded={open}>
            <span className="sw-brand-c-launcher"><Grid3 size={14} /></span>
            <LogoMark size={32} />
            <span className="sw-brand-c-name">
              ECOSAFE{isAkademia && <em> Akademia</em>}
            </span>
            <ChevDown size={11} />
          </button>
          {open && <PopoverC context={context} />}
        </div>
        <div className="sw-nav-links">
          {(isAkademia
            ? ["Katalog", "Ścieżki", "Dla firm", "Cennik"]
            : ["BDO", "Doradztwo", "BHP", "Kontakt"]
          ).map((l, i) => (
            <a key={l} href="#" className={"sw-nav-link " + (i === 0 ? "active" : "")}>{l}</a>
          ))}
          <a href="#" className={"sw-btn " + (isAkademia ? "sw-btn-apricot" : "sw-btn-ink")}>
            {isAkademia ? "Zaloguj się" : "Zapytaj o ofertę"}
          </a>
        </div>
      </div>
    </nav>
  );
};

const VariantC = ({ context }) => (
  <div className={"sw-stage " + (context === "akademia" ? "ctx-akademia" : "ctx-ecosafe")}>
    <NavC context={context} />
    <HeroPreviewA context={context} />
  </div>
);

window.VariantA = VariantA;
window.VariantB = VariantB;
window.VariantC = VariantC;
