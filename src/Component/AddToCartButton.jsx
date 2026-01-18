// "use client";

// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// export default function AddToCartButton({ productPrice }) {
//   const router = useRouter();
//   const { data: session } = useSession();

//   const handleAddToCart = () => {
//     if (!session) {
//       router.push("/login");
//     } else {
//       // এখানে আপনার কার্ট লজিক বা সাকসেস মেসেজ দিতে পারেন
//     toast.('Successfully added to cart!', {
//       icon: '🛒',
//       style: {
//         borderRadius: '16px',
//         background: '#1a1a1a',
//         color: '#fff',
//         fontSize: '14px',
//         fontWeight: 'bold',
//         padding: '16px',
//       },
//     }
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       className="w-full bg-primary text-white dark:bg-secondary py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20"
//     >
//       Add to Cart — ${productPrice}
//     </button>
//   );
// }
"use client"; // এটি নিশ্চিত করুন

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// আপনার সেশন চেক করার জন্য যেটি ব্যবহার করছেন (যেমন next-auth) সেটি ইমপোর্ট করুন
// import { useSession } from "next-auth/react"; 

export default function AddToCartButton({ productPrice, session }) {
  const router = useRouter();

  const handleAddToCart = () => {
    // ১. সেশন না থাকলে লগইন পেজে পাঠাবে
    
    // ২. সেশন থাকলে সাকসেস মেসেজ দেখাবে
    toast.success('Successfully added to cart!', {
      icon: '🛒',
      style: {
        borderRadius: '16px',
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '16px',
      },
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full py-5 bg-secondary text-white rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg"
    >
      Add to Cart — ${productPrice}
    </button>
  );
}