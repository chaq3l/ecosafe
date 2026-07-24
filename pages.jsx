// BDO, Doradztwo, BHP, Kontakt pages

const PageHeader = ({ eyebrow, pre, em, lead }) => (
  <section style={{ paddingTop: 80, paddingBottom: 40, borderBottom: "1px solid var(--line)" }}>
    <div className="container-wide">
      <div className="eyebrow" style={{ marginBottom: 24 }}>{eyebrow}</div>
      <h1 className="display" style={{ marginBottom: 32 }}>
        {pre} <em>{em}</em>
      </h1>
      <p className="lead" style={{ maxWidth: 720 }}>{lead}</p>
    </div>
  </section>
);

const ScopeGrid = ({ title, items, ctaLabel, onCta }) => (
  <section>
    <div className="container-wide">
      <h2 className="h2" style={{ marginBottom: 48 }}>{title}</h2>
      <div className="grid grid-2">
        {items.map((it, i) => (
          <div key={i} style={{ padding: "32px 0", borderTop: "1px solid var(--line-strong)" }}>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--sage)", paddingTop: 4 }}>{String(i+1).padStart(2,'0')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
                  <h3 className="h3" style={{ margin: 0 }}>{it.t}</h3>
                  {it.price && <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink)", background: "var(--leaf-soft)", padding: "4px 12px", borderRadius: 999 }}>{it.price}</div>}
                </div>
                <p style={{ color: "var(--ink-muted)", margin: 0 }}>{it.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {ctaLabel && (
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--line-strong)", display: "flex", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={onCta}>{ctaLabel} <Arrow /></button>
        </div>
      )}
    </div>
  </section>
);

const BDOPage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].bdo;
  const ctaLabel = window.COPY[lang].cta.button;
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <ScopeGrid title={t.scope_title} items={t.scope} ctaLabel={ctaLabel} onCta={() => setRoute("kontakt")} />
      <section style={{ background: "var(--cream)" }}>
        <div className="container-wide">
          <h2 className="h2" style={{ marginBottom: 56 }}>{t.timeline_title}</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 120, top: 0, bottom: 0, width: 1, background: "var(--line-strong)" }}/>
            {t.timeline.map((ev, i) => {
              const colors = { Start: "var(--ink-muted)", Deadline: "#A8442E", Opłaty: "var(--sage)", Kontrole: "var(--ink)", Domknięcie: "var(--sage-deep)", Fees: "var(--sage)", Audits: "var(--ink)", "Wrap-up": "var(--sage-deep)" };
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 40px 1fr", alignItems: "start", padding: "28px 0", borderBottom: i < t.timeline.length-1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "var(--ink-muted)", paddingTop: 8 }}>{ev.m}</div>
                  <div style={{ position: "relative", paddingTop: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: colors[ev.tag] || "var(--ink)", position: "relative", zIndex: 1, marginLeft: -6 }}/>
                  </div>
                  <div>
                    <div style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: colors[ev.tag] || "var(--ink)", marginBottom: 10 }}>{ev.tag}</div>
                    <div style={{ fontSize: 18, lineHeight: 1.4 }}>{ev.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CTABig lang={lang} setRoute={setRoute} />
    </div>
  );
};

const DoradztwoPage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].doradztwo;
  const ctaLabel = window.COPY[lang].cta.button;
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <ScopeGrid title={t.scope_title} items={t.scope} ctaLabel={ctaLabel} onCta={() => setRoute("kontakt")} />
      <CTABig lang={lang} setRoute={setRoute} />
    </div>
  );
};

const BHPPage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].bhpPage;
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />

      {/* ═══════ SEKCJA 1: Kursy online (→ Akademia) ═══════ */}
      <section id="kursy-online" className="bhp-online-section">
        <div className="container-wide">
          <div className="bhp-section-head">
            <div>
              <div className="eyebrow bhp-online-eyebrow">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                {t.online_eyebrow}
              </div>
              <h2 className="h2" style={{ margin: "16px 0 12px" }}>{t.online_title}</h2>
            </div>
            <p className="lead" style={{ alignSelf: "end", margin: 0 }}>{t.online_sub}</p>
          </div>

          {/* Subsekcja A: Obowiązkowe */}
          <div className="bhp-subsection-head">
            <div className="bhp-track-pill bhp-track-required">{t.required_eyebrow}</div>
            <h3 className="h2 bhp-subsection-title">{t.required_title}</h3>
            <p className="bhp-subsection-sub">{t.required_sub}</p>
          </div>

          <div className="grid grid-3 bhp-course-grid">
            {t.online_required.map((c, i) => (
              <a key={c.id || i} className="bhp-course-card" href={"akademia.html#course=" + (c.id || "")}>
                <div className="bhp-course-head">
                  <div className="bhp-course-n">{String(i+1).padStart(2,'0')}</div>
                  {c.tag && <div className="bhp-course-tag">{c.tag}</div>}
                </div>
                <h3 className="h3 bhp-course-title">{c.t}</h3>
                <p className="bhp-course-desc">{c.desc}</p>
                <div className="bhp-course-meta">
                  <span className="bhp-course-len">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {c.len}
                  </span>
                  <span className="bhp-course-price">{c.price}</span>
                </div>
                <div className="bhp-course-cta">
                  <span>{t.online_cta}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </a>
            ))}
          </div>

          {/* Subsekcja B: Rozwojowe Pro */}
          <div className="bhp-pro-block">
            <div className="bhp-subsection-head bhp-pro-head">
              <div className="bhp-track-pill bhp-track-pro">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
                {t.pro_eyebrow}
              </div>
              <h3 className="h2 bhp-subsection-title bhp-pro-title">{t.pro_title}</h3>
              <p className="bhp-subsection-sub bhp-pro-sub">{t.pro_sub}</p>
            </div>

            <div className="grid grid-3 bhp-course-grid bhp-pro-grid">
              {t.online_pro.map((c, i) => (
                <a key={c.id || i} className="bhp-course-card bhp-course-card-pro" href={"akademia.html#course=" + (c.id || "")}>
                  <div className="bhp-course-head">
                    <div className="bhp-course-n bhp-course-n-pro">{String(i+1).padStart(2,'0')}</div>
                    <div className="bhp-course-tag bhp-course-tag-pro">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
                      Pro
                    </div>
                  </div>
                  <h3 className="h3 bhp-course-title bhp-course-title-pro">{c.t}</h3>
                  <p className="bhp-course-desc bhp-course-desc-pro">{c.desc}</p>
                  <div className="bhp-course-meta bhp-course-meta-pro">
                    <span className="bhp-course-len bhp-course-len-pro">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {c.len}
                    </span>
                    <span className="bhp-course-price bhp-course-price-pro">{c.price}</span>
                  </div>
                  <div className="bhp-course-cta bhp-course-cta-pro">
                    <span>{t.pro_cta}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bhp-online-foot">
            <a href="akademia.html" className="btn btn-apricot">
              {t.online_all_cta}
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ SEKCJA 2: Usługi w firmie ═══════ */}
      <section id="obsluga" className="bhp-onsite-section">
        <div className="container-wide">
          <div className="bhp-section-head">
            <div>
              <div className="eyebrow" style={{ color: "var(--sage)" }}>{t.onsite_eyebrow}</div>
              <h2 className="h2" style={{ margin: "16px 0 12px" }}>{t.onsite_title}</h2>
            </div>
            <p className="lead" style={{ alignSelf: "end", margin: 0 }}>{t.onsite_sub}</p>
          </div>

          <div className="grid grid-3 bhp-service-grid">
            {t.onsite_services.map((s, i) => (
              <div key={i} className="bhp-service-card">
                <div className="bhp-service-n">{String(i+1).padStart(2,'0')}</div>
                <h3 className="h3" style={{ margin: "8px 0 12px" }}>{s.t}</h3>
                <p style={{ color: "var(--ink-muted)", margin: "0 0 20px", flex: 1 }}>{s.desc}</p>
                <div className="bhp-service-meta">
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-muted)", letterSpacing: "0.08em" }}>{s.len}</span>
                  <button className="btn btn-outline" onClick={() => setRoute("kontakt")}>
                    {t.onsite_cta} <Arrow />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Jak działa kurs online ═══════ */}
      <section style={{ background: "var(--cream)" }}>
        <div className="container-wide">
          <h2 className="h2" style={{ marginBottom: 56 }}>{t.how_title}</h2>
          <div className="grid grid-4">
            {t.how.map((s, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--line-strong)", paddingTop: 20 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--apricot)", marginBottom: 14 }}>{s.n}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "0 0 10px", lineHeight: 1.1 }}>{s.t}</h3>
                <p style={{ color: "var(--ink-muted)", margin: 0, fontSize: 15 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABig lang={lang} setRoute={setRoute} />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   AKADEMIA — wspólny komponent dla stron BHP Pro i OŚ Pro
   ════════════════════════════════════════════════════════════ */
const AkademiaProPage = ({ lang, setRoute, track }) => {
  // track: "bhp" | "os"
  const data = track === "os" ? window.COPY[lang].akademiaOs : window.COPY[lang].akademiaBhp;
  const themeClass = track === "os" ? "akademia-os" : "akademia-bhp";
  const accentColor = track === "os" ? "var(--os-pro-accent)" : "var(--pro-accent)";
  const featureIcons = [
    // Webinary
    (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>),
    // Społeczność
    (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    // Biblioteka
    (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>),
    // Certyfikat
    (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><polyline points="9 14 9 22 12 19 15 22 15 14"/></svg>),
  ];

  return (
    <div className={"akademia-page " + themeClass}>
      <section className="akademia-hero">
        <div className="container-wide akademia-hero-inner">
          <div className="akademia-hero-body">
            <div className="eyebrow akademia-eyebrow">{data.eyebrow}</div>
            <h1 className="h-display akademia-hero-title">
              {data.title_pre} <em>{data.title_em}</em>
            </h1>
            <p className="lead akademia-hero-lead">{data.lead}</p>
            {data.coming_soon_label && (
              <div className="akademia-soon-pill">
                <span className="akademia-soon-dot"></span>
                {data.coming_soon_label}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Część 1: Kursy */}
      <section className="akademia-courses-section">
        <div className="container-wide">
          <div className="bhp-section-head">
            <div>
              <div className="eyebrow akademia-section-eyebrow">{data.courses_eyebrow}</div>
              <h2 className="h2 akademia-section-title">{data.courses_title}</h2>
            </div>
            <p className="lead akademia-section-sub">{data.courses_sub}</p>
          </div>

          <div className="grid grid-3 bhp-course-grid akademia-course-grid">
            {data.courses.map((c, i) => (
              <a key={c.id || i} className="bhp-course-card bhp-course-card-pro akademia-course-card" href={"akademia.html#course=" + (c.id || "")}>
                <div className="bhp-course-head">
                  <div className="bhp-course-n bhp-course-n-pro">{String(i+1).padStart(2,'0')}</div>
                  {track === "os" && <div className="bhp-course-tag bhp-course-tag-os">Wkrótce</div>}
                </div>
                <h3 className="h3 bhp-course-title bhp-course-title-pro">{c.t}</h3>
                <p className="bhp-course-desc bhp-course-desc-pro">{c.desc}</p>
                <div className="bhp-course-meta bhp-course-meta-pro">
                  <span className="bhp-course-len bhp-course-len-pro">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {c.len}
                  </span>
                  <span className="bhp-course-price bhp-course-price-pro">{c.price}</span>
                </div>
                <div className="bhp-course-cta bhp-course-cta-pro">
                  <span>{data.cta}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </a>
            ))}
          </div>

          <div className="akademia-courses-foot">
            <a href={track === "os" ? "#kontakt" : "akademia.html"} className="btn akademia-cta-btn"
               onClick={(e) => { if (track === "os") { e.preventDefault(); setRoute("kontakt"); } }}>
              {data.all_cta}
              <span className="arrow" aria-hidden="true">{track === "os" ? "→" : "↗"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Część 2: Features */}
      <section className="akademia-features-section">
        <div className="container-wide">
          <div className="bhp-section-head">
            <div>
              <div className="eyebrow akademia-section-eyebrow">{data.features_eyebrow}</div>
              <h2 className="h2 akademia-section-title">{data.features_title}</h2>
            </div>
            <p className="lead akademia-section-sub">{data.features_sub}</p>
          </div>

          <div className="grid grid-4 akademia-features-grid">
            {data.features.map((f, i) => (
              <div key={i} className="akademia-feature">
                <div className="akademia-feature-icon" style={{ color: accentColor }}>{featureIcons[i] || featureIcons[0]}</div>
                <h3 className="akademia-feature-title">{f.t}</h3>
                <p className="akademia-feature-desc">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABig lang={lang} setRoute={setRoute} />
    </div>
  );
};

const AkademiaBHPPage = (props) => <AkademiaProPage {...props} track="bhp" />;
const AkademiaOSPage = (props) => <AkademiaProPage {...props} track="os" />;

const OMniePage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].about;
  return (
    <div>
      <section style={{ paddingTop: "clamp(48px, 6vw, 88px)", paddingBottom: "clamp(20px, 3vw, 40px)" }}>
        <div className="container-wide">
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t.eyebrow}</div>
          <h1 className="h-display" style={{ margin: "0 0 12px" }}>
            {t.name}
          </h1>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 26, color: "var(--sage)" }}>{t.role}</div>
        </div>
      </section>
      <About lang={lang}/>
      <Testimonials lang={lang}/>
      <CTABig lang={lang} setRoute={setRoute}/>
    </div>
  );
};

const ContactPage = ({ lang }) => {
  const [values, setValues] = React.useState({ name: "", email: "", company: "", topic: t.form_topic_opts[0], message: "" });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = t.errors.name;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = t.errors.email;
    if (values.message.trim().length < 8) e.message = t.errors.message;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = (k, v) => { setValues({...values, [k]: v}); if (errors[k]) setErrors({...errors, [k]: undefined}); };

  const submit = (e) => { e.preventDefault(); if (validate()) setSubmitted(true); };

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <section>
        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 72, alignItems: "start" }}>
            <div>
              {t.contact_blocks.map((b, i) => (
                <div key={i} style={{ padding: "20px 0", borderTop: i===0?"1px solid var(--line-strong)":"1px solid var(--line)" }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>{b.t}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 24 }}>{b.v}</div>
                </div>
              ))}
              <div style={{ padding: "20px 0", borderTop: "1px solid var(--line)" }} />
              <Placeholder label={lang==='pl'?'Biuro — placeholder':'Office — placeholder'} style={{ aspectRatio: "4/3", height: "auto", marginTop: 20 }}>
                <img src="assets/contact-illustration.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </Placeholder>
            </div>
            <div className="card" style={{ padding: 40 }}>
              {submitted ? (
                <div style={{ padding: "40px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✻</div>
                  <h3 className="h2" style={{ margin: "0 0 12px" }}>{lang==='pl'?'Dzięki!':'Thanks!'}</h3>
                  <p style={{ color: "var(--ink-muted)" }}>{t.form_success}</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div className={"field " + (errors.name?"invalid":"")}>
                      <label>{t.form_name}</label>
                      <input value={values.name} onChange={(e)=>handle('name', e.target.value)} />
                      {errors.name && <div className="err">{errors.name}</div>}
                    </div>
                    <div className={"field " + (errors.email?"invalid":"")}>
                      <label>{t.form_email}</label>
                      <input type="email" value={values.email} onChange={(e)=>handle('email', e.target.value)} />
                      {errors.email && <div className="err">{errors.email}</div>}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div className="field">
                      <label>{t.form_company}</label>
                      <input value={values.company} onChange={(e)=>handle('company', e.target.value)} />
                    </div>
                    <div className="field">
                      <label>{t.form_topic}</label>
                      <select value={values.topic} onChange={(e)=>handle('topic', e.target.value)}>
                        {t.form_topic_opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className={"field " + (errors.message?"invalid":"")} style={{ marginBottom: 24 }}>
                    <label>{t.form_message}</label>
                    <textarea rows={6} value={values.message} onChange={(e)=>handle('message', e.target.value)} />
                    {errors.message && <div className="err">{errors.message}</div>}
                  </div>
                  <button className="btn btn-primary" type="submit">{t.form_submit} <Arrow /></button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { BDOPage, DoradztwoPage, BHPPage, AkademiaBHPPage, AkademiaOSPage, OMniePage, ContactPage });
