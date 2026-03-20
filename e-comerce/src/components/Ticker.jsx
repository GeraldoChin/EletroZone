// ─────────────────────────────────────────────
// ANIMAÇÕES CSS
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
// DADOS
// ─────────────────────────────────────────────
const WORDS = [
  "⚡ Aguarda!",
  "✦ Compras Inteligentes!",
  "✦ Compra Mais, Poupa Mais!",
  "✦ Descontos Incríveis!",
  "✦ Bem-vindo à Elexy!",
  "✦ Envio Grátis Acima de $100!",
  "✦ Novidades Todas as Semanas!",
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

  // Duplicar para loop contínuo
  const items = [...WORDS, ...WORDS];

  return (
    <div className="bg-[#0c0c0c] border-t border-[#141414] border-b py-3 overflow-hidden select-none">
      <div className="mq-wrap">
        <div className="mq-inner">
          {items.map((word, i) => (
            <span
              key={i}
              className="px-11 text-[11px] font-semibold text-neutral-500 uppercase tracking-[3px] whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}