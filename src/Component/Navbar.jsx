
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { 
  Moon, Sun, Home, Package, Info, LogIn, Menu, X 
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

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Products', href: '/allProduct', icon: <Package size={18} /> },
    { name: 'About Us', href: '/About', icon: <Info size={18} /> },
  ];

  return (
    // এখানে bg পরিবর্তনশীল করা হয়েছে: লাইট মোডে সাদা, ডার্ক মোডে আপনার ডার্ক গ্রিন/ব্লু
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
            className='w-[50px] h-[50px] rounded-full' 
            alt="Logo" 
          />
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            DermaCare<span className="text-[#14B8A6]">Hub</span>
          </p>
        </Link>

        {/* ডেক্সটপ মেনু */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
                  isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-white hover:text-[#14B8A6]"
                }`}
              >
                {link.icon} {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            );
          })}
        </div>

        {/* ডানদিকের অ্যাকশন */}
        <div className="flex items-center gap-4"> 
          {/* থিম টগল বাটন */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] transition-all border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
          >
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          <Link 
            href='/login' 
            className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-[#0D4C4F] dark:hover:bg-white dark:hover:text-[#0D4C4F]"
          >
            <LogIn size={18} /> Login
          </Link> 


          <button 
            className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;