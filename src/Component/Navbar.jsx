
// // "use client";
// // import React, { useEffect, useState, useRef } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation'; 
// // import { useTheme } from "next-themes";
// // import { useSession, signOut } from "next-auth/react";
// // import { 
// //   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown, 
// //   PlusSquare
// // } from 'lucide-react';
// // import { toast } from 'react-toastify';

// // const Navbar = () => {
// //   const [mounted, setMounted] = useState(false);
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// //   const dropdownRef = useRef(null);
  
// //   const { theme, setTheme } = useTheme();
// //   const pathname = usePathname();
// //   const { data: session, status } = useSession();

// //   useEffect(() => {
// //     setMounted(true);

// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsProfileOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);

// //     // Login Toast Logic
// //     const hasToastShown = sessionStorage.getItem("loginToastShown");
// //     if (status === "authenticated" && session && !hasToastShown) {
// //       toast.success(`Welcome, ${session.user.name || "User"}!`);
// //       sessionStorage.setItem("loginToastShown", "true");
// //     }

// //     if (status === "unauthenticated") {
// //       sessionStorage.removeItem("loginToastShown");
// //     }

// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [status, session]);

// //   // const handleLogout = () => {
// //   //   sessionStorage.removeItem("loginToastShown");
   
// //   //   signOut({ callbackUrl: "/login" });
// //   // };
// // // ... আগের কোড
// //   const handleLogout = () => {
// //     sessionStorage.removeItem("loginToastShown");
    
// //     // লগআউট মেসেজ
// //     toast.success("Successfully logged out. See you again!");

// //     // রিডাইরেক্ট করার আগে সামান্য সময় দেওয়া
// //     setTimeout(() => {
// //       signOut({ callbackUrl: "/login" });
// //     }, 1000);
// //   };
// // // ... বাকি কোড
// //   if (!mounted) return null;

  
// //   const navLinks = [
// //     { name: 'Home', href: '/', icon: <Home size={18} /> },
// //         { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
// //     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
// //     ...(session 
// //       ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
// //       : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
     
// //     )
 
// //   ];

// //   return (
// //     <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
// //       <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
// //         {/* LOGO */}
// //         <Link href="/" className="flex items-center gap-2">
// //           <img 
// //             src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
// //             className='w-[45px] h-[45px] rounded-full object-cover border-2 border-[#14B8A6]' 
// //             alt="Logo" 
// //           />
// //           <p className="hidden sm:block text-xl font-black text-slate-900 dark:text-white tracking-tighter">
// //             DermaCare<span className="text-[#14B8A6]">Hub</span>
// //           </p>
// //         </Link>

// //         {/* DESKTOP NAV LINKS */}
// //         <div className="hidden lg:flex items-center gap-8">
// //           {navLinks.map((link) => {
// //             const isActive = pathname === link.href;
// //             return (
// //               <Link 
// //                 key={link.name} 
// //                 href={link.href} 
// //                 className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
// //                   isActive ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
// //                 }`}
// //               >
// //                 {link.icon} {link.name}
// //                 <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
// //                   isActive ? "w-full" : "w-0 group-hover:w-full"
// //                 }`}></span>
// //               </Link>
// //             );
// //           })}
// //         </div>

// //         {/* RIGHT ACTIONS */}
// //         <div className="flex items-center gap-3"> 
// //           {/* Theme Toggle */}
// //           <button
// //             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //             className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
// //           >
// //             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
// //           </button>

// //           {/* User Profile Dropdown */}
// //           {session ? (
// //             <div className="relative" ref={dropdownRef}>
// //               <button 
// //                 onClick={() => setIsProfileOpen(!isProfileOpen)}
// //                 className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
// //               >
// //                 {session.user?.image ? (
// //                   <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
// //                 ) : (
// //                   <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
// //                     <UserIcon size={18} />
// //                   </div>
// //                 )}
// //                 <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
// //               </button>

// //               {/* Dropdown Menu - এখন এটি ক্লিক করলেই দেখা যাবে */}
// //               {isProfileOpen && (
// //                 <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
// //                   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
// //                     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
// //                       {session.user?.name || "User Name"}
// //                     </p>
// //                     <p className="text-[10px] truncate text-slate-500 dark:text-slate-300 opacity-80">
// //                       {session.user?.email || "user@example.com"}
// //                     </p>
// //                   </div>

// //                   <div className="p-1">
// //                     <button 
// //                       onClick={handleLogout} 
// //                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
// //                     >
// //                       <LogOut size={16} /> Logout
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <Link href='/login' className="hidden sm:flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
// //               <LogIn size={18} /> Login
// //             </Link> 
// //           )}

// //           {/* MOBILE MENU BUTTON */}
// //           <button 
// //             className="lg:hidden p-2 text-slate-900 dark:text-white"
// //             onClick={() => setIsMenuOpen(true)}
// //           >
// //             <Menu size={28} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* MOBILE SIDEBAR OVERLAY */}
// //       <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
// //         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
// //         <div className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#0D4C4F] shadow-2xl transition-transform duration-300 ease-out p-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
// //           <div className="flex items-center justify-between mb-10">
// //             <p className="text-2xl font-black text-[#14B8A6]">Menu</p>
// //             <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-white/10 dark:text-white">
// //               <X size={24} />
// //             </button>
// //           </div>

// //           <div className="flex flex-col gap-2">
// //             {navLinks.map((link) => {
// //               const isActive = pathname === link.href;
// //               return (
// //                 <Link 
// //                   key={link.name} 
// //                   href={link.href} 
// //                   onClick={() => setIsMenuOpen(false)}
// //                   className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
// //                     isActive ? "bg-[#14B8A6] text-white" : "text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
// //                   }`}
// //                 >
// //                   {link.icon} {link.name}
// //                 </Link>
// //               );
// //             })}
            
// //             {!session && (
// //               <Link 
// //                 href="/login" 
// //                 onClick={() => setIsMenuOpen(false)}
// //                 className="mt-6 flex items-center justify-center gap-2 bg-[#14B8A6] text-white py-4 rounded-xl font-bold"
// //               >
// //                 <LogIn size={20} /> Login Now
// //               </Link>
// //             )}
// //           </div>

// //           <div className="absolute bottom-10 left-6 right-6 pt-6 border-t dark:border-white/10 text-center">
// //              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold dark:text-white">DermaCare Hub v2.0</p>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown, 
//   PlusSquare
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
//     toast.success("Successfully logged out. See you again!");
//     setTimeout(() => {
//       signOut({ callbackUrl: "/login" });
//     }, 1000);
//   };

//   if (!mounted) return null;

//   // --- ROLE BASED NAV LINKS LOGIC ---
//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
    
//     // Role logic: Jodi session thake ebong role admin hoy, tobe Add Item dekhabe
//     ...(session?.user?.role === 'admin' 
//       ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
//       : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
//     )
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

//           {/* User Profile Dropdown */}
//           {session ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={18} />
//                   </div>
//                 )}
//                 <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
//                   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
//                     {/* Displaying Role */}
//                     <p className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6] mb-1">
//                       {session.user?.role || "user"}
//                     </p>
//                     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
//                       {session.user?.name || "User Name"}
//                     </p>
//                     <p className="text-[10px] truncate text-slate-500 dark:text-slate-300 opacity-80">
//                       {session.user?.email || "user@example.com"}
//                     </p>
//                   </div>

//                   <div className="p-1">
//                     <button 
//                       onClick={handleLogout} 
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
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
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
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
// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { 
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown, 
//   PlusSquare
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
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // লগআউট ফাংশন
//   const handleLogout = async () => {
//     sessionStorage.removeItem("loginToastShown");
//     toast.success("Logged out successfully!");
//     // signOut কল করলে পেজ অটো রিফ্রেশ হয়ে যাবে এবং সেশন ডিলিট হবে
//     await signOut({ callbackUrl: "/" }); 
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     ...(session?.user?.role === 'admin' 
//       ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
//       : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
//     )
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
//           {navLinks.map((link) => (
//             <Link 
//               key={link.name} 
//               href={link.href} 
//               className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
//                 pathname === link.href ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
//               }`}
//             >
//               {link.icon} {link.name}
//               <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
//                 pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
//               }`}></span>
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-3"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {/* লগইন স্ট্যাটাস চেক */}
//           {status === "authenticated" ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={18} />
//                   </div>
//                 )}
//                 <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* Dropdown Menu */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
//                   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
//                     <p className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6] mb-1">
//                       {session.user?.role || "User"}
//                     </p>
//                     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
//                       {session.user?.name}
//                     </p>
//                   </div>

//                   <div className="p-1">
//                     <button 
//                       onClick={handleLogout} 
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             // সেশন না থাকলে Login বাটন দেখাবে
//             <Link href='/login' className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(true)}>
//             <Menu size={28} />
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
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, User as UserIcon, ChevronDown, 
//   PlusSquare
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
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     sessionStorage.removeItem("loginToastShown");
//     toast.success("Logged out successfully!");
//     await signOut({ callbackUrl: "/" }); 
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     ...(session?.user?.role === 'admin' 
//       ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
//       : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
//     )
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
//           {navLinks.map((link) => (
//             <Link 
//               key={link.name} 
//               href={link.href} 
//               className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
//                 pathname === link.href ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
//               }`}
//             >
//               {link.icon} {link.name}
//               <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
//                 pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
//               }`}></span>
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-3"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {status === "authenticated" ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={18} />
//                   </div>
//                 )}
//                 <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* Dropdown Menu */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
//                   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
//                     <p className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6] mb-1">
//                       {session.user?.role || "User"}
//                     </p>
//                     {/* ইউজার নেম */}
//                     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
//                       {session.user?.name}
//                     </p>
//                     {/* এখানে ইউজার ইমেইল অ্যাড করা হয়েছে */}
//                     <p className="text-xs truncate text-slate-500 dark:text-slate-400 mt-0.5">
//                       {session.user?.email}
//                     </p>
//                   </div>

//                   <div className="p-1">
//                     <button 
//                       onClick={handleLogout} 
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link href='/login' className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(true)}>
//             <Menu size={28} />
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
//   Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, 
//   User as UserIcon, ChevronDown, PlusSquare, LayoutDashboard
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
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     sessionStorage.removeItem("loginToastShown");
//     toast.success("Logged out successfully!");
//     await signOut({ callbackUrl: "/" }); 
//   };

//   if (!mounted) return null;

//   const navLinks = [
//     { name: 'Home', href: '/', icon: <Home size={18} /> },
//     { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
//     { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
//     ...(session?.user?.role === 'admin' 
//       ? [{ name: 'Add Item', href: '/additem', icon: <PlusSquare size={18} /> }] 
//       : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
//     )
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
//           {navLinks.map((link) => (
//             <Link 
//               key={link.name} 
//               href={link.href} 
//               className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
//                 pathname === link.href ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
//               }`}
//             >
//               {link.icon} {link.name}
//               <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
//                 pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
//               }`}></span>
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-3"> 
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#14B8A6] hover:text-white transition-all text-slate-700 dark:text-white"
//           >
//             {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//           </button>

//           {status === "authenticated" ? (
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
//               >
//                 {session.user?.image ? (
//                   <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white">
//                     <UserIcon size={18} />
//                   </div>
//                 )}
//                 <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* Dropdown Menu */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
//                   <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
//                     <p className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6] mb-1">
//                       {session.user?.role || "User"}
//                     </p>
//                     <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
//                       {session.user?.name}
//                     </p>
//                     <p className="text-xs truncate text-slate-500 dark:text-slate-400 mt-0.5">
//                       {session.user?.email}
//                     </p>
//                   </div>

//                   <div className="p-1 space-y-1">
//                     {/* Role-based Dashboard Link */}
//                     <Link 
//                       href={session.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
//                       onClick={() => setIsProfileOpen(false)}
//                       className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-white/10 rounded-xl transition-all font-bold text-sm"
//                     >
//                       <LayoutDashboard size={16} className="text-[#14B8A6]" /> Dashboard
//                     </Link>

//                     <button 
//                       onClick={handleLogout} 
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link href='/login' className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
//               <LogIn size={18} /> Login
//             </Link> 
//           )}

//           <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(true)}>
//             <Menu size={28} />
//           </button>
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
  Moon, Sun, Home, Package, Info, LogIn, LogOut, Menu, X, 
  User as UserIcon, ChevronDown, PlusSquare, LayoutDashboard
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

  // Debugging: সেশন এবং রোল চেক করার জন্য (ব্রাউজার কনসোলে দেখবেন)
  useEffect(() => {
    if (status === "authenticated") {
      console.log("Logged in user:", session.user);
      console.log("User Role:", session.user?.role);
    }
  }, [session, status]);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    sessionStorage.removeItem("loginToastShown");
    toast.success("Logged out successfully!");
    await signOut({ callbackUrl: "/" }); 
  };

  if (!mounted) return null;

  // নেভবার লিঙ্কগুলো রোল অনুযায়ী ফিল্টার করা
  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Identification', href: '/identification', icon: <Home size={18} /> },
    { name: 'Products', href: '/Allproducts', icon: <Package size={18} /> },
    ...(session?.user?.role === 'admin' 
      ? [{ name: 'Add Item', href: '/dashboard/additem', icon: <PlusSquare size={18} /> }] 
      : [{ name: 'About Us', href: '/About', icon: <Info size={18} /> }]
    )
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D4C4F] shadow-lg h-20 transition-colors duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="https://i.ibb.co.com/DgVzH2gT/logo-design-for-beauty-salon-dermatology-center-wellness-house-skincare-cosmetic-natural-healthy-bod.jpg" 
            className='w-[45px] h-[45px] rounded-full object-cover border-2 border-[#14B8A6] group-hover:scale-110 transition-transform' 
            alt="Logo" 
          />
          <p className="hidden sm:block text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            DermaCare<span className="text-[#14B8A6]">Hub</span>
          </p>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative flex items-center gap-2 font-bold transition-all py-2 group ${
                pathname === link.href ? "text-[#14B8A6]" : "text-slate-600 dark:text-slate-300 hover:text-[#14B8A6]"
              }`}
            >
              {link.icon} {link.name}
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#14B8A6] transition-all duration-300 ${
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          ))}
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

          {status === "authenticated" ? (
            /* User Profile & Dashboard Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 pr-2 sm:pr-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5"
              >
                {session.user?.image ? (
                  <img src={session.user.image} className="w-8 h-8 rounded-full border-2 border-[#14B8A6] object-cover" alt="User" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white font-bold">
                    {session.user?.name?.charAt(0) || <UserIcon size={18} />}
                  </div>
                )}
                <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 text-slate-600 dark:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0D4C4F] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-50 dark:border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6] mb-1">
                      {session.user?.role || "User"}
                    </p>
                    <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                      {session.user?.name}
                    </p>
                    <p className="text-xs truncate text-slate-500 dark:text-slate-400 mt-0.5">
                      {session.user?.email}
                    </p>
                  </div>

                  <div className="p-1 space-y-1">
                    {/* Role Based Dashboard Link */}
                    <Link 
                      href={session.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-white/10 rounded-xl transition-all font-bold text-sm"
                    >
                      <LayoutDashboard size={16} className="text-[#14B8A6]" /> Dashboard
                    </Link>

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
            /* Login Button when not authenticated */
            <Link href='/login' className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 text-sm">
              <LogIn size={18} /> Login
            </Link> 
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (Optional but recommended) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-[#0D4C4F] p-6 shadow-xl">
             <div className="flex justify-between items-center mb-8">
                <span className="font-bold dark:text-white">Menu</span>
                <X className="dark:text-white" onClick={() => setIsMenuOpen(false)} />
             </div>
             <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-600 dark:text-slate-300">
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;