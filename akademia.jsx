// ECOSAFE Akademia — kursy online prototype
const { useState, useEffect, useMemo } = React;

// ============ DATA ============
const COURSES = [
  { id: "bhp-wstepne", title: "BHP wstępne", tag: "Najpopularniejszy", new: false, hue: "leaf", duration: "1 godz 20 min", lessons: 8, level: "Wstępny", price: 89, desc: "Obowiązkowe szkolenie wstępne dla każdego nowego pracownika. Zgodne z rozporządzeniem MGiP.", icon: "shield" },
  { id: "bhp-biuro", title: "BHP okresowe — pracownicy biurowi", tag: null, new: false, hue: "mint", duration: "2 godz", lessons: 10, level: "Okresowy", price: 129, desc: "Okresowe szkolenie BHP dla pracowników administracyjno-biurowych. Co 6 lat.", icon: "monitor" },
  { id: "bhp-fizyczni", title: "BHP okresowe — pracownicy fizyczni", tag: null, new: false, hue: "apricot", duration: "3 godz", lessons: 12, level: "Okresowy", price: 149, desc: "Okresowe szkolenie BHP dla stanowisk robotniczych. Co 3 lata.", icon: "tools" },
  { id: "bhp-kadra", title: "BHP dla kadry kierowniczej", tag: null, new: false, hue: "sky", duration: "4 godz", lessons: 14, level: "Zaawansowany", price: 249, desc: "Pełen zakres odpowiedzialności kierownictwa za bezpieczeństwo zespołu.", icon: "people" },
  { id: "pierwsza-pomoc", title: "Pierwsza pomoc przedmedyczna", tag: "Nowy", new: true, hue: "apricot", duration: "2 godz 30 min", lessons: 11, level: "Wstępny", price: 159, desc: "Reanimacja, AED, opatrywanie ran, postępowanie przy zadławieniu.", icon: "heart" },
  { id: "ppoz", title: "Ochrona przeciwpożarowa", tag: null, new: false, hue: "mint", duration: "1 godz 45 min", lessons: 9, level: "Wstępny", price: 119, desc: "Zasady postępowania w razie pożaru, gaśnice, ewakuacja.", icon: "fire" },
  { id: "ryzyko", title: "Ocena ryzyka zawodowego", tag: null, new: false, hue: "leaf", duration: "3 godz", lessons: 13, level: "Zaawansowany", price: 299, desc: "Tworzenie dokumentacji oceny ryzyka — krok po kroku.", icon: "doc" },
  { id: "bdo", title: "BDO — gospodarka odpadami", tag: "Indywidualne", new: true, hue: "sky", duration: "wycena indyw.", lessons: 0, level: "Indywidualny", price: 599, desc: "Indywidualne szkolenie z obsługi systemu BDO dostosowane do Twojej firmy.", icon: "leaf" },
];

// User progress (mock state)
const INITIAL_ENROLLED = {
  "bhp-wstepne": { progress: 62, currentLesson: 5, completedLessons: [0, 1, 2, 3, 4] },
  "pierwsza-pomoc": { progress: 18, currentLesson: 2, completedLessons: [0, 1] },
};
const COMPLETED = ["ppoz"];

const LESSONS = [
  { id: 0, title: "Wprowadzenie — czym jest BHP", type: "video", len: "8 min" },
  { id: 1, title: "Akty prawne i obowiązki pracodawcy", type: "text", len: "12 min" },
  { id: 2, title: "Czynniki szkodliwe na stanowisku pracy", type: "video", len: "10 min" },
  { id: 3, title: "Ergonomia i postawa", type: "video", len: "9 min" },
  { id: 4, title: "Pierwsza pomoc — podstawy", type: "video", len: "14 min" },
  { id: 5, title: "Środki ochrony indywidualnej", type: "video", len: "11 min" },
  { id: 6, title: "Quiz sprawdzający — moduł 1", type: "quiz", len: "6 pyt." },
  { id: 7, title: "Test końcowy", type: "quiz", len: "12 pyt." },
];

const QUIZ_QUESTIONS = [
  { q: "Kto odpowiada za organizację szkoleń BHP w firmie?", opts: ["Pracownik", "Pracodawca", "Inspektor BHP", "Państwowa Inspekcja Pracy"], correct: 1 },
  { q: "Co ile lat odbywa się szkolenie okresowe dla pracowników biurowych?", opts: ["Co rok", "Co 3 lata", "Co 5 lat", "Co 6 lat"], correct: 3 },
  { q: "Co oznacza skrót ŚOI?", opts: ["Środki Ostrożności Indywidualnej", "Środki Ochrony Indywidualnej", "Sprzęt Ochronny Inżyniera", "Świadectwo Ochrony Imiennej"], correct: 1 },
];

// ============ ICONS ============
const Icon = ({ name, size = 24 }) => {
  const paths = {
    shield: <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    tools: <path d="M14 7l3-3 3 3-3 3-3-3zM4 20l8-8M3 17l4 4M11 9l-4-4-3 3 4 4"/>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-4 4-4s2.5 1 2.5 1"/></>,
    heart: <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 4.5-7 2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 3.5 0 6 3.5 4.5 7-2 4.5-9 9-9 9z"/>,
    fire: <path d="M12 2c1 4 4 6 4 10a4 4 0 01-8 0c0-2 1-3 1-5-2 1-3 3-3 6a6 6 0 0012 0c0-5-4-7-6-11z"/>,
    doc: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></>,
    leaf: <path d="M5 21c8-1 14-7 14-15-8 0-14 6-15 14 1-2 4-5 8-7-1 3-4 6-7 8z"/>,
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>,
    check: <path d="M5 13l4 4L19 7"/>,
    arrow: <path d="M5 12h14M13 5l7 7-7 7"/>,
    arrowL: <path d="M19 12H5M11 5l-7 7 7 7"/>,
    download: <><path d="M12 3v14M5 12l7 7 7-7"/><path d="M5 21h14"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

const HUES = {
  apricot: { bg: "#F4D4BD", ink: "#8B3F1A" },
  mint:    { bg: "#B8DCC9", ink: "#2E5A40" },
  sky:     { bg: "#C7D9E2", ink: "#2E4A5E" },
  leaf:    { bg: "#DCE4CC", ink: "#3A5238" },
};

const CourseThumb = ({ course }) => {
  const hue = HUES[course.hue] || HUES.leaf;
  return (
    <div className="course-thumb" style={{ background: hue.bg }}>
      <div className="course-thumb-bg" style={{ color: hue.ink }}>
        <Icon name={course.icon} size={120} />
      </div>
      {course.tag && <span className={"course-badge" + (course.new ? " new" : "")}>{course.tag}</span>}
      <span className="course-duration">{course.duration}</span>
    </div>
  );
};

// ============ PRO DATA ============
const PRO_COURSES = [
  { id: "pro-ocena-ryzyka", title: "Ocena ryzyka zawodowego — case studies", icon: "doc", duration: "8 godz", lessons: 14, cpd: "8 CPD", level: "Zaawansowany", price: 599, desc: "5 realnych case studies z różnych branż: produkcja, logistyka, biuro, gastronomia, budowa. Pełne dokumentacje do pobrania." },
  { id: "pro-audyt", title: "Audyt BHP w firmie produkcyjnej", icon: "shield", duration: "10 godz", lessons: 18, cpd: "10 CPD", level: "Zaawansowany", price: 749, desc: "Krok po kroku — od planu audytu, przez kontrolę stanowisk, po raport końcowy. Wzory dokumentów, listy kontrolne." },
  { id: "pro-komunikacja", title: "Jak prowadzić szkolenia BHP, których ludzie słuchają", icon: "people", duration: "6 godz", lessons: 12, cpd: "6 CPD", level: "Soft skills", price: 449, desc: "Storytelling, język korzyści, mikroćwiczenia, radzenie sobie z opornym uczestnikiem. Dla BHP-owców-trenerów." },
];

const OS_PRO_COURSES = [
  { id: "os-kobize", title: "KOBiZE — sprawozdawczość case studies", icon: "doc", duration: "8 godz", lessons: 14, cpd: "8 CPD", level: "Zaawansowany", price: 599, desc: "Pełen cykl rocznej sprawozdawczości KOBiZE krok po kroku z realnymi przykładami z różnych branż. Wzory wypełnione przykładowymi danymi." },
  { id: "os-bdo-pro", title: "BDO dla zaawansowanych — ewidencja i kontrole", icon: "leaf", duration: "10 godz", lessons: 18, cpd: "10 CPD", level: "Zaawansowany", price: 749, desc: "Złożone ewidencje, transgraniczne przemieszczenie odpadów, kontrole IOŚ. Wszystko od kuchni, z dokumentacją do pobrania." },
  { id: "os-audyt", title: "Audyt środowiskowy w firmie", icon: "shield", duration: "8 godz", lessons: 13, cpd: "8 CPD", level: "Zaawansowany", price: 599, desc: "Krok po kroku — od planu audytu do raportu z rekomendacjami i planem działań. Lista kontrolna, szablony raportów." },
  { id: "os-decyzje", title: "Decyzje i pozwolenia środowiskowe", icon: "doc", duration: "6 godz", lessons: 11, cpd: "6 CPD", level: "Średniozaawansowany", price: 449, desc: "Wniosek, postępowanie, terminy, odwołania. Praktyczne przykłady z administracyjnej kuchni, wzory pism." },
];

const PRO_FEATURES = [
  { icon: "play", title: "Webinary live", desc: "Co miesiąc spotkanie z Angeliką + Q&A. Nagrania dostępne." },
  { icon: "people", title: "Społeczność BHP", desc: "Zamknięte forum dla profesjonalistów. Wymiana case studies, pytania." },
  { icon: "doc", title: "Biblioteka materiałów", desc: "Szablony oceny ryzyka, listy kontrolne, instrukcje stanowiskowe — gotowe do edycji." },
  { icon: "shield", title: "Certyfikat BHP Pro", desc: "Egzamin końcowy + zaświadczenie o uczestnictwie w programie rozwojowym." },
];

// ============ NAV ============
const Nav = ({ route, setRoute }) => {
  const isPro = route.mode === "pro";
  const isOs = isPro && route.track === "os";
  const tabs = isPro
    ? [["pro-catalog", isOs ? "Kursy OŚ Pro" : "Kursy BHP Pro"], ["pro-community", "Społeczność"], ["pro-library", "Biblioteka"], ["dashboard", "Mój rozwój"]]
    : [["catalog", "Katalog"], ["dashboard", "Moje kursy"], ["admin", "Panel firmy"]];
  return (
    <nav className="app-nav">
      <div className="container app-nav-inner">
        <div className="app-nav-left">
          <a className="brand" href="#" onClick={(e)=>{e.preventDefault();setRoute({page:"landing"});}}>
            <img src="assets/ecosafe-logo.png" alt="ECOSAFE" />
            <div className="brand-text">
              <strong>ECOSAFE</strong>
              <span>{isPro ? (isOs ? "Akademia · OŚ Pro" : "Akademia · BHP Pro") : "Akademia"}</span>
            </div>
          </a>
          {window.BrandSwitcher && <BrandSwitcher current="akademia" variant="compact" />}
        </div>
        <div className="app-nav-tabs">
          {tabs.map(([k, label]) => (
            <button key={k} className={"app-nav-tab" + (route.page === k ? " active" : "")} onClick={() => setRoute({ page: k, mode: isPro ? "pro" : undefined, track: isPro ? (route.track || "bhp") : undefined })}>{label}</button>
          ))}
        </div>
        <div className="app-nav-right">
          {!isPro && <div className="streak">🔥 4 dni z rzędu</div>}
          {isPro && <div className="streak">⭐ 14 CPD</div>}
          <div className="avatar">A</div>
        </div>
      </div>
    </nav>
  );
};

// ============ LANDING — wybór ścieżki ============
const Landing = ({ setRoute }) => (
  <div className="akademia-landing">
    <div className="container landing-intro">
      <div className="eyebrow">ECOSAFE Akademia</div>
      <h1 className="h-display">Wybierz swoją <em>ścieżkę.</em></h1>
      <p className="lead">Obowiązkowe szkolenia dla pracowników i firm, oraz dwie ścieżki doskonalenia zawodowego — dla profesjonalistów BHP i ochrony środowiska.</p>
    </div>
    <div className="container">
      {/* Sekcja 1 — Obowiązkowe */}
      <div className="landing-section-head">
        <div className="eyebrow">Szkolenia BHP obowiązkowe · dla pracowników i firm</div>
      </div>
      <article className="path-card path-card-standard path-card-wide" onClick={() => setRoute({ page: "catalog" })}>
        <div className="path-tag">● Dla pracowników i firm</div>
        <h2>Szkolenia BHP <em>obowiązkowe.</em></h2>
        <p>Krótkie, jasne kursy zgodne z rozporządzeniem MGiP. Wstępne, okresowe, ppoż., pierwsza pomoc — wszystko z certyfikatem.</p>
        <ul className="path-features">
          <li>8 kursów BHP zgodnych z przepisami</li>
          <li>Certyfikat od razu po teście końcowym</li>
          <li>Pakiety firmowe — pracodawca zarządza zespołem</li>
          <li>Dostęp 24/7 przez 12 miesięcy</li>
        </ul>
        <div className="path-foot">
          <div className="path-price">od 89<small>zł / kurs</small></div>
          <span className="path-cta">Zobacz kursy →</span>
        </div>
      </article>

      {/* Sekcja 2 — Doskonalenie zawodowe (BHP Pro + OŚ Pro) */}
      <div className="landing-section-head landing-section-head-pro">
        <div className="eyebrow">Doskonalenie zawodowe · dla profesjonalistów</div>
      </div>
      <div className="path-split">
        <article className="path-card path-card-pro" onClick={() => setRoute({ page: "pro-catalog", mode: "pro", track: "bhp" })}>
          <div className="path-tag">◆ Dla profesjonalistów BHP</div>
          <h2>Akademia BHP <em>Pro.</em></h2>
          <p>Dla inspektorów, specjalistów BHP i osób w trakcie certyfikacji. Case studies, audyty, soft skills, webinary live z Angeliką.</p>
          <ul className="path-features">
            <li>Zaawansowane kursy z punktami CPD</li>
            <li>Webinary live + zamknięta społeczność</li>
            <li>Biblioteka szablonów i list kontrolnych</li>
            <li>Certyfikat BHP Pro z egzaminem końcowym</li>
          </ul>
          <div className="path-foot">
            <div className="path-price">od 449<small>zł / kurs</small></div>
            <span className="path-cta">Wejdź do BHP Pro →</span>
          </div>
        </article>
        <article className="path-card path-card-os-pro" onClick={() => setRoute({ page: "pro-catalog", mode: "pro", track: "os" })}>
          <div className="path-tag">◆ Dla specjalistów ochrony środowiska</div>
          <h2>Akademia OŚ <em>Pro.</em></h2>
          <p>Dla specjalistów ds. ochrony środowiska, koordynatorów BDO i audytorów. KOBiZE, BDO, audyty środowiskowe, decyzje administracyjne.</p>
          <ul className="path-features">
            <li>Case studies z realnych firm i kontroli</li>
            <li>Webinary live z ekspertami branżowymi</li>
            <li>Biblioteka wzorów wniosków i pism</li>
            <li>Certyfikat OŚ Pro z punktami CPD</li>
          </ul>
          <div className="path-foot">
            <div className="path-price">od 449<small>zł / kurs</small></div>
            <span className="path-cta">Wejdź do OŚ Pro →</span>
          </div>
        </article>
      </div>
    </div>
  </div>
);

// ============ PRO CATALOG ============
const ProCatalog = ({ setRoute, track = "bhp" }) => {
  const isOs = track === "os";
  const courses = isOs ? OS_PRO_COURSES : PRO_COURSES;
  const copy = isOs ? {
    eyebrow: "OŚ Pro · kursy zawodowe",
    title_pre: "Ochrona środowiska",
    title_em: "od kuchni.",
    lead: "Dla specjalistów ds. ochrony środowiska, koordynatorów BDO i audytorów. Realne case studies, dokumentacja, kontrole — wszystko od kuchni.",
    stats: [
      { n: "10+", label: "kursów planowanych" },
      { n: "CPD", label: "punkty rozwoju zawodowego" },
      { n: "Nowy", label: "track w Akademii — premiera 2026" },
    ],
    courses_title: "Kursy zaawansowane OŚ",
    features_title: "Co dostajesz w OŚ Pro",
  } : {
    eyebrow: "BHP Pro · kursy zawodowe",
    title_pre: "Wiedza, która",
    title_em: "idzie z tobą do firm.",
    lead: "Dla osób, które zawodowo dbają o bezpieczeństwo. Kupujesz pojedynczy kurs — dostęp na 12 miesięcy, materiały na zawsze.",
    stats: [
      { n: "12+", label: "kursów zaawansowanych" },
      { n: "CPD", label: "punkty rozwoju zawodowego" },
      { n: "200+", label: "specjalistów w społeczności" },
    ],
    courses_title: "Kursy zaawansowane",
    features_title: "Co dostajesz w Pro",
  };
  return (
    <>
      <section className="pro-hero">
        <div className="container pro-hero-inner">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="h-display" style={{ color: "var(--cream)" }}>{copy.title_pre} <em>{copy.title_em}</em></h1>
            <p className="lead">{copy.lead}</p>
          </div>
          <div className="pro-hero-stats">
            {copy.stats.map((s, i) => (
              <div key={i}>
                <div className="pro-stat-num">{/[0-9]/.test(s.n) ? <em>{s.n}</em> : s.n}</div>
                <div className="pro-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <h2 className="h2" style={{ margin: "48px 0 24px", color: "var(--cream)" }}>{copy.courses_title}</h2>
        <div className="course-grid" style={{ padding: "0 0 32px" }}>
          {courses.map(c => (
            <article key={c.id} className="pro-course-card" onClick={() => setRoute({ page: "pro-detail", id: c.id, mode: "pro", track })}>
              <div className="pro-course-thumb">
                <Icon name={c.icon} size={120}/>
                <span className="course-badge">{c.level}</span>
                <span className="course-duration">{c.duration}</span>
              </div>
              <div className="pro-course-body">
                <div className="pro-course-meta">{c.lessons} lekcji · case studies</div>
                <h3 className="pro-course-title">{c.title}</h3>
                <p style={{ color: "rgba(251,248,241,0.7)", fontSize: 14, margin: 0 }}>{c.desc}</p>
                <div className="pro-course-foot">
                  <span className="pro-cpd">◆ {c.cpd}</span>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--cream)" }}>{c.price} zł</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h2 className="h2" style={{ margin: "48px 0 24px", color: "var(--cream)" }}>{copy.features_title}</h2>
        <div className="pro-features">
          {PRO_FEATURES.map(f => (
            <div key={f.title} className="pro-feature">
              <div className="icon-circ"><Icon name={f.icon} size={22}/></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ height: 80 }}/>
      </div>
    </>
  );
};

// ============ PRO DETAIL ============
const ProDetail = ({ id, setRoute, track = "bhp" }) => {
  const courses = track === "os" ? OS_PRO_COURSES : PRO_COURSES;
  const c = courses.find(x => x.id === id) || courses[0];
  return (
    <>
      <section className="pro-hero" style={{ paddingBottom: 80 }}>
        <div className="container pro-hero-inner">
          <div>
            <div className="eyebrow"><a href="#" style={{ color: "var(--pro-accent)" }} onClick={(e)=>{e.preventDefault();setRoute({page:"pro-catalog",mode:"pro",track});}}>← Wróć do kursów {track === "os" ? "OŚ Pro" : "Pro"}</a></div>
            <h1 className="h1" style={{ color: "var(--cream)" }}>{c.title.split(" ").slice(0, 2).join(" ")} <em>{c.title.split(" ").slice(2).join(" ")}</em></h1>
            <p className="lead">{c.desc}</p>
            <div style={{ display: "flex", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
              <div className="meta-item"><strong style={{ color: "var(--cream)" }}>{c.duration}</strong>czas trwania</div>
              <div className="meta-item"><strong style={{ color: "var(--cream)" }}>{c.lessons}</strong>lekcji + case</div>
              <div className="meta-item"><strong style={{ color: "var(--pro-accent)" }}>{c.cpd}</strong>punkty CPD</div>
            </div>
          </div>
          <div className="card" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,169,97,0.25)", padding: 32 }}>
            <div className="eyebrow" style={{ color: "var(--pro-accent)" }}>Cena za kurs</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 56, lineHeight: 1, margin: "12px 0 8px", color: "var(--cream)" }}>{c.price} zł</div>
            <div style={{ fontSize: 13, color: "rgba(251,248,241,0.6)", marginBottom: 24 }}>Jednorazowo, dostęp na 12 miesięcy</div>
            <button className="btn btn-apricot btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => setRoute({ page: "player", id: c.id, mode: "pro", track })}>Kup i rozpocznij <Icon name="arrow" size={16}/></button>
            <ul className="detail-card-list" style={{ marginTop: 24 }}>
              <li>Materiały do pobrania (szablony)</li>
              <li>Egzamin końcowy → certyfikat {track === "os" ? "OŚ Pro" : "Pro"}</li>
              <li>Dostęp do społeczności kursantów</li>
              <li>{c.cpd} po ukończeniu</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

// ============ PRO COMMUNITY ============
const ProCommunity = () => (
  <div className="container" style={{ padding: "60px 0 80px" }}>
    <div className="eyebrow" style={{ color: "var(--pro-accent)", marginBottom: 18 }}>Społeczność BHP Pro</div>
    <h1 className="h-display" style={{ color: "var(--cream)" }}>Forum dla <em>tych, co wiedzą.</em></h1>
    <p className="lead" style={{ marginTop: 16, maxWidth: 580 }}>Wymiana case studies, pytania do Angeliki, dyskusje o zmianach w przepisach. Bez "co to jest BHP" — tylko realne tematy z pracy.</p>
    <div style={{ display: "grid", gap: 14, marginTop: 40 }}>
      {[
        { tag: "Dyskusja", title: "Jak udokumentować ryzyko przy pracy zdalnej? Mam audyt za 2 tyg.", author: "Marta K.", replies: 14, time: "2 godz. temu" },
        { tag: "Case study", title: "Wypadek przy obsłudze prasy — mój raport, co byście zmienili?", author: "Tomasz W.", replies: 22, time: "wczoraj" },
        { tag: "Pytanie", title: "ISO 45001 — czy ktoś wdrażał w firmie poniżej 50 osób?", author: "Anna L.", replies: 8, time: "3 dni temu" },
        { tag: "Webinar", title: "[Live, 18 maja] Ocena ryzyka 2026 — co się zmieniło", author: "Angelika Siołek", replies: 47, time: "za tydzień", pinned: true },
      ].map((t, i) => (
        <div key={i} className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, padding: 22, alignItems: "center" }}>
          <span style={{ background: t.pinned ? "var(--pro-accent)" : "rgba(201,169,97,0.15)", color: t.pinned ? "var(--pro-deep)" : "var(--pro-accent)", padding: "4px 12px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.tag}</span>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 19, color: "var(--cream)", marginBottom: 6 }}>{t.pinned && "📌 "}{t.title}</div>
            <div style={{ fontSize: 13, color: "rgba(251,248,241,0.55)" }}>{t.author} · {t.replies} odpowiedzi · {t.time}</div>
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--pro-accent)" }}>Otwórz →</span>
        </div>
      ))}
    </div>
  </div>
);

// ============ PRO LIBRARY ============
const ProLibrary = () => (
  <div className="container" style={{ padding: "60px 0 80px" }}>
    <div className="eyebrow" style={{ color: "var(--pro-accent)", marginBottom: 18 }}>Biblioteka Pro</div>
    <h1 className="h-display" style={{ color: "var(--cream)" }}>Szablony, <em>które realnie działają.</em></h1>
    <p className="lead" style={{ marginTop: 16, maxWidth: 580 }}>Wszystko, co potrzebujesz mieć "w szufladzie" jako specjalista BHP. Edytuj, podpisuj, dostosowuj do klienta.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 18, marginTop: 40 }}>
      {[
        ["Ocena ryzyka zawodowego — wzór uniwersalny", "DOCX", "Ostatnia aktualizacja: 03.2026"],
        ["Lista kontrolna audytu produkcyjnego", "PDF + XLSX", "Wzór z webinaru 02.2026"],
        ["Instrukcja stanowiskowa — szablon", "DOCX", "5 wariantów stanowisk"],
        ["Protokół powypadkowy — komplet", "PDF", "Zgodny z rozp. RM 2009"],
        ["Plan szkoleń BHP — generator", "XLSX", "Automatyczne przypomnienia"],
        ["Rejestr czynników szkodliwych", "XLSX", "Pełna baza substancji"],
      ].map(([title, fmt, note], i) => (
        <div key={i} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
            <Icon name="doc" size={28}/>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--pro-accent)", padding: "3px 9px", borderRadius: 999, background: "rgba(201,169,97,0.15)" }}>{fmt}</span>
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19, color: "var(--cream)", lineHeight: 1.25 }}>{title}</div>
          <div style={{ fontSize: 12, color: "rgba(251,248,241,0.55)", marginTop: "auto" }}>{note}</div>
          <button className="btn btn-outline btn-sm" style={{ alignSelf: "start", marginTop: 4 }}><Icon name="download" size={12}/> Pobierz</button>
        </div>
      ))}
    </div>
  </div>
);

// ============ CATALOG ============
const Catalog = ({ setRoute }) => {
  const [filter, setFilter] = useState("Wszystkie");
  const [query, setQuery] = useState("");
  const filters = ["Wszystkie", "Wstępne", "Okresowe", "Zaawansowane", "Indywidualne"];
  const filtered = COURSES.filter(c => {
    const matchesFilter = filter === "Wszystkie" || c.level.startsWith(filter.slice(0, 4));
    const matchesQuery = !query || c.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });
  return (
    <>
      <section className="hero-katalog">
        <div className="container hero-katalog-inner">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Akademia · Kursy 2026</div>
            <h1 className="h-display">Ucz się BHP <em>tak, jak chcesz.</em></h1>
            <p className="lead">Krótkie, jasne, bez prawniczego bełkotu. Online — kiedy masz chwilę. Certyfikat od razu po teście.</p>
          </div>
          <div className="stats">
            <div>
              <div className="stat-num"><em>8</em></div>
              <div className="stat-label">kursów dostępnych online</div>
            </div>
            <div>
              <div className="stat-num">24<small style={{fontSize:"24px"}}>/7</small></div>
              <div className="stat-label">dostęp z każdego urządzenia</div>
            </div>
            <div>
              <div className="stat-num"><em>500+</em></div>
              <div className="stat-label">przeszkolonych pracowników</div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="filter-bar">
          {filters.map(f => (
            <button key={f} className={"filter-chip" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>{f}</button>
          ))}
          <input className="search-input" placeholder="Szukaj kursu…" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <div className="course-grid">
          {filtered.map(c => {
            const enrolled = INITIAL_ENROLLED[c.id];
            return (
              <article key={c.id} className="card course-card card-hover" onClick={() => setRoute({ page: "detail", id: c.id })}>
                <CourseThumb course={c} />
                <div className="course-body">
                  <div className="course-meta">
                    <span className="mono">{c.level}</span>
                    <span className="course-meta-dot"></span>
                    <span>{c.lessons > 0 ? `${c.lessons} lekcji` : "indywidualnie"}</span>
                  </div>
                  <h3 className="course-title">{c.title}</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: 0 }}>{c.desc}</p>
                  {enrolled ? (
                    <div className="course-progress">
                      <div className="progress-track"><div className="progress-fill" style={{ width: `${enrolled.progress}%` }}/></div>
                      <div className="progress-label"><span>w trakcie</span><span>{enrolled.progress}%</span></div>
                    </div>
                  ) : (
                    <div className="course-foot">
                      <div className="course-price">{c.price}<small>zł</small></div>
                      <span className="btn btn-sm btn-outline">Szczegóły <Icon name="arrow" size={14}/></span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ============ COURSE DETAIL ============
const Detail = ({ id, setRoute }) => {
  const c = COURSES.find(x => x.id === id) || COURSES[0];
  const enrolled = INITIAL_ENROLLED[c.id];
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div>
            <div className="breadcrumb">
              <a href="#" onClick={(e)=>{e.preventDefault();setRoute({page:"catalog"});}}>Katalog</a> / {c.level} / {c.title}
            </div>
            <h1 className="h1">{c.title.split(" ")[0]} <em>{c.title.split(" ").slice(1).join(" ")}</em></h1>
            <p className="lead">{c.desc} Każda lekcja kończy się krótkim quizem, a po teście końcowym dostajesz certyfikat z podpisem Angeliki Siołek (mgr inż., spec. BHP).</p>
            <div className="meta-row">
              <div className="meta-item"><strong>{c.duration}</strong>czas trwania</div>
              <div className="meta-item"><strong>{c.lessons}</strong>lekcji + test</div>
              <div className="meta-item"><strong>{c.level}</strong>poziom</div>
              <div className="meta-item"><strong>PL</strong>język wykładu</div>
            </div>
          </div>
          <div className="detail-card">
            <div className="eyebrow">Cena dla 1 osoby</div>
            <div className="price">{c.price} zł</div>
            <div className="price-note">Pakiet 10 osób — 749 zł (–16%)</div>
            <button className="btn btn-apricot btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => setRoute({ page: "player", id: c.id, lessonIdx: enrolled?.currentLesson || 0 })}>
              {enrolled ? "Wróć do nauki" : "Rozpocznij kurs"} <Icon name="arrow" size={16}/>
            </button>
            <ul className="detail-card-list">
              <li>Certyfikat zgodny z rozporządzeniem</li>
              <li>Dostęp 24/7 przez 12 miesięcy</li>
              <li>Materiały do pobrania (PDF)</li>
              <li>Wsparcie e-mail po szkoleniu</li>
            </ul>
          </div>
        </div>
      </section>
      <section style={{ padding: "60px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Plan kursu</div>
            <h2 className="h2" style={{ marginBottom: 28 }}>Co znajdziesz w środku</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {LESSONS.map((l, i) => (
                <div key={l.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 20, padding: "18px 0", borderTop: "1px solid var(--line)" }}>
                  <div className="mono" style={{ color: "var(--ink-muted)", fontSize: 13, paddingTop: 4 }}>{String(i+1).padStart(2,"0")}</div>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 6 }}>{l.title}</div>
                    <span className={"lesson-type " + l.type}>{l.type === "video" ? "Wideo" : l.type === "quiz" ? "Quiz" : "Czytanka"}</span>
                  </div>
                  <div className="mono" style={{ color: "var(--ink-muted)", fontSize: 13, paddingTop: 4 }}>{l.len}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="card" style={{ background: "var(--bg-soft)" }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Prowadzi</div>
              <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--ink)", color: "var(--cream)", display: "grid", placeItems: "center", fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>A</div>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 24 }}>Angelika Siołek</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>mgr inż. · spec. BHP · inspektor ppoż.</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>12 lat doświadczenia. 500+ przeprowadzonych szkoleń. 0 wpadek po kontroli WIOŚ.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ============ PLAYER ============
const Player = ({ id, lessonIdx = 0, setRoute }) => {
  const c = COURSES.find(x => x.id === id) || COURSES[0];
  const [current, setCurrent] = useState(lessonIdx);
  const [done, setDone] = useState(new Set([0, 1, 2, 3, 4]));
  const lesson = LESSONS[current];
  const completedCount = done.size;
  const goNext = () => {
    const newDone = new Set(done); newDone.add(current); setDone(newDone);
    if (current < LESSONS.length - 1) setCurrent(current + 1);
    else setRoute({ page: "quiz", id: c.id });
  };
  const isQuiz = lesson.type === "quiz";
  return (
    <div className="player-shell">
      <div className="player-main">
        <div className="player-video">
          {isQuiz ? (
            <div style={{ textAlign: "center", color: "var(--cream)" }}>
              <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--sky)", color: "#2E4A5E", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
                <Icon name="doc" size={40}/>
              </div>
              <div className="h2" style={{ color: "var(--cream)" }}>Quiz: {LESSONS[current].title}</div>
              <button className="btn btn-apricot btn-lg" style={{ marginTop: 28 }} onClick={() => setRoute({ page: "quiz", id: c.id })}>Rozpocznij quiz <Icon name="arrow" size={16}/></button>
            </div>
          ) : (
            <button className="player-play" aria-label="Odtwórz">
              <Icon name="play" size={32}/>
            </button>
          )}
        </div>
        {!isQuiz && (
          <div className="player-controls">
            <span className="player-controls-time">02:48</span>
            <div className="player-bar"><div className="player-bar-fill"/><div className="player-bar-knob"/></div>
            <span className="player-controls-time">{lesson.len}</span>
          </div>
        )}
        <div className="player-content">
          <div className="eyebrow">Lekcja {current + 1} z {LESSONS.length} · {c.title}</div>
          <h1 className="h1">{lesson.title}</h1>
          <p style={{ marginTop: 16, maxWidth: 720 }}>
            {lesson.type === "video" && "W tej lekcji wideo omawiamy najważniejsze zasady i pokazujemy konkretne przykłady ze stanowisk pracy. Po obejrzeniu możesz przejść do następnej lekcji."}
            {lesson.type === "text" && "Lekcja w formie czytanki — możesz wracać do niej w dowolnym momencie. Zawiera odnośniki do aktów prawnych i przykłady zastosowania."}
            {lesson.type === "quiz" && "Sprawdź, ile zapamiętałaś z poprzednich lekcji. Quiz jest krótki — wracaj do niego ile razy chcesz."}
          </p>
          <div className="player-actions">
            <button className="btn btn-outline" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
              <Icon name="arrowL" size={14}/> Poprzednia
            </button>
            <button className="btn btn-apricot" onClick={goNext}>
              {current === LESSONS.length - 1 ? "Zakończ kurs" : "Następna lekcja"} <Icon name="arrow" size={14}/>
            </button>
            <button className="btn btn-ghost" onClick={() => setRoute({ page: "detail", id: c.id })}>← Wróć do kursu</button>
          </div>
        </div>
      </div>
      <aside className="player-side">
        <div className="player-side-head">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Plan lekcji</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.2 }}>{c.title}</div>
          <div className="player-side-progress">
            <span>{completedCount}/{LESSONS.length} ukończonych</span>
            <span>{Math.round(completedCount / LESSONS.length * 100)}%</span>
          </div>
          <div className="progress-track" style={{ marginTop: 8 }}>
            <div className="progress-fill" style={{ width: `${completedCount / LESSONS.length * 100}%` }}/>
          </div>
        </div>
        <ul className="lesson-list">
          {LESSONS.map((l, i) => (
            <li key={l.id} className={"lesson-item" + (i === current ? " current" : "") + (done.has(i) ? " done" : "")} onClick={() => setCurrent(i)}>
              <div className="lesson-icon">
                {done.has(i) ? <Icon name="check" size={14}/> : i === current ? <Icon name="play" size={12}/> : i + 1}
              </div>
              <div className="lesson-text">
                <div className="lesson-title">{l.title}</div>
                <div className="lesson-meta">
                  <span className={"lesson-type " + l.type}>{l.type === "video" ? "Wideo" : l.type === "quiz" ? "Quiz" : "Czytanka"}</span>
                  <span>· {l.len}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

// ============ QUIZ ============
const Quiz = ({ id, setRoute }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[step];
  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else setRoute({ page: "certificate", id });
  };
  return (
    <div className="quiz-shell">
      <div className="quiz-progress">Pytanie {step + 1} z {total}</div>
      <div className="quiz-progress-track"><div className="quiz-progress-fill" style={{ width: `${(step+1)/total*100}%` }}/></div>
      <div className="quiz-question">{q.q}</div>
      <div className="quiz-options">
        {q.opts.map((opt, i) => (
          <button key={i} className={"quiz-option" + (answers[step] === i ? " selected" : "")} onClick={() => setAnswers({ ...answers, [step]: i })}>
            <span className="quiz-option-num">{String.fromCharCode(65+i)}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn btn-ghost" onClick={() => step > 0 ? setStep(step-1) : setRoute({ page: "player", id })}>← Wstecz</button>
        <button className="btn btn-apricot" onClick={next} disabled={answers[step] === undefined}>
          {step === total - 1 ? "Zakończ test" : "Dalej"} <Icon name="arrow" size={14}/>
        </button>
      </div>
    </div>
  );
};

// ============ CERTIFICATE ============
const Certificate = ({ id, setRoute }) => {
  const c = COURSES.find(x => x.id === id) || COURSES[0];
  const today = new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="cert-page">
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--apricot)", marginBottom: 12 }}>Gratulacje 🎉</div>
          <h1 className="h1" style={{ marginBottom: 12 }}>Ukończyłaś kurs.</h1>
          <p className="lead" style={{ color: "var(--ink-muted)" }}>Twój certyfikat jest gotowy. Pobierz go i wydrukuj — albo zostaw w panelu.</p>
        </div>
        <div className="certificate">
          <img src="assets/ecosafe-logo.png" alt="" className="certificate-watermark"/>
          <div className="certificate-head">
            <div className="certificate-brand">
              <img src="assets/ecosafe-logo.png" alt=""/>
              <strong>ECOSAFE Akademia</strong>
            </div>
            <div className="certificate-eyebrow">Certyfikat #{id.toUpperCase()}-2026</div>
          </div>
          <div className="certificate-body">
            <div className="label">Niniejszym potwierdza się, że</div>
            <h1>Anna <em>Kowalska</em></h1>
            <p>ukończyła z wynikiem pozytywnym szkolenie <strong>{c.title}</strong> zgodne z rozporządzeniem MGiP w sprawie szkoleń BHP.</p>
          </div>
          <div className="certificate-foot">
            <div>
              <div className="col-label">Data wydania</div>
              <div className="col-val">{today}</div>
            </div>
            <div>
              <div className="col-label">Prowadząca</div>
              <div className="signature">Angelika Siołek</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(251,248,241,0.55)", marginTop: 2 }}>mgr inż. · spec. BHP · insp. ppoż.</div>
            </div>
            <div>
              <div className="col-label">Ważne do</div>
              <div className="col-val">{new Date(Date.now() + 6*365*24*60*60*1000).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-apricot btn-lg"><Icon name="download" size={16}/> Pobierz PDF</button>
          <button className="btn btn-outline btn-lg" onClick={() => setRoute({ page: "dashboard" })}>Moje kursy →</button>
        </div>
      </div>
    </div>
  );
};

// ============ DASHBOARD ============
const Dashboard = ({ setRoute }) => {
  const inProgress = Object.keys(INITIAL_ENROLLED).map(id => COURSES.find(c => c.id === id)).filter(Boolean);
  const completed = COMPLETED.map(id => COURSES.find(c => c.id === id)).filter(Boolean);
  return (
    <>
      <section className="dash-greeting">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Panel kursanta</div>
          <h1 className="h-display">Cześć, <em>Anna.</em></h1>
          <p className="lead" style={{ marginTop: 16, maxWidth: 540 }}>Masz 2 kursy w trakcie. Kontynuuj naukę albo zacznij coś nowego z katalogu.</p>
        </div>
      </section>
      <div className="container">
        <div className="dash-stats">
          <div className="stat-card">
            <div className="stat-value"><em>2</em></div>
            <div className="stat-label">w trakcie</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1</div>
            <div className="stat-label">ukończone</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">4 dni</div>
            <div className="stat-label">streak nauki 🔥</div>
          </div>
          <div className="stat-card">
            <div className="stat-value"><em>2h 14min</em></div>
            <div className="stat-label">w tym tygodniu</div>
          </div>
        </div>
        <h2 className="h2" style={{ marginBottom: 24 }}>W trakcie</h2>
        <div className="course-grid" style={{ paddingTop: 0 }}>
          {inProgress.map(c => {
            const e = INITIAL_ENROLLED[c.id];
            return (
              <article key={c.id} className="card course-card card-hover" onClick={() => setRoute({ page: "player", id: c.id, lessonIdx: e.currentLesson })}>
                <CourseThumb course={c} />
                <div className="course-body">
                  <div className="course-meta"><span className="mono">{c.level}</span></div>
                  <h3 className="course-title">{c.title}</h3>
                  <div className="course-progress">
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${e.progress}%` }}/></div>
                    <div className="progress-label"><span>Lekcja {e.currentLesson + 1} z {LESSONS.length}</span><span>{e.progress}%</span></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <h2 className="h2" style={{ margin: "48px 0 24px" }}>Ukończone</h2>
        <div className="course-grid" style={{ paddingTop: 0 }}>
          {completed.map(c => (
            <article key={c.id} className="card course-card card-hover" onClick={() => setRoute({ page: "certificate", id: c.id })}>
              <CourseThumb course={c} />
              <div className="course-body">
                <div className="course-meta"><span className="mono" style={{ color: "var(--sage)" }}>✓ Ukończone</span></div>
                <h3 className="course-title">{c.title}</h3>
                <div className="course-foot">
                  <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>Cert. #{c.id.toUpperCase()}-2026</span>
                  <span className="btn btn-sm btn-outline">Certyfikat <Icon name="arrow" size={12}/></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

// ============ ADMIN ============
const Admin = () => (
  <>
    <section className="dash-greeting">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>Panel firmy</div>
        <h1 className="h-display">Twój zespół, <em>na bieżąco.</em></h1>
        <p className="lead" style={{ marginTop: 16, maxWidth: 540 }}>Zobacz, ilu Twoich pracowników ukończyło wymagane szkolenia. Pobierz raport zbiorczy.</p>
      </div>
    </section>
    <div className="container">
      <div className="dash-stats">
        <div className="stat-card"><div className="stat-value"><em>47</em></div><div className="stat-label">aktywnych pracowników</div></div>
        <div className="stat-card"><div className="stat-value">38</div><div className="stat-label">z aktualnym BHP</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: "var(--apricot)" }}>9</div><div className="stat-label">z wygasającym (30 dni)</div></div>
        <div className="stat-card"><div className="stat-value"><em>92%</em></div><div className="stat-label">średni wynik testów</div></div>
      </div>
      <h2 className="h2" style={{ marginBottom: 24 }}>Pracownicy</h2>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--bg-soft)", textAlign: "left" }}>
              <th style={{ padding: "16px 24px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Pracownik</th>
              <th style={{ padding: "16px 24px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Stanowisko</th>
              <th style={{ padding: "16px 24px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>BHP ważne do</th>
              <th style={{ padding: "16px 24px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Jan Kowalski", "Operator linii", "12 marca 2027", "ok"],
              ["Maria Nowak", "Kierownik zmiany", "8 lutego 2026", "wygasa"],
              ["Tomasz Wiśniewski", "Magazynier", "—", "brak"],
              ["Karolina Lewandowska", "Specjalistka HR", "20 lipca 2031", "ok"],
              ["Piotr Zieliński", "Operator wózka", "3 stycznia 2026", "wygasa"],
            ].map(([name, role, date, status], i) => {
              const colors = { ok: ["var(--leaf-soft)", "var(--sage-deep)"], wygasa: ["var(--apricot-soft)", "#8B3F1A"], brak: ["#F4D4D4", "#8B2A2A"] };
              const [bg, fg] = colors[status];
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                  <td style={{ padding: "18px 24px", fontFamily: "var(--serif)", fontSize: 18 }}>{name}</td>
                  <td style={{ padding: "18px 24px", color: "var(--ink-muted)" }}>{role}</td>
                  <td style={{ padding: "18px 24px", fontFamily: "var(--mono)", fontSize: 13 }}>{date}</td>
                  <td style={{ padding: "18px 24px" }}>
                    <span style={{ background: bg, color: fg, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {status === "ok" ? "Aktualne" : status === "wygasa" ? "Wygasa wkrótce" : "Brak szkolenia"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 12, padding: "32px 0 80px" }}>
        <button className="btn btn-primary"><Icon name="download" size={14}/> Pobierz raport</button>
        <button className="btn btn-outline">Przypisz kurs</button>
      </div>
    </div>
  </>
);

// ============ APP ============
const App = () => {
  const [route, setRoute] = useState({ page: "landing" });
  useEffect(() => { window.scrollTo(0, 0); }, [route.page]);
  useEffect(() => {
    document.body.classList.toggle("pro-mode", route.mode === "pro");
    document.body.classList.toggle("os-track", route.mode === "pro" && route.track === "os");
  }, [route.mode, route.track]);
  return (
    <>
      <Nav route={route} setRoute={setRoute}/>
      {route.page === "landing" && <Landing setRoute={setRoute}/>}
      {route.page === "catalog" && <Catalog setRoute={setRoute}/>}
      {route.page === "detail" && <Detail id={route.id} setRoute={setRoute}/>}
      {route.page === "player" && <Player id={route.id} lessonIdx={route.lessonIdx} setRoute={setRoute}/>}
      {route.page === "quiz" && <Quiz id={route.id} setRoute={setRoute}/>}
      {route.page === "certificate" && <Certificate id={route.id} setRoute={setRoute}/>}
      {route.page === "dashboard" && <Dashboard setRoute={setRoute}/>}
      {route.page === "admin" && <Admin/>}
      {route.page === "pro-catalog" && <ProCatalog setRoute={setRoute} track={route.track || "bhp"}/>}
      {route.page === "pro-detail" && <ProDetail id={route.id} setRoute={setRoute} track={route.track || "bhp"}/>}
      {route.page === "pro-community" && <ProCommunity/>}
      {route.page === "pro-library" && <ProLibrary/>}
      <footer className="app-foot">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 16 }}>
          <span>© 2026 ECOSAFE Akademia · prototyp</span>
          <span>kontakt@ecosafe.com.pl · +48 791 045 130</span>
        </div>
      </footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
