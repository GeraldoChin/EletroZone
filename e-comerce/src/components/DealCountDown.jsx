import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// HOOK — COUNTDOWN
// ─────────────────────────────────────────────
function useCountdown(targetDate) {
  const [time, setTime] = useState({ d: "337", h: "17", m: "48", s: "05" });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, Math.floor((targetDate - Date.now()) / 1000));
      setTime({
        d: String(Math.floor(diff / 86400)).padStart(3, "0"),
        h: String(Math.floor((diff % 86400) / 3600)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600) / 60)).padStart(2, "0"),
        s: String(diff % 60).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

// ─────────────────────────────────────────────
// REVEAL
// ─────────────────────────────────────────────
function Reveal({ children, dir = "up", delay = 0, className = "" }) {
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
  }[dir];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
        ${vis ? "opacity-100 translate-x-0 translate-y-0" : hidden}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// COUNTDOWN UNIT
// ─────────────────────────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950
      border border-neutral-800 rounded-2xl px-5 py-4 text-center min-w-[82px]">
      <span className="text-4xl font-black text-white block leading-none tabular-nums">
        {value}
      </span>
      <span className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2 block">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// DEAL COUNTDOWN
// ─────────────────────────────────────────────
export default function DealCountdown() {
  const deadline = useRef((() => {
    const d = new Date();
    d.setDate(d.getDate() + 337);
    d.setHours(d.getHours() + 17, d.getMinutes() + 48, d.getSeconds() + 5);
    return d.getTime();
  })());

  const time = useCountdown(deadline.current);

  return (
    <section className="bg-[#060606] relative overflow-hidden py-24">

      {/* Glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none top-[-200px] right-[-100px]"
        style={{ filter: "blur(130px)", background: "rgba(22,163,74,.07)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none bottom-[-150px] left-[-80px]"
        style={{ filter: "blur(100px)", background: "rgba(22,163,74,.04)" }}
      />

      <div className="max-w-[1280px] mx-auto px-12 grid items-center gap-16"
        style={{ gridTemplateColumns: "1fr auto auto" }}>

        {/* ── Left: info ── */}
        <Reveal dir="left">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5
            bg-green-600/10 border border-green-600/20 rounded-lg
            px-3.5 py-1.5 text-[11px] font-semibold text-green-400 mb-5">
            ⚡ Hot Deal of the Day
          </div>

          {/* Title */}
          <h2
            className="font-black leading-[1.08] tracking-[-1.2px] text-white mb-3"
            style={{ fontSize: "clamp(30px,3.8vw,50px)" }}
          >
            Passiol Air Fryer
          </h2>

          {/* Description */}
          <p className="text-neutral-600 text-[13px] leading-relaxed mb-7 max-w-[400px]">
            Limited time offer. Crispy, delicious results with 90% less oil.
            Most popular kitchen gadget of 2024.
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[32px] font-black text-white">Tk 18,500</span>
            <span className="text-[13px] text-neutral-700 line-through">Tk 32,000</span>
            <span className="bg-green-600/15 text-green-400 text-xs font-bold px-3 py-1 rounded-lg">
              -42%
            </span>
          </div>

          {/* CTA */}
          <button className="bg-white text-black font-black text-sm px-10 py-3.5 rounded-xl
            border-0 cursor-pointer hover:opacity-85 hover:-translate-y-0.5 transition-all">
            Shop Now
          </button>

        </Reveal>

        {/* ── Center: countdown ── */}
        <Reveal dir="up">
          <div className="flex items-center gap-2">
            <CountUnit value={time.d} label="Days" />
            <span className="text-3xl font-black text-neutral-800 mb-4">:</span>
            <CountUnit value={time.h} label="Hours" />
            <span className="text-3xl font-black text-neutral-800 mb-4">:</span>
            <CountUnit value={time.m} label="Mins" />
            <span className="text-3xl font-black text-neutral-800 mb-4">:</span>
            <CountUnit value={time.s} label="Secs" />
          </div>
        </Reveal>

        {/* ── Right: image ── */}
        <Reveal dir="right">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-[20px]"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(22,163,74,.12), transparent 70%)" }}
            />
            <img
              src="public/images/headfone.jpg"
              alt="Air Fryer"
              className="w-[270px] h-[270px] object-cover rounded-[20px] block relative z-[1]
                hover:scale-[1.03] transition-transform duration-500"
              style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,.55))" }}
            />
          </div>
        </Reveal>

      </div>
    </section>
  );
}