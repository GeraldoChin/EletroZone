import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const INSTAGRAM_IMGS = [
  { img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80&auto=format", likes: "2.4k", comments: "38" },
  { img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&auto=format", likes: "1.8k", comments: "24" },
  { img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80&auto=format", likes: "3.1k", comments: "57" },
  { img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80&auto=format", likes: "980",  comments: "15" },
  { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format", likes: "4.2k", comments: "93" },
  { img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80&auto=format", likes: "2.7k", comments: "41" },
];

// ─────────────────────────────────────────────
// REVEAL
// ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
        ${vis ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ children, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl font-extrabold tracking-tight text-white">{children}</h2>
      <span
        className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-white to-white/10"
        style={center ? { margin: "8px auto 0" } : {}}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// INSTAGRAM CARD
// ─────────────────────────────────────────────
function InstagramCard({ item, delay = 0 }) {
  const [liked, setLiked] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer">

        {/* Image */}
        <img
          src={item.img}
          alt="Instagram post"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300" />

        {/* Instagram icon top-right */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100
          transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur border border-white/20
            flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
            </svg>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4
          opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">

          {/* Likes */}
          <button
            onClick={() => setLiked(l => !l)}
            className="flex flex-col items-center gap-1.5 group/like"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur border transition-all duration-200
              ${liked
                ? "bg-red-500/80 border-red-400 scale-110"
                : "bg-white/10 border-white/20 group-hover/like:bg-white/20"
              }`}>
              <svg width="18" height="18" fill={liked ? "white" : "none"} stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <span className="text-white text-[11px] font-bold drop-shadow">{item.likes}</span>
          </button>

          {/* Comments */}
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-full flex items-center justify-center
              bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors">
              <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <span className="text-white text-[11px] font-bold drop-shadow">{item.comments}</span>
          </button>

        </div>

        {/* Border */}
        <div className="absolute inset-0 border border-white/[0.06] rounded-2xl pointer-events-none
          group-hover:border-white/20 transition-colors duration-300" />

      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// INSTAGRAM SHOP
// ─────────────────────────────────────────────
export default function InstagramShop() {
  return (
    <section className="max-w-[1280px] mx-auto px-12 pb-20">

      {/* Header */}
      <Reveal>
        <div className="text-center mb-10">
          <SectionTitle center>Instagram Shop</SectionTitle>

          {/* ✅ Handle — tag <a corrigida */}
          
            <a href="#"
            className="inline-flex items-center gap-2 mt-4 text-[13px] font-semibold text-neutral-500
              hover:text-white transition-colors duration-200 no-underline group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" className="group-hover:text-pink-400 transition-colors">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            @elexy.store
          </a>

          <p className="text-xs text-neutral-700 mt-2 max-w-[340px] mx-auto leading-relaxed">
            Follow us on Instagram for daily drops, tech reviews and exclusive deals.
          </p>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-3">
        {INSTAGRAM_IMGS.map((item, i) => (
          <InstagramCard key={i} item={item} delay={i * 55} />
        ))}
      </div>

      {/* ✅ Follow CTA — tag <a corrigida */}
      <Reveal delay={200}>
        <div className="flex justify-center mt-8">
          
            <a href="#"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-600/20 to-purple-600/20
              border border-pink-500/20 text-white text-[13px] font-bold
              px-7 py-3 rounded-xl no-underline
              hover:from-pink-600/30 hover:to-purple-600/30 hover:border-pink-500/40
              hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </Reveal>

    </section>
  );
}