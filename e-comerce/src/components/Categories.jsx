import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  {
    name: "Eletrodomésticos",
    count: "10 Artigos",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&q=80&auto=format",
  },
  {
    name: "PC & Portátil",
    count: "9 Artigos",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80&auto=format",
  },
  {
    name: "Electrodomésticos de Cozinha",
    count: "10 Artigos",
    img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&q=80&auto=format",
  },
  {
    name: "Telemóvel & Tablet",
    count: "11 Artigos",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80&auto=format",
  },
  {
    name: "Acessórios",
    count: "9 Artigos",
    img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&q=80&auto=format",
  },
];

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

export default function Categories() {
  return (
    <section className="bg-[#f7f7f5] px-10 py-16">
      <div className="max-w-[1280px] mx-auto">

        {/* Cabeçalho */}
        <Reveal dir="up">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">
              Navegar por
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Escolha a sua Categoria
            </h2>
            <span className="block h-0.5 w-10 rounded-sm mt-3 mx-auto bg-gradient-to-r from-gray-900 to-gray-300" />
            <p className="text-xs text-gray-400 mt-3 max-w-[340px] mx-auto leading-relaxed">
              Encontre exatamente o que precisa — de casas inteligentes a equipamento de áudio.
            </p>
          </div>
        </Reveal>

        {/* Círculos de categorias */}
        <div className="flex justify-center gap-12 flex-wrap">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} dir="up" delay={i * 70}>
              <div className="flex flex-col items-center gap-3 cursor-pointer group w-24">

                {/* Anel + imagem */}
                <div
                  className="w-[88px] h-[88px] rounded-full overflow-hidden
                    ring-2 ring-gray-200
                    transition-all duration-300
                    group-hover:ring-gray-900
                    group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                    group-hover:-translate-y-2"
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="text-center">
                  <p className="text-[12px] font-bold text-gray-800 leading-tight">{c.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c.count}</p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}