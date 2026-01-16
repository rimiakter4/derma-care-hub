
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link'; // Importing Next.js Link for better performance

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // 1. Social Links Data
  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/rimi.akter.168332" },
    // { Icon: Instagram, href: "https://instagram.com/yourprofile" },
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/remi-akter/" },
  ];

  // 2. Navigation Data
  const footerLinks = {
    services: [
      { name: "Acne Treatment", href: "/services/acne" },
      { name: "Anti-Aging", href: "/services/anti-aging" },
      { name: "Pigmentation", href: "/services/pigmentation" },
      { name: "Expert Consultation", href: "/consultation" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Specialists", href: "/specialists" },
      { name: "Authenticity", href: "/authenticity" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-bg-base border-t border-primary/5 pt-24 pb-12 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* --- Brand Identity --- */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-primary tracking-tighter">
              DERMA CARE <span className="text-secondary italic">HUB.</span>
            </h3>
            <p className="text-text-main/60 font-medium leading-relaxed">
              Your trusted destination for clinical-grade skincare and dermatologist-verified solutions. Science-backed, results-driven.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -5, color: 'var(--secondary)' }}
                  href={href}
                  target="_blank" // Opens in new tab
                  rel="noopener noreferrer" // Security best practice
                  className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary transition-colors border border-primary/5"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- Services Links --- */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8">Solutions</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-text-main/60 hover:text-secondary font-bold text-sm transition-colors flex items-center group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Company Links --- */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-text-main/60 hover:text-secondary font-bold text-sm transition-colors flex items-center group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div className="space-y-6">
            <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 cursor-default">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <p className="text-text-main/60 text-sm font-medium">123 Health Ave, Medical District<br />Dhaka, Bangladesh</p>
              </div>
              <a href="tel:+8801234567890" className="flex items-center gap-4 hover:text-secondary transition-colors group">
                <Phone className="w-5 h-5 text-secondary" />
                <p className="text-text-main/60 group-hover:text-secondary text-sm font-medium">+880 1234 567 890</p>
              </a>
              <a href="mailto:support@dermacarehub.com" className="flex items-center gap-4 hover:text-secondary transition-colors group">
                <Mail className="w-5 h-5 text-secondary" />
                <p className="text-text-main/60 group-hover:text-secondary text-sm font-medium">support@dermacarehub.com</p>
              </a>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-main/40 text-[10px] font-bold uppercase tracking-widest">
            © {currentYear} Derma Care Hub. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-text-main/40 text-[10px] font-bold uppercase tracking-widest hover:text-secondary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-text-main/40 text-[10px] font-bold uppercase tracking-widest hover:text-secondary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
