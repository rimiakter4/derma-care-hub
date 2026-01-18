
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const bannerProducts = [
  { id: 1, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800", label: "Clinical Acne Care", category: "Derm-Approved" },
  { id: 2, img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800", label: "Daily SPF 50+", category: "UV Shield" },
  { id: 3, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800", label: "Retinol Serum", category: "Anti-Aging" },
  { id: 4, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800", label: "Hydra Boost", category: "Moisturizer" },
  { id: 5, img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800", label: "Deep Cleanser", category: "Pore Control" },
];

const HeroBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-base transition-colors duration-500 overflow-hidden pt-24 pb-12 lg:py-0">
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-secondary/5 blur-[70px] md:blur-[120px] rounded-full -z-0" 
      />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center lg:text-left order-1"
        >
          <motion.span 
            variants={itemVariants} 
            className="inline-block px-3 py-1.5 bg-accent text-primary rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest mb-4 border border-primary/5 shadow-sm"
          >
            ✨ Dermatologist Recommended
          </motion.span>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.15] mb-5 tracking-tight"
          >
            Expert Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary">For Your Skin</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-text-main/80 text-sm md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Stop guessing. Access clinical-grade products curated and verified by medical professionals.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10 w-full max-w-[300px] sm:max-w-none mx-auto lg:mx-0"
          >
            <Link href="/Allproducts" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 bg-secondary text-white rounded-xl font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all text-sm md:text-base">
                Explore Products
              </button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 border-2 border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 active:scale-95 transition-all text-sm md:text-base">
                User Login
              </button>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="flex justify-center lg:justify-start gap-8 border-t border-primary/10 pt-6"
          >
            <div>
              <p className="text-xl md:text-2xl font-black text-primary">100%</p>
              <p className="text-[10px] text-text-main/50 uppercase font-bold tracking-widest">Verified</p>
            </div>
            <div className="border-l border-primary/10 pl-8">
              <p className="text-xl md:text-2xl font-black text-primary">50+</p>
              <p className="text-[10px] text-text-main/50 uppercase font-bold tracking-widest">Clinical Brands</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center order-2"
        >
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[250px] h-[340px] md:w-[360px] md:h-[490px] lg:w-[390px] lg:h-[530px]"
          >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="h-full w-full"
            >
              {bannerProducts.map((slide) => (
                <SwiperSlide 
                  key={slide.id} 
                  className="rounded-[1.8rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden bg-bg-base border-[4px] md:border-[8px] border-bg-base"
                >
                  <div className="relative h-full w-full group">
                    <img 
                      src={slide.img} 
                      alt={slide.label} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/20 to-transparent p-6 md:p-10 text-left">
                      <p className="text-secondary text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-1">
                        {slide.category}
                      </p>
                      <p className="text-white font-bold text-lg md:text-2xl leading-tight">
                        {slide.label}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>

      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { 
          background: var(--primary) !important; 
          opacity: 0.2; 
        }
        .swiper-pagination-bullet-active { 
          background: var(--secondary) !important; 
          width: 22px !important; 
          border-radius: 6px !important; 
          opacity: 1; 
        }
        .swiper-3d {
          perspective: 1200px;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;