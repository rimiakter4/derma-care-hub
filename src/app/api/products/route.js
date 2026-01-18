
import { NextResponse } from "next/server";
import { products } from "./data";


export async function GET(request) {
  try {
    
    const latestProducts = [...products].reverse();

   
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

  
    if (limit) {
      return NextResponse.json(latestProducts.slice(0, parseInt(limit)));
    }

   
    return NextResponse.json(latestProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const body = await request.json();
    
  
    const newItem = {
      id: products.length + 1,
      ...body
    };

  
    products.push(newItem);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}