
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { 
  Moon, Sun, Home, Package, Info, LogIn, Menu, X, 
  Warehouse 
} from 'lucide-react';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Products', href: '/allProduct', icon: <Package size={18} /> },
    { name: 'About Us', href: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-[#0D4C4F] shadow-lg h-20">
      <div className=" mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 z-50">
      <img src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" className='w-[60px] h-[50px] rounded-full' alt="" />
          <p className="text-2xl font-bold text-white ">
            DermaCare<span className="text-[#14B8A6]">Hub</span>
          </p>
        </Link>

        {/* ডেক্সটপ মেনু (Underline Style) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
                  isActive ? "text-[#14B8A6]" : "text-white hover:text-[#14B8A6]"
                }`}
              >
                {link.icon} {link.name}
                {/* অ্যাক্টিভ আন্ডারলাইন */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 "
                }`}></span>
              </Link>
            );
          })}
        </div>

        {/* ডানদিকের অ্যাকশন */}
        <div className="flex items-center gap-4">
          
          {/* About Us (আন্ডারলাইন স্টাইল) */}
          {/* <Link 
            href='/about' 
            className={`relative hidden md:flex items-center gap-2 font-semibold py-2 transition-all group ${
              pathname === '/about' ? "text-[#14B8A6]" : "text-white hover:text-[#14B8A6]"
            }`}
          >
            <Info size={18} /> About Us
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
              pathname === '/about' ? "w-full" : "w-0 group-hover:w-full"
            }`}></span>
          </Link> */}

          {/* থিম টগল */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#14B8A6] transition-all border border-white/20 text-white"
          >
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {/* লগইন বাটন */}
          <Link 
            href='/login' 
            className="hidden sm:flex items-center gap-2 bg-[#14B8A6] hover:bg-white hover:text-[#0D4C4F] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95"
          >
            <LogIn size={18} /> Login
          </Link>

          {/* মোবাইল মেনু টগল */}
          <button 
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার */}
      <div className={`lg:hidden fixed inset-0 z-[100] ${isMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={toggleMenu}></div>
        
        <div className={`absolute right-0 h-full w-[280px] bg-[#0D4C4F] p-6 shadow-2xl flex flex-col transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
            <span className="text-xl font-bold text-white tracking-tighter">NAVIGATION</span>
            <button onClick={toggleMenu} className="text-white bg-white/10 p-2 rounded-full"><X size={20} /></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[...navLinks].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={toggleMenu} 
                  className={`flex items-center gap-4 text-lg font-medium p-4 rounded-xl transition-all ${
                    isActive ? "bg-white/10 text-[#14B8A6] border-l-4 border-[#14B8A6]" : "text-white hover:bg-white/5"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
            
            <Link href='/login' onClick={toggleMenu} className="flex items-center justify-center gap-2 bg-[#14B8A6] text-white py-4 rounded-xl font-bold mt-6">
              <LogIn size={18} /> Login Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;