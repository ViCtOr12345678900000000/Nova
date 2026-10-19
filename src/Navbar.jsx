export default function Navbar({ onAddClick, searchQuery, setSearchQuery,onReset }) {
  return (
    <header className="w-full max-w-full bg-white border-b border-neutral-200 sticky top-0 z-50 overflow-x-clip">
      <div className="mx-auto max-w-[1600px] w-full box-border h-auto min-h-[72px] px-4 md:px-6 lg:px-10 py-3 md:py-0 md:h-[72px] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-4 shrink-0 min-w-0 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-black rounded-[12px] flex items-center justify-center text-white font-black text-[16px] shrink-0">N</div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-serif font-bold text-[16px] md:text-[18px] tracking-tight text-black truncate">NovaStock</span>
              <span className="text-[10px] tracking-[0.14em] text-neutral-400 font-semibold">INVENTORY OS</span>
            </div>
          </div>
          <span className="md:hidden text-[10px] tracking-[0.12em] text-neutral-400 font-medium shrink-0">BOUTIQUE</span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto min-w-0">
          <div className="relative flex-1 md:flex-none min-w-0">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, SKU..."
              className="w-full md:w-[300px] h-10 pl-10 pr-4 rounded-full bg-neutral-100 border border-transparent focus:bg-white focus:border-neutral-200 focus:outline-none text-[13px] text-neutral-700 placeholder:text-neutral-400"
            />
          </div>

          <button   onClick={onReset} className=" lg:inline-flex h-10 px-4 py-2 rounded-full border border-neutral-200 bg-white text-[13px] font-medium text-neutral-600 hover:bg-neutral-50 shrink-0">Reset</button>

          <button onClick={onAddClick} className="inline-flex items-center gap-1 h-10 px-4 md:px-5 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-neutral-900 shrink-0 whitespace-nowrap">
            <span className="text-[16px] leading-none">+</span><span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
}