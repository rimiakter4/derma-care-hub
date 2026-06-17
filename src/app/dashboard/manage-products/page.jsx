
"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Loader2, Package, Tag, Banknote, Layers } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This item will be permanently removed from the catalog.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0b2522",
      confirmButtonText: "Yes, delete it",
      background: "#051d1a",
      color: "#fff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setProducts(products.filter((p) => p._id !== id));
          Swal.fire({ title: "Deleted!", icon: "success", background: "#051d1a", color: "#fff" });
        }
      }
    });
  };

  // --- FULL EDIT FUNCTION ---
  const handleEdit = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Asset Logistics",
      background: "#051d1a",
      color: "#fff",
      html: `
        <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; padding: 10px;">
          <label style="font-size: 10px; color: #2dd4bf; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Product Label</label>
          <input id="swal-name" class="swal2-input" style="margin:0; width:100%; background: #0b2522; border: 1px solid #134e4a; color: white; border-radius: 12px;" value="${product.name}">
          
          <label style="font-size: 10px; color: #2dd4bf; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;">Classification</label>
          <input id="swal-category" class="swal2-input" style="margin:0; width:100%; background: #0b2522; border: 1px solid #134e4a; color: white; border-radius: 12px;" value="${product.category}">
          
          <div style="display: flex; gap: 15px; margin-top: 8px;">
            <div style="flex: 1;">
              <label style="font-size: 10px; color: #2dd4bf; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Unit Price (৳)</label>
              <input id="swal-price" type="number" class="swal2-input" style="margin:0; width:100%; background: #0b2522; border: 1px solid #134e4a; color: white; border-radius: 12px;" value="${product.price}">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 10px; color: #2dd4bf; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Inventory Count</label>
              <input id="swal-stock" type="number" class="swal2-input" style="margin:0; width:100%; background: #0b2522; border: 1px solid #134e4a; color: white; border-radius: 12px;" value="${product.stock || 0}">
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Commit Changes",
      confirmButtonColor: "#14b8a6",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          category: document.getElementById("swal-category").value,
          price: Number(document.getElementById("swal-price").value),
          stock: Number(document.getElementById("swal-stock").value),
        };
      }
    });

    if (formValues) {
      const res = await fetch(`/api/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id, ...formValues }),
      });

      if (res.ok) {
        fetchProducts(searchTerm);
        Swal.fire({ title: "Updated!", text: "System records synchronized.", icon: "success", background: "#051d1a", color: "#fff" });
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 tracking-tighter uppercase"
            >
              Inventory <span className="text-teal-50/10 italic">Management</span>
            </motion.h1>
            <p className="text-teal-500/50 text-[10px] font-black mt-1 tracking-[0.4em] uppercase">
              Operational Assets: {products.length} Units
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-500/40 group-focus-within:text-teal-400 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search ID, Label or Type..."
              className="w-full bg-[#051d1a] border border-teal-900/30 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-teal-500/50 transition-all text-teal-50 placeholder:text-teal-900 font-medium shadow-2xl"
              onChange={(e) => fetchProducts(e.target.value)}
            />
          </div>
        </header>

        <div className="bg-[#051d1a] rounded-[3rem] border border-teal-900/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden p-2 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="animate-spin text-teal-500" size={40} />
              <span className="text-[10px] font-black text-teal-500/30 uppercase tracking-[0.5em]">Synchronizing Data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-teal-500/30 uppercase text-[10px] font-black tracking-[0.2em]">
                    <th className="pb-4 pl-10 text-left"><div className="flex items-center gap-2"><Package size={14}/> Product Unit</div></th>
                    <th className="pb-4 text-center"><div className="flex items-center justify-center gap-2"><Banknote size={14}/> Logistics</div></th>
                    <th className="pb-4 text-center"><div className="flex items-center justify-center gap-2"><Layers size={14}/> Stock</div></th>
                    <th className="pb-4 text-right pr-10">Control</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {products.map((item) => (
                      <motion.tr 
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group"
                      >
                        <td className="bg-[#0b2522] py-6 pl-10 rounded-l-[2.5rem] border-y border-l border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <div className="flex items-center gap-5">
                            <div className="relative">
                               <img src={item.image || "https://via.placeholder.com/150"} alt="" className="w-14 h-14 rounded-2xl object-cover border border-teal-900/40 shadow-2xl group-hover:scale-105 transition-transform" />
                               <div className="absolute -bottom-2 -right-2 bg-teal-500 w-5 h-5 rounded-lg flex items-center justify-center border-2 border-[#0b2522]">
                                  <Tag size={10} className="text-[#051d1a]" />
                               </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-black text-teal-50 uppercase tracking-tight group-hover:text-teal-400 transition-colors">{item.name}</h3>
                              <p className="text-[10px] text-teal-500/50 font-black mt-1 uppercase tracking-widest">{item.category}</p>
                            </div>
                          </div>
                        </td>

                        <td className="bg-[#0b2522] py-6 text-center border-y border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <span className="text-lg font-black text-emerald-400 tracking-tighter">৳{item.price}</span>
                          <p className="text-[9px] text-teal-900 font-bold uppercase mt-1">Market Valuation</p>
                        </td>

                        <td className="bg-[#0b2522] py-6 text-center border-y border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <span className={`px-5 py-2 rounded-xl text-[11px] font-black border ${
                            (item.stock || 0) < 5 
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                            : "bg-teal-500/5 text-teal-400 border-teal-500/10"
                          }`}>
                            {item.stock || 0} UNITS
                          </span>
                        </td>

                        <td className="bg-[#0b2522] py-6 pr-10 rounded-r-[2.5rem] border-y border-r border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleEdit(item)} 
                              className="p-3 bg-[#051d1a] text-teal-400 rounded-xl hover:bg-teal-500 hover:text-[#051d1a] transition-all border border-teal-900/30"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id)} 
                              className="p-3 bg-[#051d1a] text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-teal-900/30"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && products.length === 0 && (
            <div className="text-center py-32">
              <Package size={60} className="mx-auto text-teal-950 mb-4 opacity-20" />
              <p className="text-teal-500/30 font-black uppercase text-xs tracking-widest italic">Zero Asset Density Detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}