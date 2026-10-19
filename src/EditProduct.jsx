import { useState, useEffect } from "react";

const getStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

export default function EditProduct({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  if (!product) return null;

  const statusPreview = getStatus(Number(form.stock) || 0);

  const handleSave = () => {
    onSave({
      ...product,
      name: form.name,
      category: form.category,
      sku: form.sku,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      status: getStatus(parseInt(form.stock) || 0),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* modal */}
      <div className="relative w-full max-w-[520px] bg-white rounded-[24px] shadow-2xl p-7 md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 grid place-items-center text-zinc-600"
        >
          ✕
        </button>

        <h2 className="font-serif text-[22px] font-bold leading-tight">Edit product</h2>
        <p className="text-[13px] text-zinc-500 mt-1 mb-6">Update details and stock levels.</p>

        <div className="grid gap-5">
          <div>
            <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">PRODUCT NAME *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white"
              >
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Home</option>
                <option>Beauty</option>
                <option>Footwear</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">SKU</label>
              <input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">PRICE ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.12em] text-zinc-400 font-semibold">INITIAL STOCK</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="mt-2 w-full h-11 px-4 rounded-full bg-[#f8f5f2] border border-zinc-200 text-[14px] focus:outline-none focus:border-black focus:bg-white"
              />
              <p className="text-[11px] text-zinc-400 mt-1.5 ml-1">Status auto: {statusPreview}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={onClose} className="h-11 rounded-full border border-zinc-200 bg-white text-[14px] font-medium hover:bg-zinc-50">
              Cancel
            </button>
            <button onClick={handleSave} className="h-11 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-zinc-900">
              Save changes
            </button>
          </div>

          <p className="text-center text-[11px] text-zinc-400">
            Instant UI update via <span className="font-mono bg-zinc-100 px-1.5 py-0.5 rounded border">setProducts([...products, new])</span>
          </p>
        </div>
      </div>
    </div>
  );
}