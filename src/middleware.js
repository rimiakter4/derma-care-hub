// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // ১. যদি লগইন না থাকে (!) এবং ইউজার প্রোডাক্ট পেজে যাওয়ার চেষ্টা করে
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/products')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ২. যদি লগইন থাকে এবং ইউজার আবার লগইন পেজে যেতে চায়
  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  // বানান ঠিক করা হয়েছে: next() হবে
  return NextResponse.next();
}

export const config = {
  matcher: [ "/add-item"],
  
};