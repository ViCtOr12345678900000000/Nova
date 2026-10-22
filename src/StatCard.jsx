function StatCard({ label, value, sub, icon, tone }) {
  const toneStyles = {
    neutral: "bg-zinc-100 border-zinc-200 text-zinc-500",
    warning: "bg-amber-100 border-amber-200 text-amber-700",
    danger: "bg-rose-100 border-rose-200 text-rose-700",
  };

  return (
    <div className="bg-stone-300 rounded-[16px] border border-zinc-200/80 p-5 flex flex-col justify-between min-w-[200px] min-h-[135px]">
      <div className="flex items-start justify-between">
        <p className="text-[12px]  font-medium  tracking-[0.08em] uppercase text-amber-50">{label}</p>
        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${toneStyles[tone] || toneStyles.neutral}`}>
          {icon}
        </span>
      </div>
      <div>
        <p className="text-[28px]  font-extralight leading-none tracking-tight text-olive-500 font-serif">{value}</p>
        <p className="text-[15px] text-black mt-2">{sub}</p>
      </div>
    </div>
  );
}

export default function StatCards({ products = [] }) {
  // LIVE CALCULATIONS
  const total = products.length;
  
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  
  const outOfStock = products.filter(p => p.stock === 0).length;

  const statsData = [
    { id: 'total', label: 'TOTAL PRODUCTS', value: total, sub: `${total} showing`, icon: '✔', tone: 'neutral' },
    { id: 'value', label: 'INVENTORY VALUE', value: `₦${inventoryValue.toLocaleString()}`, sub: 'price × stock', icon: '$', tone: 'neutral' },
    { id: 'low', label: 'LOW STOCK ALERTS', value: lowStock, sub: 'Needs reorder', icon: '〽', tone: 'warning' },
    { id: 'out', label: 'OUT OF STOCK', value: outOfStock, sub: 'Urgent', icon: '!', tone: 'danger' },
  ];

  return (
    <div className=" p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((s) => (
        <StatCard key={s.id} {...s} />
      ))}
    </div>
  );
}