import { useState, useEffect } from "react";

const SearchIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const HeartIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const CartIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
const UserIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const ChevronDown = () => (
  <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const NAV_LINKS = [
  { label: "Início",    href: "#", active: true },
  { label: "Loja",      href: "#" },
  { label: "Produtos",  href: "#", hasDropdown: true },
  { label: "Páginas",   href: "#" },
  { label: "Contacto",  href: "#" },
];

// ── Botão de ícone ──────────────────────
function IconBtn({ isDark, onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-xl bg-transparent border-none cursor-pointer transition-all duration-200 hover:scale-110 ${className}`}
      style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#888" }}
      onMouseOver={e => {
        e.currentTarget.style.color      = isDark ? "#fff" : "#111";
        e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.color      = isDark ? "rgba(255,255,255,0.5)" : "#888";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

// ── Navbar ──────────────────────────────────
export default function Navbar({ cartCount = 3 }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDark = !scrolled;

  return (
    <>
      {/* ── Barra de anúncio ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[33px] flex items-center justify-between px-12 text-[11px] transition-transform duration-500 ease-in-out"
        style={{
          transform:    scrolled ? "translateY(-100%)" : "translateY(0)",
          background:   "rgba(5,5,5,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[#666]">
          🚚 <span className="text-[#888]">Envio grátis</span> em compras acima de{" "}
          <strong className="text-[#ccc]">$100</strong>
        </span>
        <div className="flex gap-5">
          {["Rastrear encomenda", "FAQ", "PT ▾"].map((t) => (
            <span key={t} className="text-[#555] cursor-pointer hover:text-[#bbb] transition-colors">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Navbar principal ── */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out"
        style={{
          top:          scrolled ? "0px" : "33px",
          background:   scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow:    scrolled
            ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.07)"
            : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-12 h-[66px] flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="#"
            className="text-[25px] font-black tracking-[-1.5px] no-underline shrink-0 transition-colors duration-500"
            style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}>
            Elektro
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-7 text-[13px]">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                className="no-underline transition-all duration-300 flex items-center gap-1 relative group"
                style={{
                  color: link.active
                    ? (isDark ? "#ffffff"              : "#0a0a0a")
                    : (isDark ? "rgba(255,255,255,0.45)" : "#888888"),
                  fontWeight: link.active ? 700 : 500,
                }}>
                {link.label}
                {link.hasDropdown && <span className="opacity-50 mt-0.5"><ChevronDown /></span>}

                {/* Sublinhado ativo */}
                {link.active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px rounded-full transition-all duration-500"
                    style={{ background: isDark ? "rgba(255,255,255,0.5)" : "#0a0a0a" }} />
                )}
                {/* Sublinhado hover */}
                {!link.active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: isDark ? "rgba(255,255,255,0.3)" : "#cccccc" }} />
                )}
              </a>
            ))}
          </div>

          {/* Lado direito */}
          <div className="flex items-center gap-1">

            {/* Pesquisa */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 rounded-full px-4 py-1.5 transition-all duration-300"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                  }}>
                  <span style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#999" }}><SearchIcon /></span>
                  <input
                    autoFocus type="text" value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
                    placeholder="Pesquisar produtos..."
                    className="bg-transparent text-[12px] outline-none w-36"
                    style={{ color: isDark ? "#fff" : "#111" }}
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchValue(""); }}
                    className="bg-transparent border-none cursor-pointer p-0"
                    style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#aaa" }}>
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <IconBtn isDark={isDark} onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconBtn>
              )}
            </div>

            <IconBtn isDark={isDark} className="hidden md:flex"><HeartIcon /></IconBtn>

            {/* Carrinho */}
            <div className="relative">
              <IconBtn isDark={isDark}><CartIcon /></IconBtn>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>

            <IconBtn isDark={isDark} className="hidden md:flex"><UserIcon /></IconBtn>

            {/* Divisor */}
            <div className="hidden md:block w-px h-5 mx-2 transition-colors duration-500"
              style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />

            {/* CTA */}
            <button
              className="hidden md:flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-xl border-0 cursor-pointer transition-all duration-300 hover:-translate-y-px active:scale-95"
              style={isDark
                ? { background: "#ffffff", color: "#0a0a0a" }
                : { background: "#0a0a0a", color: "#ffffff" }
              }>
              Comprar
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border-none cursor-pointer"
              style={{ color: isDark ? "rgba(255,255,255,0.7)" : "#555" }}
              aria-label="Abrir menu">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight:    mobileOpen ? "480px" : "0px",
            opacity:      mobileOpen ? 1 : 0,
            background:   scrolled ? "rgba(255,255,255,0.98)" : "rgba(6,6,6,0.96)",
            borderTop:    `1px solid ${scrolled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            backdropFilter: "blur(24px)",
          }}>
          <div className="px-6 py-5 flex flex-col gap-1">
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-3"
              style={{
                background: scrolled ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${scrolled ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
              }}>
              <span style={{ color: scrolled ? "#999" : "#555" }}><SearchIcon /></span>
              <input type="text" placeholder="Pesquisar produtos..."
                className="bg-transparent text-[13px] outline-none flex-1"
                style={{ color: scrolled ? "#111" : "#fff" }} />
            </div>

            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="no-underline py-3 px-4 rounded-xl text-[14px] font-medium transition-colors flex items-center justify-between"
                style={{
                  color: link.active
                    ? (scrolled ? "#0a0a0a" : "#fff")
                    : (scrolled ? "#888"    : "#555"),
                  background: link.active
                    ? (scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)")
                    : "transparent",
                }}>
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </a>
            ))}

            <div className="flex gap-3 mt-3 pt-4"
              style={{ borderTop: `1px solid ${scrolled ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}` }}>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-semibold cursor-pointer border-0 transition-colors"
                style={{
                  background: scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
                  color:      scrolled ? "#555" : "#666",
                  border: `1px solid ${scrolled ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <HeartIcon /> Favoritos
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-semibold cursor-pointer border-0 transition-colors"
                style={{
                  background: scrolled ? "#0a0a0a" : "#ffffff",
                  color:      scrolled ? "#ffffff" : "#0a0a0a",
                }}>
                <UserIcon /> Conta
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}