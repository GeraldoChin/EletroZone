import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCTS = [
  { name:"Smart Phone 12",       cat:"Smart Phone", price:"Tk 3,490",   old:"Tk 4,200",  badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=85&auto=format" },
  { name:"Mason Microwave Oven", cat:"Microwave",   price:"Tk 40,925",                   badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=85&auto=format" },
  { name:"Orex Blender",         cat:"Blender",     price:"Tk 165,600",                  badge:"hot",  stars:5, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=85&auto=format" },
  { name:"LF 7 Pro",             cat:"Gaming",      price:"Tk 56,200",  old:"Tk 70,000", badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&q=85&auto=format" },
  { name:"Xenic CC Camera",      cat:"Camera",      price:"Tk 13,800",                   badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=85&auto=format" },
  { name:"Mango Router",         cat:"Network",     price:"Tk 56,800",                   badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&q=85&auto=format" },
  { name:"Olea Water Purifier",  cat:"Purifier",    price:"Tk 58,000",                   badge:"hot",  stars:3, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&auto=format" },
  { name:'Mackbook Pro 15"',     cat:"Laptop",      price:"Tk 90,300",                   badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=85&auto=format" },
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
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
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
    sale: "bg-red-500 text-white",
    new:  "bg-emerald-500 text-white",
    hot:  "bg-amber-500 text-white",
  };
  return (
    <span className={`absolute top-3 left-3 z-10 ${styles[type]} text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase`}>
      {type}
    </span>
  );
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#d1d5db"}
          strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
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
      onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition-all duration-200
        ${liked
          ? "bg-red-500 text-white scale-110"
          : "bg-white text-gray-400 hover:text-red-500 shadow-sm"
        }`}
      aria-label="Wishlist"
    >
      <svg width="13" height="13" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product, delay = 0 }) {
  const [inCart, setInCart] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]
        transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">

        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && <Badge type={product.badge} />}
          <WishlistBtn />
        </div>

        {/* Body */}
        <div className="p-4">

          {/* Category */}
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1.5">
            {product.cat}
          </p>

          {/* Name */}
          <h4 className="text-[13px] font-bold text-gray-900 leading-snug mb-2 line-clamp-1">
            {product.name}
          </h4>

          {/* Stars */}
          <Stars count={product.stars} />

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-black text-gray-900">{product.price}</span>
              {product.old && (
                <span className="text-[11px] text-gray-400 line-through">{product.old}</span>
              )}
            </div>

            {/* Cart button — always visible, compact */}
            <button
              onClick={() => setInCart(v => !v)}
              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-xl
                transition-all duration-200 border-0 cursor-pointer
                ${inCart
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
            >
              {inCart ? (
                <>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  Add
                </>
              )}
            </button>
          </div>

        </div>

        {/* Bottom accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export default function HighlyRecommended() {
  return (
    <section className="bg-[#f9f9f9] py-20">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header */}
        <Reveal>
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Curated picks
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Highly Recommended
              </h2>
              <div className="h-[2px] w-10 rounded-sm mt-2.5 bg-gray-900" />
              <p className="text-xs text-gray-400 mt-3 max-w-[380px] leading-relaxed">
                Handpicked products that shape the way we live and interact with technology.
              </p>
            </div>
            <button className="text-xs font-semibold text-gray-600
              px-5 py-2.5 rounded-xl cursor-pointer border border-gray-200
              hover:border-gray-900 hover:text-gray-900
              transition-all duration-200 bg-white">
              View All →
            </button>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-5">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={(i % 4) * 60} />
          ))}
        </div>

      </div>
    </section>
  );
}