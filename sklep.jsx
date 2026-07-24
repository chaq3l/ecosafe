// ECOSAFE Akademia — Sklep z produktami cyfrowymi BHP
// Loaded after akademia.jsx; uses React from window.

const { useState: useShopState, useMemo: useShopMemo } = React;

// ============ DATA ============
const SHOP_PRODUCTS = [
  // Listy kontrolne
  { id: "checklist-audyt-stanowiska", cat: "Checklisty", title: "Lista kontrolna audytu stanowiska pracy", price: 39, oldPrice: null, format: "PDF · 12 stron", icon: "doc", hue: "leaf", desc: "Pełna lista 87 punktów kontrolnych do przeprowadzenia samodzielnego audytu BHP na pojedynczym stanowisku. Z miejscem na uwagi i podpis audytora.", rating: 4.9, reviews: 47, bestseller: true },
  { id: "checklist-ppoz", cat: "Checklisty", title: "Lista kontrolna ppoż. dla budynku biurowego", price: 49, oldPrice: null, format: "PDF · 8 stron", icon: "fire", hue: "apricot", desc: "Kontrola wyposażenia ppoż., dróg ewakuacyjnych, oznakowania. Wymagana przed kontrolą Państwowej Straży Pożarnej.", rating: 4.8, reviews: 23 },
  { id: "checklist-magazyn", cat: "Checklisty", title: "Audyt BHP magazynu wysokiego składowania", price: 59, oldPrice: null, format: "PDF · 14 stron", icon: "tools", hue: "sky", desc: "Stan regałów, wózki widłowe, oświetlenie, oznakowanie, ŚOI. Wszystko, co kontroluje WIOŚ i PIP.", rating: 4.7, reviews: 14 },

  // Szablony dokumentów
  { id: "szablon-ocena-ryzyka", cat: "Szablony", title: "Ocena ryzyka zawodowego — szablon DOCX", price: 89, oldPrice: 119, format: "DOCX + PDF · edytowalny", icon: "doc", hue: "leaf", desc: "Gotowy szablon oceny ryzyka zawodowego zgodny z PN-N-18002. Edytuj w Wordzie, wypełnij swoimi danymi, drukuj. Z przykładami dla 6 stanowisk.", rating: 5.0, reviews: 89, bestseller: true },
  { id: "szablon-instrukcja-bhp", cat: "Szablony", title: "Instrukcja BHP — szablon ogólny", price: 49, oldPrice: null, format: "DOCX · edytowalny", icon: "doc", hue: "mint", desc: "Uniwersalny szablon instrukcji BHP dla dowolnego stanowiska. Wystarczy uzupełnić specyfikę swojej pracy.", rating: 4.9, reviews: 56 },
  { id: "szablon-protokol-szkolenia", cat: "Szablony", title: "Protokół szkolenia BHP — wzór", price: 29, oldPrice: null, format: "DOCX + PDF", icon: "doc", hue: "leaf", desc: "Protokół potwierdzający przeprowadzenie szkolenia wstępnego lub okresowego. Z listą obecności i podpisami.", rating: 4.8, reviews: 31 },

  // Instrukcje stanowiskowe
  { id: "instrukcja-spawacz", cat: "Instrukcje", title: "Instrukcja BHP — spawacz", price: 39, oldPrice: null, format: "PDF · gotowa do druku", icon: "tools", hue: "apricot", desc: "Pełna instrukcja BHP dla stanowiska spawacza. Czynniki szkodliwe, ŚOI, postępowanie awaryjne.", rating: 4.7, reviews: 18 },
  { id: "instrukcja-operator-wozka", cat: "Instrukcje", title: "Instrukcja BHP — operator wózka widłowego", price: 39, oldPrice: null, format: "PDF · gotowa do druku", icon: "tools", hue: "apricot", desc: "Pełna instrukcja BHP dla kierowcy wózka jezdniowego z napędem silnikowym.", rating: 4.9, reviews: 42, bestseller: true },
  { id: "instrukcja-biuro", cat: "Instrukcje", title: "Instrukcja BHP — pracownik biurowy", price: 29, oldPrice: null, format: "PDF · gotowa do druku", icon: "monitor", hue: "sky", desc: "Ergonomia, praca z monitorem, przerwy, oświetlenie. Obowiązkowa dla każdego biura.", rating: 4.8, reviews: 67 },

  // E-booki
  { id: "ebook-bdo-od-zera", cat: "E-booki", title: "BDO od zera — przewodnik dla małych firm", price: 79, oldPrice: 99, format: "PDF · 84 strony", icon: "leaf", hue: "leaf", desc: "Wszystko o gospodarce odpadami: rejestracja, KPO, sprawozdania, kontrole. Konkretnie, bez urzędowego bełkotu. Z przykładami z 12 branż.", rating: 4.9, reviews: 134, bestseller: true, new: true },
  { id: "ebook-kontrola-pip", cat: "E-booki", title: "Kontrola PIP — co robić, czego nie", price: 59, oldPrice: null, format: "PDF · 56 stron", icon: "shield", hue: "ink", desc: "Co kontroluje Państwowa Inspekcja Pracy, jakie dokumenty trzymać pod ręką, jak się przygotować. Praktyczne checklisty.", rating: 4.8, reviews: 78 },
  { id: "ebook-pierwsza-pomoc", cat: "E-booki", title: "Pierwsza pomoc w pracy — poradnik", price: 49, oldPrice: null, format: "PDF · 42 strony", icon: "heart", hue: "apricot", desc: "Algorytmy postępowania, AED, opatrywanie, postępowanie z osobą nieprzytomną. Druk → apteczka.", rating: 4.9, reviews: 91 },

  // Pakiety startowe
  { id: "pakiet-startowy", cat: "Pakiety", title: "Pakiet startowy BHP dla małej firmy", price: 449, oldPrice: 689, format: "12 dokumentów DOCX + PDF", icon: "shield", hue: "leaf", desc: "Komplet wszystkiego, czego nowa firma potrzebuje: ocena ryzyka, instrukcje stanowiskowe (5 wzorów), protokoły szkoleń, regulamin pracy, polityka BHP. Edytowalne.", rating: 5.0, reviews: 38, bestseller: true, new: true },
  { id: "pakiet-produkcja", cat: "Pakiety", title: "Pakiet BHP — firma produkcyjna", price: 689, oldPrice: 989, format: "18 dokumentów", icon: "tools", hue: "apricot", desc: "Dedykowany dla zakładów produkcyjnych: ocena ryzyka dla 10 stanowisk, instrukcje obsługi maszyn, plan ewakuacji, dokumentacja ppoż.", rating: 4.9, reviews: 24 },

  // Konsultacje
  { id: "konsultacja-30min", cat: "Konsultacje", title: "Konsultacja BHP — 30 minut", price: 199, oldPrice: null, format: "Online (Google Meet)", icon: "people", hue: "mint", desc: "Krótka konsultacja z Angeliką Siołek — odpowiedź na konkretne pytanie, weryfikacja dokumentu, druga opinia. Rezerwacja w 48h.", rating: 5.0, reviews: 56 },
  { id: "konsultacja-60min", cat: "Konsultacje", title: "Konsultacja BHP — 60 minut", price: 349, oldPrice: null, format: "Online (Google Meet)", icon: "people", hue: "mint", desc: "Pełna godzina — analiza dokumentacji, plan działania, lista konkretnych kroków. Nagranie + notatki po spotkaniu.", rating: 4.9, reviews: 31 },
];

const BUNDLES = [
  { id: "bundle-malej-firmy", title: "Wszystko dla małej firmy", desc: "Pakiet startowy + ocena ryzyka + 3 instrukcje stanowiskowe + konsultacja 30 min.", items: ["pakiet-startowy", "szablon-ocena-ryzyka", "instrukcja-biuro", "instrukcja-operator-wozka", "konsultacja-30min"], price: 599, oldPrice: 854, save: 255 },
  { id: "bundle-bhp-owca", title: "Zestaw BHP-owca", desc: "Lista kontrolna audytu + szablon oceny ryzyka + e-book PIP + protokół szkolenia.", items: ["checklist-audyt-stanowiska", "szablon-ocena-ryzyka", "ebook-kontrola-pip", "szablon-protokol-szkolenia"], price: 169, oldPrice: 216, save: 47 },
];

const PRODUCT_REVIEWS = {
  "szablon-ocena-ryzyka": [
    { name: "Marta K.", role: "Specjalistka BHP, branża spożywcza", rating: 5, date: "12 marca 2026", text: "Konkretny, edytowalny szablon. Zaoszczędziłam dwa dni pracy. Dorzucone przykłady dla 6 stanowisk to złoto." },
    { name: "Tomasz R.", role: "Właściciel zakładu metalowego", rating: 5, date: "28 lutego 2026", text: "Kupiłem przed kontrolą PIP. Inspektor obejrzał, kiwnął głową, koniec tematu. Polecam." },
    { name: "Aneta W.", role: "HR Manager", rating: 4, date: "8 lutego 2026", text: "Bardzo dobry punkt wyjścia. Edycja wymaga znajomości tematu — ale do tego są kursy." },
  ],
  "pakiet-startowy": [
    { name: "Krzysztof B.", role: "Założyciel firmy IT (8 osób)", rating: 5, date: "20 kwietnia 2026", text: "Zaczynałem firmę od zera. Pakiet zawiera dokładnie to, co musisz mieć. Wszystko edytowalne." },
    { name: "Iwona M.", role: "Cukiernia rodzinna", rating: 5, date: "2 marca 2026", text: "Wcześniej płaciłam zewnętrznemu BHP-owcowi 800 zł miesięcznie. Teraz mam wszystko swoje." },
  ],
  "ebook-bdo-od-zera": [
    { name: "Paweł D.", role: "Logistyka, kierownik magazynu", rating: 5, date: "15 kwietnia 2026", text: "BDO przestało być koszmarem. Konkretnie, krok po kroku, z przykładami." },
    { name: "Dorota S.", role: "Sklep stacjonarny + e-commerce", rating: 5, date: "29 marca 2026", text: "Wreszcie ktoś tłumaczy to po ludzku. Polecam każdemu, kto musi się ogarnąć z odpadami." },
  ],
};

const CATEGORIES = ["Wszystko", "Checklisty", "Szablony", "Instrukcje", "E-booki", "Pakiety", "Konsultacje"];

const PROMO_CODES = { "PIERWSZE10": 0.10, "BHP2026": 0.15, "PRO20": 0.20 };

// ============ HELPERS ============
const fmt = (n) => `${n} zł`;

const getProduct = (id) => SHOP_PRODUCTS.find(p => p.id === id);

const ProductThumb = ({ product, size = 120 }) => {
  const hue = (window.HUES && window.HUES[product.hue]) || { bg: "#DCE4CC", ink: "#3A5238" };
  return (
    <div className="shop-thumb" style={{ background: hue.bg, color: hue.ink }}>
      <window.Icon name={product.icon} size={size}/>
      {product.bestseller && <span className="shop-tag shop-tag-best">★ Bestseller</span>}
      {product.new && <span className="shop-tag shop-tag-new">Nowość</span>}
      {product.oldPrice && <span className="shop-tag shop-tag-sale">−{Math.round((1 - product.price/product.oldPrice) * 100)}%</span>}
    </div>
  );
};

const Stars = ({ rating, size = 14 }) => (
  <span style={{ display: "inline-flex", gap: 1, color: "#E8895A", fontSize: size, letterSpacing: 0.5 }}>
    {[1,2,3,4,5].map(i => <span key={i}>{i <= Math.round(rating) ? "★" : "☆"}</span>)}
  </span>
);

// ============ SHOP CATALOG ============
const Shop = ({ setRoute, addToCart }) => {
  const [cat, setCat] = useShopState("Wszystko");
  const [query, setQuery] = useShopState("");
  const filtered = SHOP_PRODUCTS.filter(p => {
    const matchCat = cat === "Wszystko" || p.cat === cat;
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });
  return (
    <>
      <section className="shop-hero">
        <div className="container shop-hero-inner">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Akademia · Sklep</div>
            <h1 className="h-display">Dokumenty BHP <em>do pobrania.</em></h1>
            <p className="lead">Gotowe szablony, listy kontrolne, instrukcje stanowiskowe i e-booki. Płacisz, pobierasz, używasz — bez czekania.</p>
            <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              <div className="shop-hero-stat"><strong>16</strong>produktów cyfrowych</div>
              <div className="shop-hero-stat"><strong>~3 min</strong>od zakupu do pobrania</div>
              <div className="shop-hero-stat"><strong>4.9/5</strong>średnia ocen klientów</div>
            </div>
          </div>
          <div className="shop-hero-card">
            <div className="eyebrow" style={{ color: "var(--apricot)", marginBottom: 10 }}>Pakiet miesiąca</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1.15, margin: "0 0 12px" }}>Pakiet startowy BHP <em>dla małej firmy</em></h3>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: "0 0 18px" }}>12 dokumentów edytowalnych. Wszystko, czego potrzebujesz na start.</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 44, lineHeight: 1 }}>449 zł</span>
              <span style={{ textDecoration: "line-through", color: "var(--ink-muted)" }}>689 zł</span>
              <span style={{ background: "var(--apricot)", color: "var(--cream)", padding: "3px 10px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em" }}>−35%</span>
            </div>
            <button className="btn btn-apricot" onClick={() => setRoute({ page: "shop-detail", id: "pakiet-startowy" })}>Zobacz pakiet <window.Icon name="arrow" size={14}/></button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="filter-bar">
          {CATEGORIES.map(c => (
            <button key={c} className={"filter-chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
          ))}
          <input className="search-input" placeholder="Szukaj…" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </div>

        <div className="shop-grid">
          {filtered.map(p => (
            <article key={p.id} className="shop-card" onClick={() => setRoute({ page: "shop-detail", id: p.id })}>
              <ProductThumb product={p}/>
              <div className="shop-body">
                <div className="shop-cat">{p.cat} · {p.format}</div>
                <h3 className="shop-title">{p.title}</h3>
                <div className="shop-rating">
                  <Stars rating={p.rating}/>
                  <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>{p.rating.toFixed(1)} ({p.reviews} ocen)</span>
                </div>
                <div className="shop-foot">
                  <div className="shop-price">
                    {p.oldPrice && <span className="old">{fmt(p.oldPrice)}</span>}
                    <span className="now">{fmt(p.price)}</span>
                  </div>
                  <button className="btn btn-sm btn-apricot" onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}>
                    <window.Icon name="arrow" size={12}/> Do koszyka
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="shop-bundles">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Pakiety · taniej razem</div>
          <h2 className="h2" style={{ marginBottom: 28 }}>Kup zestaw, oszczędź <em style={{ color: "var(--apricot)", fontStyle: "italic" }}>do 35%</em></h2>
          <div className="bundle-grid">
            {BUNDLES.map(b => (
              <article key={b.id} className="bundle-card">
                <div className="bundle-save">−{fmt(b.save)}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <ul className="bundle-list">
                  {b.items.map(id => {
                    const p = getProduct(id);
                    return p && <li key={id}><window.Icon name="check" size={14}/> {p.title}</li>;
                  })}
                </ul>
                <div className="bundle-foot">
                  <div className="bundle-price"><span className="old">{fmt(b.oldPrice)}</span><span className="now">{fmt(b.price)}</span></div>
                  <button className="btn btn-apricot" onClick={() => b.items.forEach(id => addToCart(id))}>Dodaj cały pakiet</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

// ============ PRODUCT DETAIL ============
const ProductDetail = ({ id, setRoute, addToCart }) => {
  const p = getProduct(id) || SHOP_PRODUCTS[0];
  const reviews = PRODUCT_REVIEWS[p.id] || [];
  const related = SHOP_PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);
  return (
    <>
      <section style={{ padding: "48px 0 64px" }}>
        <div className="container">
          <div className="breadcrumb-light">
            <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ page: "shop" }); }}>Sklep</a> / {p.cat} / <span style={{ color: "var(--ink-muted)" }}>{p.title}</span>
          </div>
          <div className="shop-detail-grid">
            <div className="shop-detail-thumb-wrap">
              <ProductThumb product={p} size={200}/>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <div className="shop-detail-mini"><window.Icon name="doc" size={32}/></div>
                <div className="shop-detail-mini"><window.Icon name="download" size={32}/></div>
                <div className="shop-detail-mini" style={{ display: "grid", placeItems: "center", fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.08em" }}>+3 strony</div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{p.cat} · {p.format}</div>
              <h1 className="h1" style={{ marginBottom: 14 }}>{p.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <Stars rating={p.rating} size={16}/>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-muted)" }}>{p.rating.toFixed(1)} · {p.reviews} ocen</span>
              </div>
              <p className="lead" style={{ marginBottom: 28 }}>{p.desc}</p>

              <div className="shop-detail-meta">
                <div><span className="eyebrow">Format</span><strong>{p.format}</strong></div>
                <div><span className="eyebrow">Dostawa</span><strong>od razu po zakupie</strong></div>
                <div><span className="eyebrow">Aktualizacje</span><strong>darmowe przez 12 mies.</strong></div>
              </div>

              <div className="shop-detail-buy">
                <div className="shop-detail-buy-price">
                  {p.oldPrice && <span className="old">{fmt(p.oldPrice)}</span>}
                  <span className="now">{fmt(p.price)}</span>
                  {p.oldPrice && <span className="badge">Oszczędzasz {fmt(p.oldPrice - p.price)}</span>}
                </div>
                <button className="btn btn-apricot btn-lg" onClick={() => { addToCart(p.id); setRoute({ page: "cart" }); }}>
                  Kup teraz <window.Icon name="arrow" size={16}/>
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => addToCart(p.id)}>
                  Dodaj do koszyka
                </button>
              </div>
              <div className="shop-detail-bullets">
                <div><window.Icon name="check" size={16}/> Płatność jednorazowa, bez subskrypcji</div>
                <div><window.Icon name="check" size={16}/> Plik dostępny od razu po zakupie</div>
                <div><window.Icon name="check" size={16}/> Możesz używać wielokrotnie we własnej firmie</div>
                <div><window.Icon name="check" size={16}/> Faktura VAT na firmę</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-tabs-section">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: 24 }}>Co dostajesz</h2>
          <div className="shop-contents-grid">
            <div className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>W pliku</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <li>• Dokument główny — gotowy do druku</li>
                <li>• Wersja edytowalna (DOCX, gdy dotyczy)</li>
                <li>• Załączniki: lista kontrolna, wzór protokołu</li>
                <li>• Krótki przewodnik użytkowania</li>
              </ul>
            </div>
            <div className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>Wsparcie</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <li>• E-mail w przypadku problemów</li>
                <li>• Aktualizacje, gdy zmienią się przepisy</li>
                <li>• Dostęp do swoich plików 24/7 w panelu</li>
              </ul>
            </div>
            <div className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>Licencja</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <li>• Użytek wewnątrz Twojej firmy bez limitu</li>
                <li>• Możesz wydruk dawać pracownikom</li>
                <li>• Bez odsprzedaży i publikacji</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section style={{ padding: "20px 0 60px" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 28 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Opinie kupujących</div>
                <h2 className="h2">Co mówią Ci, którzy <em>już używają</em></h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 56, lineHeight: 1 }}>{p.rating.toFixed(1)}</div>
                <Stars rating={p.rating} size={18}/>
                <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 6 }}>{p.reviews} ocen</div>
              </div>
            </div>
            <div className="review-grid">
              {reviews.map((r, i) => (
                <article key={i} className="card review-card">
                  <Stars rating={r.rating}/>
                  <p className="review-text">„{r.text}"</p>
                  <div className="review-foot">
                    <div className="review-avatar">{r.name[0]}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-role">{r.role} · {r.date}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ padding: "20px 0 80px" }}>
          <div className="container">
            <h2 className="h2" style={{ marginBottom: 24 }}>Podobne produkty</h2>
            <div className="shop-grid">
              {related.map(rp => (
                <article key={rp.id} className="shop-card" onClick={() => setRoute({ page: "shop-detail", id: rp.id })}>
                  <ProductThumb product={rp}/>
                  <div className="shop-body">
                    <div className="shop-cat">{rp.cat}</div>
                    <h3 className="shop-title">{rp.title}</h3>
                    <div className="shop-foot">
                      <div className="shop-price"><span className="now">{fmt(rp.price)}</span></div>
                      <button className="btn btn-sm btn-outline">Zobacz <window.Icon name="arrow" size={12}/></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// ============ CART DRAWER ============
const CartDrawer = ({ cart, setCart, open, onClose, setRoute }) => {
  const items = cart.map(id => getProduct(id)).filter(Boolean);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  return (
    <>
      <div className={"cart-backdrop" + (open ? " open" : "")} onClick={onClose}/>
      <aside className={"cart-drawer" + (open ? " open" : "")}>
        <div className="cart-head">
          <div>
            <div className="eyebrow">Twój koszyk</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "6px 0 0" }}>{items.length} {items.length === 1 ? "produkt" : "produktów"}</h3>
          </div>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0 && (
            <div className="cart-empty">
              <window.Icon name="doc" size={40}/>
              <p>Koszyk jest pusty.</p>
              <button className="btn btn-outline" onClick={() => { onClose(); setRoute({ page: "shop" }); }}>Przeglądaj sklep</button>
            </div>
          )}
          {items.map((p, i) => (
            <div key={i} className="cart-item">
              <div className="cart-item-thumb" style={{ background: (window.HUES?.[p.hue]?.bg || "#DCE4CC"), color: (window.HUES?.[p.hue]?.ink || "#3A5238") }}>
                <window.Icon name={p.icon} size={36}/>
              </div>
              <div className="cart-item-body">
                <div className="cart-item-cat">{p.cat}</div>
                <div className="cart-item-title">{p.title}</div>
                <div className="cart-item-format">{p.format}</div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-price">{fmt(p.price)}</div>
                <button className="cart-item-remove" onClick={() => setCart(cart.filter((_, idx) => idx !== i))}>Usuń</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span>Razem</span>
              <strong>{fmt(subtotal)}</strong>
            </div>
            <button className="btn btn-apricot btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => { onClose(); setRoute({ page: "checkout" }); }}>
              Przejdź do płatności <window.Icon name="arrow" size={16}/>
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={onClose}>Wróć do zakupów</button>
          </div>
        )}
      </aside>
    </>
  );
};

// ============ CHECKOUT ============
const Checkout = ({ cart, setCart, setRoute }) => {
  const [promo, setPromo] = useShopState("");
  const [promoApplied, setPromoApplied] = useShopState(null);
  const [paid, setPaid] = useShopState(false);
  const items = cart.map(id => getProduct(id)).filter(Boolean);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const discount = promoApplied ? Math.round(subtotal * promoApplied.amount) : 0;
  const total = subtotal - discount;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) setPromoApplied({ code, amount: PROMO_CODES[code] });
    else setPromoApplied({ code, amount: 0, error: true });
  };

  if (paid) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ maxWidth: 720, paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--leaf-soft)", color: "var(--sage-deep)", display: "grid", placeItems: "center", margin: "0 auto 28px" }}>
            <window.Icon name="check" size={48}/>
          </div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Płatność zaakceptowana</div>
          <h1 className="h-display">Dziękujemy, <em>gotowe.</em></h1>
          <p className="lead" style={{ marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>Wszystkie pliki są już w Twoim panelu. Na e-mail wysłaliśmy fakturę i linki do pobrania.</p>
          <div className="card" style={{ marginTop: 36, textAlign: "left", padding: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Twoje zakupy</div>
            {items.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>{p.format}</div>
                </div>
                <button className="btn btn-sm btn-primary"><window.Icon name="download" size={14}/> Pobierz</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}>
            <button className="btn btn-outline btn-lg" onClick={() => { setCart([]); setRoute({ page: "purchases" }); }}>Moje zakupy →</button>
            <button className="btn btn-apricot btn-lg" onClick={() => { setCart([]); setRoute({ page: "shop" }); }}>Wróć do sklepu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Krok 2 z 2</div>
        <h1 className="h1" style={{ marginBottom: 36 }}>Finalizacja zamówienia</h1>
        <div className="checkout-grid">
          <div className="checkout-form">
            <div className="card" style={{ padding: 28, marginBottom: 18 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 18, margin: "0 0 18px" }}>1. Dane do faktury</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div className="field"><label>Imię i nazwisko</label><input type="text" defaultValue="Anna Kowalska"/></div>
                <div className="field"><label>E-mail</label><input type="email" defaultValue="anna@firma.pl"/></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, marginBottom: 12 }}>
                <div className="field"><label>Firma (opcjonalnie)</label><input type="text" placeholder="Nazwa firmy"/></div>
                <div className="field"><label>NIP</label><input type="text" placeholder="0000000000"/></div>
              </div>
              <div className="field"><label>Adres</label><input type="text" placeholder="Ulica, miasto, kod pocztowy"/></div>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 18 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 18px" }}>2. Metoda płatności</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[["BLIK","blik"],["Przelewy24","p24"],["Karta","card"]].map(([label, key], i) => (
                  <label key={key} className={"pay-method" + (i === 0 ? " active" : "")}>
                    <input type="radio" name="pay" defaultChecked={i===0} style={{ display: "none" }}/>
                    <strong>{label}</strong>
                  </label>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 18px" }}>3. Kod promocyjny</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <input className="search-input" style={{ flex: 1, maxWidth: "100%", marginLeft: 0 }} placeholder="np. PIERWSZE10" value={promo} onChange={(e) => setPromo(e.target.value)}/>
                <button className="btn btn-outline" onClick={applyPromo}>Zastosuj</button>
              </div>
              {promoApplied && !promoApplied.error && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--leaf-soft)", color: "var(--sage-deep)", borderRadius: 8, fontSize: 14 }}>
                  ✓ Kod <strong>{promoApplied.code}</strong> zastosowany: −{Math.round(promoApplied.amount * 100)}%
                </div>
              )}
              {promoApplied?.error && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#F4D4D4", color: "#8B2A2A", borderRadius: 8, fontSize: 14 }}>
                  Kod <strong>{promoApplied.code}</strong> jest nieprawidłowy. Spróbuj: PIERWSZE10, BHP2026, PRO20
                </div>
              )}
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 10, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>Działające kody: PIERWSZE10 · BHP2026 · PRO20</div>
            </div>
          </div>

          <aside className="checkout-summary">
            <div className="card" style={{ padding: 28, position: "sticky", top: 100 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 18px" }}>Twoje zamówienie</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
                {items.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div className="cart-item-thumb" style={{ width: 48, height: 48, background: (window.HUES?.[p.hue]?.bg || "#DCE4CC"), color: (window.HUES?.[p.hue]?.ink || "#3A5238") }}>
                      <window.Icon name={p.icon} size={22}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, lineHeight: 1.3 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{p.format}</div>
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{fmt(p.price)}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--ink-muted)" }}>Wartość produktów</span><span>{fmt(subtotal)}</span></div>
                {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sage-deep)" }}><span>Rabat</span><span>−{fmt(discount)}</span></div>}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 14, borderTop: "1px solid var(--line)", fontSize: 18 }}>
                  <strong>Razem</strong><span style={{ fontFamily: "var(--serif)", fontSize: 30, lineHeight: 1 }}>{fmt(total)}</span>
                </div>
              </div>
              <button className="btn btn-apricot btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={() => setPaid(true)}>
                Zapłać {fmt(total)}
              </button>
              <div style={{ fontSize: 11, color: "var(--ink-muted)", textAlign: "center", marginTop: 12, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>Płatność zabezpieczona · faktura VAT automatycznie</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// ============ PURCHASES ============
const PURCHASE_HISTORY = [
  { id: "szablon-ocena-ryzyka", date: "12 kwietnia 2026", orderId: "ECS-2026-0412-A" },
  { id: "checklist-audyt-stanowiska", date: "12 kwietnia 2026", orderId: "ECS-2026-0412-A" },
  { id: "ebook-bdo-od-zera", date: "3 marca 2026", orderId: "ECS-2026-0303-B" },
];

const Purchases = ({ setRoute }) => {
  const items = PURCHASE_HISTORY.map(h => ({ ...h, product: getProduct(h.id) })).filter(x => x.product);
  return (
    <>
      <section className="dash-greeting">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Moje zakupy</div>
          <h1 className="h-display">Twoja biblioteka <em>dokumentów.</em></h1>
          <p className="lead" style={{ marginTop: 16, maxWidth: 540 }}>Pobierz pliki ponownie, gdy potrzebujesz. Dostępne 24/7, bez limitu.</p>
        </div>
      </section>
      <div className="container">
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto auto", gap: 24, padding: "20px 24px", alignItems: "center", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <div className="cart-item-thumb" style={{ width: 56, height: 56, background: (window.HUES?.[it.product.hue]?.bg || "#DCE4CC"), color: (window.HUES?.[it.product.hue]?.ink || "#3A5238") }}>
                <window.Icon name={it.product.icon} size={26}/>
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 4 }}>{it.product.title}</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{it.product.format} · zakup {it.date} · #{it.orderId}</div>
              </div>
              <button className="btn btn-sm btn-outline" onClick={() => setRoute({ page: "shop-detail", id: it.id })}>Zobacz</button>
              <button className="btn btn-sm btn-primary"><window.Icon name="download" size={14}/> Pobierz</button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: "32px 0 80px" }}>
          <button className="btn btn-apricot btn-lg" onClick={() => setRoute({ page: "shop" })}>Wróć do sklepu <window.Icon name="arrow" size={16}/></button>
        </div>
      </div>
    </>
  );
};

// ============ EXPORT ============
Object.assign(window, { Shop, ProductDetail, CartDrawer, Checkout, Purchases, SHOP_PRODUCTS, getShopProduct: getProduct });
