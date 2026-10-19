import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import StatCards from "./StatCard"
import ProductTable, { initialProducts } from "./ProductTable"
import EditProduct from "./EditProduct"
import AddProduct from "./AddProduct"
import Footer from "./Footer"

const STORAGE_KEY = "nova-stock-products"

export default function App(){
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialProducts
    } catch {
      return initialProducts
    }
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const handleReset = () => {
    if (confirm("Reset NovaStock to default products?")) {
      localStorage.removeItem(STORAGE_KEY)
      setProducts(initialProducts)
      setSearchQuery("")
    }
  }

  return(
    <div className="bg-[#fcfaf7] min-h-screen">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onAddClick={() => setShowAdd(true)}
        onReset={handleReset}
      />
      <StatCards products={products} />
      <ProductTable products={products} setProducts={setProducts} searchQuery={searchQuery} onEdit={setEditingProduct} />
      {editingProduct && <EditProduct product={editingProduct} onClose={() => setEditingProduct(null)} onSave={(updated) => { setProducts(prev => prev.map(p => p.id === updated.id ? updated : p)); setEditingProduct(null); }} />}
      {showAdd && <AddProduct onClose={() => setShowAdd(false)} onAdd={(newProd) => { setProducts(prev => [newProd, ...prev]); setShowAdd(false); }} />}
      <Footer />
    </div>
  )
}