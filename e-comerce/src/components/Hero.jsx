import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────
// KEYFRAME ANIMATIONS (injected once)
// ─────────────────────────────────────────────
const HERO_CSS = `
  @keyframes fuUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes imgIn {
    from { opacity: 0; transform: translateX(60px) scale(.94); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes spinCW  { to { transform: rotate(360deg);  } }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }
  @keyframes scrollBounce {
    0%, 100% { opacity: .5; transform: scaleY(1); }
    50%       { opacity: 1;  transform: scaleY(.5); }
  }
  @keyframes dotBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: .25; }
  }

  /* slide text animations — triggered by .slide-active class */
  .slide-active .anim-label { animation: fuUp .65s cubic-bezier(.22,1,.36,1) .08s both; }
  .slide-active .anim-h1    { animation: fuUp .75s cubic-bezier(.22,1,.36,1) .18s both; }
  .slide-active .anim-p     { animation: fuUp .70s cubic-bezier(.22,1,.36,1) .32s both; }
  .slide-active .anim-btns  { animation: fuUp .70s cubic-bezier(.22,1,.36,1) .42s both; }
  .slide-active .anim-pills { animation: fuUp .70s cubic-bezier(.22,1,.36,1) .52s both; }
  .slide-active .anim-img   { animation: imgIn .95s cubic-bezier(.22,1,.36,1) .12s both; }

  .ring-cw  { animation: spinCW  22s linear infinite; }
  .ring-ccw { animation: spinCCW 18s linear infinite; }

  .scroll-line { animation: scrollBounce 2.2s ease-in-out infinite; }
  .odot-blink  { animation: dotBlink 1.7s ease-in-out infinite; }
`;

// ─────────────────────────────────────────────
// SLIDE DATA
// ─────────────────────────────────────────────
const SLIDES = [
  {
    bg: "#050d18",
    bgWord: "VROT",
    blobs: [
      { w: 750, h: 750, color: "rgba(37,99,235,.16)",  top: "-250px", right: "-80px"  },
      { w: 420, h: 420, color: "rgba(6,182,212,.10)",  bottom: "-120px", right: "380px" },
    ],
    glowColor:  "rgba(37,99,235,.18)",
    ringColor1: "rgba(37,99,235,.10)",
    ringColor2: "rgba(37,99,235,.07)",
    badge:     "DISCOUNT UPTO 75% – HURRY UP!",
    dotColor:  "#38bdf8",
    title:     ["Next generation", "Virtual reality"],
    desc:      "VR is the most quick access to notifications, calls, messages, apps right on your wrist, reducing the constant check.",
    stats: [
      { val: "4.9★", label: "Rating" },
      { val: "12K+", label: "Sold" },
      { val: "-75%", label: "Off Today", color: "#38bdf8" },
    ],
    img:    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=900&q=90&auto=format",
    imgAlt: "VR Headset",
    reverseSpin: false,
  },
  {
    bg: "#0d0518",
    bgWord: "PRO",
    blobs: [
      { w: 650, h: 650, color: "rgba(100,50,220,.15)", top: "-200px", right: "-60px"  },
      { w: 360, h: 360, color: "rgba(220,80,180,.08)", bottom: "-100px", right: "320px" },
    ],
    glowColor:  "rgba(124,58,237,.16)",
    ringColor1: "rgba(124,58,237,.10)",
    ringColor2: "rgba(124,58,237,.07)",
    badge:     "UP TO 30% OFF – NEW ARRIVAL",
    dotColor:  "#a78bfa",
    title:     ["And then their", "was pro versions"],
    desc:      "The most powerful smartphone yet. Cutting-edge camera, all-day battery, and lightning-fast performance in your pocket.",
    stats: [
      { val: "5.0★", label: "Rating" },
      { val: "8K+",  label: "Sold" },
      { val: "-30%", label: "Off Today", color: "#a78bfa" },
    ],
    img:    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=90&auto=format",
    imgAlt: "Smartphone Pro",
    reverseSpin: true,
  },
  {
    bg: "#110800",
    bgWord: "SOUND",
    blobs: [
      { w: 700, h: 700, color: "rgba(217,119,6,.13)", top: "-220px", right: "-90px"  },
      { w: 400, h: 400, color: "rgba(239,68,68,.08)", bottom: "-100px", right: "340px" },
    ],
    glowColor:  "rgba(217,119,6,.16)",
    ringColor1: "rgba(217,119,6,.10)",
    ringColor2: "rgba(217,119,6,.07)",
    badge:     "LIMITED OFFER – STUDIO QUALITY",
    dotColor:  "#f59e0b",
    title:     ["Modern & Style", "Headphone"],
    desc:      "Immersive studio-grade sound with active noise cancellation. Feel every beat like never before in your world.",
    stats: [
      { val: "4.8★", label: "Rating" },
      { val: "20K+", label: "Sold" },
      { val: "-50%", label: "Off Today", color: "#f59e0b" },
    ],
    img:    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=90&auto=format",
    imgAlt: "Headphones",
    reverseSpin: false,
  },
];

const DURATION = 5600; // ms per slide

// ─────────────────────────────────────────────
// HERO SLIDER
// ─────────────────────────────────────────────
export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const rafRef   = useRef(null);
  const startRef = useRef(null);
  const barRef   = useRef(null);

  // Inject keyframes once
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = HERO_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  // Progress bar → auto-advance
  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (barRef.current) barRef.current.style.width = "0%";
    startRef.current = performance.now();

    const step = (t) => {
      const pct = Math.min((t - startRef.current) / DURATION * 100, 100);
      if (barRef.current) barRef.current.style.width = pct + "%";
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
      else setCur(c => (c + 1) % SLIDES.length);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => { startProgress(); }, [cur, startProgress]);
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const goTo = (i) => setCur(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  // Pause on hover
  const pause = () => cancelAnimationFrame(rafRef.current);
  const resume = () => {
    const elapsed = parseFloat(barRef.current?.style.width || "0") / 100 * DURATION;
    startRef.current = performance.now() - elapsed;
    const step = (t) => {
      const pct = Math.min((t - startRef.current) / DURATION * 100, 100);
      if (barRef.current) barRef.current.style.width = pct + "%";
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
      else setCur(c => (c + 1) % SLIDES.length);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // Touch swipe
  const touchX = useRef(0);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) goTo(cur + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: "100vh", minHeight: 620 }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ── */}
      {SLIDES.map((s, i) => (
        <Slide key={i} slide={s} active={i === cur} />
      ))}

      {/* ── Arrow buttons ── */}
      <ArrowBtn dir="left"  onClick={() => goTo(cur - 1)} />
      <ArrowBtn dir="right" onClick={() => goTo(cur + 1)} />

      {/* ── Dot navigation ── */}
      <div className="absolute bottom-8 right-14 flex gap-2 items-center z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-[3px] rounded-full cursor-pointer border-none transition-all duration-500"
            style={{
              width:      i === cur ? 34 : 8,
              background: i === cur ? "#fff" : "rgba(255,255,255,.22)",
            }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-10" style={{ background: "rgba(255,255,255,.07)" }}>
        <div ref={barRef} className="h-full w-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,.4), #fff)" }} />
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] tracking-[2.5px] uppercase text-[#444]">Scroll</span>
        <div className="scroll-line w-px h-10" style={{ background: "linear-gradient(to bottom, #555, transparent)" }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SLIDE
// ─────────────────────────────────────────────
function Slide({ slide: s, active }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(.4,0,.2,1)] ${active ? "opacity-100 z-[2] pointer-events-auto slide-active" : "opacity-0 z-0 pointer-events-none"}`}
      style={{ background: s.bg }}
    >
      {/* Glow blobs */}
      {s.blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: b.w, height: b.h, background: b.color, top: b.top, right: b.right, bottom: b.bottom, filter: "blur(110px)" }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.035) 3px,rgba(0,0,0,.035) 4px)",
      }} />

      {/* Left vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: "linear-gradient(to right,rgba(5,5,5,1) 0%,rgba(5,5,5,.55) 28%,transparent 58%)",
      }} />

      {/* Giant BG word */}
      <div className="absolute pointer-events-none select-none z-0" style={{
        right: -10, top: "50%", transform: "translateY(-50%)",
        fontSize: "clamp(140px,24vw,280px)",
        fontWeight: 900, letterSpacing: -14, lineHeight: 1,
        color: "rgba(255,255,255,.025)", whiteSpace: "nowrap",
        fontFamily: "'Poppins',sans-serif",
      }}>
        {s.bgWord}
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full flex items-center max-w-[1280px] mx-auto px-12 gap-12">

        {/* ── Left: text ── */}
        <div className="flex-1 max-w-[580px]">

          {/* Badge pill */}
          <div className="anim-label inline-flex items-center gap-2 mb-6 px-[18px] py-[6px] rounded-full text-[11px] font-semibold tracking-[.8px] uppercase"
            style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.09)", backdropFilter: "blur(14px)" }}>
            <span className="odot-blink w-1.5 h-1.5 rounded-full" style={{ background: s.dotColor }} />
            {s.badge}
          </div>

          {/* Headline */}
          <h1 className="anim-h1 font-black leading-[1.03] mb-5" style={{ fontSize: "clamp(44px,5.8vw,76px)", letterSpacing: "-2.5px" }}>
            {s.title[0]}<br />
            <span style={{ color: "rgba(255,255,255,.5)" }}>{s.title[1]}</span>
          </h1>

          {/* Description */}
          <p className="anim-p text-[14px] leading-[1.85] mb-9 max-w-[420px]" style={{ color: "#555" }}>
            {s.desc}
          </p>

          {/* Buttons */}
          <div className="anim-btns flex gap-3.5 mb-10">
            <button className="font-extrabold text-[13px] px-9 py-3.5 rounded-[10px] cursor-pointer transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-95"
              style={{ background: "#fff", color: "#000", border: "none", fontFamily: "'Poppins',sans-serif" }}>
              Buy Now
            </button>
            <button className="font-semibold text-[13px] px-9 py-3.5 rounded-[10px] cursor-pointer transition-all duration-200 text-white hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.14)", backdropFilter: "blur(10px)", fontFamily: "'Poppins',sans-serif" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.38)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.045)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; }}>
              Learn More
            </button>
          </div>

          {/* Stat pills */}
          <div className="anim-pills flex gap-2.5">
            {s.stats.map(st => (
              <div key={st.label} className="px-[18px] py-2.5 rounded-[10px]"
                style={{ background: "rgba(255,255,255,.038)", border: "1px solid rgba(255,255,255,.065)", backdropFilter: "blur(8px)" }}>
                <span className="block text-[19px] font-black leading-none" style={{ color: st.color || "#fff" }}>{st.val}</span>
                <span className="text-[10px]" style={{ color: "#444" }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: product image with rings ── */}
        <div className="anim-img flex-1 flex justify-center items-center relative">
          {/* Ambient glow */}
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 500, height: 500,
            background: `radial-gradient(circle, ${s.glowColor} 0%, transparent 68%)`,
          }} />
          {/* Outer ring */}
          <div className={`${s.reverseSpin ? "ring-ccw" : "ring-cw"} absolute rounded-full pointer-events-none`}
            style={{ width: 440, height: 440, border: `1px solid ${s.ringColor1}` }} />
          {/* Inner ring */}
          <div className={`${s.reverseSpin ? "ring-cw" : "ring-ccw"} absolute rounded-full pointer-events-none`}
            style={{ width: 380, height: 380, border: `1px dashed ${s.ringColor2}` }} />
          {/* Product */}
          <img
            src={s.img}
            alt={s.imgAlt}
            className="relative w-full max-w-[540px] object-contain block mx-auto"
            style={{ maxHeight: "78vh", filter: "drop-shadow(0 40px 90px rgba(0,0,0,.75))" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ARROW BUTTON
// ─────────────────────────────────────────────
function ArrowBtn({ dir, onClick }) {
  const isLeft = dir === "left";
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${isLeft ? "left-7" : "right-7"}`}
      style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.09)", backdropFilter: "blur(12px)", color: "#fff" }}
      onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.32)"; }}
      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.045)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.09)"; }}
      aria-label={isLeft ? "Previous slide" : "Next slide"}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}