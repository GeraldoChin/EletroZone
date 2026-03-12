import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// ANIMATIONS CSS
// ─────────────────────────────────────────────
const ANIM_CSS = `
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCTS = [
  { name:"Smart Phone 12",       cat:"Smart Phone",  price:"Tk 3,490.00",   old:"Tk 4,200",   badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=85&auto=format" },
  { name:"Mason Microwave Oven", cat:"Microwave",    price:"Tk 40,925.00",                    badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=85&auto=format" },
  { name:"Orex Blender",         cat:"Blender",      price:"Tk 165,600.00",                   badge:"hot",  stars:5, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=85&auto=format" },
  { name:"LF 7 pro",             cat:"Gaming",       price:"Tk 56,200.00",  old:"Tk 70,000",  badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&q=85&auto=format" },
  { name:"Xenic CC Camera",      cat:"Camera",       price:"Tk 13,800.00",                    badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=85&auto=format" },
  { name:"Mango Router",         cat:"Network",      price:"Tk 56,800.00",                    badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&q=85&auto=format" },
  { name:"Olea Water Purifier",  cat:"Purifier",     price:"Tk 58,000.00",                    badge:"hot",  stars:3, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&auto=format" },
  { name:"Mackbook Pro 15\"",    cat:"Laptop",       price:"Tk 90,300.00",                    badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=85&auto=format" },
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
// BADGE
// ─────────────────────────────────────────────
function Badge({ type }) {
  const styles = {
    sale: "bg-red-600",
    new:  "bg-green-600",
    hot:  "bg-amber-600",
  };
  return (
    <span className={`absolute top-2 left-2 z-10 ${styles[type]} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wide uppercase`}>
      {type}
    </span>
  );
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="text-yellow-400 text-xs tracking-tight">
      {"★".repeat(count)}
      <span className="text-neutral-700">{"★".repeat(5 - count)}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// WISHLIST BUTTON
// ─────────────────────────────────────────────
function WishlistBtn() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked(l => !l)}
      className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center
        backdrop-blur border transition-all duration-200
        opacity-0 group-hover:opacity-100
        ${liked
          ? "bg-red-600/80 border-red-500 text-white"
          : "bg-black/60 border-white/10 text-white hover:bg-red-600/40 hover:border-red-500/60"
        }`}
      aria-label="Add to wishlist"
    >
      <svg width="14" height="14" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product, delay = 0, imgH = 195 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-gradient-to-b from-neutral-900 to-neutral-950
        border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-2 hover:scale-[1.01]
        hover:shadow-[0_28px_64px_rgba(0,0,0,.65),0_0_0_1px_rgba(255,255,255,.055)]
        hover:border-neutral-700
        transition-all duration-300">

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none z-[1]" />

        {/* Image */}
        <div className="overflow-hidden relative">
          <img
            src={product.img}
            alt={product.name}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
            style={{ height: imgH }}
          />
          {product.badge && <Badge type={product.badge} />}
          <WishlistBtn />
        </div>

        {/* Body */}
        <div className="p-3.5 pb-4 relative z-[2]">

          {/* Category */}
          {product.cat && (
            <p className="text-[10px] text-neutral-600 mb-1 uppercase tracking-wider">
              {product.cat}
            </p>
          )}

          {/* Name */}
          <h4 className="text-[13px] font-bold leading-tight mb-2 text-white">
            {product.name}
          </h4>

          {/* Stars */}
          {product.stars && <Stars count={product.stars} />}

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-black text-white">{product.price}</span>
            {product.old && (
              <span className="text-[11px] text-neutral-600 line-through">{product.old}</span>
            )}
          </div>

          {/* Add to cart */}
          <button className="hidden group-hover:block w-full mt-2.5
            bg-white/[0.055] border border-white/[0.075] rounded-xl
            text-neutral-400 text-xs font-semibold py-2 cursor-pointer
            hover:bg-white/[0.14] hover:text-white transition-colors duration-200">
            + Add to Cart
          </button>

        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-extrabold tracking-tight text-white">{children}</h2>
      <span className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-white to-white/10" />
    </div>
  );
}

// ─────────────────────────────────────────────
// APP — HIGHLY RECOMMENDED SECTION
// ─────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ANIM_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen text-white px-12 py-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-9">
          <div>
            <SectionTitle>Highly Recommended</SectionTitle>
            <p className="text-xs text-neutral-600 mt-2.5 max-w-[400px] leading-relaxed">
              Handpicked products that shape the way we live and interact with technology.
            </p>
          </div>
          <button className="text-xs font-semibold text-neutral-500 bg-transparent border border-neutral-800
            px-5 py-2 rounded-xl cursor-pointer hover:border-neutral-600 hover:text-white transition-colors">
            View All
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={(i % 4) * 60} />
          ))}
        </div>

      </div>
    </div>
  );
}