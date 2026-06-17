
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

// ১. GET মেথড: ইউজার লিস্ট দেখানোর জন্য
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// ২. PATCH মেথড: রোল আপডেট এবং সাসপেন্ড করার জন্য
export async function PATCH(req) {
  try {
    await dbConnect();
    const { id, role } = await req.json();

    // সংশোধন: ভ্যালিডেশনে "SUSPENDED" যুক্ত করা হয়েছে
    if (!["BUYER", "ADMIN", "SUSPENDED"].includes(role)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid Role or Status" 
      }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { role }, 
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: role === "SUSPENDED" ? "User suspended!" : "Role updated!" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}