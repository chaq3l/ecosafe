// Shared primitives

const Arrow = ({ dir = "right" }) =>
<span className="arrow" aria-hidden>
    {dir === "right" ? "→" : dir === "down" ? "↓" : "←"}
  </span>;


const Logo = () =>
<div className="logo" style={{ gap: 0 }}>
    <img src="assets/logo.png" alt="ECOSAFE" style={{ display: "block", height: "36px", width: "auto", objectFit: "cover" }} />
  </div>;


const LangToggle = ({ lang, onChange }) =>
<div className="lang-toggle" role="group" aria-label="Language">
    <button className={"lang-btn " + (lang === "pl" ? "active" : "")} onClick={() => onChange("pl")}>PL</button>
    <button className={"lang-btn " + (lang === "en" ? "active" : "")} onClick={() => onChange("en")}>EN</button>
  </div>;


const Nav = ({ route, setRoute, lang, setLang }) => {
  const t = window.COPY[lang].nav;
  const items = [
  ["home", t.home],
  ["bdo", t.bdo],
  ["doradztwo", t.doradztwo],
  ["bhp", t.bhp],
  ["kontakt", t.kontakt]];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" onClick={(e) => {e.preventDefault();setRoute("home");}}>
          <Logo />
        </a>
        <div className="nav-links">
          {items.map(([k, v]) =>
          <a key={k} href={"#" + k}
          onClick={(e) => {e.preventDefault();setRoute(k);}}
          className={"nav-link " + (route === k ? "active" : "")}>{v}</a>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 10, paddingLeft: 14, borderLeft: "1px solid var(--line)" }}>
            <a href="tel:+48791045130" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: 12.5, letterSpacing: "0.02em" }} aria-label="Zadzwoń">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +48 791 045 130
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ padding: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.5l.5-3h-3V9c0-.9.3-1.5 1.6-1.5H17V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.8v7h2.7z" /></svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ padding: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v13H.22V8zm7.4 0h4.37v1.78h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v6.59h-4.56v-5.84c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.24 1.52-2.24 3.08V21H7.62V8z" /></svg>
            </a>
          </div>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
      </div>
    </nav>);

};

const Marquee = ({ items }) => {
  const all = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((s, i) => <div key={i} className="marquee-item">{s}</div>)}
      </div>
    </div>);

};

const Placeholder = ({ label, variant, style, children }) =>
<div className={"ph " + (variant === "light" ? "ph-light" : "")} style={style}>
    {label && <div className="ph-label">{label}</div>}
    {children}
  </div>;


const Footer = ({ lang, setRoute }) => {
  const t = window.COPY[lang];
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "72px 0 40px", background: "var(--bg-soft)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <Logo />
          <p style={{ marginTop: 16, color: "var(--ink-muted)", maxWidth: 340 }}>
            {t.footer.tag}
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{t.nav.home}</div>
          {["home", "bdo", "doradztwo", "bhp", "kontakt"].map((k) =>
          <div key={k} style={{ marginBottom: 8 }}>
              <a href={"#" + k} onClick={(e) => {e.preventDefault();setRoute(k);}} style={{ color: "var(--ink-soft)" }}>{t.nav[k]}</a>
            </div>
          )}
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Kontakt</div>
          <div style={{ color: "var(--ink-soft)", lineHeight: 1.9 }}>
            kontakt@ecosafe.com.pl<br />+48 791 045 130<br />Pn–Pt · 9–17
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Socials</div>
          <div style={{ color: "var(--ink-soft)", lineHeight: 1.9 }}>
            Facebook<br />LinkedIn<br />Newsletter
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 64, display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-muted)", letterSpacing: "0.08em" }}>
        <span>{t.footer.rights}</span>
        <span>MADE WITH CARE · KRAKÓW</span>
      </div>
    </footer>);

};

Object.assign(window, { Arrow, Logo, LangToggle, Nav, Marquee, Placeholder, Footer });