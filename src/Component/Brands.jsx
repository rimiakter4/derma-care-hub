
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Brands = () => {
  const brandLogos = [
    { name: "CeraVe", url: "https://i.ibb.co.com/7Jspq72b/images-2.png" },
    { name: "La Roche-Posay", url: "https://i.ibb.co.com/gM2NnBcV/images.png" },
    { name: "The Ordinary", url: "https://i.ibb.co.com/jP3nL6fB/shanghaichinasep6th-2025-ordinary-brand-logo-260nw-2676109107.webp" },
    { name: "Bioderma", url: "https://i.ibb.co.com/G4VG5hp2/markennamen-bioderma-berlin-F83-JN4.jpg" },
    { name: "Vichy", url: "https://i.ibb.co.com/vCMcj5gh/images-3.png" },
    { name: "Neutrogena", url: "https://i.ibb.co.com/5xT9NfBB/neutrogena-logo-png-seeklogo-98685.png" },
  ];

  return (
    <section className="py-24 bg-bg-base transition-colors duration-500 overflow-hidden relative border-y border-primary/5">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10 shadow-sm"
          >
            Our Partners
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-tight"
          >
            Authorized Retailer of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary italic">
              Clinical Brands.
            </span>
          </motion.h2>
        </div>
      </div>
      
      {/* --- Infinite Logo Slider --- */}
      <div className="flex overflow-hidden relative group">
        {/* Shadow Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-bg-base to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-bg-base to-transparent z-20" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex flex-nowrap gap-8 md:gap-12 items-center whitespace-nowrap min-w-full py-10 px-6"
        >
          {/* Repeating the array for seamless scrolling */}
          {[...brandLogos, ...brandLogos].map((brand, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-[240px] h-[140px] md:w-[320px] md:h-[180px] bg-white dark:bg-white/5 rounded-[2rem] shadow-2xl shadow-primary/5 border border-primary/5 flex items-center justify-center overflow-hidden group relative transition-all duration-500 hover:border-secondary/40"
            >
              {/* Image filling the card */}
              <img 
                src={brand.url} 
                alt={brand.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Subtle glass overlay */}
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Brand label on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{brand.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Brands;