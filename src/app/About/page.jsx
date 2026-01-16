"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Activity, HeartPulse, Award, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  // অ্যানিমেশন ভেরিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const stats = [
    { label: "Products Verified", value: "500+" },
    { label: "Expert Dermatologists", value: "50+" },
    { label: "Happy Customers", value: "10k+" },
    { label: "Clinical Brands", value: "50+" },
  ];

  const features = [
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Clinically Verified", desc: "Every product undergoes rigorous multi-step verification by our medical board." },
    { icon: <Users className="w-8 h-8" />, title: "Expert Guidance", desc: "Direct access to skincare routines curated by board-certified professionals." },
    { icon: <Activity className="w-8 h-8" />, title: "Results Driven", desc: "We prioritize bio-available ingredients that guarantee visible skin improvement." },
    { icon: <HeartPulse className="w-8 h-8" />, title: "Skin Safety", desc: "Zero-tolerance policy for harmful toxins. Only science-backed, safe formulas." }
  ];

  return (
    <div className="min-h-screen bg-bg-base transition-colors duration-500">
      
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* ব্যাকগ্রাউন্ড গ্লো */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,var(--color-secondary),transparent_50%)] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
               <motion.span initial={{ width: 0 }} whileInView={{ width: 48 }} className="h-[2px] bg-secondary inline-block"></motion.span>
               <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase italic">Our Mission</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[1] mb-8 tracking-tighter text-primary">
              Science-Driven <br />
              <span className="text-secondary">Skin Care.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-main/80 leading-relaxed max-w-2xl font-medium">
              We merge pharmaceutical precision with premium skincare. Derma Care Hub eliminates the guesswork from your daily routine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-primary/10"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex flex-col">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-1 tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-secondary">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Features Grid Section --- */}
      <section className="py-20 bg-accent/30 dark:bg-accent/5">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-10 rounded-3xl bg-bg-base border border-primary/5 shadow-xl hover:shadow-secondary/10 transition-all group"
              >
                <div className="text-secondary mb-8 transition-transform group-hover:rotate-12">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight text-primary">
                  {item.title}
                </h4>
                <p className="text-text-main/70 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Story Section --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-[10px] border-accent shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" 
                alt="Lab Research" 
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
            </div>
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -left-6 bg-secondary p-6 md:p-8 rounded-[2rem] shadow-2xl z-20 text-bg-base"
            >
               <Award className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-primary mb-8 leading-[1] tracking-tighter">
              Authenticity Is <br /> 
              <span className="text-secondary italic">Non-Negotiable.</span>
            </h2>
            <div className="space-y-6 text-text-main/80 text-lg font-medium">
              <p>
                In an industry full of marketing noise, Derma Care Hub stands for clarity. Every brand we host is vetted for clinical performance.
              </p>
              <div className="pt-4 space-y-4">
                {["Clinical Verification", "Dermatologist Curated", "Authentic Sourcing"].map((t, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    key={t} 
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-black uppercase tracking-widest text-primary/90">{t}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-10 py-5 bg-primary text-bg-base rounded-2xl font-black text-lg shadow-2xl"
            >
                Our Full Philosophy
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center text-bg-base flex flex-col items-center shadow-2xl relative overflow-hidden group"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter relative z-10">Ready for Clinical Results?</h2>
          <p className="text-bg-base/80 mb-12 text-lg md:text-xl max-w-xl font-bold italic text-center relative z-10">
            "Invest in your skin. It is going to represent you for a long time."
          </p>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl relative z-10"
          >
            Start Shopping Now
          </motion.button>
          
          {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড শেপ */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" 
          />
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;