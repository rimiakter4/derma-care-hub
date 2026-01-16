"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Calendar } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: "Severe Acne Control",
    duration: "4 Weeks",
    desc: "Active breakouts reduced by 85% using clinical-grade Salicylic Acid & Niacinamide.",
    beforeImg: "https://images.pexels.com/photos/3762871/pexels-photo-3762871.jpeg?auto=compress&cs=tinysrgb&w=600",
    afterImg: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Hyperpigmentation",
    duration: "8 Weeks",
    desc: "Targeted Vitamin C and Retinol therapy faded sun spots and evening out skin tone.",
    beforeImg: "https://images.pexels.com/photos/3762185/pexels-photo-3762185.jpeg?auto=compress&cs=tinysrgb&w=600",
    afterImg: "https://images.pexels.com/photos/3762731/pexels-photo-3762731.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const ClinicalEvidence = () => {
  return (
    <section className="py-24 bg-bg-base transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10 shadow-sm"
          >
            Proven Results
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
            Clinical <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary italic">Evidence.</span>
          </h2>
          <p className="mt-6 text-text-main/60 font-medium">
            Real patients. Real results. Our data-backed treatments deliver visible changes you can trust.
          </p>
        </div>

        {/* --- Results Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-accent/20 dark:bg-primary/5 rounded-[3.5rem] p-8 md:p-10 border border-primary/5 group"
            >
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Image Container 1 (Before) */}
                <div className="relative flex-1 rounded-[2.5rem] overflow-hidden border-2 border-primary/5 shadow-xl">
                   <img src={item.beforeImg} alt="Before" className="w-full h-64 object-cover grayscale" />
                   <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Before</div>
                </div>

                {/* Image Container 2 (After) */}
                <div className="relative flex-1 rounded-[2.5rem] overflow-hidden border-4 border-secondary/20 shadow-xl group-hover:border-secondary transition-all duration-500">
                   <img src={item.afterImg} alt="After" className="w-full h-64 object-cover" />
                   <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">After</div>
                </div>
              </div>

              {/* Info Layer */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-2xl font-black text-primary tracking-tight">{item.title}</h4>
                  <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-xl">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-black">{item.duration}</span>
                  </div>
                </div>
                
                <p className="text-text-main/70 text-sm leading-relaxed font-medium italic">
                  "{item.desc}"
                </p>

                <div className="pt-4 flex items-center gap-2 text-secondary">
                   <BadgeCheck className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Expert Verified Result</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClinicalEvidence;