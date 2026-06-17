
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSearch, FaTrashAlt, FaBoxOpen, FaClock, FaCheckCircle, FaTruck } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MyOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/orders?email=${session.user.email}`);
          const result = await res.json();
          if (result.success) {
            setOrders(result.data);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [session]);

  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <FaCheckCircle /> };
      case 'shipped':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <FaTruck /> };
      default:
        return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: <FaClock className="animate-pulse" /> };
    }
  };

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, Remove it",
      background: "#051d1a",
      color: "#fff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });
          if (res.ok) {
            setOrders((prev) => prev.filter((o) => o._id !== id));
            Swal.fire({ title: "Removed!", icon: "success", timer: 1000, showConfirmButton: false, background: "#051d1a", color: "#fff" });
          }
        } catch (err) {
          Swal.fire({ title: "Error", text: "Server error occurred.", icon: "error", background: "#051d1a", color: "#fff" });
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-ring loading-lg text-teal-500"></span>
    </div>
  );

  return (
    // মেইন ব্যাকগ্রাউন্ড রিমুভ করা হয়েছে অথবা ট্রান্সপারেন্ট রাখা হয়েছে
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl md:text-5xl font-black mb-2 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent uppercase tracking-tighter"
          >
            Order <span className="italic text-teal-50/20">History</span>
          </motion.h2>
          <p className="text-teal-500/50 text-[10px] font-bold uppercase tracking-widest">
            Total {orders.length} Care Packages Tracked
          </p>
        </div>

        {/* কার্ডের ব্যাকগ্রাউন্ড প্রোফাইল পেজের মতো ডার্ক টিল করা হয়েছে */}
        <div className="bg-[#051d1a] rounded-[2.5rem] border border-teal-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 md:p-8">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-teal-500/40 uppercase text-[11px] font-black tracking-widest">
                    <th className="pb-4 pl-10">Product</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4 text-right pr-10">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode='popLayout'>
                    {orders.map((order) => {
                      const statusInfo = getStatusDetails(order.status);
                      return (
                        <motion.tr 
                          key={order._id} 
                          layout 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }} 
                          className="group"
                        >
                          {/* টেবিল রো এর ব্যাকগ্রাউন্ড ডার্ক গ্রিন করা হয়েছে */}
                          <td className="bg-[#0b2522] group-hover:bg-teal-950/50 transition-colors rounded-l-[2rem] py-5 pl-10 border-y border-l border-teal-900/20">
                            <div className="flex items-center gap-5">
                              <img src={order.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-900/20 shadow-sm" alt="Product" />
                              <div>
                                <p className="font-black text-teal-50 text-sm uppercase tracking-tight">{order.product || "Skincare Product"}</p>
                                <p className="text-[10px] text-teal-500 font-bold">ID: {order._id.slice(-6).toUpperCase()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="bg-[#0b2522] py-5 border-y border-teal-900/20">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-2 w-fit ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
                              {statusInfo.icon}
                              {order.status || "pending"}
                            </span>
                          </td>
                          <td className="bg-[#0b2522] py-5 text-xl font-black text-teal-50 border-y border-teal-900/20">
                            <span className='text-teal-500 mr-1'>৳</span>{order.price}
                          </td>
                          <td className="bg-[#0b2522] pr-10 rounded-r-[2rem] text-right border-y border-r border-teal-900/20">
                            <div className="flex justify-end gap-3">
                              <button 
                                onClick={() => handleDeleteOrder(order._id)} 
                                className="p-3 rounded-xl bg-[#051d1a] text-rose-400 hover:bg-rose-500 hover:text-white transition-all border border-teal-900/20 shadow-sm"
                              >
                                <FaTrashAlt size={14} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-24">
              <FaBoxOpen className="mx-auto text-teal-950 mb-6" size={80} />
              <h3 className="text-teal-500 font-black text-xl uppercase tracking-widest">No Orders Yet</h3>
              <Link href="/products" className="mt-6 inline-block px-8 py-3 bg-teal-500 text-[#051d1a] rounded-xl font-black uppercase text-xs tracking-widest hover:bg-teal-400 transition-all">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}