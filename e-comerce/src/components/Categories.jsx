import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  {
    name: "Home Appliances",
    count: "10 Items",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&q=80&auto=format",
  },
  {
    name: "PC & Laptop",
    count: "9 Items",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80&auto=format",
  },
  {
    name: "Kitchen Appliances",
    count: "10 Items",
    img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&q=80&auto=format",
  },
  {
    name: "Phone & Tablet",
    count: "11 Items",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80&auto=format",
  },
  {
    name: "Accessories",
    count: "9 Items",
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

const SectionTitle = ({ children, center = false }) => (
  <div className={center ? "text-center mb-11" : "mb-2"}>
    <h2 className="text-2xl font-extrabold tracking-tight text-white">{children}</h2>
    <span
      className="block h-0.5 w-12 rounded-sm mt-2 bg-gradient-to-r from-white to-white/10"
      style={center ? { margin: "8px auto 0" } : {}}
    />
  </div>
);

export default function Categories() {
  return (
    <section className=" mx-auto px-12 py-20 bg-white">

      {/* Title */}
      <Reveal dir="up">
        <SectionTitle center>Choose your Category</SectionTitle>
        <p className="text-xs text-neutral-600 mt-3.5 max-w-[380px] mx-auto text-center leading-relaxed">
          Smartphones give quick access to notifications, calls, messages, apps right on your wrist.
        </p>
      </Reveal>

      {/* Category circles */}
      <div className="flex justify-center gap-10 flex-wrap mt-11">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.name} dir="up" delay={i * 70}>
            <div className="flex flex-col items-center gap-2.5 cursor-pointer group">

              {/* Ring + image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/[0.07]
                transition-all duration-300
                group-hover:border-white/30
                group-hover:shadow-[0_0_0_5px_rgba(255,255,255,0.04)]
                group-hover:-translate-y-1.5">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <p className="text-xs font-semibold text-neutral-300">{c.name}</p>
              <p className="text-[10px] text-neutral-700">{c.count}</p>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}