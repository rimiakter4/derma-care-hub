
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa"; // FaUserPlus add kora hoyeche
import { toast } from "react-toastify";
import Link from "next/link"; // Link import kora hoyeche

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("User is already authenticated:", session.user);
      const hasToastShown = sessionStorage.getItem("loginToastShown");
      if (!hasToastShown) {
        toast.success(`Welcome back, ${session.user.name || "User"}!`);
        sessionStorage.setItem("loginToastShown", "true");
        router.push(callbackUrl);
      }
    }
  }, [status, session, router, callbackUrl]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("--- Login Attempt Started ---");
    console.log("Email:", email.toLowerCase().trim());

    try {
      const res = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password: password,
        redirect: false,
      });

      console.log("NextAuth Response:", res);

      if (res?.ok) {
        console.log("Login Successful! ✅");
        toast.success("Login Successful!");
        sessionStorage.setItem("loginToastShown", "true");
        
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 1000);
      } else {
        console.error("Login Failed ❌ Error:", res?.error);
        toast.error(res?.error || "Invalid Credentials! Please try again.");
      }
    } catch (error) {
      console.error("Fatal Login Error:", error);
      toast.error("Something went wrong with the server!");
    } finally {
      setLoading(false);
      console.log("--- Login Attempt Finished ---");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-[#0D4C4F] p-10 rounded-[2.5rem] shadow-2xl border border-[var(--accent)] relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-black text-[var(--secondary)] tracking-tighter mb-2">
            DermaCare<span className="text-[var(--secondary)]">Hub</span>
          </h2>
          <p className="text-[var(--foreground)] opacity-50 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            Professional Access
          </p>

          <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
            <span className="flex-shrink mx-4 text-[var(--foreground)] opacity-30 text-[10px] font-black uppercase tracking-widest">LOGIN</span>
            <div className="flex-grow border-t border-[var(--accent)] opacity-50"></div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] dark:text-white transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] opacity-50" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 pl-12 bg-[var(--accent)] dark:bg-black/20 rounded-2xl outline-none border border-transparent focus:border-[var(--secondary)] text-[var(--foreground)] dark:text-white transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-[var(--secondary)] text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[var(--secondary)]/20 active:scale-[0.98] mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "AUTHENTICATING..." : "SECURE LOGIN"}
            </button>
          </form>

          {/* REGISTER LINK SECTION --- NOTUN ADD KORA HOYÈCHÈ */}
          <div className="mt-8 pt-6 border-t border-[var(--accent)] opacity-80">
            <p className="text-[10px] font-bold text-[var(--foreground)] opacity-60 tracking-widest uppercase mb-3">
              Don't have an account?
            </p>
            <Link 
              href="/register" 
              className="flex items-center justify-center gap-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors font-black text-[11px] tracking-[0.15em] uppercase group"
            >
              <FaUserPlus className="group-hover:scale-110 transition-transform" /> 
              Create Professional Account
            </Link>
          </div>

          <p className="mt-8 text-[9px] text-[var(--foreground)] opacity-40 font-bold uppercase tracking-widest">
            &copy; 2026 DermaCare Laboratory
          </p>
        </div>
      </div>
    </div>
  );
}

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