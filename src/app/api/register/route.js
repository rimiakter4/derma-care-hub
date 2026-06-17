
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    
    // 1. Receive and validate data
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" }, 
        { status: 400 }
      );
    }

    // 2. Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();
    
    // 3. Check for existing user
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email!" }, 
        { status: 400 }
      );
    }

    // 4. Hash password (Salt rounds: 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Save new user (Role defaults to 'BUYER' from the model)
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful!" }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error occurred", 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}