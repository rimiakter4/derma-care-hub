
"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminPage = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin");
        const result = await res.json();
        if (result.success) {
          setData({
            ...result.stats,
            totalRevenue: Number(result.stats.totalRevenue) || 0
          });
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsCards = [
    { 
      label: "TOTAL REVENUE", 
      value: `৳ ${data.totalRevenue.toLocaleString('en-IN')}`, 
      icon: <FaMoneyBillWave />, 
      color: "border-emerald-500",
      glow: "shadow-emerald-500/10"
    },
    { label: "TOTAL USERS", value: data.totalUsers, icon: <FaUsers />, color: "border-blue-500", glow: "shadow-blue-500/10" },
    { label: "TOTAL ORDERS", value: data.totalOrders, icon: <FaShoppingCart />, color: "border-purple-500", glow: "shadow-purple-500/10" },
    { label: "TOTAL PRODUCTS", value: data.totalProducts, icon: <FaBoxOpen />, color: "border-orange-500", glow: "shadow-orange-500/10" },
  ];

  const chartPercentage = data.totalOrders > 0 ? Math.min(Math.round((data.totalOrders / 100) * 100), 100) : 0;
  const strokeDashoffset = 628 - (628 * chartPercentage) / 100;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-teal-500 font-black tracking-[0.3em] animate-pulse uppercase text-xs">
        System Initializing...
      </div>
    </div>
  );

  return (
    // মেইন ব্যাকগ্রাউন্ড রিমুভ করে ক্লিন রাখা হয়েছে যাতে লেআউটের সাথে মিশে যায়
    <div className="p-6 md:p-10 min-h-screen text-white">
      <header className="mb-12 max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 tracking-[0.15em] uppercase"
        >
          Intelligence <span className="text-teal-50/10 italic">Hub</span>
        </motion.h1>
        <p className="text-[10px] font-bold text-teal-500/40 mt-2 uppercase tracking-[0.4em]">
          Real-time Analytics Engine
        </p>
      </header>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
        {statsCards.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-[#051d1a] p-8 rounded-[2.5rem] border border-teal-900/30 shadow-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all`}
          >
            {/* ডেকোরেটিভ গ্রেডিয়েন্ট বর্ডার */}
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="bg-teal-500/5 p-4 rounded-2xl w-fit mb-6 text-teal-400 border border-teal-500/10 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <p className="text-[10px] text-teal-500/50 font-black mb-2 tracking-widest uppercase">{card.label}</p>
            <h2 className="text-3xl font-black tracking-tighter text-teal-50 group-hover:text-white transition-colors">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10">
        {/* Efficiency Distribution (Donut Chart) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#051d1a] p-12 rounded-[3.5rem] flex flex-col items-center justify-center shadow-2xl border border-teal-900/20 relative overflow-hidden"
        >
            <h3 className="text-teal-500/40 uppercase text-[10px] font-black mb-12 tracking-[0.5em]">Global Efficiency</h3>
            
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* আউটার শ্যাডো গ্লো */}
              <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-3xl"></div>
              
              <svg className="w-full h-full transform -rotate-90 relative z-10">
                <circle cx="144" cy="144" r="110" stroke="#0b2522" strokeWidth="28" fill="transparent" />
                <circle
                  cx="144" cy="144" r="110" stroke="url(#tealGradient)" strokeWidth="28"
                  fill="transparent"
                  strokeDasharray="690"
                  strokeDashoffset={690 - (690 * chartPercentage) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-[2s] ease-in-out"
                />
                <defs>
                  <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <span className="text-6xl font-black text-teal-50 tracking-tighter">{chartPercentage}%</span>
                  <p className="text-[10px] text-teal-500 font-bold uppercase tracking-[0.3em] mt-2">Target Status</p>
              </div>
            </div>

            <div className="mt-12 flex gap-8">
               <div className="text-center">
                  <p className="text-teal-500/30 text-[9px] font-bold uppercase mb-1">Current</p>
                  <p className="text-teal-50 font-black">{data.totalOrders}</p>
               </div>
               <div className="h-8 w-[1px] bg-teal-900/50"></div>
               <div className="text-center">
                  <p className="text-teal-500/30 text-[9px] font-bold uppercase mb-1">Benchmark</p>
                  <p className="text-teal-50 font-black">100</p>
               </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;