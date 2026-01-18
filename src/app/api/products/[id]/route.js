// import { NextResponse } from 'next/server';
// // আপনার data.js ফাইলটি যেখানে আছে সেখান থেকে ইমপোর্ট করুন
// import { products } from '../data'; 

// export async function GET(request, { params }) {
//   try {
//     // ১. params টাকে await করতে হবে (Next.js 15+ এর নিয়ম)
//     const { id } = await params; 
    
//     // ২. products অ্যারে থেকে আইডি মিলিয়ে প্রোডাক্টটি খুঁজুন
//     // id যেহেতু স্ট্রিং হিসেবে আসে, তাই '==' ব্যবহার করা নিরাপদ অথবা Number(id) করে নিন
//     const product = products.find((p) => p.id == id);

//     // ৩. যদি প্রোডাক্ট না পাওয়া যায়
//     if (!product) {
//       return NextResponse.json(
//         { message: "Product not found" }, 
//         { status: 404 }
//       );
//     }

//     // ৪. প্রোডাক্ট পাওয়া গেলে তা রিটার্ন করুন
//     return NextResponse.json(product);

//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal Server Error" }, 
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { products } from "../data";
// import { products } from "../../../products/data";

export async function GET(request, { params }) {
  const { id } = await params;
  
  // প্রোডাক্ট খুঁজে বের করা
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}