"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ClipboardCheck, ShoppingBag, Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Discover Your Needs",
    desc: "Browse our collection of medical-grade products or take our skin assessment to find exactly what your skin requires.",
    icon: <Search className="w-8 h-8" />,
    color: "from-teal-400 to-emerald-500"
  },
  {
    id: 2,
    title: "Expert Verification",
    desc: "Every product you see is pre-vetted by our board-certified dermatologists to ensure clinical efficacy and safety.",
    icon: <ClipboardCheck className="w-8 h-8" />,
    color: "from-blue-400 to-teal-500"
  },
  {
    id: 3,
    title: "Secure Purchase",
    desc: "Shop with confidence. We source directly from authorized clinical brands to guarantee 100% authenticity.",
    icon: <ShoppingBag className="w-8 h-8" />,
    color: "from-emerald-400 to-teal-600"
  },
  {
    id: 4,
    title: "Visible Results",
    desc: "Follow the prescribed routine and experience the transformation with science-backed pharmaceutical formulas.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-teal-500 to-primary"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-bg-base transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-xs"
          >
            Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-primary mt-4 mb-6 tracking-tighter"
          >
            How Derma Care <br /> <span className="text-secondary ">Works For You</span>
          </motion.h2>
          <p className="text-text-main/70 text-lg font-medium">
            A seamless bridge between clinical science and your daily skincare routine. 
            Four simple steps to healthier, glowing skin.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="relative">
          {/* কানেক্টিং লাইন (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-primary/5 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="group"
              >
                <div className="bg-bg-base dark:bg-accent/10 p-8 rounded-[2.5rem] border border-primary/5 shadow-xl hover:shadow-secondary/10 transition-all duration-500 h-full flex flex-col items-center text-center">
                  
                  {/* Icon Circle */}
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <span className="text-5xl font-black text-primary/5 absolute top-6 right-10 group-hover:text-secondary/10 transition-colors">
                    0{step.id}
                  </span>

                  <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-main/60 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 text-center"
        >
          <button className="px-10 py-4 bg-primary text-accent rounded-2xl font-bold text-lg hover:bg-secondary  transition-colors shadow-2xl">
            Start Your Skin Journey
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;