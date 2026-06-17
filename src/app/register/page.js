

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react'; // ১. signIn ইমপোর্ট করা হয়েছে

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value.toLowerCase().trim(),
      password: e.target.password.value,
    };

    try {
      // ২. রেজিস্ট্রেশন এপিআই কল
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Logging you in...");

        // ৩. রেজিস্ট্রেশন সফল হলে অটোমেটিক লগইন (NextAuth signIn)
        const loginRes = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false, // আমরা ম্যানুয়ালি রিডাইরেক্ট করবো
        });

        if (loginRes?.ok) {
          // ৪. টোস্ট মেসেজ সেট করা (নেভবারের ওয়েলকাম মেসেজের জন্য)
          sessionStorage.setItem("loginToastShown", "true");
          
          // ৫. সরাসরি হোম পেজে রিডাইরেক্ট এবং ফুল রিফ্রেশ
          // window.location.href ব্যবহার করলে নেভবার সাথে সাথে সেশন আপডেট করে Logout দেখাবে
          window.location.href = "/";
        } else {
          toast.info("Account created! Please login manually.");
          router.push("/login");
        }
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0D4C4F] px-4 pt-20 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Create <span className="text-[#14B8A6]">Account</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Join DermaCare Hub today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14B8A6] transition-colors" size={20} />
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] dark:text-white transition-all"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14B8A6] transition-colors" size={20} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] dark:text-white transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14B8A6] transition-colors" size={20} />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] dark:text-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#14B8A6] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Register Now <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 dark:text-slate-400 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-[#14B8A6] hover:underline font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;