
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
{/* <button
  onClick={() => signIn("google", { callbackUrl })}
   className="w-full flex items-center justify-center gap-4 
             bg-[var(--secondary)] text-[var(--accent)] 
             border border-[var(--primary)]/10 py-4 rounded-2xl font-bold 
             hover:bg-[var(--accent)] hover:text-[var(--primary)] 
             transition-all duration-300 mb-8 shadow-sm group active:scale-[0.98]"
>
  <FaGoogle className="text-red-500 text-lg  transition-colors duration-300" /> 
{/* <FaGoogle  className="w-full bg-[var(--secondary)] text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[var(--secondary)]/20 active:scale-[0.98] mt-4" /> */}
  {/* <span className="text-sm">
 
    Continue with Google</span>
</button>  */}
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
