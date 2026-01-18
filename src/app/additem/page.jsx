// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../api/auth/[...nextauth]/route";
// // import { redirect } from "next/navigation";

// // export default async function AddItem() {
// //   const session = await getServerSession(authOptions);
// //   if (!session) redirect("/login");

// //   return <h1>Protected Add Item Page</h1>;
// // }
// "use client";
// export const dynamic = "force-dynamic";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { PlusCircle, Loader2, Package, DollarSign, AlignLeft, ShieldCheck } from "lucide-react";
// import Link from "next/link";

// const AddItemPage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // Protection Logic: Redirect if not logged in
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       toast.warn("Please login first to add items!");
//       router.push("/login?callbackUrl=/add-item");
//     }
//   }, [status, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = {
//       name: e.target.itemName.value,
//       price: e.target.price.value,
//       description: e.target.description.value,
//       category: e.target.category.value,
//       addedBy: session?.user?.email,
//       createdAt: new Date().toLocaleString(),
//     };

//     try {
//       // আপনার Express.js সার্ভারে ডাটা পাঠানো হচ্ছে
//       // const response = await fetch("http://localhost:5000/add-item", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(formData),
//       // });
// // আপনার লাইভ ব্যাকএন্ড ইউআরএল এখানে দিন
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const response = await fetch(`${baseUrl}/api/products`, { // অথবা আপনার সঠিক API রুট
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
// });
//       const result = await response.json();

//       if (result.success) {
//         toast.success("Product successfully saved to server!");
//         e.target.reset();
//       } else {
//         toast.error("Failed to save product.");
//       }
//     } catch (error) {
//       toast.error("Server is not responding. Make sure Express is running.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   const formData = {
//   //     name: e.target.itemName.value,
//   //     price: parseFloat(e.target.price.value), // Number এ কনভার্ট করা ভালো
//   //     description: e.target.description.value,
//   //     category: e.target.category.value,
//   //     addedBy: session?.user?.email,
//   //     image: "https://placehold.co/600x400/png", // একটি ডামি ইমেজ লিংক
//   //   };

//   //   try {
//   //     // পরিবর্তন: এখন ৫০০০ পোর্ট বাদ দিয়ে সরাসরি /api/products এ ডাটা যাবে
//   //     const response = await fetch("/api/products", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const result = await response.json();

//   //     if (result.success) {
//   //       toast.success("Product successfully saved to MongoDB!");
//   //       e.target.reset();
//   //       // ৩ সেকেন্ড পর প্রোডাক্ট পেজে পাঠিয়ে দেওয়া (ঐচ্ছিক)
//   //       setTimeout(() => router.push("/products"), 2000);
//   //     } else {
//   //       toast.error("Failed to save product: " + result.error);
//   //     }
//   //   } catch (error) {
//   //     toast.error("Database connection failed. Check your API route.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Loading state while checking session
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
//         <Loader2 className="animate-spin text-[var(--secondary)]" size={40} />
//       </div>
//     );
//   }

//   // If not authenticated, show Access Denied (though useEffect handles redirect)
//   if (status === "unauthenticated") {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-center px-4">
//         <div className="bg-red-500/10 p-6 rounded-full mb-4">
//           <ShieldCheck size={50} className="text-red-500" />
//         </div>
//         <h1 className="text-3xl font-black text-[var(--foreground)] mb-2">Access Denied</h1>
//         <p className="opacity-60 mb-6">You need to be logged in to view this page.</p>
//         <Link href="/login" className="bg-[var(--secondary)] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest shadow-lg shadow-[var(--secondary)]/20">
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--background)] pt-32 pb-20 px-4">
//       <div className="max-w-3xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col items-center mb-10 text-center">
//           <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mb-4">
//             <PlusCircle className="text-[var(--secondary)]" size={32} />
//           </div>
//           <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tighter dark:text-white">
//             Add New <span className="text-[var(--secondary)]">Product</span>
//           </h1>
//           <p className="text-sm opacity-50 font-bold uppercase tracking-[0.2em] mt-2">
//             Store inventory to local server
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white dark:bg-[#0D4C4F] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-[var(--primary)]/5 relative overflow-hidden">
//           {/* Subtle background glow */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)] opacity-5 blur-3xl rounded-full -mr-10 -mt-10"></div>

//           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//             {/* Item Name */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 ml-1">
//                 <Package size={14} /> Product Name
//               </label>
//               <input
//                 name="itemName"
//                 type="text"
//                 required
//                 placeholder="e.g. Advanced Night Repair"
//                 className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-[var(--secondary)] outline-none transition-all dark:text-white"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Price */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 ml-1">
//                   <DollarSign size={14} /> Price ($)
//                 </label>
//                 <input
//                   name="price"
//                   type="number"
//                   step="0.01"
//                   required
//                   placeholder="29.99"
//                   className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-[var(--secondary)] outline-none transition-all dark:text-white"
//                 />
//               </div>

//               {/* Category */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 ml-1">
//                   <AlignLeft size={14} /> Category
//                 </label>
//                 <select name="category" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-[var(--secondary)] outline-none transition-all dark:text-white appearance-none cursor-pointer">
//                   <option value="Skincare">Skincare</option>
//                   <option value="Haircare">Haircare</option>
//                   <option value="Bodycare">Bodycare</option>
//                   <option value="Supplements">Supplements</option>
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 ml-1">
//                 <AlignLeft size={14} /> Description
//               </label>
//               <textarea
//                 name="description"
//                 rows="4"
//                 required
//                 placeholder="Describe your premium product..."
//                 className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-[var(--secondary)] outline-none transition-all dark:text-white resize-none"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <button
//               disabled={loading}
//               type="submit"
//               className="w-full bg-[var(--secondary)] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-[var(--secondary)]/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-3"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={20} /> Processing...
//                 </>
//               ) : (
//                 "Save Product to Database"
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Info Footer */}
//         <p className="text-center mt-8 text-[10px] opacity-40 font-bold uppercase tracking-widest">
//           Logged in as: <span className="text-[var(--secondary)]">{session?.user?.email}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AddItemPage;
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusCircle, Loader2, Package, DollarSign, AlignLeft } from "lucide-react";

export default function AddItemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.itemName.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      category: e.target.category.value,
      image: "https://placehold.co/600x400/png", // Default image
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product successfully added!");
        e.target.reset();
        router.push("/Allproducts");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl">
        <h1 className="text-3xl font-black mb-8 text-center">Add <span className="text-secondary">Product</span></h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="itemName" placeholder="Product Name" className="w-full p-4 border rounded-xl" required />
          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" step="0.01" placeholder="Price" className="w-full p-4 border rounded-xl" required />
            <select name="category" className="w-full p-4 border rounded-xl">
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
            </select>
          </div>
          <textarea name="description" placeholder="Description" rows="4" className="w-full p-4 border rounded-xl" required />
          <button disabled={loading} className="w-full bg-secondary text-white py-5 rounded-xl font-bold uppercase">
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}