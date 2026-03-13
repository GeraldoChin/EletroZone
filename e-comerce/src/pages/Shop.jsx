import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id:1,  name:"Smart Phone 12 Pro",    cat:"Smartphones", price:3490,  old:4200,  badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=85&auto=format" },
  { id:2,  name:"Mason Microwave Oven",  cat:"Appliances",  price:40925,            badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=85&auto=format" },
  { id:3,  name:"Orex Pro Blender",      cat:"Appliances",  price:16560,            badge:"hot",  stars:5, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=85&auto=format" },
  { id:4,  name:"LF 7 Pro Gaming",       cat:"Gaming",      price:56200, old:70000, badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&q=85&auto=format" },
  { id:5,  name:"Xenic CC Camera",       cat:"Cameras",     price:13800,            badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=85&auto=format" },
  { id:6,  name:"Mango WiFi Router",     cat:"Network",     price:56800,            badge:"sale", stars:4, img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&q=85&auto=format" },
  { id:7,  name:"Olea Water Purifier",   cat:"Appliances",  price:58000,            badge:"hot",  stars:3, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&auto=format" },
  { id:8,  name:'MacBook Pro 15"',       cat:"Laptops",     price:90300,            badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=85&auto=format" },
  { id:9,  name:"Sony WH-1000XM5",       cat:"Audio",       price:29900, old:35000, badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=85&auto=format" },
  { id:10, name:"Imax DSLR Camera",      cat:"Cameras",     price:56200,            badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=85&auto=format" },
  { id:11, name:"VR Headset Pro",        cat:"Gaming",      price:45000, old:55000, badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=85&auto=format" },
  { id:12, name:"Dell UltraSharp 27\"",  cat:"Laptops",     price:67280,            badge:"new",  stars:4, img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=85&auto=format" },
  { id:13, name:"Pixel 8 Pro",           cat:"Smartphones", price:79900,            badge:"new",  stars:5, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=85&auto=format" },
  { id:14, name:"JBL Party Speaker",     cat:"Audio",       price:18500,            badge:"hot",  stars:4, img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=85&auto=format" },
  { id:15, name:"HD Security Camera",    cat:"Cameras",     price:22500,            badge:"new",  stars:3, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=85&auto=format" },
  { id:16, name:"Wireless Earbuds X",    cat:"Audio",       price:8900,  old:12000, badge:"sale", stars:5, img:"https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&q=85&auto=format" },
];

const CATEGORIES = ["All", "Smartphones", "Laptops", "Cameras", "Audio", "Gaming", "Appliances", "Network"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"];
const PRICE_RANGES = [
  { label: "All Prices",      min: 0,      max: Infinity },
  { label: "Under Tk 15,000", min: 0,      max: 15000    },
  { label: "Tk 15k – 50k",    min: 15000,  max: 50000    },
  { label: "Tk 50k – 80k",    min: 50000,  max: 80000    },
  { label: "Above Tk 80k",    min: 80000,  max: Infinity  },
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
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`transition-all duration-600 ease-out
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────────
function Badge({ type }) {
  const s = { sale:"bg-red-500", new:"bg-emerald-500", hot:"bg-amber-500" };
  return (
    <span className={`absolute top-2.5 left-2.5 z-10 ${s[type]} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
      {type}
    </span>
  );
}

// ─────────────────────────────────────────────
// WISHLIST BTN
// ─────────────────────────────────────────────
function WishlistBtn({ liked, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm
        opacity-0 group-hover:opacity-100 transition-all duration-200
        ${liked ? "bg-red-500 border-red-400 text-white scale-110" : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300"}`}>
      <svg width="13" height="13" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product, delay = 0, view = "grid" }) {
  const [liked, setLiked] = useState(false);

  if (view === "list") {
    return (
      <Reveal delay={delay}>
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-0
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300">
          <div className="relative w-48 flex-shrink-0 bg-gray-50 overflow-hidden">
            <img src={product.img} alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ height: 160 }} />
            {product.badge && <Badge type={product.badge} />}
            <WishlistBtn liked={liked} onToggle={() => setLiked(l => !l)} />
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.cat}</p>
              <h3 className="text-[14px] font-bold text-gray-900 mb-2">{product.name}</h3>
              <Stars count={product.stars} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-black text-gray-900">Tk {product.price.toLocaleString()}</span>
                {product.old && <span className="text-xs text-gray-400 line-through">Tk {product.old.toLocaleString()}</span>}
                {product.old && (
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                    -{Math.round((1 - product.price / product.old) * 100)}%
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold
                px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors border-0 cursor-pointer">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
        hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
        hover:border-gray-200 transition-all duration-300">
        <div className="overflow-hidden relative bg-gray-50">
          <img src={product.img} alt={product.name}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
            style={{ height: 190 }} />
          {product.badge && <Badge type={product.badge} />}
          <WishlistBtn liked={liked} onToggle={() => setLiked(l => !l)} />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        </div>
        <div className="p-3.5 pb-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.cat}</p>
          <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-2">{product.name}</h4>
          <Stars count={product.stars} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[14px] font-black text-gray-900">Tk {product.price.toLocaleString()}</span>
            {product.old && <span className="text-[11px] text-gray-400 line-through">Tk {product.old.toLocaleString()}</span>}
            {product.old && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full ml-auto">
                -{Math.round((1 - product.price / product.old) * 100)}%
              </span>
            )}
          </div>
          <button className="hidden group-hover:flex w-full mt-3 items-center justify-center gap-1.5
            bg-gray-900 text-white text-xs font-bold py-2.5 rounded-xl
            hover:bg-gray-700 transition-colors border-0 cursor-pointer">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Add to Cart
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5
          bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// SHOP PAGE
// ─────────────────────────────────────────────
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [activeBadge, setActiveBadge] = useState("All");

  // ── Filter + Sort ──
  let filtered = ALL_PRODUCTS.filter(p => {
    const matchCat   = activeCategory === "All" || p.cat === activeCategory;
    const matchPrice = p.price >= PRICE_RANGES[activePriceRange].min &&
                       p.price <= PRICE_RANGES[activePriceRange].max;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchBadge  = activeBadge === "All" || p.badge === activeBadge;
    return matchCat && matchPrice && matchSearch && matchBadge;
  });

  if (sortBy === "Price: Low to High")  filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sortBy === "Price: High to Low")  filtered = [...filtered].sort((a,b) => b.price - a.price);
  if (sortBy === "Top Rated")           filtered = [...filtered].sort((a,b) => b.stars - a.stars);
  if (sortBy === "Newest")              filtered = [...filtered].sort((a,b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero banner ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-12 py-10">
          <div className="flex items-center justify-between">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <span className="hover:text-gray-700 cursor-pointer transition-colors">Home</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                <span className="text-gray-900 font-semibold">Shop</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">All Products</h1>
              <p className="text-sm text-gray-400 mt-1">{filtered.length} products found</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 w-72">
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text" value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-sm text-gray-700 outline-none flex-1 placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-0">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 mt-7 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
                  ${activeCategory === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                  }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1280px] mx-auto px-12 py-8">
        <div className="flex gap-8">

          {/* ── Sidebar ── */}
          {showFilters && (
            <aside className="w-60 flex-shrink-0">

              {/* Price filter */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
                <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-4">Price Range</h3>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button key={i} onClick={() => setActivePriceRange(i)}
                      className={`text-left text-[12px] px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer border
                        ${activePriceRange === i
                          ? "bg-gray-900 text-white border-gray-900"
                          : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800"
                        }`}>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge filter */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
                <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-4">Filter by Tag</h3>
                <div className="flex flex-col gap-2">
                  {["All","sale","new","hot"].map(b => (
                    <button key={b} onClick={() => setActiveBadge(b)}
                      className={`text-left text-[12px] px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer border capitalize
                        ${activeBadge === b
                          ? "bg-gray-900 text-white border-gray-900"
                          : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800"
                        }`}>
                      {b === "All" ? "All Tags" : `🏷 ${b}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating filter */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-4">Min Rating</h3>
                <div className="flex flex-col gap-2">
                  {[5,4,3].map(r => (
                    <button key={r}
                      className="text-left px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer border
                        text-gray-500 border-transparent hover:bg-gray-50 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({length:5}).map((_,i) => (
                          <svg key={i} width="10" height="10" viewBox="0 0 24 24"
                            fill={i < r ? "#f59e0b" : "none"}
                            stroke={i < r ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px]">& up</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white border border-gray-100 rounded-2xl px-5 py-3.5">
              <div className="flex items-center gap-3">
                {/* Toggle filters */}
                <button onClick={() => setShowFilters(f => !f)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer
                    ${showFilters ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2M13 16h-2"/>
                  </svg>
                  Filters
                </button>
                <span className="text-xs text-gray-400">{filtered.length} results</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200
                    rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-gray-400 transition-colors">
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>

                {/* View toggle */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                  {["grid","list"].map(v => (
                    <button key={v} onClick={() => setViewMode(v)}
                      className={`w-8 h-7 flex items-center justify-center rounded-lg transition-all cursor-pointer border-0
                        ${viewMode === v ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-700 bg-transparent"}`}>
                      {v === "grid" ? (
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
                <p className="text-sm text-gray-400">Try adjusting your filters or search term.</p>
                <button onClick={() => { setActiveCategory("All"); setActivePriceRange(0); setSearch(""); setActiveBadge("All"); }}
                  className="mt-5 text-xs font-bold bg-gray-900 text-white px-5 py-2.5 rounded-xl border-0 cursor-pointer hover:bg-gray-700 transition-colors">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-3 gap-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} delay={(i % 3) * 50} view="grid" />
                ))}
              </div>
            )}

            {/* List */}
            {filtered.length > 0 && viewMode === "list" && (
              <div className="flex flex-col gap-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} delay={i * 30} view="list" />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-900 transition-all cursor-pointer">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                {[1,2,3,4,5].map(n => (
                  <button key={n}
                    className={`w-9 h-9 rounded-xl border text-xs font-bold transition-all cursor-pointer
                      ${n === 1 ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900"}`}>
                    {n}
                  </button>
                ))}
                <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-900 transition-all cursor-pointer">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}