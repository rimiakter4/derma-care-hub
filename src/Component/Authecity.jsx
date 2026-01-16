"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, QrCode, Factory, PackageCheck, Zap } from 'lucide-react';

const Authenticity = () => {
  const verificationSteps = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Direct Global Sourcing",
      desc: "We eliminate middle-men by sourcing directly from global manufacturers and authorized international distributors."
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Strict Batch Tracking",
      desc: "Every product is scanned and verified against its unique batch code to ensure production legitimacy and freshness."
    },
    {
      icon: <PackageCheck className="w-8 h-8" />,
      title: "Quality Control Seals",
      desc: "All products undergo a rigorous inspection for original safety seals before they are dispatched to your doorstep."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-deep transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Left Side: Visual/Image --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-brand-mint/20 dark:border-white/5 bg-slate-100 dark:bg-slate-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800" 
                alt="Product Verification" 
                className="w-full h-[500px] object-cover opacity-95 dark:opacity-70"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 bg-white/95 dark:bg-brand-emerald backdrop-blur-md p-6 rounded-[2rem] shadow-xl flex flex-col items-center border border-brand-emerald/10">
                <ShieldCheck className="w-12 h-12 text-brand-emerald dark:text-white mb-2" />
                <span className="text-black dark:text-white font-black text-xs uppercase tracking-tighter text-center">Certified <br/> Authentic</span>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-emerald/10 blur-[80px] rounded-full" />
          </motion.div>

          {/* --- Right Side: Content --- */}
          <div className="space-y-12">
            <div>
              <motion.span 
                className="px-5 py-2 bg-brand-mint/50 dark:bg-brand-emerald/10 text-black dark:text-brand-mint rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 inline-block border border-brand-emerald/10"
              >
                Zero-Counterfeit Policy
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-[1.1] tracking-tighter mb-6">
                Uncompromising <br />
                <span className="text-brand-emerald italic">Authenticity.</span>
              </h2>
              <p className="text-black/70 dark:text-slate-400 text-lg font-medium leading-relaxed">
                In an industry flooded with counterfeits, we set the benchmark for purity. Our multi-layer verification process ensures that every drop you apply is 100% genuine medical grade.
              </p>
            </div>

            {/* Verification Steps Grid */}
            <div className="grid gap-6">
              {verificationSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-brand-emerald/10 hover:border-brand-emerald/40 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-brand-deep rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300 border border-brand-mint dark:border-brand-emerald/10">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black dark:text-white mb-1 tracking-tight">{step.title}</h4>
                    <p className="text-black/60 dark:text-slate-400 text-sm font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Verification Call to Action */}
            <div className="pt-6">
              <button className="flex items-center gap-4 px-10 py-5 bg-black dark:bg-white text-white dark:text-brand-deep rounded-2xl font-black group transition-all hover:scale-105 active:scale-95 shadow-xl">
                <Zap className="w-5 h-5 text-brand-emerald fill-brand-emerald" />
                How to Spot a Fake Product
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Authenticity;