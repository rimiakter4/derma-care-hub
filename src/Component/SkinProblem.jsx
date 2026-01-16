
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SkinProblem = () => {
  const problems = [
    {
      title: "Acne Control",
      desc: "Combat active breakouts and prevent future congestion with medical-grade formulas.",
      img: "https://i.ibb.co.com/Jwtws27d/pexels-anna-nekrashevich-6475979.jpg",
    },
    {
      title: "Dry Skin",
      desc: "Restore your lipid barrier and eliminate flakiness with deep-acting ceramides.",
      img: "https://i.ibb.co.com/7J0HXVfw/istockphoto-1783774300-2048x2048.jpg",
    },
    {
      title: "Pigmentation",
      desc: "Target dark spots and sun damage with clinical-strength brightening agents.",
      img: "https://i.ibb.co.com/FkT3zD9D/istockphoto-1256122374-2048x2048.jpg",
    },
    {
      title: "Sun Damage",
      desc: "Repair photo-aging and shield against UV rays with advanced antioxidants.",
      img: "https://i.ibb.co.com/XZL3Qdpk/pexels-olly-3763188.jpg",
    }
  ];

  return (
    <section className="relative py-24 bg-bg-base transition-colors duration-500 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Center Aligned Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10"
          >
            Targeted Therapy
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[1.1] mb-8"
          >
            Identify Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary italic">
              Skin Concern.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-main/70 text-lg md:text-xl font-medium leading-relaxed"
          >
            Don't guess your routine. Choose your specific concern and discover 
            science-backed treatments curated by our dermatologists.
          </motion.p>
        </div>

        {/* --- Problems Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="group relative h-[480px] rounded-[3rem] overflow-hidden bg-bg-base border-[6px] border-bg-base shadow-2xl transition-all duration-500"
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 opacity-90 dark:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white text-center items-center">
                <h4 className="text-2xl font-black mb-4 group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                </h4>
                
                <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {item.desc}
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="mt-6 bg-secondary p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinProblem;