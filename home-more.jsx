// Quiz + About + Testimonials + CTA

const Quiz = ({ lang, setRoute }) => {
  const t = window.COPY[lang].quiz;
  const [step, setStep] = React.useState(-1); // -1 = intro, 0..n-1 = questions, n = result
  const [answers, setAnswers] = React.useState([]);

  const submit = (optIdx) => {
    const next = [...answers, optIdx];
    setAnswers(next);
    setStep(step + 1);
  };

  const result = React.useMemo(() => {
    if (answers.length < t.q.length) return null;
    // answers: [waste, records, packaging, reports, bhpCurrent, bhpKnow, inspection]
    const [a0, a1, a2, a3, a4, a5, a6] = answers;

    // Risk scoring
    let score = 0;
    if (a0 === 0) score += 2; if (a0 === 1) score += 1; if (a0 === 3) score += 1;
    if (a1 === 1) score += 2; if (a1 === 2) score += 3; if (a1 === 3) score += 2;
    if (a2 === 0) score += 1; if (a2 === 2) score += 1;
    if (a3 === 1) score += 2; if (a3 === 2) score += 3; if (a3 === 3) score += 2;
    if (a4 === 1) score += 2; if (a4 === 2) score += 3;
    if (a5 === 1) score += 1; if (a5 === 2) score += 2;
    if (a6 === 1) score += 2; if (a6 === 3) score += 1;

    const risk = score >= 8 ? 'high' : score >= 4 ? 'mid' : 'low';
    const riskLabel = risk === 'high' ? t.risk_high : risk === 'mid' ? t.risk_mid : t.risk_low;

    // Duties (likely obligations)
    const duties = [];
    if (a0 === 0 || a0 === 1) duties.push(lang==='pl'?'Wpis do rejestru BDO i prowadzenie ewidencji odpadów':'BDO registry entry and waste records');
    if (a0 === 0 || a1 === 0 || a1 === 1) duties.push(lang==='pl'?'Roczne sprawozdanie o wytwarzanych odpadach (do 15 marca)':'Annual waste report (by March 15)');
    if (a2 === 0) duties.push(lang==='pl'?'Rozliczenie opakowań i ROP (rozszerzona odpowiedzialność producenta)':'Packaging & EPR settlements');
    if (a3 === 1 || a3 === 2 || a3 === 3) duties.push(lang==='pl'?'Opłaty środowiskowe i raport KOBiZE':'Environmental fees and KOBiZE report');
    if (a4 !== 3) duties.push(lang==='pl'?'Szkolenia BHP — wstępne i okresowe':'Workplace safety training — initial & periodic');
    if (a5 !== 3) duties.push(lang==='pl'?'Ocena ryzyka zawodowego i dokumentacja BHP':'Occupational risk assessment & BHP documentation');
    if (duties.length === 0) duties.push(lang==='pl'?'Podstawowy przegląd dokumentów raz w roku':'Basic yearly document review');

    // Recommended services
    const services = new Set();
    if (a0 !== 2 || a1 !== null) services.add('bdo');
    if (a0 === 0 || a1 === 1 || a1 === 2) services.add('bdo');
    if (a2 === 0 || a2 === 2 || a3 !== 0) services.add('doradztwo');
    if (a4 !== 0 || a5 !== 0) services.add('bhp');
    if (services.size === 0) services.add('doradztwo');

    const serviceMap = {
      bdo: { tag: 'BDO', route: 'bdo', body: lang==='pl'?'Obsługa BDO: ewidencja, KPO, sprawozdania roczne, rejestracja i aktualizacje.':'BDO handling: records, KPO, annual reports, registration & updates.' },
      doradztwo: { tag: lang==='pl'?'Doradztwo':'Advisory', route: 'doradztwo', body: lang==='pl'?'Doradztwo środowiskowe: KOBiZE, opakowania, opłaty, pozwolenia, audyty.':'Environmental advisory: KOBiZE, packaging, fees, permits, audits.' },
      bhp: { tag: 'BHP', route: 'bhp', body: lang==='pl'?'Szkolenia BHP online oraz ocena ryzyka zawodowego — wstępne i okresowe.':'Online safety training and occupational risk assessment — initial & periodic.' },
    };
    const recs = [...services].map(k => serviceMap[k]);

    return { risk, riskLabel, duties, recs };
  }, [answers, lang, t]);

  return (
    <section id="quiz" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
            <h2 className="h1">{t.title}</h2>
            <p className="lead" style={{ marginTop: 20 }}>{t.lead}</p>
          </div>

          <div className="card" style={{ minHeight: 420, display: "flex", flexDirection: "column" }}>
            {step === -1 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: 20 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--sage)", marginBottom: 16 }}>
                  {t.q.length} {lang==='pl'?'pytań':'questions'} · ~3 min
                </div>
                <h3 className="h2" style={{ margin: 0, marginBottom: 20 }}>
                  {lang==='pl'?'Gotowa/y?':'Ready?'}
                </h3>
                <button className="btn btn-primary" onClick={() => setStep(0)}>{t.start} <Arrow /></button>
              </div>
            )}

            {step >= 0 && step < t.q.length && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--ink-muted)" }}>
                  <span>{String(step+1).padStart(2,'0')} / {String(t.q.length).padStart(2,'0')}</span>
                  <div style={{ flex: 1, marginLeft: 16, height: 2, background: "var(--line)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${((step)/(t.q.length))*100}%`, background: "var(--sage)", transition: "width 400ms" }}/>
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 34, lineHeight: 1.1, margin: "0 0 12px" }}>{t.q[step].q}</h3>
                {t.q[step].hint && <p style={{ color: "var(--ink-muted)", fontSize: 14.5, margin: "0 0 24px" }}>{t.q[step].hint}</p>}
                <div style={{ display: "grid", gap: 10, marginTop: "auto" }}>
                  {t.q[step].opts.map((opt, i) => (
                    <button key={i} onClick={() => submit(i)}
                      style={{ textAlign: "left", padding: "18px 22px", borderRadius: 12, border: "1px solid var(--line-strong)", background: "var(--bg)", fontSize: 16, fontWeight: 450, transition: "all 160ms", color: "var(--ink)" }}
                      onMouseEnter={(e)=>{e.currentTarget.style.background="var(--ink)"; e.currentTarget.style.color="var(--cream)"; e.currentTarget.style.borderColor="var(--ink)";}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background="var(--bg)"; e.currentTarget.style.color="var(--ink)"; e.currentTarget.style.borderColor="var(--line-strong)";}}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", marginRight: 14, opacity: 0.6 }}>{String.fromCharCode(65+i)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step >= t.q.length && result && (
              <div style={{ flex: 1, padding: 12 }}>
                <div className="eyebrow" style={{ color: "var(--sage)", marginBottom: 14 }}>✻ {t.result_title}</div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "var(--ink)", color: "var(--cream)", borderRadius: 12, marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,248,241,0.6)" }}>{t.risk_label}</div>
                  <div style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1, fontStyle: "italic" }}>
                    {result.riskLabel}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["low","mid","high"].map((lvl, i) => (
                      <div key={i} style={{ width: 16, height: 8, borderRadius: 2, background: (result.risk==='low' && i===0) || (result.risk==='mid' && i<=1) || (result.risk==='high') ? "var(--sage)" : "rgba(251,248,241,0.2)" }}/>
                    ))}
                  </div>
                </div>

                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>{t.duties_label}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                  {result.duties.map((d, i) => (
                    <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)", fontSize: 14.5, display: "flex", gap: 10, color: "var(--ink-soft)" }}>
                      <span style={{ color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 12 }}>{String(i+1).padStart(2,'0')}</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>{t.services_label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {result.recs.map((r, i) => (
                    <button key={i} onClick={() => setRoute(r.route)} style={{ textAlign: "left", padding: "16px 20px", background: "var(--bg)", borderRadius: 12, borderLeft: "3px solid var(--sage)", border: "1px solid var(--line)", borderLeftWidth: 3, cursor: "pointer" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-deep)", marginBottom: 6 }}>{r.tag} <Arrow /></div>
                      <div style={{ fontSize: 15.5 }}>{r.body}</div>
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-primary" onClick={() => setRoute("kontakt")}>{t.book} <Arrow /></button>
                  <button className="btn btn-outline" onClick={() => { setAnswers([]); setStep(-1); }}>{t.again}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ lang }) => {
  const t = window.COPY[lang].about;
  return (
    <section>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--leaf-soft)" }}>
            <img src="assets/angelika.jpg" alt="Angelika Siołek — ECOSAFE" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.eyebrow}</div>
            <h2 className="h1" style={{ marginBottom: 8 }}>{t.name}</h2>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--sage)", marginBottom: 28 }}>{t.role}</div>
            <p className="lead" style={{ marginBottom: 20 }}>{t.body_1}</p>
            <p className="lead" style={{ marginBottom: 40 }}>{t.body_2}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, borderTop: "1px solid var(--line)", paddingTop: 32 }}>
              {t.stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 56, lineHeight: 1, color: "var(--ink)" }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }) => {
  const t = window.COPY[lang].testimonials;
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container-wide">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
        <h2 className="h2" style={{ maxWidth: 900, marginBottom: 56 }}>{t.title}</h2>
        <div className="grid grid-3">
          {t.items.map((it, i) => (
            <blockquote key={i} className="card" style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.3, color: "var(--ink)" }}>„{it.q}"</div>
              <footer style={{ marginTop: 24, fontSize: 13, color: "var(--ink-muted)", fontFamily: "var(--mono)", letterSpacing: "0.05em" }}>— {it.who}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTABig = ({ lang, setRoute }) => {
  const t = window.COPY[lang].cta;
  return (
    <section style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 className="display" style={{ color: "var(--cream)", marginBottom: 32 }}>
          {t.title_pre} <em style={{ color: "var(--leaf)" }}>{t.title_em}</em>
        </h2>
        <p className="lead" style={{ color: "rgba(251,248,241,0.8)", margin: "0 auto 40px" }}>{t.lead}</p>
        <button className="btn btn-sage" onClick={() => setRoute("kontakt")}>{t.button} <Arrow /></button>
      </div>
    </section>
  );
};

Object.assign(window, { Quiz, About, Testimonials, CTABig });
