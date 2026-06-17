
"use client";
import React, { useEffect, useState } from "react";
import { UserCog, ShieldAlert, Search, CheckCircle, Users, Mail, ShieldCheck, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id, newRole, actionName) => {
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (res.ok) {
        Swal.fire({
          title: "System Updated",
          text: `User identity ${actionName} successfully.`,
          icon: "success",
          background: "#051d1a",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
          timer: 2000,
        });
        fetchUsers();
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Action failed", icon: "error", background: "#051d1a", color: "#fff" });
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const { value: newRole } = await Swal.fire({
      title: "Modify Access Level",
      input: "select",
      inputOptions: {
        BUYER: "BUYER",
        ADMIN: "ADMIN",
      },
      inputValue: currentRole === "SUSPENDED" ? "BUYER" : currentRole,
      showCancelButton: true,
      background: "#051d1a",
      color: "#fff",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#0b2522",
    });

    if (newRole && newRole !== currentRole) {
      updateStatus(id, newRole, "privileges updated");
    }
  };

  const handleSuspendToggle = async (id, currentRole) => {
    const isSuspended = currentRole === "SUSPENDED";
    
    const result = await Swal.fire({
      title: isSuspended ? "Restore Access?" : "Revoke Access?",
      text: isSuspended ? "This user will regain full platform capabilities." : "This user will be restricted from all authentication services.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isSuspended ? "#10b981" : "#f43f5e",
      cancelButtonColor: "#0b2522",
      confirmButtonText: isSuspended ? "Confirm Activation" : "Confirm Suspension",
      background: "#051d1a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      const nextRole = isSuspended ? "BUYER" : "SUSPENDED";
      updateStatus(id, nextRole, isSuspended ? "restored" : "deactivated");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 tracking-tighter uppercase"
            >
              User <span className="text-teal-50/10 italic">Registry</span>
            </motion.h1>
            <p className="text-teal-500/50 text-[10px] font-black mt-1 tracking-[0.4em] uppercase">
              Authenticated Entities: {users.length} Profiles
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-500/40 group-focus-within:text-teal-400 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search by identity or electronic mail..."
              className="w-full bg-[#051d1a] border border-teal-900/30 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-teal-500/50 transition-all text-teal-50 placeholder:text-teal-900 font-medium shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="bg-[#051d1a] rounded-[3rem] border border-teal-900/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden p-2 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="animate-spin text-teal-500" size={40} />
              <span className="text-[10px] font-black text-teal-500/30 uppercase tracking-[0.5em]">Fetching Security Logs...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-teal-500/30 uppercase text-[10px] font-black tracking-[0.2em]">
                    <th className="pb-4 pl-10 text-left"><div className="flex items-center gap-2"><Users size={14}/> Identity</div></th>
                    <th className="pb-4 text-left"><div className="flex items-center gap-2"><Mail size={14}/> Communication</div></th>
                    <th className="pb-4 text-center"><div className="flex items-center justify-center gap-2"><ShieldCheck size={14}/> Authorization</div></th>
                    <th className="pb-4 text-right pr-10">Protocols</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr 
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group"
                      >
                        <td className="bg-[#0b2522] py-6 pl-10 rounded-l-[2.5rem] border-y border-l border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-sm uppercase">
                                {user.name?.charAt(0) || "U"}
                              </div>
                              <span className="text-sm font-black text-teal-50 uppercase tracking-tight group-hover:text-teal-400 transition-colors">
                                {user.name || "Anonymous"}
                              </span>
                           </div>
                        </td>

                        <td className="bg-[#0b2522] py-6 border-y border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <span className="text-xs font-medium text-teal-500/70">{user.email}</span>
                        </td>

                        <td className="bg-[#0b2522] py-6 text-center border-y border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-widest ${
                            user.role === 'ADMIN' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                            user.role === 'SUSPENDED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                            'bg-teal-500/5 text-teal-400 border-teal-500/10'
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        <td className="bg-[#0b2522] py-6 pr-10 rounded-r-[2.5rem] border-y border-r border-teal-900/10 group-hover:bg-teal-950/40 transition-colors">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => handleRoleChange(user._id, user.role)}
                              className="p-3 bg-[#051d1a] text-teal-400 rounded-xl hover:bg-teal-500 hover:text-[#051d1a] transition-all border border-teal-900/30 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter"
                            >
                              <UserCog size={14} /> <span className="hidden md:inline">Modify</span>
                            </button>
                            
                            <button 
                              onClick={() => handleSuspendToggle(user._id, user.role)}
                              className={`p-3 bg-[#051d1a] rounded-xl transition-all border border-teal-900/30 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${
                                user.role === "SUSPENDED" 
                                  ? "text-emerald-400 hover:bg-emerald-500 hover:text-white" 
                                  : "text-rose-400 hover:bg-rose-500 hover:text-white"
                              }`}
                            >
                              {user.role === "SUSPENDED" ? <CheckCircle size={14} /> : <ShieldAlert size={14} />}
                              <span className="hidden md:inline">{user.role === "SUSPENDED" ? "Restore" : "Restrict"}</span>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-32">
              <Users size={60} className="mx-auto text-teal-950 mb-4 opacity-20" />
              <p className="text-teal-500/30 font-black uppercase text-xs tracking-widest italic">No matching identities found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;