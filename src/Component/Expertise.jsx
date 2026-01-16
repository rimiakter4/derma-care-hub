 
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const specialists = [
  {
    id: 1,
    name: "Dr. Sarah Rahman",
    role: "Lead Dermatologist",
    degree: "MBBS, FCPS (Dermatology)",
    // Stable image of a professional female doctor
    img: "https://i.ibb.co.com/5hJmMHY5/pexels-drharorswellness-32428850.jpg", 
    quote: "True skin health only happens when we prioritize molecular stability over trends."
  },
  {
    id: 2,
    name: "Dr. Ahmed Khan",
    role: "Clinical Researcher",
    degree: "MD, Board Certified (USA)",
    // Stable image of a professional male doctor
    img: "https://i.ibb.co.com/DHqRf2hM/male-dentist-looking-camera.jpg",
    quote: "Innovation meets efficiency when science is applied at the cellular level."
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    role: "Cosmetic Specialist",
    degree: "PhD, Clinical Science",
    // Stable image of a cosmetic specialist
    img: "https://i.ibb.co/GMcW3zD/female-doctor-2.jpg",
    quote: "Skincare is not one-size-fits-all; it's a precise biological calculation."
  }
];
const ExpertBoard = () => {
  return (
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10"
          >
            Medical Authority
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
            Meet Our <br /> <span className="text-secondary italic">Specialists.</span>
          </h2>
        </div>

        {/* Swiper Container */}
        <div className="relative px-4 md:px-12">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {specialists.map((dr) => (
              <SwiperSlide key={dr.id}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-primary/5 rounded-[3rem] p-8 border border-primary/5 shadow-2xl shadow-primary/5 text-center h-full flex flex-col items-center group transition-all duration-500 hover:border-secondary/30"
                >
                  {/* Doctor Image with Circular Frame */}
                  <div className="relative w-40 h-40 mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary animate-spin-slow group-hover:border-solid transition-all" />
                    <div className="absolute inset-2 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={dr.img} alt={dr.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-grow">
                    <h4 className="text-2xl font-black text-primary tracking-tight">{dr.name}</h4>
                    <p className="text-secondary font-bold text-xs uppercase tracking-widest">{dr.role}</p>
                    <p className="text-text-main/50 text-sm font-medium">{dr.degree}</p>
                    
                    <div className="pt-6 relative">
                      <Quote className="w-8 h-8 text-secondary/20 absolute -top-2 left-1/2 -translate-x-1/2" />
                      <p className="text-text-main/70 text-sm italic leading-relaxed relative z-10 px-4">
                        "{dr.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="mt-8 pt-6 border-t border-primary/5 w-full">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-primary/40">Verified Specialist</span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet { background: var(--primary) !important; opacity: 0.2; }
        .swiper-pagination-bullet-active { 
          background: var(--secondary) !important; 
          width: 30px !important; 
          border-radius: 5px !important; 
          opacity: 1; 
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </section>
  );
};

export default ExpertBoard;