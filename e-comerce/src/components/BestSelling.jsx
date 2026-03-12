import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const BEST_SELLING = [
  { name:"Smart Phone 12",   price:"Tk 3,490",  img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=80&auto=format" },
  { name:"Computer Laptop",  price:"Tk 50,490", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80&auto=format" },
  { name:"AOIXI CC Camera",  price:"Tk 13,800", img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&q=80&auto=format" },
  { name:"Imax Camera",      price:"Tk 56,200", img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80&auto=format" },
  { name:"HD Panel 22",      price:"Tk 22,500", img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=80&auto=format" },
  { name:"LF 7 pro",         price:"Tk 56,200", img:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=300&q=80&auto=format" },
  { name:"Mackbook pro",     price:"Tk 90,300", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80&auto=format" },
  { name:"Mango Router",     price:"Tk 56,800", img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&q=80&auto=format" },
  { name:"Olea Purifier",    price:"Tk 58,000", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80&auto=format" },
  { name:"Energy Planner",   price:"Tk 67,280", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80&auto=format" },
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
      <svg width="13" height="13" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD (compact — white theme)
// ─────────────────────────────────────────────
function ProductCard({ product, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
        hover:border-gray-200 transition-all duration-300">

        {/* Image */}
        <div className="overflow-hidden relative bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
            style={{ height: 155 }}
          />
          <WishlistBtn />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10
            bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
        </div>

        {/* Body */}
        <div className="p-3 pb-3.5">
          <h4 className="text-[12px] font-bold leading-tight text-gray-900 mb-1.5 truncate">
            {product.name}
          </h4>
          <span className="text-[13px] font-black text-gray-900">{product.price}</span>

          {/* Add to cart */}
          <button className="hidden group-hover:flex w-full mt-2.5 items-center justify-center gap-1.5
            bg-gray-900 text-white text-[11px] font-bold py-2 rounded-xl
            hover:bg-gray-700 transition-colors duration-200 border-0 cursor-pointer">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Add to Cart
          </button>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5
          bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900
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
// BEST SELLING
// ─────────────────────────────────────────────
export default function BestSelling() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header */}
        <Reveal>
          <div className="flex justify-between items-end mb-9">
            <div>
              <SectionTitle>Best Selling Products</SectionTitle>
              <p className="text-xs text-gray-400 mt-2.5 max-w-[400px] leading-relaxed">
                Our most loved products — chosen by thousands of happy customers.
              </p>
            </div>
            <button className="text-xs font-semibold text-gray-500 bg-white border border-gray-200
              px-5 py-2 rounded-xl cursor-pointer hover:border-gray-400 hover:text-gray-900
              transition-colors shadow-sm">
              View All
            </button>
          </div>
        </Reveal>

        {/* Grid 5 cols */}
        <div className="grid grid-cols-5 gap-4">
          {BEST_SELLING.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={(i % 5) * 55} />
          ))}
        </div>

      </div>
    </section>
  );
}