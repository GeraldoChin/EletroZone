export default function TrustBar() {
  const items = [
    {
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      title: "Free Shipping",
      desc: "Free delivery on orders over $100",
    },
    {
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      color: "text-green-400",
      bg: "bg-green-600/10",
      title: "Flexible Payment",
      desc: "Pay with multiple payment system",
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-yellow-400",
      bg: "bg-yellow-600/10",
      title: "Earn Points",
      desc: "Save more with reward points",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-center gap-4 px-8 py-5 relative
              ${index !== items.length - 1
                ? "after:content-[''] after:absolute after:right-0 after:top-[22%] after:h-[56%] after:w-px after:bg-white/5"
                : ""
              }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                className={item.color}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  d={item.icon}
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-200">{item.title}</p>
              <p className="text-xs text-neutral-600 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}