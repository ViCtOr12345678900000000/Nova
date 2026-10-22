import { useState } from 'react';

export const initialProducts = [
  { id: 1, name: "Linen Blend Shirt", sku: "NS-LBS-4821", date: "19/10/2026", category: "Apparel", price: 128.00, stock: 20, status: "In Stock", icon: "👕" },
  { id: 2, name: "Gold Hoop Earrings", sku: "NS-GHE-8802", date: "19/10/2026", category: "Accessories", price: 165.00, stock: 17, status: "In Stock", icon: "💍" },
  { id: 3, name: "Washed Linen Throw", sku: "NS-WLT-1288", date: "19/10/2026", category: "Home", price: 142.00, stock: 14, status: "In Stock", icon: "🧶" },
  { id: 4, name: "Rosehip Botanical Oil", sku: "NS-RBO-6645", date: "19/10/2026", category: "Beauty", price: 54.00, stock: 42, status: "In Stock", icon: "🌿" },
  { id: 5, name: "Canvas Sneaker Low", sku: "NS-CSL-9023", date: "19/10/2026", category: "Footwear", price: 118.00, stock: 38, status: "In Stock", icon: "👟" },
  { id: 6, name: "Leather Tote - Noir", sku: "NS-LTN-5518", date: "18/10/2026", category: "Accessories", price: 298.00, stock: 12, status: "In Stock", icon: "👜" },
  { id: 7, name: "Wool Overcoat - Camel", sku: "NS-WOC-1192", date: "17/10/2026", category: "Apparel", price: 425.00, stock: 3, status: "Low Stock", icon: "🧥" },
  { id: 8, name: "Ceramic Vase Set", sku: "NS-CVS-4472", date: "16/10/2026", category: "Home", price: 86.00, stock: 18, status: "In Stock", icon: "🏺" },
  { id: 9, name: "Scented Candle - Fig", sku: "NS-SCF-3329", date: "15/10/2026", category: "Home", price: 38.00, stock: 0, status: "Out of Stock", icon: "🕯" },
  { id: 10, name: "Silk Twill Scarf", sku: "NS-STS-7734", date: "14/10/2026", category: "Accessories", price: 95.00, stock: 0, status: "Out of Stock", icon: "🧣" },
  { id: 11, name: "Cashmere Beanie", sku: "NS-CAB-2011", date: "13/10/2026", category: "Apparel", price: 78.00, stock: 2, status: "Low Stock", icon: "🧢" },
  { id: 12, name: "Merino Wool Scarf - Ivory", sku: "NS-MWS-9034", date: "19/10/2026", category: "Accessories", price: 145.00, stock: 9, status: "In Stock", icon: "🧶" }
];
export const productsData = initialProducts;

const categoryColors = {
  Apparel: "bg-[#f5efe6] text-[#8a6d4b] border-[#e8dcc9]",
  Accessories: "bg-[#eef2f7] text-[#6b7d9e] border-[#d9e2ef]",
  Home: "bg-[#e6f2ed] text-[#5a8a6d] border-[#cde2d6]",
  Beauty: "bg-[#fde8ea] text-[#9e6b73] border-[#f8d0d5]",
  Footwear: "bg-[#ede8f5] text-[#7a6b9e] border-[#ddd6ec]",
};
const statusColors = {
  "In Stock": "bg-[#e6f4ec] text-[#1a7a4b] border-[#c2e6d1]",
  "Low Stock": "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  "Out of Stock": "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]",
};

const getStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

export default function ProductTable({ searchQuery = "", products, setProducts, onEdit }) {
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openCat, setOpenCat] = useState(false)
  const categories = ["All Categories", ...new Set(products.map(p => p.category))];
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [openStatus, setOpenStatus] = useState(false);
  const status = ["All Status", ...new Set(products.map(p => p.status))]
  const [sortBy, setSortBy] = useState("Recent");
  const [openSort, setOpenSort] = useState(false);
  const sortOptions = ["Recent", "Oldest", "Price: Low-High", "Price: High-Low", "Stock: Low-High"];
  const [viewMode, setViewMode] = useState("table");

  const startEditingPrice = (product) => { setEditingPriceId(product.id); setTempPrice(product.price.toString()); };
  const savePrice = (id) => { const newPrice = parseFloat(tempPrice); if (!isNaN(newPrice) && newPrice >= 0) { setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p)); } setEditingPriceId(null); };
  const updateStock = (id, change) => { setProducts(prev => prev.map(p => { if (p.id !== id) return p; const newStock = Math.max(0, p.stock + change); return { ...p, stock: newStock, status: getStatus(newStock) }; })); };
  const deleteProduct = (id) => { setProducts(prev => prev.filter(p => p.id !== id)); setOpenActionId(null); };

  const filteredData = products.filter(p => {
    const matchCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    const matchStatus = selectedStatus === "All Status" || p.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = q === "" || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCategory && matchStatus && matchSearch;
  }).sort((a, b) => {
    const parseDate = (str) => { const [d, m, y] = str.split('/').map(Number); return new Date(y, m - 1, d); };
    if (sortBy === "Recent") return parseDate(b.date) - parseDate(a.date) || b.id - a.id;
    if (sortBy === "Oldest") return parseDate(a.date) - parseDate(b.date) || a.id - b.id;
    if (sortBy === "Price: Low-High") return a.price - b.price;
    if (sortBy === "Price: High-Low") return b.price - a.price;
    if (sortBy === "Stock: Low-High") return a.stock - b.stock;
    return 0;
  });

  return (
    <div className="w-full ">
      <div className="  flex flex-col md:flex-row md:items-center justify-between gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button onClick={() => setOpenCat(!openCat)} className={`text-[11px] tracking-wide border px-3 py-1.5 rounded-full flex items-center gap-1.5 ${selectedCategory !== "All Categories" ? "bg-black text-white border-black" : "border-black/20 hover:bg-black hover:text-white"}`}>
              {selectedCategory} <span className="text-[10px]">▼</span>
            </button>
            {openCat && (<div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-lg p-1 z-20">{categories.map(cat => (<button key={cat} onClick={() => { setSelectedCategory(cat); setOpenCat(false); }} className={`w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100 ${selectedCategory === cat ? "bg-zinc-100 font-semibold" : ""}`}>{cat}</button>))}</div>)}
          </div>
          <div className="relative">
            <button onClick={() => setOpenStatus(!openStatus)} className={`text-[11px] tracking-wide border px-3 py-1.5 rounded-full flex items-center gap-1.5 ${selectedStatus !== "All Status" ? "bg-black text-white border-black" : "border-black/20 hover:bg-black hover:text-white"}`}>
              {selectedStatus} <span className="text-[10px]">▼</span>
            </button>
            {openStatus && (<div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-lg p-1 z-20">{status.map(s => (<button key={s} onClick={() => { setSelectedStatus(s); setOpenStatus(false); }} className={`w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100 ${selectedStatus === s ? "bg-zinc-100 font-semibold" : ""}`}>{s}</button>))}</div>)}
          </div>
          <div className="relative">
            <button onClick={() => setOpenSort(!openSort)} className={`text-[11px] tracking-wide border px-3 py-1.5 rounded-full flex items-center gap-1.5 ${sortBy !== "Recent" ? "bg-black text-white border-black" : "border-black/20 hover:bg-black hover:text-white"}`}>
              Sort: {sortBy} <span className="text-[10px]">▼</span>
            </button>
            {openSort && (<div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-lg p-1 z-20">{sortOptions.map(opt => (<button key={opt} onClick={() => { setSortBy(opt); setOpenSort(false); }} className={`w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100 ${sortBy === opt ? "bg-zinc-100 font-semibold" : ""}`}>{opt}</button>))}</div>)}
          </div>
        </div>
        <div className="  flex items-center gap-3">
          <p className=" text-[12px] text-zinc-500">Showing {filteredData.length} of {products.length}</p>
          <div className="  border border-zinc-200 rounded-full p-1 flex gap-1 bg-mauve-400/40">
            <button onClick={() => setViewMode("table")} className={`text-[11px] px-3.5 py-1 rounded-full border transition ${viewMode === "table" ? "bg-black text-white border-black" : "border-transparent text-zinc-500"}`}>Table</button>
            <button onClick={() => setViewMode("card")} className={`text-[11px] px-3.5 py-1 rounded-full border transition ${viewMode === "card" ? "bg-black text-white border-black" : "border-transparent text-zinc-500"}`}>Card</button>
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <>
          {/* Mobile */}
          <div className="  p-3 grid gap-3 md:hidden">
            {filteredData.map((product) => (
              <div key={product.id} className="  bg-white border border-zinc-200 rounded-[16px] p-4 grid gap-3">
                <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#f5f1eb] border flex items-center justify-center text-[16px]">{product.icon}</div><span className={`text-[11px] px-2.5 py-1 rounded-full border ${categoryColors[product.category]}`}>{product.category}</span></div><span className={`text-[11px] px-2.5 py-1 rounded-full border ${statusColors[product.status]}`}>{product.status}</span></div>
                <div><p className="text-[14px] font-semibold">{product.name}</p><p className="text-[11px] text-zinc-400">{product.sku} • {product.date}</p></div>
                <div className="flex justify-between items-center"><div><p className="text-[10px] uppercase text-zinc-400">Price</p><p className="text-[14px] font-medium">₦{product.price.toFixed(2)}</p></div><div className="flex items-center gap-1.5"><button onClick={() => updateStock(product.id, -1)} className="w-6 h-6 border-black/50 rounded-full border">−</button><span className="text-[10px] w-5 text-center">{product.stock}</span><button onClick={() => updateStock(product.id, 1)} className="w-6 h-6 border-black/50 rounded-full border">+</button></div></div>
                <div className=" flex justify-end items-center gap-2 relative"><button onClick={() => onEdit(product)} className="text-[12px] px-4 py-1.5 w-full  rounded-full border-black/50 border bg-[#f9f7f4] hover:bg-black hover:text-white">Edit</button><button onClick={() => setOpenActionId(openActionId === product.id ? null : product.id)} className="w-7 md:w-9 h-7 grid place-items-center rounded-full border text-zinc-400">✕</button>{openActionId === product.id && <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-xl p-1 z-30"><button onClick={() => deleteProduct(product.id)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">🗑 Delete</button><button onClick={() => setOpenActionId(null)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100">Cancel</button></div>}</div>
              </div>
            ))}
          </div>
          {/* Desktop - ONE container */}
          <div className="hidden md:block px-5 pb-10">
            <div className="bg-white border border-zinc-200 rounded-[20px] overflow-hidden">
              <div className="flex items-center px-5 py-3 text-[11px] tracking-[0.14em] uppercase text-zinc-400 font-semibold border-b border-zinc-100"><div className="w-[25%]">Product</div><div className="w-[15%]">Category</div><div className="w-[10%]">Price</div><div className="w-[20%]">Stock</div><div className="w-[15%]">Status</div><div className="w-[10%] text-right">Actions</div></div>
              {filteredData.map((product) => (
                <div key={product.id} className="flex items-center px-5 py-4 border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60">
                  <div className="w-[25%] flex items-center gap-3 min-w-0"><div className="w-10 h-10 rounded-[12px] bg-[#f5f1eb] border flex items-center justify-center text-[18px] shrink-0">{product.icon}</div><div className="min-w-0"><p className="text-[14px] font-semibold truncate">{product.name}</p><p className="text-[11px] text-zinc-400 truncate">{product.sku} • {product.date}</p></div></div>
                  <div className="w-[15%]"><span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${categoryColors[product.category]}`}><span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>{product.category}</span></div>
                  <div className="w-[10%]">{editingPriceId === product.id ? <div className="flex gap-1"><span>$</span><input autoFocus type="number" value={tempPrice} onChange={e => setTempPrice(e.target.value)} onBlur={() => savePrice(product.id)} onKeyDown={e => { if (e.key === 'Enter') savePrice(product.id) }} className="w-[60px] h-7 px-2 text-[13px] border border-black rounded-lg" /></div> : <p onClick={() => startEditingPrice(product)} className="text-[14px] font-medium cursor-pointer">₦{product.price.toFixed(2)}</p>}</div>
                  <div className="w-[22%] flex items-center gap-3.5"><button onClick={() => updateStock(product.id, -1)} className="w-6 h-6 rounded-full border grid   place-items-center border-black/50 hover:bg-black text-[9px] hover:text-white">−</button><span className="text-[12px] w-5 text-center font-medium">{product.stock}</span><button onClick={() => updateStock(product.id, 1)} className="w-6 h-6 border-black/50 text-[9px] rounded-full border grid place-items-center hover:bg-black hover:text-white">+</button><div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden ml-2"><div className={`h-full rounded-full ${product.stock === 0 ? "bg-zinc-300" : product.stock <= 5 ? "bg-amber-500" : "bg-[#0f5c3a]"}`} style={{ width: `${Math.min(100, (product.stock / 40) * 100)}%` }}></div></div></div>
                  <div className="w-[15%]"><span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${statusColors[product.status]}`}><span className="w-1.5 h-1.5 rounded-full bg-current"></span>{product.status}</span></div>
                  <div className="w-[11%] flex justify-end items-center gap-2 relative">
                    <button onClick={() => onEdit(product)} className="text-[12px] px-4 py-1.5 rounded-full border-black/50 border bg-[#f9f7f4] hover:bg-black hover:text-white">Edit</button>
                    <button onClick={() => setOpenActionId(openActionId === product.id ? null : product.id)} className="w-7 md:w-9 h-7 grid place-items-center rounded-full border text-zinc-400">✕</button>
                    {openActionId === product.id && <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-xl p-1 z-30">
                    <button onClick={() => deleteProduct(product.id)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">🗑 Delete</button>
                    <button onClick={() => setOpenActionId(null)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100">Cancel</button>
                    </div>}
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && <p className="text-center text-[13px] text-zinc-400 py-10">No products found</p>}
            </div>
          </div>
        </>
      )}

      {/* CARD VIEW */}
      {viewMode === "card" && (
        <div className="px-3  md:px-5 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.map((product) => (
            <div key={product.id} className="bg-white border border-stone-300/50 rounded-[20px] p-4 flex flex-col gap-4 hover:border-zinc-300 hover:shadow-md transition">
              <div className="flex justify-between items-start"><div className="w-12 h-12 rounded-[14px] bg-[#f5f1eb] border flex items-center justify-center text-[22px]">{product.icon}</div><span className={`text-[11px] px-2.5 py-1 rounded-full border ${statusColors[product.status]}`}>{product.status}</span></div>
              <div><p className="font-semibold text-[15px] leading-tight">{product.name}</p><p className="text-[11px] text-zinc-400 mt-1">{product.sku} • {product.category}</p></div>
              <div className="flex justify-between items-end"><div><p className="text-[10px] uppercase text-zinc-400 tracking-widest">Price</p><p className="text-[18px] font-bold font-serif">₦{product.price.toFixed(2)}</p></div><div className="text-right"><p className="text-[10px] uppercase text-zinc-400 tracking-widest">Stock</p><div className="flex items-center gap-1.5 mt-1"><button onClick={() => updateStock(product.id, -1)} className="w-7 h-7 rounded-full border border-black/50 hover:bg-black hover:text-white">−</button><span className="font-medium w-10 text-center">{product.stock}</span><button onClick={() => updateStock(product.id, 1)} className="w-7 h-7 rounded-full border border-black/50 hover:bg-black hover:text-white">+</button></div></div></div>
              <div className=" flex justify-end items-center gap-2 relative"><button onClick={() => onEdit(product)} className="text-[19px] md:text-[10px] px-4 py-1.5 w-full h-12   rounded-full border-black/50 border bg-[#f9f7f4] hover:bg-black hover:text-white">Edit</button><button onClick={() => setOpenActionId(openActionId === product.id ? null : product.id)} className="w-7 md:w-9 h-7 grid place-items-center rounded-full border text-zinc-400">✕</button>{openActionId === product.id && <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-xl shadow-xl p-1 z-30"><button onClick={() => deleteProduct(product.id)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">🗑 Delete</button><button onClick={() => setOpenActionId(null)} className="w-full text-left text-[12px] px-3 py-2 rounded-lg hover:bg-zinc-100">Cancel</button></div>}</div>
            </div>
          ))}
        </div>
      )}

      {openActionId !== null && (<div onClick={() => setOpenActionId(null)} className="fixed inset-0 z-20"></div>)}
    </div>
  )
}