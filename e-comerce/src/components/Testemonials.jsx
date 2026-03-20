import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    stars: 5,
    text: "A qualidade é excecional. Entrega rápida e embalagem excelente. Vou definitivamente comprar novamente na Elexy!",
    name: "João Silva",
    role: "Comprador Verificado",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&auto=format",
  },
  {
    stars: 5,
    text: "A melhor loja de eletrónica onde já comprei online. Preços competitivos e atendimento ao cliente de excelência!",
    name: "Sara Mendes",
    role: "Compradora Verificada",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=80&q=80&auto=format",
  },
  {
    stars: 4,
    text: "Ótima seleção de produtos! O meu MacBook chegou a tempo e em perfeitas condições. Recomendo vivamente!",
    name: "Roberto Costa",
    role: "Comprador Verificado",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format",
  },
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
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// ESTRELAS
// ─────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
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
// ÍCONE DE CITAÇÃO
// ─────────────────────────────────────────────
function QuoteIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-5 flex-shrink-0">
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
        <path
          d="M9.333 20c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-.184 0-.36.02-.533.048C13.4 13.6 15.333 11.2 18 10V8c-4.8 1.333-8.667 5.6-8.667 12zm13.334 0c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-.184 0-.36.02-.533.048C26.733 13.6 28.667 11.2 31.333 10V8c-4.8 1.333-8.666 5.6-8.666 12z"
          fill="#9ca3af"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD DE TESTEMUNHO
// ─────────────────────────────────────────────
function TestimonialCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white border border-gray-100 rounded-2xl p-6
        hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        hover:border-gray-200 transition-all duration-300 h-full flex flex-col">

        {/* Accent topo */}
        <div className="absolute top-0 left-6 right-6 h-px
          bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <QuoteIcon />
        <Stars count={item.stars} />

        {/* Texto */}
        <p className="text-[13px] text-gray-500 leading-[1.85] mb-6 flex-1">
          "{item.text}"
        </p>

        {/* Divisor */}
        <div className="h-px bg-gray-100 mb-5" />

        {/* Autor */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={item.img}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500
              rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 leading-tight">{item.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{item.role}</p>
          </div>

          {/* Badge verificado */}
          <div className="ml-auto flex items-center gap-1 bg-emerald-50 border border-emerald-200
            rounded-full px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Verificado
          </div>
        </div>

        {/* Accent inferior ao hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl
          bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// TÍTULO DA SECÇÃO
// ─────────────────────────────────────────────
function SectionTitle({ children, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{children}</h2>
      <span
        className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-gray-900 to-gray-200"
        style={center ? { margin: "8px auto 0" } : {}}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// TESTEMUNHOS
// ─────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Cabeçalho */}
        <Reveal>
          <div className="text-center mb-12">
            <SectionTitle center>A Felicidade dos Nossos Clientes</SectionTitle>
            <p className="text-xs text-gray-400 mt-3.5 max-w-[380px] mx-auto leading-relaxed">
              Milhares de clientes satisfeitos confiam na Elexy para as suas necessidades tecnológicas.
            </p>

            {/* Estatísticas */}
            <div className="flex justify-center gap-10 mt-8">
              {[
                { val: "4.9/5", label: "Avaliação Média"       },
                { val: "12K+",  label: "Clientes Satisfeitos"  },
                { val: "98%",   label: "Taxa de Satisfação"    },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-gray-900">{val}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} item={t} delay={i * 80} />
          ))}
        </div>

      </div>
    </section>
  );
}