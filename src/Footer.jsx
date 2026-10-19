export default function Footer() {
  return (
    <footer className="mt-10 bg-white border-t border-zinc-200">
      {/* Top newsletter */}
      <div className="px-5 md:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100">
        <div>
          <p className="text-[13px] tracking-[0.14em] uppercase text-zinc-400 font-medium">Stay in the loop</p>
          <h3 className="text-[22px] md:text-[26px] font-serif font-semibold tracking-tight mt-1">Get inventory alerts & restock news.</h3>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input placeholder="Your email" className="flex-1 md:w-[280px] h-11 px-4 rounded-full border border-zinc-200 bg-[#fcfaf7] text-[14px] focus:outline-none focus:border-black placeholder:text-zinc-400" />
          <button className="h-11 px-6 rounded-full bg-black text-white text-[13px] font-medium hover:bg-zinc-800">Join</button>
        </div>
      </div>

      {/* Links */}
      <div className="px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">N</div>
            <span className="font-serif font-semibold tracking-tight">NovaStock</span>
          </div>
          <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[220px]">
            Curated inventory for modern boutiques. Track stock, value, and alerts in one place.
          </p>
          <div className="flex gap-2 mt-5">
            <a className="w-8 h-8 rounded-full border border-zinc-200 grid place-items-center text-[12px] hover:bg-black hover:text-white transition">𝕏</a>
            <a className="w-8 h-8 rounded-full border border-zinc-200 grid place-items-center text-[12px] hover:bg-black hover:text-white transition">◍</a>
            <a className="w-8 h-8 rounded-full border border-zinc-200 grid place-items-center text-[12px] hover:bg-black hover:text-white transition">◎</a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-zinc-400 font-semibold mb-4">Product</p>
          <ul className="grid gap-2.5 text-[13px] text-zinc-600">
            <li><a className="hover:text-black">Apparel</a></li>
            <li><a className="hover:text-black">Accessories</a></li>
            <li><a className="hover:text-black">Home & Living</a></li>
            <li><a className="hover:text-black">Beauty</a></li>
            <li><a className="hover:text-black">Footwear</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-zinc-400 font-semibold mb-4">Manage</p>
          <ul className="grid gap-2.5 text-[13px] text-zinc-600">
            <li><a className="hover:text-black">Inventory</a></li>
            <li><a className="hover:text-black">Low Stock Alerts</a></li>
            <li><a className="hover:text-black">Out of Stock</a></li>
            <li><a className="hover:text-black">Analytics</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-zinc-400 font-semibold mb-4">Support</p>
          <ul className="grid gap-2.5 text-[13px] text-zinc-600">
            <li><a className="hover:text-black">Help Center</a></li>
            <li><a className="hover:text-black">Contact</a></li>
            <li><a className="hover:text-black">Privacy</a></li>
            <li><a className="hover:text-black">Terms</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-5 md:px-8 py-5 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-zinc-400">© 2026 NovaStock. All rights reserved.</p>
        <div className="flex items-center gap-4 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> All systems operational</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString('en-GB')} • Lagos, NG</span>
        </div>
      </div>
    </footer>
  );
}