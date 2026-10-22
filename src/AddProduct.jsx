import { useState } from "react";

const getStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

const iconsByCategory = {
  Apparel: "👕",
  Accessories: "💍",
  Home: "🏠",
  Beauty: "🌿",
  Footwear: "👟",
};

export default function AddProduct({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    category: "Apparel",
    sku: `NS-NP-${Math.floor(1000 + Math.random() * 9000)}`,
    price: "",
    stock: "",
  });

  const statusPreview = getStatus(Number(form.stock) || 0);

  const handleAdd = () => {
    if (!form.name.trim()) return alert("Product name required");
    
    const newProduct = {
      id: Date.now(), // simple unique id
      name: form.name,
      category: form.category,
      sku: form.sku || `NS-NP-${Date.now().toString().slice(-4)}`,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      status: getStatus(parseInt(form.stock) || 0),
      date: new Date().toLocaleDateString('en-GB'), // 19/10/2026 format
      icon: iconsByCategory[form.category] || "📦",
    };
    
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-[520px] bg-white rounded-[24px] shadow-2xl p-7 md:p-8">
        <button onClick={onClose} className="absolute right-5 top-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 grid place-items-center">✕</button>

        <h2 className="font-serif text-[22px] font-bold">Add new product</h2>
        <p className="text-[13px] text-zinc-500 mt-1 mb-6">Create a new inventory item.</p>

        <div className="grid gap-5">
          <div>
            <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">PRODUCT NAME *</label>
            <input
              placeholder="e.g. Linen Blend Shirt"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white placeholder:text-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">CATEGORY</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full h-11 px-4 rounded-full  bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white">
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Home</option>
                <option>Beauty</option>
                <option>Footwear</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">SKU</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">PRICE ($)</label>
              <input type="number" placeholder="0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white" />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">INITIAL STOCK</label>
              <input type="number" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white" />
              <p className="text-[11px] text-zinc-400 mt-1.5 ml-1">Status auto: {statusPreview}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={onClose} className="h-11 rounded-full border border-zinc-200 bg-white text-[14px] font-medium hover:bg-zinc-50">Cancel</button>
            <button onClick={handleAdd} className="h-11 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-zinc-900">Add to inventory</button>
          </div>

          <p className="text-center text-[11px] text-zinc-400">
            Instant UI update.
          </p>
        </div>
      </div>
    </div>
  );
}