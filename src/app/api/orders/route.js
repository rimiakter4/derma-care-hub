
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// --- GET: সব অর্ডার দেখা অথবা ইমেইল দিয়ে ফিল্টার করা ---
export async function GET(req) {
  try {
    await dbConnect();
    const db = mongoose.connection.db;

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let query = {};
    if (email && email.trim() !== "") {
      // Case-insensitive সার্চের জন্য $options: "i" ব্যবহার করা হয়েছে
      query.email = { $regex: email.trim(), $options: "i" }; 
    }

    const orders = await db.collection("orders")
      .find(query)
      .sort({ createdAt: -1 }) 
      .toArray();

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- POST: নতুন অর্ডার তৈরি করা (Fixes 400 Error) ---
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const db = mongoose.connection.db;

    // ১. ভ্যালিডেশন: নিশ্চিত করুন ফ্রন্টএন্ড থেকে email এবং product এই নামেই ডেটা আসছে
    if (!body.email || !body.product) {
      return NextResponse.json({ 
        success: false, 
        message: "Missing required fields: email and product are mandatory." 
      }, { status: 400 });
    }

    const newOrder = {
      ...body,
      status: body.status || "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully", 
      orderId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- PATCH: অর্ডার স্ট্যাটাস আপডেট করা ---
export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
    }

    const db = mongoose.connection.db;
    const result = await db.collection("orders").updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { status: status.toLowerCase(), updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- DELETE: অর্ডার ডিলিট করা ---
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const db = mongoose.connection.db;
    const result = await db.collection("orders").deleteOne({ 
      _id: new mongoose.Types.ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}