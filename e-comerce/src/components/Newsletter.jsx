import { useState, useEffect, useRef } from "react";

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
// NEWSLETTER
// ─────────────────────────────────────────────
export default function Newsletter() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (!email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="bg-[#060606] border-t border-neutral-900 relative overflow-hidden py-24 px-12">

      {/* Brilho topo centro */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none top-[-250px] left-1/2 -translate-x-1/2"
        style={{ filter: "blur(120px)", background: "rgba(37,99,235,.06)" }}
      />
      {/* Brilho fundo */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none bottom-[-150px] right-[20%]"
        style={{ filter: "blur(90px)", background: "rgba(124,58,237,.04)" }}
      />

      <div className="max-w-[600px] mx-auto text-center relative z-[1]">
        <Reveal>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20
            rounded-full px-4 py-1.5 text-[11px] font-semibold text-blue-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Fique a par de tudo
          </div>

          {/* Título */}
          <h2
            className="font-black leading-tight tracking-[-0.5px] text-white mb-3"
            style={{ fontSize: "clamp(24px,3.2vw,38px)" }}
          >
            Subscreva a nossa
            <br />
            <span className="text-neutral-700">Newsletter</span>
          </h2>

          {/* Subtítulo */}
          <p className="text-[13px] text-neutral-600 mb-10 leading-relaxed max-w-[420px] mx-auto">
            Receba ofertas exclusivas, novidades e notícias tech diretamente na sua caixa de entrada.
            Sem spam, nunca.
          </p>

          {/* Vantagens */}
          <div className="flex justify-center gap-6 mb-10">
            {[
              { icon:"M5 13l4 4L19 7", label:"Ofertas exclusivas" },
              { icon:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", label:"Novidades em primeiro" },
              { icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", label:"Sem spam" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  className="text-neutral-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                {label}
              </div>
            ))}
          </div>

          {/* Input row */}
          {status === "success" ? (

            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-14 h-14 rounded-full bg-green-600/15 border border-green-600/25
                flex items-center justify-center mb-1">
                <svg width="24" height="24" fill="none" stroke="#4ade80" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bold text-[15px]">Está dentro! 🎉</p>
              <p className="text-neutral-600 text-xs">Verifique a sua caixa de entrada para uma surpresa de boas-vindas.</p>
            </div>

          ) : (

            <div className="flex gap-2.5 max-w-[460px] mx-auto">
              {/* Input */}
              <div className={`flex-1 flex items-center gap-2.5 bg-white/[0.035] rounded-xl px-4
                border transition-all duration-200
                ${focused ? "border-neutral-600" : status === "error" ? "border-red-500/60" : "border-neutral-800"}`}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  className="text-neutral-600 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Introduza o seu endereço de email..."
                  className="flex-1 bg-transparent py-3.5 text-[13px] text-white placeholder-neutral-700
                    outline-none font-medium"
                />
              </div>

              {/* Botão */}
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="bg-white text-black font-black text-[13px] px-6 py-3.5 rounded-xl
                  border-0 cursor-pointer whitespace-nowrap
                  hover:opacity-85 hover:-translate-y-0.5
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    A enviar...
                  </>
                ) : "Subscrever"}
              </button>
            </div>

          )}

          {/* Mensagem de erro */}
          {status === "error" && (
            <p className="text-red-400 text-[11px] mt-2.5 flex items-center justify-center gap-1">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
              Por favor introduza um endereço de email válido.
            </p>
          )}

          {/* Nota de privacidade */}
          {status !== "success" && (
            <p className="text-[11px] text-neutral-800 mt-4">
              Ao subscrever concorda com a nossa{" "}
              <a href="#" className="text-neutral-600 hover:text-white transition-colors underline-offset-2 underline">
                Política de Privacidade
              </a>
              . Cancele a qualquer momento.
            </p>
          )}

        </Reveal>
      </div>
    </section>
  );
}