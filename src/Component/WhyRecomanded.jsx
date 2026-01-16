
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FlaskConical, ShieldPlus, Users2 } from 'lucide-react';

const WhyRecommended = () => {
  const features = [
    {
      icon: <ShieldPlus className="w-6 h-6" />,
      title: "Pharmaceutical Grade",
      desc: "We only host brands that meet strict clinical safety standards."
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Lab-Tested Efficacy",
      desc: "Every active ingredient is verified for its molecular stability."
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Derm-Led Curation",
      desc: "Our board of specialists hand-picks every single product."
    }
  ];

  return (
    <section className="py-24 bg-bg-base transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: Brand Identity --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
                The Gold Standard
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tighter">
                Why Experts <br /> 
                <span className="italic font-light text-text-main/40">Trust Us.</span>
              </h2>
            </div>
            
            <p className="text-text-main/70 text-lg md:text-xl max-w-md leading-relaxed font-medium">
              We don't just sell skincare; we provide medical-grade solutions 
              backed by rigorous scientific data and professional expertise.
            </p>

            <div className="pt-6 border-t border-primary/10">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-secondary transition-colors">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-primary font-black text-lg">ISO Certified</p>
                  <p className="text-text-main/50 text-xs uppercase tracking-widest font-bold">Safety Guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: Interactive List --- */}
          <div className="space-y-6">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ x: 20 }}
                className="group p-8 rounded-[2.5rem] bg-accent/30 dark:bg-white/5 border border-transparent hover:border-secondary/20 hover:bg-white dark:hover:bg-brand-deep transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="mt-1 p-3 rounded-2xl bg-white dark:bg-primary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-primary mb-2 tracking-tight group-hover:text-secondary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-text-main/60 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyRecommended;
