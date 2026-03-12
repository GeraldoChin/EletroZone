import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const FOOTER_LINKS = {
  Company:    ["About Us", "Careers", "Blog", "Press"],
  Support:    ["FAQ", "Track Order", "Returns", "Contact"],
  Categories: ["Smartphones", "Laptops", "Cameras", "Accessories"],
};

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Twitter",
    href: "#",
    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "M0 0h24v24H0z",
    isInstagram: true,
  },
  {
    label: "YouTube",
    href: "#",
    icon: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z M9.75 15.02V8.98l5.75 3.02-5.75 3.02z",
  },
];

const CONTACT = [
  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "123 Tech Street, New York" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+1 800 123 4567" },
  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "hello@elexy.com" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Mon–Fri  9am – 6pm" },
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
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// SOCIAL BUTTON
// ─────────────────────────────────────────────
function SocialBtn({ item }) {
  return (
    
      <a href={item.href}
      aria-label={item.label}
      className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-xl
        flex items-center justify-center text-neutral-600
        hover:text-neutral-200 hover:border-neutral-600 hover:bg-neutral-800
        transition-all duration-200 no-underline"
    >
      {item.isInstagram ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
        </svg>
      )}
    </a>
  );
}

// ─────────────────────────────────────────────
// FOOTER COL TITLE
// ─────────────────────────────────────────────
function ColTitle({ children }) {
  return (
    <h5 className="text-[11px] font-bold text-neutral-600 uppercase tracking-[1.8px] mb-5">
      {children}
    </h5>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-[#040404] border-t border-neutral-900">

      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto px-12 pt-16 pb-10">
        <div className="grid gap-12" style={{ gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.2fr" }}>

          {/* Brand col */}
          <Reveal delay={0}>
            <a href="#" className="text-[28px] font-black text-white no-underline tracking-[-1.5px] block mb-4">
              Elexy
            </a>
            <p className="text-xs text-neutral-700 leading-relaxed mb-6 max-w-[220px]">
              Your one-stop destination for the latest in consumer electronics and technology.
            </p>

            {/* Social */}
            <div className="flex gap-2 mb-8">
              {SOCIAL.map(s => <SocialBtn key={s.label} item={s} />)}
            </div>

            {/* App badges */}
            <div className="flex flex-col gap-2">
              {[
                { label: "App Store",    sub: "Download on the" },
                { label: "Google Play",  sub: "Get it on" },
              ].map(({ label, sub }) => (
                <a key={label} href="#"
                  className="flex items-center gap-2.5 bg-neutral-900 border border-neutral-800
                    rounded-xl px-3.5 py-2.5 no-underline w-fit
                    hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-200">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d={label === "App Store"
                        ? "M12 18.5A2.493 2.493 0 017.5 16M12 18.5a2.493 2.493 0 004.5-2.5M12 18.5V21m-4.5-5a2.5 2.5 0 015 0M3 9h18v2a9 9 0 01-18 0V9z"
                        : "M5 3l14 9-14 9V3z"}
                    />
                  </svg>
                  <div>
                    <p className="text-[9px] text-neutral-600 leading-none">{sub}</p>
                    <p className="text-[12px] font-bold text-white leading-tight mt-0.5">{label}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([col, links], i) => (
            <Reveal key={col} delay={i * 60 + 60}>
              <ColTitle>{col}</ColTitle>
              <ul className="list-none flex flex-col gap-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#"
                      className="text-[13px] text-neutral-700 no-underline
                        hover:text-neutral-200 transition-colors duration-200
                        flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 h-px bg-neutral-500 transition-all duration-200 block" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Contact col */}
          <Reveal delay={240}>
            <ColTitle>Contact</ColTitle>
            <ul className="list-none flex flex-col gap-4">
              {CONTACT.map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800
                    flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" fill="none" stroke="#666" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                    </svg>
                  </div>
                  <span className="text-[12px] text-neutral-700 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1280px] mx-auto px-12 py-5 flex flex-wrap justify-between items-center gap-3">
        <p className="text-xs text-neutral-800">
          © 2025 <span className="text-neutral-700">Elexy Electronics</span>. All rights reserved.
        </p>

        {/* Legal links */}
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookies"].map(l => (
            <a key={l} href="#"
              className="text-xs text-neutral-800 no-underline hover:text-neutral-500 transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>

        {/* Payment icons */}
        <div className="flex items-center gap-2">
          {["VISA", "MC", "PP", "AX"].map(p => (
            <div key={p}
              className="bg-neutral-900 border border-neutral-800 rounded-md px-2 py-1
                text-[9px] font-black text-neutral-600 tracking-wider">
              {p}
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
}