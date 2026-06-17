
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// ১. GET: সার্চ, ক্যাটাগরি এবং প্রাইস ফিল্টারসহ ডাটা ফেচ
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const limit = parseInt(searchParams.get("limit")) || 0;
    const type = searchParams.get("type"); 

    // প্রাইস ফিল্টার প্যারামিটার (Default values set)
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice")) || Number.MAX_SAFE_INTEGER;

    // ডাইনামিক কুয়েরি অবজেক্ট
    let query = {
      price: { $gte: minPrice, $lte: maxPrice } // এখানে প্রাইস ফিল্টার যুক্ত করা হয়েছে
    };

    // নাম দিয়ে সার্চ (Regex)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // ক্যাটাগরি ফিল্টার
    if (category && category.trim() !== "" && category !== "All") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    // যদি টাইপ 'suggestion' হয় (সার্চ ড্রপডাউনের জন্য)
    if (type === "suggestion") {
      const suggestions = await Product.find(query)
        .select("name image category price") // প্রাইস ও সাজেশনে পাঠাবে
        .limit(5);
      return NextResponse.json(suggestions);
    }

    // জেনারেল প্রোডাক্ট লিস্ট ফেচ করা
    const products = await Product.find(query)
      .sort({ _id: -1 }) // লেটেস্ট প্রোডাক্ট আগে আসবে
      .limit(limit);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. POST: নতুন প্রোডাক্ট যুক্ত করা
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const requiredFields = ["name", "price", "category", "image"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required!` }, { status: 400 });
      }
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, message: "Product Added!", data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ৩. DELETE: আইডি ধরে ডিলিট করা
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: "Product not found!" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Product deleted!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ৪. PATCH: ডাটা আপডেট করা
export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return NextResponse.json({ message: "Product not found!" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Updated!", data: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}