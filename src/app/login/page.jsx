
// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { data: session, status } = useSession(); 
//   const callbackUrl = searchParams.get("callbackUrl") || "/";

//   // ✅ গুগল বা অন্য যেকোনো ভাবে লগইন সফল হলে এই ইফেক্টটি কাজ করবে
//   // useEffect(() => {
//   //   const hasToastShown = sessionStorage.getItem("loginToastShown");

//   //   if (status === "authenticated" && !hasToastShown) {
//   //     toast.success(`Welcome back, ${session?.user?.name || "User"}!`);
      
//   //     // একবার মেসেজ দেখালে সেটি মার্ক করে রাখবে
//   //     sessionStorage.setItem("loginToastShown", "true");

//   //     const timeout = setTimeout(() => {
//   //       router.push(callbackUrl);
//   //     }, 1000);
      
//   //     return () => clearTimeout(timeout);
//   //   }
    
//   //   if (status === "unauthenticated") {
//   //     sessionStorage.removeItem("loginToastShown");
//   //   }
//   // }, [status, session, callbackUrl, router]);
// useEffect(() => {
//   // ১. ইউজার অথেন্টিকেটেড কিনা এবং সেশন ডাটা আছে কিনা চেক
//   if (status === "authenticated" && session?.user) {
//     const hasToastShown = sessionStorage.getItem("loginToastShown");

//     // ২. যদি আগে টোস্ট না দেখানো হয়ে থাকে
//     if (!hasToastShown) {
//       toast.success(`Welcome back, ${session.user.name}!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       // ৩. মার্ক করে রাখা যাতে বারবার না আসে
//       sessionStorage.setItem("loginToastShown", "true");

//       // ৪. সামান্য ডিলে দিয়ে রিডাইরেক্ট (ঐচ্ছিক, যদি অন্য পেজে পাঠাতে চান)
//       // router.push(callbackUrl);
//     }
//   }

//   // ৫. যদি ইউজার লগআউট অবস্থায় থাকে, তবে স্টোরেজ ক্লিন রাখুন
//   if (status === "unauthenticated") {
//     sessionStorage.removeItem("loginToastShown");
//   }
// }, [status, session]);

//   // ✅ এডমিন লগইন হ্যান্ডলার
//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false, // আমরা ম্যানুয়ালি রিডাইরেক্ট এবং টোস্ট হ্যান্ডেল করছি
//     });

//     if (res?.ok) {
//       // সাকসেস হলে সাথে সাথে টোস্ট দেখানোর জন্য এই লাইনটি দরকার
//       toast.success("Successfully logged in as Admin!");
//       sessionStorage.setItem("loginToastShown", "true"); // যাতে useEffect আবার টোস্ট না দেয়
      
//       setTimeout(() => {
//         router.push(callbackUrl);
//         router.refresh(); // সেশন আপডেট নিশ্চিত করতে
//       }, 1000);
//     } else {
//       toast.error("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
//         <h2 className="text-3xl font-black text-blue-600 mb-2 text-center italic">
//           Derma <span className="text-pink-500">Care</span>
//         </h2>
//         <p className="text-center text-gray-400 mb-8 font-medium">Professional Access</p>

//         {/* Google Login Button */}
//         {/* <button
//           onClick={() => signIn("google", { callbackUrl })}
//           className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all mb-6 shadow-sm"
//         >
//           <FaGoogle className="text-red-500" /> Continue with Google
//         </button> */}
//         {/* Google Login Button */}
// <button
//   onClick={() => {
//     // লগইন শুরু হওয়ার আগে স্টোরেজ ক্লিয়ার করে নিন
//     sessionStorage.removeItem("loginToastShown");
//     signIn("google", { callbackUrl });
//   }}
//   className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all mb-6 shadow-sm active:scale-95"
// >
//   <FaGoogle className="text-red-500" /> Continue with Google
// </button>

//         <div className="relative flex py-3 items-center mb-4">
//           <div className="flex-grow border-t border-gray-200"></div>
//           <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-semibold">Or Admin Login</span>
//           <div className="flex-grow border-t border-gray-200"></div>
//         </div>

//         {/* Admin Credentials Form */}
//         <form onSubmit={handleAdminLogin} className="space-y-4">
//           <div className="relative">
//             <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Admin Email"
//               className="w-full p-3 pl-12 bg-gray-50 rounded-xl outline-none border focus:border-blue-500 transition-all text-black"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="relative">
//             <FaLock className="absolute left-4 top-4 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 pl-12 bg-gray-50 rounded-xl outline-none border focus:border-blue-500 transition-all text-black"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95"
//           >
//             Login as Admin
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useState, useEffect, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
// import { toast } from "react-toastify";

// // মূল কম্পোনেন্ট
// function LoginContent() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { data: session, status } = useSession(); 
//   const callbackUrl = searchParams.get("callbackUrl") || "/";

//   useEffect(() => {
//     if (status === "authenticated" && session?.user) {
//       const hasToastShown = sessionStorage.getItem("loginToastShown");
//       if (!hasToastShown) {
//         toast.success(`Welcome back, ${session.user.name}!`);
//         sessionStorage.setItem("loginToastShown", "true");
//         router.push(callbackUrl);
//       }
//     }
//   }, [status, session, router, callbackUrl]);

//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (res?.ok) {
//       toast.success("Successfully logged in!");
//       sessionStorage.setItem("loginToastShown", "true");
//       setTimeout(() => {
//         router.push(callbackUrl);
//         router.refresh();
//       }, 1000);
//     } else {
//       toast.error("Invalid credentials");
//     }
//   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#082f31] p-6 transition-colors duration-500">
// //       <div className="w-full max-w-md bg-white dark:bg-[#0D4C4F] p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
// //         <div className="relative z-10 text-center">
// //           <h2 className="text-4xl font-black text-[#0D4C4F] dark:text-white tracking-tighter mb-2">
// //             DermaCare<span className="text-[#14B8A6]">Hub</span>
// //           </h2>
// //           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">Professional Access</p>

// //           <button
// //             onClick={() => signIn("google", { callbackUrl })}
// //             className="w-full flex items-center justify-center gap-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all mb-8 shadow-sm"
// //           >
// //             <FaGoogle className="text-red-500" /> Continue with Google
// //           </button>

// //           <form onSubmit={handleAdminLogin} className="space-y-4">
// //             <input
// //               type="email"
// //               placeholder="Admin Email"
// //               className="w-full p-4 bg-slate-50 dark:bg-white/5 rounded-2xl outline-none border border-transparent focus:border-[#14B8A6] text-slate-900 dark:text-white"
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               className="w-full p-4 bg-slate-50 dark:bg-white/5 rounded-2xl outline-none border border-transparent focus:border-[#14B8A6] text-slate-900 dark:text-white"
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //             <button type="submit" className="w-full bg-[#14B8A6] text-white py-4 rounded-2xl font-black tracking-widest hover:brightness-110 transition-all shadow-lg">
// //               SECURE LOGIN
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Next.js-এ useSearchParams ব্যবহার করলে Suspense দিয়ে র‍্যাপ করতে হয়
// // export default function LoginPage() {
// //   return (
// //     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
// //       <LoginContent />
// //     </Suspense>
// //   );
// // }
// return (
//   <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 transition-colors duration-500">
//     {/* Login Card */}
//     <div className="w-full max-w-md bg-white dark:bg-[#0D4C4F] p-10 rounded-[2.5rem] shadow-2xl border border-[var(--accent)] relative overflow-hidden">
      
//       {/* Decorative Glow */}
//       <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl"></div>

//       <div className="relative z-10 text-center">
//         {/* Logo using --primary variable */}
//         <h2 className="text-4xl font-black text-[var(--primary)] tracking-tighter mb-2">
//           DermaCare<span className="text-[var(--secondary)]">Hub</span>
//         </h2>
//         <p className="text-[var(--foreground)] opacity-50 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
//           Professional Access
//         </p>

//         {/* Google Button */}
//         <button
//           onClick={() => signIn("google", { callbackUrl })}
//           className="w-full flex items-center justify-center gap-4 bg-transparent border border-[var(--accent)] text-[var(--foreground)] py-4 rounded-2xl font-bold hover:bg-[var(--accent)] transition-all mb-8 shadow-sm active:scale-[0.98]"
//         >
//           <FaGoogle className="text-red-500 text-lg" /> 
//           <span className="text-sm">Continue with Google</span>
//         </button>

//         {/* Divider */}
//         <div className="relative flex py-4 items-center mb-6">
//           <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
//           <span className="flex-shrink mx-4 text-[var(--foreground)] opacity-30 text-[10px] font-black uppercase tracking-widest">OR</span>
//           <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
//         </div>

//         {/* Admin Form */}
//         <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
//           <div className="relative">
//              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
//              <input
//               type="email"
//               placeholder="Admin Email"
//               className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] transition-all text-sm"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="relative">
//              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
//              <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] transition-all text-sm"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-[var(--secondary)] text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[var(--secondary)]/20 active:scale-[0.98] mt-4"
//           >
//             SECURE LOGIN
//           </button>
//         </form>

//         <p className="mt-8 text-[9px] text-[var(--foreground)] opacity-40 font-bold uppercase tracking-widest">
//           &copy; 2026 DermaCare Laboratory
//         </p>
//       </div>
//     </div>
//   </div>
// )}
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

// ১. মূল কন্টেন্ট আলাদা ফাংশন হিসেবে (useSearchParams এর জন্য)
function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const hasToastShown = sessionStorage.getItem("loginToastShown");
      if (!hasToastShown) {
        toast.success(`Welcome back, ${session.user.name}!`);
        sessionStorage.setItem("loginToastShown", "true");
        router.push(callbackUrl);
      }
    }
  }, [status, session, router, callbackUrl]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Successfully logged in!");
      sessionStorage.setItem("loginToastShown", "true");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1000);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 transition-colors duration-500">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#0D4C4F] p-10 rounded-[2.5rem] shadow-2xl border border-[var(--accent)] relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-black text-[var(--secondary)] tracking-tighter mb-2">
            DermaCare<span className="text-[var(--secondary)]">Hub</span>
          </h2>
          <p className="text-[var(--foreground)] opacity-50 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            Professional Access
          </p>

          {/* <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-4 bg-transparent border border-[var(--accent)] text-[var(--foreground)] py-4 rounded-2xl font-bold hover:bg-[var(--accent)] transition-all mb-8 shadow-sm active:scale-[0.98]"
          >
            <FaGoogle className="text-red-500 text-lg" /> 
            <span className="text-sm">Continue with Google</span>
          </button> */}
{/* Google Button - No Motion */}
<button
  onClick={() => signIn("google", { callbackUrl })}
   className="w-full flex items-center justify-center gap-4 
             bg-[var(--secondary)] text-[var(--accent)] 
             border border-[var(--primary)]/10 py-4 rounded-2xl font-bold 
             hover:bg-[var(--accent)] hover:text-[var(--primary)] 
             transition-all duration-300 mb-8 shadow-sm group active:scale-[0.98]"
>
  <FaGoogle className="text-red-500 text-lg  transition-colors duration-300" /> 
{/* <FaGoogle  className="w-full bg-[var(--secondary)] text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[var(--secondary)]/20 active:scale-[0.98] mt-4" /> */}
  <span className="text-sm">
 
    Continue with Google</span>
</button>
          <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
            <span className="flex-shrink mx-4 text-[var(--foreground)] opacity-30 text-[10px] font-black uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            {/* <div className="relative">
               <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
               <input
                type="email"
                placeholder="Admin Email"
                className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20  rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--accent)] dark:text-[var(--accent)] transition-all text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
             */}
             <div className="relative">
  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
  <input
    type="email"
    placeholder="Admin Email"
    className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] dark:text-white transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>
 
            <div className="relative">
               <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
               <input
                type="password"
                placeholder="Password"
                // className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] transition-all text-sm"
                 className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] dark:text-white transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[var(--secondary)] text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[var(--secondary)]/20 active:scale-[0.98] mt-4"
            >
              SECURE LOGIN
            </button>
          </form>

          <p className="mt-8 text-[9px] text-[var(--foreground)] opacity-40 font-bold uppercase tracking-widest">
            &copy; 2026 DermaCare Laboratory
          </p>
        </div>
      </div>
    </div>
  );
}

// ২. মূল এক্সপোর্ট যা Next.js রেন্ডার করবে
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-pulse text-[var(--primary)] font-bold">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
