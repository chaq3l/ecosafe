// Home page

const Hero = ({ lang, setRoute }) => {
  const t = window.COPY[lang].hero;
  return (
    <section style={{ paddingTop: 64, paddingBottom: 40 }}>
      <div className="container-wide">
        <div className="eyebrow fade-up" style={{ marginBottom: 28 }}>{t.eyebrow}</div>
        <h1 className="display fade-up" style={{ marginTop: 0, marginBottom: 40, animationDelay: "80ms" }}>
          {t.title_pre} <em>{t.title_em}</em> {t.title_post}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "end" }}>
          <p className="lead fade-up" style={{ animationDelay: "160ms" }}>
            {t.lead}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }} className="fade-up">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => setRoute("kontakt")}>
                {t.cta_primary} <Arrow />
              </button>
              <button className="btn btn-outline" onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}>
                {t.cta_secondary} <Arrow />
              </button>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-muted)", maxWidth: 360, margin: "8px 0 0" }}>{t.caption}</p>
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 18, height: 420 }}>
          <Placeholder label="Spotkanie z klientem" style={{ height: "100%" }}>
            <img src="assets/hero-meeting.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,26,20,0) 40%, rgba(15,26,20,0.55) 100%)" }} />
            <div style={{ position: "absolute", bottom: 22, left: 22, right: "40%", color: "var(--cream)" }}>
              <div className="eyebrow" style={{ color: "rgba(251,248,241,0.75)", marginBottom: 8 }}>Placeholder</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}>„Nie komplikuję. Tłumaczę, porządkuje i pomagam firmom działać zgodnie z przepisami."</div>
            </div>
          </Placeholder>
          <Placeholder label="Warsztat / BHP" variant="light" style={{ height: "100%" }}>
            <img src="assets/hero-workshop.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,26,20,0.15) 0%, rgba(15,26,20,0.6) 60%, rgba(15,26,20,0.8) 100%)" }} />
            <div style={{ position: "absolute", bottom: 22, left: 22, right: 22, color: "var(--cream)" }}>
              <div className="eyebrow" style={{ color: "rgba(251,248,241,0.7)", marginBottom: 10 }}>W ECOSAFE stawiam na</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.25, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}><span style={{ color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 12, fontStyle: "normal" }}>01</span><em style={{ fontStyle: "italic" }}>prosty język</em></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}><span style={{ color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 12, fontStyle: "normal" }}>02</span><em style={{ fontStyle: "italic" }}>praktyczne rozwiązania</em></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 12, fontStyle: "normal" }}>03</span><em style={{ fontStyle: "italic" }}>partnerskie podejście</em></div>
              </div>
            </div>
          </Placeholder>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18 }}>
            <div className="card-dark" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24 }}>
              <div className="eyebrow" style={{ color: "rgba(251,248,241,0.6)" }}>Zaufanie</div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 64, lineHeight: 1 }}>500<span style={{ color: "var(--sage)" }}>+</span></div>
                <div style={{ fontSize: 13, color: "rgba(251,248,241,0.7)", marginTop: 8 }}>{lang === 'pl' ? 'wykonanych sprawozdań' : 'completed reports'}</div>
              </div>
            </div>
            <Placeholder label="Dokumenty" style={{ height: "100%" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #5C8A5A, #1F3D2B)" }} />
              <svg viewBox="0 0 300 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                <rect x="60" y="40" width="120" height="140" rx="6" fill="#FBF8F1" opacity="0.95" />
                <rect x="80" y="62" width="80" height="6" fill="#1F3D2B" opacity="0.6" />
                <rect x="80" y="76" width="60" height="4" fill="#1F3D2B" opacity="0.3" />
                <rect x="80" y="86" width="70" height="4" fill="#1F3D2B" opacity="0.3" />
                <rect x="80" y="96" width="50" height="4" fill="#1F3D2B" opacity="0.3" />
                <rect x="80" y="150" width="30" height="12" rx="2" fill="#5C8A5A" />
                <rect x="100" y="52" width="120" height="140" rx="6" fill="#FBF8F1" opacity="0.7" />
              </svg>
            </Placeholder>
          </div>
        </div>
      </div>
    </section>);

};

const Pillars = ({ lang, setRoute }) => {
  const t = window.COPY[lang].pillars;
  const routes = ["bdo", "doradztwo", "bhp"];
  return (
    <section style={{ borderTop: "1px solid var(--line)" }}>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, marginBottom: 72 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.eyebrow}</div>
            <h2 className="h1">{t.title_pre} <em style={{ color: "var(--sage)", fontStyle: "italic" }}>{t.title_em}</em></h2>
          </div>
          <p className="lead" style={{ alignSelf: "end" }}>{t.lead}</p>
        </div>

        <div className="grid grid-3">
          {t.items.map((item, i) =>
          <div key={i} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 240, position: "relative", background: i === 0 ? "#2E4A36" : i === 1 ? "#3E5A42" : "#DCE4CC", overflow: "hidden" }}>
                {i === 0 &&
              <img src="assets/pillar-bdo.png?v=2" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              }
                {i === 1 &&
              <img src="assets/pillar-doradztwo.png?v=2" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              }
                {i === 2 &&
              <img src="assets/pillar-bhp.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              }
                {/* Subtle color tint to break up the green monotony */}
                <div style={{ position: "absolute", inset: 0, background: i === 0 ? "linear-gradient(135deg, rgba(217,180,120,0.22) 0%, rgba(217,180,120,0) 60%)" : i === 1 ? "linear-gradient(135deg, rgba(245,222,179,0.28) 0%, rgba(201,157,120,0.12) 100%)" : "linear-gradient(135deg, rgba(214,162,144,0.28) 0%, rgba(214,162,144,0) 65%)", mixBlendMode: "overlay", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 16, left: 20, color: "var(--ink)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", zIndex: 2, background: "rgba(251,248,241,0.88)", padding: "5px 10px", borderRadius: 4, backdropFilter: "blur(2px)" }}>{item.n} — {item.tag}</div>
              </div>
              <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 className="h3" style={{ margin: "0 0 12px" }}>{item.title}</h3>
                <p style={{ color: "var(--ink-muted)", margin: "0 0 20px", flex: 1 }}>{item.body}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", borderTop: "1px solid var(--line)" }}>
                  {item.bullets.map((b, j) =>
                <li key={j} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)", fontSize: 14.5, display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}>
                      <span>{b}</span><span style={{ color: "var(--sage)" }}>✓</span>
                    </li>
                )}
                </ul>
                <button className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => setRoute(routes[i])}>
                  {lang === 'pl' ? 'Dowiedz się więcej' : 'Learn more'} <Arrow />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// Interactive service picker
const ServicePicker = ({ lang, setRoute }) => {
  const [active, setActive] = React.useState(0);
  const t = window.COPY[lang].pillars.items;
  const routes = ["bdo", "doradztwo", "bhp"];
  return (
    <section style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="container-wide">
        <div className="eyebrow" style={{ color: "rgba(251,248,241,0.55)", marginBottom: 20 }}>
          {lang === 'pl' ? 'Wybierz obszar' : 'Pick an area'}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }}>
          <div>
            {t.map((item, i) =>
            <button key={i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "28px 0", borderBottom: "1px solid rgba(251,248,241,0.16)",
              color: "var(--cream)", opacity: active === i ? 1 : 0.5,
              transition: "opacity 200ms",
              cursor: "pointer"
            }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--sage)", marginBottom: 6 }}>{item.n}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 48, lineHeight: 1, fontStyle: active === i ? "italic" : "normal" }}>{item.title}</div>
              </button>
            )}
          </div>
          <div style={{ position: "sticky", top: 120 }}>
            <div style={{ background: "rgba(251,248,241,0.04)", border: "1px solid rgba(251,248,241,0.12)", borderRadius: "var(--radius-lg)", padding: 40 }}>
              <div className="eyebrow" style={{ color: "var(--sage)", marginBottom: 16 }}>{t[active].tag}</div>
              <p style={{ fontSize: 22, lineHeight: 1.4, color: "rgba(251,248,241,0.9)", margin: "0 0 28px", fontFamily: "var(--serif)" }}>{t[active].body}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
                {t[active].bullets.map((b, j) =>
                <div key={j} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(251,248,241,0.04)", fontSize: 13.5 }}>
                    <span style={{ color: "var(--sage)" }}>— </span>{b}
                  </div>
                )}
              </div>
              <button className="btn btn-sage" onClick={() => setRoute(routes[active])}>
                {lang === 'pl' ? 'Przejdź do usługi' : 'Open service'} <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

Object.assign(window, { Hero, Pillars, ServicePicker });