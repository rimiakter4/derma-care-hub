
// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation'; // useRouter যোগ করা হয়েছে
// import { useTheme } from "next-themes";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X 
// } from 'lucide-react';
// import Cookies from "js-cookie";
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const router = useRouter(); // router ইনিশিয়ালিজ করা হয়েছে

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // কুকি চেক করে লগইন স্ট্যাটাস বের করা
//   const isLoggedIn = Cookies.get("isLoggedIn");

//   const handleLogout = () => {
//     Cookies.remove("isLoggedIn");
//     toast.success('Logged out successfully!'); // কুকি ডিলিট করা
//     // router.push("/login"); // লগইন পেজে পাঠানো
//     router.refresh(); // পেজ রিফ্রেশ করে নেভবার আপডেট করা
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     { name: 'About Us', href: '/About', icon: <Info size={18} /> },
//   ];

//   return (
//     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
//       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
//         {/* লোগো */}
//         <Link href="/" className="flex items-center gap-2">
//           <img 
//             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
//             className='w-[50px] h-[50px] rounded-full' 
//             alt="Logo" 
//           />
//           <p className="text-2xl font-bold text-slate-900 dark:text-white">
//             DermaCare<span className="text-[#14B8A6]">Hub</span>
//           </p>
//         </Link>

//         {/* ডেক্সটপ মেনু */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link 
//                 key={link.name} 
//                 href={link.href} 
//                 className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
//                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-white hover:text-[#14B8A6]"
//                 }`}
//               >
//                 {link.icon} {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
//                   isActive ? "w-full" : "w-0 group-hover:w-full"
//                 }`}></span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* ডানদিকের অ্যাকশন */}
//         <div className="flex items-center gap-4"> 
//           {/* থিম টগল বাটন */}
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] transition-all border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* লগইন/লগআউট কন্ডিশনাল বাটন */}
//           {isLoggedIn ? (
//             <button 
//               onClick={handleLogout}
//               className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-red-700 px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-white hover:text-[#0D4C4F]"
//             >
//               <LogOut size={18} /> Logout
//             </button> 
//           ) : (
//             <Link 
//               href='/login' 
//               className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-[#188b91] dark:hover:bg-white dark:hover:text-[#0D4C4F]"
//             >
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           {/* মোবাইল মেনু বাটন */}
//           <button 
//             className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react"; // Next-Auth সেশন ইমপোর্ট করা হয়েছে
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X 
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const { data: session } = useSession(); // সেশন থেকে ইউজার চেক করা হচ্ছে

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleLogout = () => {
//     // সেশন স্টোরেজ ক্লিয়ার করা (যদি টোস্ট মেসেজ কন্ট্রোল করতে চান)
//     sessionStorage.removeItem("loginToastShown");
    
//     signOut({ callbackUrl: "/login" }); // Next-Auth এর অফিসিয়াল লগআউট
//     toast.success('Logged out successfully!');
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     { name: 'About Us', href: '/About', icon: <Info size={18} /> },
//   ];

//   return (
//     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
//       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
//         {/* লোগো */}
//         <Link href="/" className="flex items-center gap-2">
//           <img 
//             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
//             className='w-[50px] h-[50px] rounded-full' 
//             alt="Logo" 
//           />
//           <p className="hidden sm:block text-2xl font-bold text-slate-900 dark:text-white">
//             DermaCare<span className="text-[#14B8A6]">Hub</span>
//           </p>
//         </Link>

//         {/* ডেক্সটপ মেনু */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link 
//                 key={link.name} 
//                 href={link.href} 
//                 className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
//                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-white hover:text-[#14B8A6]"
//                 }`}
//               >
//                 {link.icon} {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
//                   isActive ? "w-full" : "w-0 group-hover:w-full"
//                 }`}></span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* ডানদিকের অ্যাকশন */}
//         <div className="flex items-center gap-4"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] transition-all border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* লগইন/লগআউট কন্ডিশনাল বাটন */}
//           {session ? (
//             <div className="flex items-center gap-3">
//               {/* ইউজার প্রোফাইল ইমেজ (গুগল থেকে আসলে) */}
//               {session.user?.image && (
//                 <img src={session.user.image} className="w-8 h-8 rounded-full border border-[#14B8A6]" alt="User" />
//               )}
//               <span className="hidden md:block text-sm font-bold dark:text-white">{session.user?.name}</span>
              
//               <button 
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-bold transition-all shadow-md active:scale-95"
//               >
//                 <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
//               </button> 
//             </div>
//           ) : (
//             <Link 
//               href='/login' 
//               className="flex items-center gap-2 bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-[#188b91]"
//             >
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           {/* মোবাইল মেনু বাটন */}
//           <button 
//             className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// "use client";
// import React, { useEffect, useState, useRef } from 'react'; // useRef যোগ করা হয়েছে
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown 
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false); // প্রোফাইল ড্রপডাউনের জন্য
//   const dropdownRef = useRef(null); // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করার জন্য
  
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const { data: session } = useSession();

//   useEffect(() => {
//     setMounted(true);
//     // ড্রপডাউনের বাইরে ক্লিক করলে তা বন্ধ করার লজিক
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   // Navbar.jsx এর ভেতরে
// const { data: session, status } = useSession();

// useEffect(() => {
//   // ১. চেক করুন ইউজার কি মাত্রই লগইন করলো কিনা
//   const hasToastShown = sessionStorage.getItem("loginToastShown");

//   if (status === "authenticated" && session && !hasToastShown) {
//     // ২. টোস্ট মেসেজ দেখান
//     toast.success(`Welcome, ${session.user.name}!`, {
//       position: "top-right",
//       autoClose: 3000,
//     });

//     // ৩. মার্ক করে দিন যাতে বারবার না আসে
//     sessionStorage.setItem("loginToastShown", "true");
//   }

//   // ৪. যদি লগআউট অবস্থায় থাকে, তবে স্টোরেজ ক্লিন করুন পরবর্তী লগইনের জন্য
//   if (status === "unauthenticated") {
//     sessionStorage.removeItem("loginToastShown");
//   }
// }, [status, session]);

//   const handleLogout = () => {
//     sessionStorage.removeItem("loginToastShown");
//     signOut({ callbackUrl: "/login" });
//     toast.success('Logged out successfully!');
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     { name: 'About Us', href: '/About', icon: <Info size={18} /> },
//   ];

//   return (
//     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
//       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
//         {/* লোগো */}
//         <Link href="/" className="flex items-center gap-2">
//           <img 
//             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
//             className='w-[50px] h-[50px] rounded-full' 
//             alt="Logo" 
//           />
//           <p className="hidden sm:block text-2xl font-bold text-slate-900 dark:text-white">
//             DermaCare<span className="text-[#14B8A6]">Hub</span>
//           </p>
//         </Link>

//         {/* ডেক্সটপ মেনু */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link 
//                 key={link.name} 
//                 href={link.href} 
//                 className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
//                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-white hover:text-[#14B8A6]"
//                 }`}
//               >
//                 {link.icon} {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
//                   isActive ? "w-full" : "w-0 group-hover:w-full"
//                 }`}></span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* ডানদিকের অ্যাকশন */}
//         <div className="flex items-center gap-4"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] transition-all border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* ইউজার ড্রপডাউন মেনু */}
//           {session ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-transparent active:scale-95"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-9 h-9 rounded-full border-2 border-[#14B8A6]" alt="User" />
//                 ) : (
//                   <div className="w-9 h-9 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={20} />
//                   </div>
//                 )}
//                 <ChevronDown size={16} className={`text-slate-600 dark:text-white transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* ড্রপডাউন কন্টেন্ট */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 animate-in fade-in zoom-in duration-200">
//                   <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
//                     <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
//                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.user?.email}</p>
//                   </div>
                  
//                   <div className="p-2">
//                     <button 
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-semibold"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link 
//               href='/login' 
//               className="flex items-center gap-2 bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-[#188b91]"
//             >
//               <LogIn size={18} /> <span className="hidden sm:inline">Login</span>
//             </Link> 
//           )}

//           {/* মোবাইল মেনু বাটন */}
//           <button 
//             className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown 
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const dropdownRef = useRef(null);
  
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
  
//   // ✅ সেশন এবং স্ট্যাটাস একবারই ডিক্লেয়ার করা হয়েছে (Error সমাধান)
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     setMounted(true);

//     // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করার লজিক
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     // ✅ গুগল বা এডমিন যেভাবেই লগইন হোক, এখানে টোস্ট হ্যান্ডেল হবে
//     const hasToastShown = sessionStorage.getItem("loginToastShown");

//     if (status === "authenticated" && session && !hasToastShown) {
//       toast.success(`Welcome, ${session.user.name || "User"}!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       sessionStorage.setItem("loginToastShown", "true");
//     }

//     if (status === "unauthenticated") {
//       sessionStorage.removeItem("loginToastShown");
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [status, session]); // ডিপেন্ডেন্সি সঠিকভাবে দেওয়া হয়েছে

//   const handleLogout = () => {
//     sessionStorage.removeItem("loginToastShown");
//     signOut({ callbackUrl: "/login" });
//     toast.success('Logged out successfully!');
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     { name: 'About Us', href: '/About', icon: <Info size={18} /> },
//   ];

//   return (
//     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
//       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
//         {/* লোগো */}
//         <Link href="/" className="flex items-center gap-2">
//           <img 
//             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
//             className='w-[50px] h-[50px] rounded-full' 
//             alt="Logo" 
//           />
//           <p className="hidden sm:block text-2xl font-bold text-slate-900 dark:text-white">
//             DermaCare<span className="text-[#14B8A6]">Hub</span>
//           </p>
//         </Link>

//         {/* ডেক্সটপ মেনু */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link 
//                 key={link.name} 
//                 href={link.href} 
//                 className={`relative flex items-center gap-2 font-semibold transition-all py-2 group ${
//                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-white hover:text-[#14B8A6]"
//                 }`}
//               >
//                 {link.icon} {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[2px] bg-[#14B8A6] transition-all duration-300 ${
//                   isActive ? "w-full" : "w-0 group-hover:w-full"
//                 }`}></span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* ডানদিকের অ্যাকশন */}
//         <div className="flex items-center gap-4"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] transition-all border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* ইউজার ড্রপডাউন মেনু */}
//           {session ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all active:scale-95"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-9 h-9 rounded-full border-2 border-[#14B8A6]" alt="User" />
//                 ) : (
//                   <div className="w-9 h-9 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={20} />
//                   </div>
//                 )}
//                 <ChevronDown size={16} className={`text-slate-600 dark:text-white transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* ড্রপডাউন কন্টেন্ট */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 animate-in fade-in zoom-in duration-200">
//                   <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
//                     <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
//                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.user?.email}</p>
//                   </div>
                  
//                   <div className="p-2">
//                     <button 
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-semibold"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link 
//               href='/login' 
//               className="flex items-center gap-2 bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-md active:scale-95 hover:bg-[#188b91]"
//             >
//               <LogIn size={18} /> <span className="hidden sm:inline">Login</span>
//             </Link> 
//           )}

//           {/* মোবাইল মেনু বাটন */}
//           <button 
//             className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// ... (আপনার আগের ইমপোর্টগুলো থাকবে)
// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown 
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const dropdownRef = useRef(null);
  
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     setMounted(true);

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     // Login Toast Logic
//     const hasToastShown = sessionStorage.getItem("loginToastShown");
//     if (status === "authenticated" && session && !hasToastShown) {
//       toast.success(`Welcome, ${session.user.name || "User"}!`);
//       sessionStorage.setItem("loginToastShown", "true");
//     }

//     if (status === "unauthenticated") {
//       sessionStorage.removeItem("loginToastShown");
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [status, session]);

//   const handleLogout = () => {
//     sessionStorage.removeItem("loginToastShown");
//     signOut({ callbackUrl: "/login" });
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     { name: 'About Us', href: '/About', icon: <Info size={18} /> },
//   ];

//   return (
//     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
//       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-2">
//           <img 
//             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
//             className='w-[45px] h-[45px] rounded-full object-cover border-2 border-[#14B8A6]' 
//             alt="Logo" 
//           />
//           <p className="hidden sm:block text-xl font-black text-slate-900 dark:text-white tracking-tighter">
//             DermaCare<span className="text-[#14B8A6]">Hub</span>
//           </p>
//         </Link>

//         {/* DESKTOP NAV LINKS */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link 
//                 key={link.name} 
//                 href={link.href} 
//                 className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
//                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
//                 }`}
//               >
//                 {link.icon} {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
//                   isActive ? "w-full" : "w-0 group-hover:w-full"
//                 }`}></span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-3"> 
//           {/* Theme Toggle */}
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* User Profile / Login */}
//           {session ? (
//             // <div className="relative" ref={dropdownRef}>
//             //   <button 
//             //     onClick={() => setIsProfileOpen(!isProfileOpen)}
//             //     className="flex items-center gap-2 p-1 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
//             //   >
//             //     {session.user?.image ? (
//             //       <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6]" alt="User" />
//             //     ) : (
//             //       <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//             //         <UserIcon size={18} />
//             //       </div>
//             //     )}
//             //     <ChevronDown size={14} className={`hidden sm:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//             //   </button>

//             //   {isProfileOpen && (
//             //     <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
//             //       <div className="px-4 py-3 border-b dark:border-white/10">
//             //         <p className="text-sm text-[var(--foreground)] font-bold truncate">{session.user?.name}</p>
//             //         <p className="text-[10px] text-[var(--foreground)] opacity-60 truncate">{session.user?.email}</p>
//             //       </div>
//             //       <div className="p-1">
//             //         <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm">
//             //           <LogOut size={16} /> Logout
//             //         </button>
//             //       </div>
//             //     </div>
//             //   )}
//             // </div>
//             <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100]">
//   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
//     {/* টেক্সট কালার এখানে ফিক্স করা হয়েছে */}
//     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
//       {session.user?.name || "User Name"}
//     </p>
//     <p className="text-[10px] truncate text-slate-500 dark:text-slate-300 opacity-80">
//       {session.user?.email || "user@example.com"}
//     </p>
//   </div>

//   <div className="p-1">
//     <button 
//       onClick={handleLogout} 
//       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
//     >
//       <LogOut size={16} /> Logout
//     </button>
//   </div>
// </div>
//           ) : (
//             <Link href='/login' className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           {/* MOBILE MENU BUTTON */}
//           <button 
//             className="lg:hidden p-2 text-slate-900 dark:text-white"
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {/* MOBILE SIDEBAR OVERLAY */}
//       <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
//         {/* Backdrop */}
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
//         {/* Content */}
//         <div className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#0D4C4F] shadow-2xl transition-transform duration-300 ease-out p-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
//           <div className="flex items-center justify-between mb-10">
//             <p className="text-2xl font-black text-[#14B8A6]">Menu</p>
//             <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-white/10 dark:text-white">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex flex-col gap-2">
//             {navLinks.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link 
//                   key={link.name} 
//                   href={link.href} 
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
//                     isActive ? "bg-[#14B8A6] text-white" : "text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
//                   }`}
//                 >
//                   {link.icon} {link.name}
//                 </Link>
//               );
//             })}
            
//             {!session && (
//               <Link 
//                 href="/login" 
//                 onClick={() => setIsMenuOpen(false)}
//                 className="mt-6 flex items-center justify-center gap-2 bg-[#14B8A6] text-white py-4 rounded-xl font-bold"
//               >
//                 <LogIn size={20} /> Login Now
//               </Link>
//             )}
//           </div>

//           <div className="absolute bottom-10 left-6 right-6 pt-6 border-t dark:border-white/10 text-center">
//              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold dark:text-white">DermaCare Hub v2.0</p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { 
  Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown, 
  PlusSquare
} from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Login Toast Logic
    const hasToastShown = sessionStorage.getItem("loginToastShown");
    if (status === "authenticated" && session && !hasToastShown) {
      toast.success(`Welcome, ${session.user.name || "User"}!`);
      sessionStorage.setItem("loginToastShown", "true");
    }

    if (status === "unauthenticated") {
      sessionStorage.removeItem("loginToastShown");
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [status, session]);

  // const handleLogout = () => {
  //   sessionStorage.removeItem("loginToastShown");
   
  //   signOut({ callbackUrl: "/login" });
  // };
// ... আগের কোড
  const handleLogout = () => {
    sessionStorage.removeItem("loginToastShown");
    
    // লগআউট মেসেজ
    toast.success("Successfully logged out. See you again!");

    // রিডাইরেক্ট করার আগে সামান্য সময় দেওয়া
    setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, 1000);
  };
// ... বাকি কোড
  if (!mounted) return null;

  // const navLinks = [
  //   { name: 'Home', href: '/', icon: <Home size={18} /> },
  //   { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
  //   { name: 'About Us', href: '/About', icon: <Info size={18} /> },
  // ];
  // ইউজার লগইন থাকলে 'Add Item' দেখাবে, নাহলে 'About Us'
  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
    ...(session 
      ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
      : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
    ),
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
            className='w-[45px] h-[45px] rounded-full object-cover border-2 border-[#14B8A6]' 
            alt="Logo" 
          />
          <p className="hidden sm:block text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            DermaCare<span className="text-[#14B8A6]">Hub</span>
          </p>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
                  isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
                }`}
              >
                {link.icon} {link.name}
                <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3"> 
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
          >
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {/* User Profile Dropdown */}
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
              >
                {session.user?.image ? (
                  <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
                    <UserIcon size={18} />
                  </div>
                )}
                <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu - এখন এটি ক্লিক করলেই দেখা যাবে */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
                    <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                      {session.user?.name || "User Name"}
                    </p>
                    <p className="text-[10px] truncate text-slate-500 dark:text-slate-300 opacity-80">
                      {session.user?.email || "user@example.com"}
                    </p>
                  </div>

                  <div className="p-1">
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href='/login' className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
              <LogIn size={18} /> Login
            </Link> 
          )}

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#0D4C4F] shadow-2xl transition-transform duration-300 ease-out p-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-10">
            <p className="text-2xl font-black text-[#14B8A6]">Menu</p>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-white/10 dark:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
                    isActive ? "bg-[#14B8A6] text-white" : "text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
            
            {!session && (
              <Link 
                href="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 bg-[#14B8A6] text-white py-4 rounded-xl font-bold"
              >
                <LogIn size={20} /> Login Now
              </Link>
            )}
          </div>

          <div className="absolute bottom-10 left-6 right-6 pt-6 border-t dark:border-white/10 text-center">
             <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold dark:text-white">DermaCare Hub v2.0</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;