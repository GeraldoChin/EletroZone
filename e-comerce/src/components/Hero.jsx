import { useState, useEffect, useRef, useCallback } from "react";

const HERO_CSS = `
  @keyframes fuUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes imgIn {
    from { opacity: 0; transform: translateX(40px) scale(.97); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes dotBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: .2; }
  }
  @keyframes scrollBounce {
    0%, 100% { opacity: .3; transform: translateY(0); }
    50%       { opacity: .9; transform: translateY(7px); }
  }

  .slide-active .anim-tag   { animation: fuUp .55s cubic-bezier(.22,1,.36,1) .05s both; }
  .slide-active .anim-h1    { animation: fuUp .70s cubic-bezier(.22,1,.36,1) .14s both; }
  .slide-active .anim-desc  { animation: fuUp .65s cubic-bezier(.22,1,.36,1) .26s both; }
  .slide-active .anim-btns  { animation: fuUp .65s cubic-bezier(.22,1,.36,1) .36s both; }
  .slide-active .anim-stats { animation: fuUp .65s cubic-bezier(.22,1,.36,1) .46s both; }
  .slide-active .anim-img   { animation: imgIn .90s cubic-bezier(.22,1,.36,1) .08s both; }
  .odot                     { animation: dotBlink 1.8s ease-in-out infinite; }
  .scroll-hint              { animation: scrollBounce 2s ease-in-out infinite; }
`;

const SLIDES = [
{
  bg:        "#060d18",
  accent:   "#38bdf8", // laranja JBL 🔥
  accentRgb: "249,115,22",
  tag:       "DESCONTO ATÉ 50% — SOM PREMIUM!",
  title:     ["Som potente JBL", "AirPods sem fio"],
  desc:      "Desfruta de graves profundos, conexão estável e bateria de longa duração com os novos AirPods JBL — perfeitos para música, chamadas e mobilidade.",
  bgWord:    "JBL",
  stats:     [
    { val:"4.8★", lbl:"Avaliação" },
    { val:"20K+", lbl:"Vendidos" },
    { val:"−50%", lbl:"Promoção" }
  ],
  img:       "/images/airpods2.png", // ⚠️ corrigido (sem 'public/')
  imgAlt:    "AirPods JBL",
},
  {
    bg:        "#0a0514",
    accent:    "#a78bfa",
    accentRgb: "167,139,250",
    tag:       "ATÉ 30% OFF — NOVA CHEGADA",
    title:     ["O próximo nível", "Smartphone Pro"],
    desc:      "Câmara de ponta, bateria para o dia todo e desempenho relâmpago no teu bolso.",
    bgWord:    "PRO",
    stats:     [{ val:"5.0★", lbl:"Avaliação" }, { val:"8K+", lbl:"Vendidos" }, { val:"−30%", lbl:"Hoje" }],
    img:       "public/images/headfone2.png",
    imgAlt:    "Smartphone Pro",
  },
  {
    bg:        "#0f0700",
    accent:    "#f59e0b",
    accentRgb: "245,158,11",
    tag:       "OFERTA LIMITADA — QUALIDADE ESTÚDIO",
    title:     ["Moderno & com estilo", "Headfones"],
    desc:      "Som de qualidade estúdio com cancelamento ativo de ruído. Sente cada batida como nunca antes.",
    bgWord:    "SOUND",
    stats:     [{ val:"4.8★", lbl:"Avaliação" }, { val:"20K+", lbl:"Vendidos" }, { val:"−50%", lbl:"Hoje" }],
    img:       "public/images/headfone3.png",
    imgAlt:    "Auscultadores",
  },
];

const DURATION = 5800;

export default function HeroSlider() {
  const [cur, setCur]     = useState(0);
  const rafRef            = useRef(null);
  const startRef          = useRef(null);
  const barRef            = useRef(null);
  const pausedRef         = useRef(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = HERO_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (barRef.current) barRef.current.style.width = "0%";
    startRef.current = performance.now();
    const step = (t) => {
      if (pausedRef.current) { rafRef.current = requestAnimationFrame(step); return; }
      const pct = Math.min((t - startRef.current) / DURATION * 100, 100);
      if (barRef.current) barRef.current.style.width = pct + "%";
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
      else setCur(c => (c + 1) % SLIDES.length);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => { startProgress(); }, [cur]);
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const goTo    = (i) => setCur(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  const touchX  = useRef(0);
  const s       = SLIDES[cur];

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: "100vh", minHeight: 620 }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) goTo(cur + (dx < 0 ? 1 : -1));
      }}
    >

      {/* ── Fundo por slide ── */}
      {SLIDES.map((slide, i) => (
        <div key={i}
          className="absolute inset-0 transition-opacity duration-[1000ms]"
          style={{ opacity: i === cur ? 1 : 0, zIndex: 0, background: slide.bg }}>

          {/* Brilho accent — lado direito */}
          <div className="absolute pointer-events-none"
            style={{
              width: 800, height: 800,
              top: "50%", right: "-100px",
              transform: "translateY(-50%)",
              background: `radial-gradient(circle, rgba(${slide.accentRgb},.13) 0%, transparent 65%)`,
              filter: "blur(30px)",
            }} />

          {/* Grelha subtil */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }} />

          {/* Vinheta escura lado esquerdo */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(3,3,3,.95) 0%, rgba(3,3,3,.75) 30%, rgba(3,3,3,.30) 55%, transparent 70%)",
            }} />

          {/* Palavra de fundo gigante */}
          <div className="absolute pointer-events-none select-none"
            style={{
              right: "3%", top: "50%", transform: "translateY(-50%)",
              fontSize: "clamp(130px,19vw,230px)",
              fontWeight: 900, letterSpacing: -10, lineHeight: 1,
              color: "rgba(255,255,255,.025)", whiteSpace: "nowrap", zIndex: 1,
            }}>
            {slide.bgWord}
          </div>
        </div>
      ))}

      {/* ── Conteúdo por slide ── */}
      {SLIDES.map((slide, i) => (
        <div key={i}
          className={`absolute inset-0 transition-opacity duration-[800ms]
            ${i === cur
              ? "opacity-100 z-[3] pointer-events-auto slide-active"
              : "opacity-0 z-[2] pointer-events-none"
            }`}
        >
          {/* Layout de 2 colunas */}
          <div
            className="relative h-full grid max-w-[1280px] mx-auto px-14"
            style={{
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              paddingTop: "99px",
            }}
          >

            {/* ── ESQUERDA: texto ── */}
            <div className="flex flex-col justify-center z-10 pr-8">

              {/* Tag */}
              <div className="anim-tag flex items-center gap-2.5 mb-7">
                <span className="odot w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: slide.accent }} />
                <span className="text-[11px] font-semibold tracking-[2.5px] uppercase"
                  style={{ color: slide.accent }}>
                  {slide.tag}
                </span>
              </div>

              {/* Título */}
              <h1 className="anim-h1 font-black leading-[1.04] mb-5 text-white"
                style={{ fontSize: "clamp(42px,5.2vw,72px)", letterSpacing: "-2px" }}>
                {slide.title[0]}<br />
                <span style={{ color: "rgba(255,255,255,.38)" }}>{slide.title[1]}</span>
              </h1>

              {/* Descrição */}
              <p className="anim-desc text-[14px] leading-[1.85] mb-9 max-w-[380px]"
                style={{ color: "rgba(255,255,255,.35)" }}>
                {slide.desc}
              </p>

              {/* Botões */}
              <div className="anim-btns flex items-center gap-3.5 mb-10">
                <button
                  className="text-[13px] font-bold px-8 py-3.5 rounded-[10px] cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-95"
                  style={{ background: "#fff", color: "#080808" }}>
                  Comprar Agora
                </button>
                <button
                  className="text-[13px] font-semibold px-8 py-3.5 rounded-[10px] cursor-pointer text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.13)", backdropFilter: "blur(8px)" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.11)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.28)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.13)"; }}>
                  Saber Mais
                </button>
              </div>

              {/* Estatísticas */}
              <div className="anim-stats flex items-center gap-8">
                {slide.stats.map((st, idx) => (
                  <div key={idx}>
                    <p className="text-[20px] font-black text-white leading-none mb-1">{st.val}</p>
                    <p className="text-[10px] tracking-[1.5px] uppercase"
                      style={{ color: "rgba(255,255,255,.28)" }}>{st.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DIREITA: imagem do produto ── */}
            <div className="anim-img relative h-full flex items-center justify-center">
              {/* Brilho subtil atrás do produto */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 50% 55%, rgba(${slide.accentRgb},.12) 0%, transparent 70%)`,
                }} />
              <img
                src={slide.img}
                alt={slide.imgAlt}
                style={{
                  width: "100%",
                  height: "calc(100vh - 99px)",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  filter: `drop-shadow(0 30px 80px rgba(${slide.accentRgb},.20)) drop-shadow(0 0 60px rgba(0,0,0,.85))`,
                  paddingBottom: "40px",
                  paddingTop: "20px",
                }}
              />
            </div>

          </div>
        </div>
      ))}

      {/* ── Botões de seta ── */}
      {[
        { dir: "left",  pos: "left-6",  d: "M15 19l-7-7 7-7" },
        { dir: "right", pos: "right-6", d: "M9 5l7 7-7 7"    },
      ].map(({ dir, pos, d }) => (
        <button key={dir}
          onClick={() => goTo(cur + (dir === "left" ? -1 : 1))}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110`}
          style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.55)", backdropFilter: "blur(10px)" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}>
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={d}/>
          </svg>
        </button>
      ))}

      {/* ── Navegação por pontos ── */}
      <div className="absolute bottom-8 right-14 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="h-[3px] rounded-full cursor-pointer border-none transition-all duration-500"
            style={{
              width:      i === cur ? 30 : 8,
              background: i === cur ? "#fff" : "rgba(255,255,255,.22)",
            }} />
        ))}
      </div>

      {/* ── Barra de progresso ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
        style={{ background: "rgba(255,255,255,.06)" }}>
        <div ref={barRef} className="h-full w-0"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,.3), #fff)" }} />
      </div>

      {/* ── Indicador de scroll ── */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>Rolar</span>
        <div className="scroll-hint w-px h-7 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,.4), transparent)" }} />
      </div>

    </section>
  );
}