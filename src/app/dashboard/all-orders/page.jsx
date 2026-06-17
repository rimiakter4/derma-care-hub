
"use client";
import React, { useEffect, useState } from "react";
import { Search, Check, RotateCcw, Ban, Package, Mail, ShoppingBag, Hash } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const Allorders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
        setFilteredOrders(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Orders fetching error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;
    if (statusFilter !== "ALL") {
      result = result.filter(order => order.status.toUpperCase() === statusFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => {
        const pName = (order.product || order.productName || "").toLowerCase();
        const email = (order.email || "").toLowerCase();
        return pName.includes(term) || email.includes(term);
      });
    }
    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const updateStatus = async (id, newStatus) => {
    let config = {
      title: "Confirm Status Update?",
      text: `Do you want to set this order to ${newStatus}?`,
      icon: "question",
      confirmButtonColor: "#14b8a6",
    };

    if (newStatus === "rejected") {
      config = {
        title: "Reject Order?",
        text: "This order will be marked as rejected in the history.",
        icon: "warning",
        confirmButtonColor: "#f43f5e",
      };
    }

    Swal.fire({
      ...config,
      showCancelButton: true,
      cancelButtonColor: "#0b2522",
      confirmButtonText: "Update Now",
      background: "#051d1a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/orders", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
          });

          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: `Status changed to ${newStatus}`,
              icon: "success",
              background: "#051d1a",
              color: "#fff",
              timer: 1500,
              showConfirmButton: false
            });
            fetchOrders();
          }
        } catch (error) {
          Swal.fire({ title: "Error", text: "Update failed", icon: "error", background: "#051d1a" });
        }
      }
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#051d1a]">
      <div className="text-teal-400 font-black tracking-[0.3em] animate-pulse uppercase text-xs">Initializing Secure Logs...</div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 tracking-tighter uppercase"
          >
            Order <span className="text-teal-50/10 italic">Console</span>
          </motion.h1>
          <p className="text-emerald-400/60 text-[10px] font-black mt-2 tracking-[0.6em] uppercase">
            Total Operational Records: {filteredOrders.length}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-5 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-400/40 group-focus-within:text-teal-300 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Track Identity or Manifest..."
              className="w-full bg-[#0b2522] border border-teal-900/40 rounded-3xl py-5 pl-16 pr-8 focus:outline-none focus:border-teal-400/50 transition-all text-teal-50 placeholder:text-teal-800 font-semibold shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-[#0b2522] border border-teal-900/40 rounded-3xl px-10 py-5 font-black text-[11px] uppercase tracking-[0.2em] focus:outline-none cursor-pointer text-teal-300 shadow-2xl appearance-none hover:border-teal-400/40 transition-all text-center"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">ALL STATES</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-[#051d1a]/80 backdrop-blur-xl rounded-[3.5rem] border border-teal-900/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden p-2 md:p-10">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-5">
              <thead>
                <tr className="text-teal-400/30 uppercase text-[10px] font-black tracking-[0.3em]">
                  <th className="pb-4 pl-12 text-left flex items-center gap-2"><ShoppingBag size={14}/> Product</th>
                  <th className="pb-4 text-left"><div className="flex items-center gap-2"><Mail size={14}/> Destination</div></th>
                  <th className="pb-4 text-center">Current Status</th>
                  <th className="pb-4 text-right pr-12">Override</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredOrders.map((order) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="group"
                    >
                      {/* Product Info - Normal Case */}
                      <td className="bg-[#0b2522] py-8 pl-12 rounded-l-[3rem] border-y border-l border-teal-900/10 group-hover:bg-teal-900/30 transition-all duration-300">
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-teal-50 group-hover:text-teal-300 transition-colors capitalize">
                            {order.product || order.productName || "Standard Unit"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-2 opacity-80">
                            <Hash size={10} className="text-emerald-500" />
                            <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase">
                              {order._id.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Customer Info - Brightened */}
                      <td className="bg-[#0b2522] py-8 border-y border-teal-900/10 group-hover:bg-teal-900/30 transition-all duration-300">
                        <p className="text-sm font-black text-teal-200 tracking-tight">{order.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-teal-500/20">
                            Qty: {order.quantity || 1}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="bg-[#0b2522] py-8 text-center border-y border-teal-900/10 group-hover:bg-teal-900/30 transition-all duration-300">
                        <div className="flex justify-center">
                          <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg ${
                            order.status === "pending" ? "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-amber-900/20" : 
                            order.status === "approved" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-emerald-900/20" : 
                            order.status === "rejected" ? "bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-rose-900/20" :
                            "bg-teal-500/10 text-teal-300 border-teal-500/30"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </td>

                      {/* Control Actions */}
                      <td className="bg-[#0b2522] py-8 pr-12 rounded-r-[3rem] border-y border-r border-teal-900/10 group-hover:bg-teal-900/30 transition-all duration-300">
                        <div className="flex justify-end gap-3">
                          {order.status !== "approved" && (
                            <button 
                              onClick={() => updateStatus(order._id, "approved")}
                              className="p-3.5 bg-[#051d1a] text-emerald-300 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all border border-teal-900/50 shadow-xl group/btn"
                              title="Approve Order"
                            >
                              <Check size={18} className="group-hover/btn:scale-110 transition-transform"/>
                            </button>
                          )}
                          {(order.status === "approved" || order.status === "rejected") && (
                            <button 
                              onClick={() => updateStatus(order._id, "pending")}
                              className="p-3.5 bg-[#051d1a] text-teal-300 rounded-2xl hover:bg-teal-400 hover:text-[#051d1a] transition-all border border-teal-900/50 shadow-xl group/btn"
                              title="Revert to Pending"
                            >
                              <RotateCcw size={18} className="group-hover/btn:rotate-[-90deg] transition-transform duration-500"/>
                            </button>
                          )}
                          {order.status !== "rejected" && (
                            <button 
                              onClick={() => updateStatus(order._id, "rejected")}
                              className="p-3.5 bg-[#051d1a] text-rose-300 rounded-2xl hover:bg-rose-600 hover:text-white transition-all border border-teal-900/50 shadow-xl group/btn"
                              title="Reject Order"
                            >
                              <Ban size={18} className="group-hover/btn:scale-110 transition-transform"/>
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {!loading && filteredOrders.length === 0 && (
              <div className="text-center py-32">
                <div className="relative inline-block">
                  <Package size={80} className="mx-auto text-teal-900/30 animate-bounce mb-4" />
                  <div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full"></div>
                </div>
                <p className="text-teal-400/40 font-black uppercase text-sm tracking-[0.4em] italic">No Logs Decrypted</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allorders;