
// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
// import Link from 'next/link';

// import 'swiper/css';
// import 'swiper/css/effect-cards';
// import 'swiper/css/pagination';

// const bannerProducts = [
//   { id: 1, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800", label: "Clinical Acne Care", category: "Derm-Approved" },
//   { id: 2, img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800", label: "Daily SPF 50+", category: "UV Shield" },
//   { id: 3, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800", label: "Retinol Serum", category: "Anti-Aging" },
//   { id: 4, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800", label: "Hydra Boost", category: "Moisturizer" },
//   { id: 5, img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800", label: "Deep Cleanser", category: "Pore Control" },
// ];

// const HeroBanner = () => {
//   return (
//     // bg-slate-50 বদলে bg-bg-base ব্যবহার করা হয়েছে
//     <section className="relative min-h-[700px] lg:h-screen flex items-center justify-center bg-bg-base transition-colors duration-500 overflow-hidden px-6">
      
//       {/* --- Ambient Background Glows --- */}
//       <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/10 blur-[100px] rounded-full -z-0" />
//       <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/10 blur-[100px] rounded-full -z-0" />

//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
//         {/* --- LEFT SIDE: Content --- */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false }}
//           transition={{ duration: 1.6 }}
//           className="text-center lg:text-left order-2 lg:order-1"
//         >
//           {/* bg-accent এবং text-primary ব্যবহার করা হয়েছে */}
//           <motion.span 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-primary/10"
//           >
//             ✨ Dermatologist Recommended
//           </motion.span>
          
//           {/* text-primary ব্যবহার করা হয়েছে যা লাইট মোডে ডার্ক টিল এবং ডার্ক মোডে লাইম হবে */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] mb-6">
//             Expert Solutions <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
//               For Your Skin
//             </span>
//           </h1>
          
//           <p className="text-text-main/80 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
//             Stop guessing your skincare routine. Access clinical-grade products 
//             curated and verified by medical professionals.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//             <Link href="/items">
//               <motion.button 
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full sm:w-auto px-10 py-4 bg-secondary text-white rounded-2xl font-bold shadow-xl transition-all text-lg"
//               >
//                 Explore Products
//               </motion.button>
//             </Link>
            
//             <Link href="/login">
//               <motion.button 
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-primary/20 text-primary rounded-2xl font-bold transition-all text-lg"
//               >
//                 Admin Login
//               </motion.button>
//             </Link>
//           </div>

//           {/* Trust Badges */}
//           <div className="mt-12 flex justify-center lg:justify-start gap-12 border-t border-primary/10 pt-8">
//             <div>
//               <p className="text-2xl font-black text-primary">100%</p>
//               <p className="text-xs text-text-main/60 uppercase font-bold tracking-tighter">Verified</p>
//             </div>
//             <div className="border-l border-primary/10 pl-12">
//               <p className="text-2xl font-black text-primary">50+</p>
//               <p className="text-xs text-text-main/60 uppercase font-bold tracking-tighter">Clinical Brands</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* --- RIGHT SIDE: Cards Swiper --- */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="flex justify-center items-center order-1 lg:order-2"
//         >
//           <div className="w-[280px] h-[380px] md:w-[380px] md:h-[500px]">
//             <Swiper
//               effect={'cards'}
//               grabCursor={true}
//               modules={[EffectCards, Autoplay, Pagination]}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               loop={true}
//               pagination={{ clickable: true, dynamicBullets: true }}
//               className="h-full w-full"
//             >
//               {bannerProducts.map((slide) => (
//                 <SwiperSlide key={slide.id} className="rounded-[2.5rem] shadow-2xl overflow-hidden bg-bg-base border-[6px] border-bg-base">
//                   <div className="relative h-full w-full group">
//                     <img 
//                       src={slide.img} 
//                       alt={slide.label} 
//                       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-8">
//                       <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
//                         {slide.category}
//                       </p>
//                       <p className="text-white font-bold text-2xl tracking-tight leading-none">
//                         {slide.label}
//                       </p>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </motion.div>

//       </div>

//       <style jsx global>{`
//         .swiper-pagination-bullet { background: var(--primary) !important; opacity: 0.3; }
//         .swiper-pagination-bullet-active { background: var(--secondary) !important; width: 25px !important; border-radius: 5px !important; opacity: 1; }
//       `}</style>
//     </section>
//   );
// };

// export default HeroBanner;
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
  // ১. টেক্সট এনিমেশনের জন্য ভেরিয়েন্ট (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="relative min-h-[700px] lg:h-screen flex items-center justify-center bg-bg-base transition-colors duration-500 overflow-hidden px-6">
      
      {/* --- Ambient Background Glows (Floating Animation) --- */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/10 blur-[100px] rounded-full -z-0" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/10 blur-[100px] rounded-full -z-0" 
      />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* --- LEFT SIDE: Content (Enhanced Animation) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-primary/10 shadow-sm"
          >
            ✨ Dermatologist Recommended
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] mb-6 tracking-tight"
          >
            Expert Solutions <br />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary"
            >
              For Your Skin
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-text-main/80 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            Stop guessing your skincare routine. Access clinical-grade products 
            curated and verified by medical professionals.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link href="/items">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(var(--secondary-rgb), 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 bg-secondary text-white rounded-2xl font-bold shadow-xl transition-all text-lg"
              >
                Explore Products
              </motion.button>
            </Link>
            
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-primary/20 text-primary rounded-2xl font-bold transition-all text-lg"
              >
                Admin Login
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges (Staggered Pop-in) */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex justify-center lg:justify-start gap-12 border-t border-primary/10 pt-8"
          >
            <motion.div whileHover={{ y: -5 }} className="cursor-default">
              <p className="text-2xl font-black text-primary">100%</p>
              <p className="text-xs text-text-main/60 uppercase font-bold tracking-tighter">Verified</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="border-l border-primary/10 pl-12 cursor-default">
              <p className="text-2xl font-black text-primary">50+</p>
              <p className="text-xs text-text-main/60 uppercase font-bold tracking-tighter">Clinical Brands</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: Cards Swiper (3D & Float Animation) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateY: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="flex justify-center items-center order-1 lg:order-2"
        >
          {/* Floating Effect for the entire Swiper Container */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[280px] h-[380px] md:w-[380px] md:h-[500px]"
          >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="h-full w-full"
            >
              {bannerProducts.map((slide) => (
                <SwiperSlide key={slide.id} className="rounded-[2.5rem] shadow-2xl overflow-hidden bg-bg-base border-[6px] border-bg-base">
                  <div className="relative h-full w-full group">
                    <img 
                      src={slide.img} 
                      alt={slide.label} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-8">
                      <motion.p 
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
                      >
                        {slide.category}
                      </motion.p>
                      <p className="text-white font-bold text-2xl tracking-tight leading-none">
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
        .swiper-pagination-bullet { background: var(--primary) !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { background: var(--secondary) !important; width: 25px !important; border-radius: 5px !important; opacity: 1; }
      `}</style>
    </section>
  );
};

export default HeroBanner;