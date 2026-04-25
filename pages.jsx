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

const ScopeGrid = ({ title, items }) => (
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
    </div>
  </section>
);

const BDOPage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].bdo;
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <ScopeGrid title={t.scope_title} items={t.scope} />
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
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <ScopeGrid title={t.scope_title} items={t.scope} />
      <CTABig lang={lang} setRoute={setRoute} />
    </div>
  );
};

const BHPPage = ({ lang, setRoute }) => {
  const t = window.COPY[lang].bhpPage;
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} pre={t.title_pre} em={t.title_em} lead={t.lead} />
      <section>
        <div className="container-wide">
          <h2 className="h2" style={{ marginBottom: 48 }}>{t.courses_title}</h2>
          <div className="grid grid-2">
            {t.courses.map((c, i) => (
              <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--sage)" }}>{String(i+1).padStart(2,'0')}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-muted)" }}>{c.len}</div>
                </div>
                <h3 className="h3" style={{ margin: 0 }}>{c.t}</h3>
                <p style={{ color: "var(--ink-muted)", margin: 0, flex: 1 }}>{c.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 32 }}>{c.price}</div>
                  <button className="btn btn-outline" onClick={() => setRoute("kontakt")}>{lang==='pl'?'Zapisz się':'Sign up'} <Arrow /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "var(--cream)" }}>
        <div className="container-wide">
          <h2 className="h2" style={{ marginBottom: 56 }}>{t.how_title}</h2>
          <div className="grid grid-4">
            {t.how.map((s, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--line-strong)", paddingTop: 20 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--sage)", marginBottom: 14 }}>{s.n}</div>
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

const ContactPage = ({ lang }) => {
  const t = window.COPY[lang].kontakt;
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

Object.assign(window, { BDOPage, DoradztwoPage, BHPPage, ContactPage });
