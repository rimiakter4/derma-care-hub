
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function PATCH(req) {
  try {
    await dbConnect();
    
    // ফ্রন্টএন্ড থেকে নতুন নাম, নতুন ইমেইল এবং পুরাতন ইমেইল রিসিভ করা
    const { newName, newEmail, oldEmail } = await req.json();

    // ১. ভ্যালিডেশন চেক
    if (!newName || !newEmail || !oldEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (Name, New Email, or Old Email)" }, 
        { status: 400 }
      );
    }

    // ২. চেক করা যে নতুন ইমেইলটি অন্য কোনো ইউজার ব্যবহার করছে কি না
    if (newEmail !== oldEmail) {
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "This new email is already taken by another user" }, 
          { status: 409 }
        );
      }
    }

    // ৩. পুরাতন ইমেইল দিয়ে খুঁজে নতুন ডাটা সেট করা
    const updatedUser = await User.findOneAndUpdate(
      { email: oldEmail }, 
      { $set: { name: newName, email: newEmail } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found with the provided old email" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully!",
      user: { 
        name: updatedUser.name, 
        email: updatedUser.email 
      } 
    });

  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}