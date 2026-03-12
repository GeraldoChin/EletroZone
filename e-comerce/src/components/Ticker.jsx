// ─────────────────────────────────────────────
// ANIMATIONS CSS
// ─────────────────────────────────────────────
const ANIM_CSS = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .mq-wrap  { overflow: hidden; }
  .mq-inner {
    display: flex;
    width: max-content;
    animation: marquee 24s linear infinite;
  }
  .mq-inner:hover { animation-play-state: paused; }
`;

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const WORDS = [
  "⚡ Await!",
  "✦ Smart Shopping!",
  "✦ Shop More, Save More!",
  "✦ Unbelievable Discounts!",
  "✦ Welcome to Elexy!",
  "✦ Free Shipping Over $100!",
  "✦ New Arrivals Every Week!",
];

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
import { useEffect } from "react";

export default function Ticker() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ANIM_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Duplicate for seamless loop
  const items = [...WORDS, ...WORDS];

  return (
    <div className="bg-[#0c0c0c] border-t border-[#141414] border-b py-3 overflow-hidden select-none">
      <div className="mq-wrap">
        <div className="mq-inner">
          {items.map((word, i) => (
            <span
              key={i}
              className="px-11 text-[11px] font-semibold text-neutral-700 uppercase tracking-[3px] whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}