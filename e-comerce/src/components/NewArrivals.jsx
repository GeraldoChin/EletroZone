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
function BannerCard({ item, height = 218, delay = 0 }) {
  return (
    <Reveal delay={delay}>
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-transparent flex flex-col justify-end p-7">
          <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-2">
            {item.label}
          </p>
          <h3 className="text-lg font-extrabold leading-tight text-white mb-3">
            {item.title[0]}<br />{item.title[1]}
          </h3>
          <button className="text-xs font-bold bg-white/10 backdrop-blur-sm border border-white/20
            text-white px-4 py-1.5 rounded-lg w-fit
            hover:bg-white/25 transition-colors duration-200">
            Buy Now →
          </button>
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 border border-white/[0.07] rounded-2xl pointer-events-none
          group-hover:border-white/20 transition-colors duration-300" />
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ children, center = false }) {
  return (
    <div className={center ? "text-center mb-11" : "mb-2"}>
      <h2 className="text-2xl font-extrabold tracking-tight text-white">{children}</h2>
      <span
        className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-white to-white/10"
        style={center ? { margin: "8px auto 0" } : {}}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// NEW ARRIVALS
// ─────────────────────────────────────────────
export default function NewArrivals() {
  return (
    <section className="max-w-[1280px] mx-auto px-12 pt-20">

      {/* Header */}
      <Reveal>
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionTitle>New Arrivals</SectionTitle>
            <p className="text-xs text-neutral-600 mt-2.5 max-w-[400px] leading-relaxed">
              The latest drops — fresh gear landing every week.
            </p>
          </div>
          <button className="text-xs font-semibold text-neutral-500 bg-transparent border border-neutral-800
            px-5 py-2 rounded-xl cursor-pointer hover:border-neutral-600 hover:text-white transition-colors">
            View All
          </button>
        </div>
      </Reveal>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {NEW_ARRIVALS[0].map((item, i) => (
          <BannerCard key={i} item={item} height={218} delay={i * 70} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        {NEW_ARRIVALS[1].map((item, i) => (
          <BannerCard key={i} item={item} height={200} delay={i * 70} />
        ))}
      </div>

    </section>
  );
}