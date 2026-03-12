import Reveal from "./Reveal";

const FEATURED_BANNERS = [
  {
    label: "New Arrival",
    title: ["Latest Qpad", "with keyboard"],
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=85&auto=format",
  },
  {
    label: "Up to 30% OFF",
    title: ["And then their", "was pro versions"],
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=85&auto=format",
  },
  {
    label: "Limited",
    title: ["Modern & Style", "Headphone"],
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85&auto=format",
  },
];

const BannerCard = ({ item, height = 248, delay = 0 }) => (
  <Reveal dir="up" delay={delay} className="h-full">
    <div className="relative rounded-2xl overflow-hidden cursor-pointer group" style={{ height }}>
      <img
        src={item.img}
        alt={item.title[0]}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-transparent flex flex-col justify-end p-7">
        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-2">
          {item.label}
        </p>
        <h3 className="text-lg font-extrabold leading-tight mb-3">
          {item.title[0]}
          <br />
          {item.title[1]}
        </h3>
        <button className="text-xs font-bold bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-1.5 rounded-lg w-fit hover:bg-white/20 transition-colors">
          Buy Now →
        </button>
      </div>
      <div className="absolute inset-0 border border-white/[0.07] rounded-2xl pointer-events-none group-hover:border-white/20 transition-colors" />
    </div>
  </Reveal>
);

export default function FeaturedBanners() {
  return (
    <section className="max-w-[1280px] mx-auto px-12 pt-16">
      <div className="grid grid-cols-3 gap-4">
        {FEATURED_BANNERS.map((item, i) => (
          <BannerCard key={i} item={item} height={248} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}