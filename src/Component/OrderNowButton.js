// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Swal from "sweetalert2"; // মিষ্টি অ্যালার্টের জন্য (ঐচ্ছিক)

// export default function OrderNowButton({ product, className }) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleOrder = async () => {
//     // ১. লগইন চেক
//     if (!session) {
//       router.push(`/login?callbackUrl=/products/${product._id}`);
//       return;
//     }

//     setLoading(true);

//     // ২. অর্ডারের ডাটা তৈরি
//     const orderData = {
//       email: session?.user?.email,
//       name: session?.user?.name,
//       productId: product._id,
//       productName: product.name,
//       price: product.price,
//       image: product.image,
//       status: "pending",
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       // ৩. ডাটাবেজে পাঠানোর জন্য API কল
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (res.ok) {
//         Swal.fire("Success!", "Your order has been placed.", "success");
//         router.push("/dashboard/my-orders"); // অর্ডার শেষে ড্যাশবোর্ডে পাঠানো
//       } else {
//         alert("Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button 
//       onClick={handleOrder}
//       disabled={loading}
//       className={className}
//     >
//       {loading ? "Processing..." : "Order Now"}
//     </button>
//   );
// }
// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Swal from "sweetalert2"; 

// export default function OrderNowButton({ product, className }) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleOrder = async () => {
//     // ১. লগইন চেক
//     if (!session) {
//       Swal.fire("Wait!", "Please login first to place an order.", "info");
//       router.push(`/login?callbackUrl=/products/${product._id}`);
//       return;
//     }

//     setLoading(true);

//     // ২. অর্ডারের ডাটা তৈরি (API-এর সাথে মিলিয়ে)
//     const orderData = {
//       email: session?.user?.email, // API expects 'email'
//       product: product.name,       // API expects 'product', not 'productName'
//       price: product.price,
//       image: product.image,
//       status: "pending",
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       // ৩. API কল
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         Swal.fire({
//           title: "Success!",
//           text: "Your order has been placed successfully.",
//           icon: "success",
//           confirmButtonColor: "#your-primary-color" // আপনার ব্র্যান্ড কালার দিতে পারেন
//         });
//         router.push("/dashboard/my-orders");
//       } else {
//         // এপিআই থেকে আসা আসল এরর মেসেজটি দেখাবে (যেমন: Missing Fields)
//         Swal.fire("Error!", data.message || "Something went wrong!", "error");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       Swal.fire("Error!", "Failed to connect to server.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button 
//       onClick={handleOrder}
//       disabled={loading}
//       className={className}
//     >
//       {loading ? (
//         <span className="flex items-center justify-center gap-2">
//           <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
//           Processing...
//         </span>
//       ) : (
//         "Order Now"
//       )}
//     </button>
//   );
// }
"use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Swal from "sweetalert2"; 

// export default function OrderNowButton({ product, className }) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleOrder = async () => {
//     // ১. লগইন চেক
//     if (!session) {
//       Swal.fire({
//         title: "Wait!",
//         text: "Please login first to place an order.",
//         icon: "info",
//         confirmButtonColor: "#14b8a6",
//       });
//       router.push(`/login?callbackUrl=/products/${product._id}`);
//       return;
//     }

//     setLoading(true);

//     // ২. অর্ডারের ডাটা তৈরি
//     // এপিআই-তে ঠিক যে নামে (Key) ডাটা চাচ্ছে, এখানেও সেই নাম ব্যবহার করা হয়েছে
//     const orderData = {
//       email: session?.user?.email,
//       product: product.name,      // API expects 'product'
//       price: product.price,
//       image: product.image,
//       status: "pending",          // ডিফল্ট স্ট্যাটাস
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       // ৩. এপিআই কল
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // ৪. সফল হলে অ্যালার্ট এবং রিডাইরেক্ট
//         await Swal.fire({
//           title: "Success!",
//           text: "Your order has been placed successfully.",
//           icon: "success",
//           confirmButtonColor: "#14b8a6",
//         });
        
//         // ড্যাশবোর্ডে পাঠানোর আগে নিশ্চিত হওয়া যে রাউটার কাজ করছে
//         router.push("/dashboard/my-orders");
//       } else {
//         // এপিআই থেকে কোনো এরর আসলে সেটি দেখানো
//         Swal.fire("Error!", data.message || "Something went wrong!", "error");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       Swal.fire("Error!", "Failed to connect to the server. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button 
//       onClick={handleOrder}
//       disabled={loading}
//       className={className}
//     >
//       {loading ? (
//         <span className="flex items-center justify-center gap-2">
//           <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
//           Processing...
//         </span>
//       ) : (
//         "Order Now"
//       )}
//     </button>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2"; 

export default function OrderNowButton({ product, className }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    // ১. লগইন চেক
    if (!session) {
      Swal.fire({
        title: "Wait!",
        text: "Please login first to place an order.",
        icon: "info",
        confirmButtonColor: "#14b8a6",
      });
      router.push(`/login?callbackUrl=/products/${product?._id}`);
      return;
    }

    setLoading(true);

    // ২. ডাটাবেজ সেফটি চেক: প্রোডাক্টের নাম ফিল্টার করা
    // এখানে ৩টি অপশন চেক করা হচ্ছে যাতে ডাটাবেজে সঠিক নাম যায়
    const finalProductName = product?.name || product?.productName || "Premium Skincare Item";

    const orderData = {
      email: session?.user?.email,
      product: finalProductName,   // API expects 'product'
      price: product?.price || 0,
      image: product?.image || "https://i.ibb.co.com/mrg7P3X/image.png",
      status: "pending",           // Default status
      orderDate: new Date().toISOString(),
    };

    try {
      // ৩. API কল
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          title: "Success!",
          text: `Your order for ${finalProductName} has been placed.`,
          icon: "success",
          confirmButtonColor: "#14b8a6",
          timer: 2000
        });
        
        router.push("/dashboard/my-orders");
      } else {
        Swal.fire("Error!", data.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Order Error:", error);
      Swal.fire("Error!", "Failed to connect to the server.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleOrder}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Processing...
        </span>
      ) : (
        "Order Now"
      )}
    </button>
  );
}