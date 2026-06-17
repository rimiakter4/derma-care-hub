
"use client";

import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MapPin, Box } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 8;

  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(search);

  const baseUrl = "https://derma-care-hub.vercel.app";

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (inputValue) params.set("search", inputValue);
      else params.delete("search");
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/products?search=${search}&category=${category}`);
        if (res.ok) {
          const data = await res.json();
          setTotalItems(data.length);
          const start = (page - 1) * limit;
          setProducts(data.slice(start, start + limit));
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [search, category, page]);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  return (
    <div className="min-h-screen py-20 bg-[#020617] text-white">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">All Products</h2>
        </div>

        {/* Search & Filter */}
        <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 mb-10 flex flex-col md:row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-3 text-slate-500 h-5 w-5" />
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search products..." 
              className="w-full bg-[#1e293b] border border-slate-700 py-2.5 pl-12 pr-4 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
             {['All', 'Moisturizer', 'Cleanser', 'Serum'].map((cat) => (
               <Link 
                 key={cat} 
                 href={cat === 'All' ? '/Allproducts' : `?category=${cat}&search=${search}`}
                 className={`px-4 py-2 rounded-lg text-xs font-medium border ${ (cat === 'All' && !category) || category === cat ? 'bg-blue-600 border-blue-500' : 'bg-[#1e293b] border-slate-700' }`}
               >
                 {cat}
               </Link>
             ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-96 bg-slate-800 rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.02]">
                
                {/* Image Wrapper */}
                <div className="relative h-64 w-full">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  
                  {/* Category Badge (Top Left) */}
                  <div className="absolute top-3 left-3 bg-black/80 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-white/10">
                    {item.category}
                  </div>

                  {/* Price Badge (Top Right) */}
                  <div className="absolute top-3 right-3 bg-[#2563eb] text-xs font-bold px-3 py-1 rounded shadow-lg flex items-center gap-1">
                    <span className="text-sm">৳</span> {item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase">In Stock</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{item.name}</h3>
                  
                  <p className="text-slate-400 text-xs line-clamp-2 italic mb-4 leading-relaxed">
                    {item.description || "Premium clinical formula for professional results."}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-6 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Dhaka, BD
                    </div>
                    <div className="flex items-center gap-1">
                      <Box className="w-3 h-3" /> Min: 100 pcs
                    </div>
                  </div>

                  <Link 
                    href={`/products/${item._id}`} 
                    className="mt-auto block w-full bg-[#0070f3] hover:bg-blue-600 text-white py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Link href={`?page=${Math.max(1, page - 1)}&search=${search}&category=${category}`} className={`p-2 rounded-full border border-slate-700 ${page === 1 ? 'opacity-30 pointer-events-none' : 'hover:bg-slate-800'}`}>
              <ChevronLeft size={20} />
            </Link>
            <span className="text-xs font-bold text-slate-400">Page {page} of {totalPages}</span>
            <Link href={`?page=${Math.min(totalPages, page + 1)}&search=${search}&category=${category}`} className={`p-2 rounded-full border border-slate-700 ${page === totalPages ? 'opacity-30 pointer-events-none' : 'hover:bg-slate-800'}`}>
              <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}