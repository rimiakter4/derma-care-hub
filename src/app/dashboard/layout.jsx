
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, ShoppingBag, Users, PlusSquare, 
  User as UserIcon, LogOut, ChevronRight, Menu, X 
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ১. সেশন থেকে রোল নেওয়া এবং বড় হাতের অক্ষরে রূপান্তর করা (Case Sensitivity Fix)
  const rawRole = session?.user?.role || 'BUYER';
  const role = rawRole.toUpperCase();

  // ২. রিডাইরেক্ট লজিক: মেইন ড্যাশবোর্ডে ঢুকলে প্রোফাইলে পাঠিয়ে দিবে
  useEffect(() => {
    if (pathname === '/dashboard' || pathname === '/dashboard/user') {
      router.replace('/dashboard/profile');
    }
  }, [pathname, router]);

  // ৩. এডমিন এবং ইউজারদের জন্য আলাদা আলাদা লিঙ্ক
  const adminLinks = [
    { name: 'Admin Home', href: '/dashboard/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'My Profile', href: '/dashboard/profile', icon: <UserIcon size={18} /> },
    { name: 'All Orders', href: '/dashboard/all-orders', icon: <ShoppingBag size={18} /> },
    { name: 'Manage Products', href: '/dashboard/manage-products', icon: <ShoppingBag size={18} /> },
    { name: 'Add New Item', href: '/dashboard/additem', icon: <PlusSquare size={18} /> },
    { name: 'All Users', href: '/dashboard/manage-user', icon: <Users size={18} /> },
  ];

  const userLinks = [
    { name: 'My Profile', href: '/dashboard/profile', icon: <UserIcon size={18} /> },
    { name: 'My Orders', href: '/dashboard/my-orders', icon: <ShoppingBag size={18} /> },
  ];

  // ৪. রোলের ওপর ভিত্তি করে মেনু ফিল্টার করা
  const menuLinks = role === 'ADMIN' ? adminLinks : userLinks;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#083336] pt-24 transition-colors duration-500">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-8 right-8 z-50 p-4 bg-[#14B8A6] text-white rounded-2xl shadow-2xl shadow-[#14B8A6]/40 hover:scale-110 active:scale-95 transition-all"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-4 gap-8">
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky lg:top-28 z-40 inset-y-0 left-0 w-80 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          bg-white/80 dark:bg-[#0D4C4F]/90 backdrop-blur-xl rounded-[2.5rem] 
          border border-slate-200/50 dark:border-white/10 p-8 h-[calc(100vh-140px)] shadow-2xl shadow-black/5
        `}>
          
          {/* Sidebar Header */}
          <div className="mb-10 px-2">
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-[4px] text-[#14B8A6]">
                {role} MANAGEMENT
              </p>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">
              Dashboard
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-3 overflow-y-auto pr-2 max-h-[60%] custom-scrollbar">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-[1.5rem] font-bold text-[13px] transition-all duration-300 group ${
                  pathname === link.href 
                  ? "bg-[#14B8A6] text-white shadow-xl shadow-[#14B8A6]/30 scale-[1.02]" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:translate-x-1"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`${pathname === link.href ? "text-white" : "text-[#14B8A6]"} transition-colors`}>
                    {link.icon}
                  </span>
                  {link.name}
                </div>
                <ChevronRight size={14} className={`transition-transform duration-300 ${pathname === link.href ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-8 left-8 right-8 pt-6 border-t border-slate-100 dark:border-white/5">
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-4 px-5 py-4 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl font-black text-[13px] transition-all uppercase italic tracking-wider"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white/60 dark:bg-[#0D4C4F]/60 backdrop-blur-md rounded-[3rem] border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-black/5 min-h-[80vh] p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;