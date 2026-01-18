
// import { NextResponse } from "next/server";
// import { products } from "./data";
// // আপনার ডাটা ফাইলের পাথ অনুযায়ী ইমপোর্ট করুন
// // import { products } from "../../products/data"; 

// // GET মেথড: সব প্রোডাক্ট পাঠানোর জন্য
// export async function GET() {
//   try {
//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// }

// // POST মেথড: নতুন প্রোডাক্ট অ্যাড করার জন্য (AddItem পেজের জন্য)
// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     // নতুন ডাটা অবজেক্ট তৈরি
//     const newItem = {
//       id: products.length + 1,
//       ...body
//     };

//     // লোকাল অ্যারেতে পুশ করা
//     products.push(newItem);

//     return NextResponse.json({ success: true, data: newItem }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { products } from "./data";

// GET মেথড: লিমিট এবং লেটেস্ট ফার্স্ট লজিক সহ
export async function GET(request) {
  try {
    // ১. ডাটাকে উল্টে নেওয়া যেন নতুন প্রোডাক্ট আগে দেখায় (Latest First)
    const latestProducts = [...products].reverse();

    // ২. URL থেকে limit প্যারামিটার চেক করা (যেমন: /api/products?limit=4)
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    // ৩. যদি লিমিট থাকে তবে ডাটা স্লাইস করা
    if (limit) {
      return NextResponse.json(latestProducts.slice(0, parseInt(limit)));
    }

    // ৪. লিমিট না থাকলে সব লেটেস্ট প্রোডাক্ট পাঠানো
    return NextResponse.json(latestProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST মেথড: নতুন প্রোডাক্ট অ্যাড করার জন্য
export async function POST(request) {
  try {
    const body = await request.json();
    
    // নতুন ডাটা অবজেক্ট তৈরি
    const newItem = {
      id: products.length + 1,
      ...body
    };

    // লোকাল অ্যারেতে পুশ করা
    products.push(newItem);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}