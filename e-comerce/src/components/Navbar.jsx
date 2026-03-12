import { useState, useEffect } from "react";

// ─── Icons ───────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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

// ─── Nav Links ────────────────────────────────
const NAV_LINKS = [
  { label: "Home",     href: "#", active: true },
  { label: "Shop",     href: "#" },
  { label: "Products", href: "#", hasDropdown: true },
  { label: "Pages",    href: "#" },
  { label: "Contact",  href: "#" },
];

// ─── Navbar ───────────────────────────────────
export default function Navbar({ cartCount = 3 }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────
          Sobe e desaparece ao scrollar via transform      */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] bg-[#0a0a0a] border-b border-[#141414]
          text-[11px] text-[#555] px-12 flex justify-between items-center h-[33px]
          transition-transform duration-300 ease-in-out"
        style={{ transform: scrolled ? "translateY(-100%)" : "translateY(0)" }}
      >
        <span>
          🚚 <span className="text-[#888]">Free delivery</span> on orders over{" "}
          <strong className="text-[#ddd]">$100</strong>
        </span>
        <div className="flex gap-5">
          {["Track order", "FAQ", "EN ▾"].map((t) => (
            <span key={t} className="cursor-pointer transition-colors hover:text-[#bbb]">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────
          • Quando não scrollado: top-[33px], bg transparente
          • Quando scrollado: sobe para top-0, bg sólido     */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          top: scrolled ? "0px" : "33px",
          background: scrolled
            ? "rgba(8,8,8,0.92)"
            : "rgba(8,8,8,1)",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.055)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-12 h-[66px] flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="#"
            className="text-[26px] font-black tracking-[-1.5px] text-white no-underline shrink-0 hover:opacity-80 transition-opacity">
            ElectroZone
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#666]">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                className={[
                  "no-underline transition-colors hover:text-white flex items-center gap-1",
                  link.active ? "text-white font-semibold" : "",
                ].join(" ")}>
                {link.label}
                {link.hasDropdown && (
                  <span className="mt-0.5 opacity-60"><ChevronDown /></span>
                )}
              </a>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 text-[#666]">

            {/* Search */}
            <div className="relative hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5">
                  <SearchIcon />
                  <input
                    autoFocus
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                    placeholder="Search products..."
                    className="bg-transparent text-white text-[12px] outline-none w-40 placeholder:text-[#555]"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchValue(""); }}
                    className="text-[#555] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[#666] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0">
                  <SearchIcon />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button className="hidden md:flex text-[#666] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
              <HeartIcon />
            </button>

            {/* Cart */}
            <button className="relative text-[#666] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <button className="hidden md:flex text-[#666] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
              <UserIcon />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-[#666] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          "bg-[#0d0d0d]/95 backdrop-blur-2xl border-t border-white/[0.05]",
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}>
          <div className="px-6 py-5 flex flex-col gap-1">

            {/* Mobile search */}
            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 mb-3">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent text-white text-[13px] outline-none flex-1 placeholder:text-[#444]"
              />
            </div>

            {/* Mobile links */}
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "no-underline py-3 px-4 rounded-xl text-[14px] font-medium transition-colors flex items-center justify-between",
                  link.active
                    ? "text-white bg-white/[0.06]"
                    : "text-[#666] hover:text-white hover:bg-white/[0.04]",
                ].join(" ")}>
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </a>
            ))}

            {/* Mobile bottom actions */}
            <div className="flex gap-3 mt-3 pt-4 border-t border-white/[0.06]">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                bg-white/[0.04] border border-white/[0.07] text-[#666] hover:text-white
                text-[12px] font-medium transition-colors cursor-pointer">
                <HeartIcon /> Wishlist
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                bg-white/[0.04] border border-white/[0.07] text-[#666] hover:text-white
                text-[12px] font-medium transition-colors cursor-pointer">
                <UserIcon /> Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Spacer: 33px (announcement) + 66px (navbar) = 99px */}
      <div className="h-[99px]" />
    </>
  );
}