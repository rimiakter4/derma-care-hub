
"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { 
  FaUser, FaEnvelope, FaShieldAlt, FaSignOutAlt, 
  FaEdit, FaCheck, FaTimes, FaIdBadge 
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function UserProfile() {
  const { data: session, status, update: sessionUpdate } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || ""
      });
    }
  }, [session]);

  const handleUpdate = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      return Swal.fire("Error", "Name and Email cannot be empty", "error");
    }

    Swal.fire({ 
      title: "Updating Profile...", 
      allowOutsideClick: false, 
      didOpen: () => Swal.showLoading() 
    });

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          newName: formData.name, 
          newEmail: formData.email,
          oldEmail: session?.user?.email 
        }),
      });

      if (res.ok) {
        await sessionUpdate({ name: formData.name, email: formData.email });
        setIsEditing(false);
        
        Swal.fire({ 
          icon: "success", 
          title: "Success!", 
          text: "Profile updated successfully", 
          timer: 2000, 
          showConfirmButton: false 
        });

        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Update failed");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse font-black text-teal-500 text-xl uppercase tracking-widest">Loading Identity...</div>
    </div>
  );

  return (
    // প্যারেন্ট ডিভ থেকে bg- কালার সরিয়ে দেওয়া হয়েছে
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        // কার্ডের ডিজাইন: bg-[#051d1a] এবং চারপাশের শ্যাডো কার্ডটিকে ফুটিয়ে তুলবে
        className="max-w-2xl w-full bg-[#051d1a] rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden border border-teal-900/30"
      >
        
        {/* Profile Header Gradient */}
        <div className="h-40 bg-gradient-to-r from-teal-600 via-teal-900 to-[#022c22] relative">
          <div className="absolute top-6 right-6 flex gap-2">
            {isEditing && (
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: session?.user?.name, email: session?.user?.email });
                }}
                className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-rose-500/20 transition-all"
              >
                <FaTimes size={18} />
              </button>
            )}
            <button 
              onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                isEditing 
                ? "bg-teal-400 text-[#022c22]" 
                : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              {isEditing ? <><FaCheck /> Save</> : <><FaEdit /> Edit</>}
            </button>
          </div>
        </div>

        <div className="px-8 pb-10">
          <div className="relative -mt-20 mb-6 flex justify-center">
            <img
              src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=2dd4bf&color=fff&size=256`}
              alt="Profile"
              className="w-40 h-40 rounded-full border-8 border-[#051d1a] shadow-2xl object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
              }}
            />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              {session?.user?.name || "User Name"}
            </h2>
            <div className="flex justify-center mt-3">
              <span className="flex items-center gap-2 px-5 py-1.5 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-teal-500/20">
                <FaShieldAlt /> {session?.user?.role || "BUYER"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Field: Full Name */}
            <div className="flex items-center p-5 bg-[#0b2522] rounded-3xl border border-teal-900/20 transition-all focus-within:ring-2 ring-teal-500/20">
              <div className="w-12 h-12 rounded-2xl bg-teal-950/50 flex items-center justify-center text-teal-400 mr-5 shrink-0">
                <FaUser size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] text-teal-500/60 font-bold uppercase tracking-widest mb-1">Full Name</p>
                <input 
                  disabled={!isEditing}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-teal-50 font-bold text-lg disabled:opacity-80 outline-none"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="flex items-center p-5 bg-[#0b2522] rounded-3xl border border-teal-900/20 transition-all focus-within:ring-2 ring-teal-500/20">
              <div className="w-12 h-12 rounded-2xl bg-teal-950/50 flex items-center justify-center text-teal-400 mr-5 shrink-0">
                <FaEnvelope size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] text-teal-500/60 font-bold uppercase tracking-widest mb-1">Email Address</p>
                <input 
                  disabled={!isEditing}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-teal-100/80 font-medium disabled:opacity-80 outline-none"
                />
              </div>
            </div>

            {/* Field: User ID */}
            <div className="flex items-center p-5 bg-[#0b2522] rounded-3xl border border-teal-900/20 opacity-70">
              <div className="w-12 h-12 rounded-2xl bg-teal-950/30 flex items-center justify-center text-teal-700 mr-5 shrink-0">
                <FaIdBadge size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] text-teal-500/40 font-bold uppercase tracking-widest mb-1">User Identifier</p>
                <p className="text-teal-500/60 font-mono text-sm truncate uppercase tracking-tight">
                  {session?.user?.id || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="mt-10 pt-8 border-t border-teal-900/30">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full p-5 bg-rose-950/10 text-rose-400 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 border border-rose-900/20"
            >
              <FaSignOutAlt /> Terminate Current Session
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}