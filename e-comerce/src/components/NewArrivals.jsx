import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NEW_ARRIVALS = [
  [
    { label:"Smart Sound",  title:["Smart Sound with","Smart System"],  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85&auto=format" },
    { label:"New Arrivals", title:["Virtual Reality","Experience"],      img:"https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=85&auto=format" },
    { label:"Top Arrivals", title:["CC Camera","Collection"],            img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=85&auto=format" },
  ],
  [
    { label:"New Arrivals", title:["Smartphone","Collection"],           img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=85&auto=format" },
    { label:"New Camera",   title:["New Camera","collections"],          img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=85&auto=format" },
    { label:"Top Picks",    title:["Premium Audio","Headphones"],        img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=85&auto=format" },
  ],
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
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// BANNER CARD
// ─────────────────────────────────────────────
function BannerCard({ item, height = 240, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ height }}
      >
        {/* Image */}
        <img
          src={item.img}
          alt={item.title[0]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay — bottom-up gradient for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
          <p className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.16em] mb-1.5">
            {item.label}
          </p>
          <h3 className="text-[15px] font-extrabold leading-snug text-white mb-4">
            {item.title[0]}<br />{item.title[1]}
          </h3>
          <button className="text-[11px] font-bold bg-white/10 backdrop-blur-sm border border-white/20
            text-white px-4 py-2 rounded-lg w-fit
            hover:bg-white/25 transition-colors duration-200">
            Buy Now →
          </button>
        </div>

        {/* Border */}
        <div className="absolute inset-0 border border-white/[0.07] rounded-2xl pointer-events-none
          group-hover:border-white/[0.15] transition-colors duration-300" />
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="mb-1">
      <h2 className="text-3xl font-extrabold tracking-tight text-white">{children}</h2>
      <span className="block h-0.5 w-10 rounded-sm mt-3 bg-gradient-to-r from-white/60 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────
// NEW ARRIVALS
// ─────────────────────────────────────────────
export default function NewArrivals() {
  return (
    <section className="max-w-[1280px] mx-auto px-10 pt-20 pb-20">

      {/* Header */}
      <Reveal>
        <div className="flex justify-between items-end mb-10">
          <div>
            <SectionTitle>New Arrivals</SectionTitle>
            <p className="text-xs text-neutral-500 mt-3 max-w-[340px] leading-relaxed">
              The latest drops — fresh gear landing every week.
            </p>
          </div>
          <button className="text-xs font-semibold text-neutral-500 bg-transparent border border-neutral-800
            px-5 py-2.5 rounded-xl cursor-pointer hover:border-neutral-600 hover:text-white transition-all duration-200">
            View All →
          </button>
        </div>
      </Reveal>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {NEW_ARRIVALS[0].map((item, i) => (
          <BannerCard key={i} item={item} height={240} delay={i * 70} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-5">
        {NEW_ARRIVALS[1].map((item, i) => (
          <BannerCard key={i} item={item} height={220} delay={i * 70} />
        ))}
      </div>

    </section>
  );
}