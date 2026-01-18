
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://derma-care-hub.vercel.app";

  const res = await fetch(`${baseUrl}/api/products?limit=8`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    return <div className="text-center py-24 text-red-500 font-bold">Failed to load products.</div>;
  }

  const products = await res.json();

  return (
 
    <div className="min-h-screen py-20 transition-colors duration-300 bg-background">
      <div className="container mx-auto px-4">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Medical Authority Badge */}
          <span className="inline-block px-5 py-2 bg-accent/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10">
            Medical Authority
          </span>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
            Clinical <span className="text-secondary italic">Collection</span>
          </h2>
          
          <p className="opacity-70 mt-4 text-base md:text-lg font-medium leading-relaxed">
            Explore our expertly curated collection of medical-grade skincare solutions for professional results at home.
          </p>
          
          {/* Decorative Underline */}
          <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full opacity-50"></div>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div 
              key={item._id || item.id} 
              className="group flex flex-col bg-surface border border-border-ui rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Product Image Section */}
              <div className="relative h-[320px] w-full overflow-hidden bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Price Tag */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-black text-secondary">$ {Math.floor(item.price)}</span>
                  <span className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest">USD</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary leading-tight mb-3 min-h-[3.5rem] line-clamp-2 group-hover:text-secondary transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="opacity-60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.description || "High-quality clinical formula designed for professional skin care results."}
                </p>

                {/* Details Button */}
                <Link 
                  href={`/products/${item.id}`} 
                  className="mt-auto w-full bg-secondary text-white py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300 active:scale-[0.95] shadow-lg shadow-secondary/20"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}