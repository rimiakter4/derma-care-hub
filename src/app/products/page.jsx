
import Link from 'next/link';
import { Star, MapPin, Package } from 'lucide-react'; // আইকনগুলোর জন্য lucide-react ব্যবহার করা হয়েছে

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://derma-care-hub.vercel.app";

  let products = [];
  try {
    const res = await fetch(`${baseUrl}/api/products?limit=8`, {
      cache: 'no-store' 
    });

    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <h2 className="text-2xl font-bold text-white">No products available.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-[#0B1120] transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-blue-500/20">
            Medical Authority
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Clinical <span className="text-blue-500 italic">Collection</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base md:text-lg font-medium leading-relaxed">
            Explore our expertly curated collection of medical-grade skincare solutions.
          </p>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div 
              key={item._id} 
              className="group flex flex-col bg-[#162031] border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50"
            >
              {/* Product Image Section */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Type Badge */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                  {item.category || 'Product'}
                </span>

                {/* Price Badge */}
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md">
                 <span className='text-xl font-bold'>৳</span> {Math.floor(item.price)}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Rating & Stock */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1 text-orange-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">4.8</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">In Stock</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white leading-snug mb-3 min-h-[3rem] line-clamp-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 italic">
                  {item.description || "High-quality clinical formula designed for professional results."}
                </p>

                {/* Metadata (Location & Min Order) */}
                <div className="flex justify-between items-center text-gray-500 mb-6 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span className="text-[10px]">Dhaka, BD</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Package size={12} />
                        <span className="text-[10px]">Min: 100 pcs</span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link 
                  href={`/products/${item._id}`} 
                  className="mt-auto w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}