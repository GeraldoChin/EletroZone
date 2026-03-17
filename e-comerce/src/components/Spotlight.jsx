import { useState, useEffect, useRef } from "react";

const Reveal = ({ children, dir = "up", delay = 0, className = "" }) => {
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

  const hidden = {
    up:    "opacity-0 translate-y-10",
    left:  "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
    scale: "opacity-0 scale-95",
  }[dir];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${vis ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SPECS = [
  { label: "Display",  value: '6.7" OLED'   },
  { label: "Camera",   value: "48MP Pro"     },
  { label: "Battery",  value: "5,000 mAh"   },
  { label: "Storage",  value: "Up to 1TB"   },
];

export default function Spotlight() {
  return (
    <section className="bg-[#060606] relative overflow-hidden py-24">

      {/* Glow blobs */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full pointer-events-none top-[-300px] right-[-100px]"
        style={{ filter: "blur(140px)", background: "radial-gradient(circle,rgba(37,99,235,.1),transparent 70%)" }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none bottom-[-150px] left-[-100px]"
        style={{ filter: "blur(100px)", background: "rgba(6,182,212,.05)" }}
      />

      <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-2 items-center gap-20">

        {/* ── Left: info ── */}
        <Reveal dir="left">

          {/* Chip */}
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3.5 py-1.5 text-[11px] font-semibold text-blue-400 mb-5">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Featured Product
          </div>

          {/* Title */}
          <h2
            className="font-black leading-[1.06] tracking-[-2px] mb-4 text-white"
            style={{ fontSize: "clamp(34px,4.2vw,56px)" }}
          >
            Smart Phone 12
            <br />
            <span className="text-neutral-800 text-[0.68em] font-bold">Pro Edition</span>
          </h2>

          {/* Description */}
          <p className="text-neutral-600 text-sm leading-relaxed mb-8 max-w-[440px]">
            The most advanced camera system ever on a smartphone. Cinematic mode
            with 4K. ProRes video. Action mode. All in Pro.
          </p>

          {/* Spec grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {SPECS.map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/[0.025] border border-white/[0.055] rounded-xl p-3.5 hover:border-white/[0.14] transition-colors"
              >
                <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-bold mt-1 text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-5">
            <div>
              <span className="text-3xl font-black text-white">Tk 3,490</span>
              <span className="text-sm text-neutral-700 line-through ml-2.5">Tk 4,800</span>
            </div>
            <button className="bg-white text-black font-black text-[13px] px-7 py-3 rounded-xl border-0 cursor-pointer hover:opacity-85 hover:-translate-y-0.5 transition-all">
              Add to Cart
            </button>
          </div>

        </Reveal>

        {/* ── Right: video ── */}
        <Reveal dir="right" className="flex justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-[520px] object-contain transition-all duration-[900ms] hover:scale-[1.025] hover:-translate-y-2"
            style={{
              maxHeight: 540,
              filter: "drop-shadow(0 60px 120px rgba(0,0,20,0.95))",
            }}
          >
            <source src="/video/video.mp4" type="video/mp4" />
          </video>
        </Reveal>

      </div>
    </section>
  );
}
