
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Verified Patient",
    comment: "The acne treatment from Derma Care Hub completely transformed my skin. Their products are authentic and dermatologist-approved.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    id: 2,
    name: "Dr. Ryan Kabir",
    role: "Clinical Specialist",
    comment: "As a physician, I always suggest this platform to my patients because they maintain pharmaceutical-grade formulas.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200",
  },
  {
    id: 3,
    name: "Mariya Sultana",
    role: "Skincare Enthusiast",
    comment: "I struggled with pigmentation for years, but I saw visible results within just one month of using their serum.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "Verified Buyer",
    comment: "Whether in Light or Dark mode, the website experience and product quality are both premium grade.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  }
];

const ReviewClient = () => {
  return (
    <section className="py-24 bg-bg-base transition-colors duration-500 overflow-hidden relative">
      
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-primary mt-4 tracking-tighter leading-tight">
              Trusted by <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary italic">Thousands.</span>
            </h2>
            <p className="text-text-main/60 mt-6 text-lg md:text-xl font-medium">
              Real stories from real people who achieved their skin goals with our expert-verified solutions.
            </p>
          </motion.div>
        </div>

        {/* --- Reviews Slider --- */}
        <div className="relative px-2 md:px-0">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-20 !overflow-visible"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-bg-base p-10 rounded-[3rem] border border-primary/5 shadow-2xl shadow-primary/5 flex flex-col h-full relative group transition-all duration-500 hover:border-secondary/30"
                >
                  <Quote className="absolute top-10 right-10 w-12 h-12 text-secondary/10 transition-colors group-hover:text-secondary/20" />
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <p className="text-text-main/80 italic text-lg leading-relaxed mb-8 flex-grow font-medium">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-primary/5 pt-8">
                    <div className="relative">
                       <img 
                        src={review.img} 
                        alt={review.name} 
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-accent group-hover:ring-secondary/20 transition-all duration-500"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1 text-white shadow-lg">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-primary font-black text-lg tracking-tight">
                        {review.name}
                      </h5>
                      <p className="text-text-main/40 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* --- Global Swiper Customization --- */}
      <style jsx global>{`
        .swiper-pagination-bullet { 
          background: var(--primary) !important; 
          opacity: 0.2; 
        }
        .swiper-pagination-bullet-active { 
          background: var(--secondary) !important; 
          width: 25px !important; 
          border-radius: 5px !important; 
          opacity: 1 !important; 
        }
      `}</style>
    </section>
  );
};

export default ReviewClient;