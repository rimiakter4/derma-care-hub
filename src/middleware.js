
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Jodi login na thake ar se protected page-e jete chay
  if (!token && (pathname.startsWith("/additem") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Admin role check
  if (pathname.startsWith("/additem") && token?.role !== "admin") {
    // User login kora kintu admin na, tai home-e pathiye dao
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/additem/:path*", "/admin/:path*"], 
};