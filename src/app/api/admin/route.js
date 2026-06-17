
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// ড্যাশবোর্ডের ডেটা সবসময় ফ্রেশ রাখার জন্য ডাইনামিক রেন্ডারিং নিশ্চিত করা
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.db;

    // ১. সব ডেটা একসাথে ফেচ করা (প্যারালাল কুয়েরি)
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("products").countDocuments(),
      db.collection("orders").countDocuments(),
    ]);

    // ২. রেভিনিউ ক্যালকুলেশন (আপনার ডাটাবেস ফিল্ড 'price' ব্যবহার করে)
    const revenueData = await db.collection("orders").aggregate([
      {
        $group: {
          _id: null,
          total: { 
            $sum: { 
              $convert: { 
                input: "$price", // আপনার ডাটাবেস অনুযায়ী 'price' ফিল্ড ব্যবহার করা হয়েছে
                to: "double", 
                onError: 0, 
                onNull: 0 
              } 
            } 
          }
        }
      }
    ]).toArray();

    // যদি কোনো অর্ডার না থাকে তবে ডিফল্ট ০ সেট করা
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue // ফ্রন্টএন্ডে এটি ৳ ফরম্যাটে দেখানো হবে
      }
    });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" }, 
      { status: 500 }
    );
  }
}