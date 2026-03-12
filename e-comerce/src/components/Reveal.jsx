import { useState, useEffect, useRef } from "react";

export default function Reveal({ children, dir = "up", delay = 0, className = "" }) {
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
}