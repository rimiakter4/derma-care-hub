// // import { NextResponse } from "next/server";

// import { NextResponse } from "next/server";
// import {products} from "../products/data"
// // export async function Get(){
// //     return NextResponse.json(products)
// // }



// export async function GET() {
  
//   return NextResponse.json(products);
// }

import { NextResponse } from "next/server";
// আপনার ডাটা ফাইলের পাথ অনুযায়ী ইমপোর্ট করুন
import { products } from "../../products/data"; 

// GET মেথড: সব প্রোডাক্ট পাঠানোর জন্য
export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST মেথড: নতুন প্রোডাক্ট অ্যাড করার জন্য (AddItem পেজের জন্য)
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