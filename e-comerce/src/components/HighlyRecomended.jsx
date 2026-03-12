import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCTS = [
  { name:"Smart Phone 12",       cat:"Smart Phone", price:"Tk 3,490.00",  old:"Tk 4,200",  badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=85&auto=format" },
  { name:"Mason Microwave Oven", cat:"Microwave",   price:"Tk 40,925.00",                  badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=85&auto=format" },
  { name:"Orex Blender",         cat:"Blender",     price:"Tk 165,600.00",                 badge:"hot",  stars:5, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=85&auto=format" },
  { name:"LF 7 pro",             cat:"Gaming",      price:"Tk 56,200.00", old:"Tk 70,000", badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&q=85&auto=format" },
  { name:"Xenic CC Camera",      cat:"Camera",      price:"Tk 13,800.00",                  badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=85&auto=format" },
  { name:"Mango Router",         cat:"Network",     price:"Tk 56,800.00",                  badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&q=85&auto=format" },
  { name:"Olea Water Purifier",  cat:"Purifier",    price:"Tk 58,000.00",                  badge:"hot",  stars:3, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&auto=format" },
  { name:'Mackbook Pro 15"',     cat:"Laptop",      price:"Tk 90,300.00",                  badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=85&auto=format" },
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
    sale: "bg-red-500 text-white",
    new:  "bg-emerald-500 text-white",
    hot:  "bg-amber-500 text-white",
  };
  return (
    <span className={`absolute top-2.5 left-2.5 z-10 ${styles[type]} text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase shadow-sm`}>
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
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
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
      onClick={() => setLiked(l => !l)}
      className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full
        flex items-center justify-center border shadow-sm
        opacity-0 group-hover:opacity-100 transition-all duration-200
        ${liked
          ? "bg-red-500 border-red-400 text-white scale-110"
          : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300"
        }`}
      aria-label="Wishlist"
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
function ProductCard({ product, delay = 0, imgH = 200 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        hover:border-gray-200 transition-all duration-300">

        {/* Image area */}
        <div className="overflow-hidden relative bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
            style={{ height: imgH }}
          />
          {product.badge && <Badge type={product.badge} />}
          <WishlistBtn />

          {/* Subtle gradient at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-12
            bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        </div>

        {/* Body */}
        <div className="p-4 pb-4">

          {/* Category */}
          {product.cat && (
            <p className="text-[10px] text-gray-400 mb-1.5 uppercase tracking-widest font-medium">
              {product.cat}
            </p>
          )}

          {/* Name */}
          <h4 className="text-[13px] font-bold leading-tight mb-2 text-gray-900">
            {product.name}
          </h4>

          {/* Stars */}
          {product.stars && <Stars count={product.stars} />}

          {/* Price */}
          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[15px] font-black text-gray-900">{product.price}</span>
            {product.old && (
              <span className="text-[11px] text-gray-400 line-through">{product.old}</span>
            )}
          </div>

          {/* Add to cart */}
          <button className="hidden group-hover:flex w-full mt-3 items-center justify-center gap-1.5
            bg-gray-900 text-white text-xs font-bold py-2.5 rounded-xl
            hover:bg-gray-700 transition-colors duration-200 border-0 cursor-pointer">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Add to Cart
          </button>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

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
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{children}</h2>
      <span className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-gray-900 to-gray-200" />
    </div>
  );
}

// ─────────────────────────────────────────────
// HIGHLY RECOMMENDED
// ─────────────────────────────────────────────
export default function HighlyRecommended() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header */}
        <Reveal>
          <div className="flex justify-between items-end mb-9">
            <div>
              <SectionTitle>Highly Recommended</SectionTitle>
              <p className="text-xs text-gray-400 mt-2.5 max-w-[400px] leading-relaxed">
                Handpicked products that shape the way we live and interact with technology.
              </p>
            </div>
            <button className="text-xs font-semibold text-gray-500 bg-white border border-gray-200
              px-5 py-2 rounded-xl cursor-pointer hover:border-gray-400 hover:text-gray-900
              transition-colors shadow-sm">
              View All
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