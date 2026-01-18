
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function Allproducts() {
  let products = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://derma-care-hub.vercel.app";

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' 
    });
    
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Products unavailable</h2>
          <Link href="/" className="text-secondary underline font-bold">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    
  <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl mt-7 md:text-6xl font-black text-primary ">
          All Clinical <span className="text-secondary italic">Collection</span>
        </h2>
        <div className="flex justify-center"> 
          <p className="text-[--accent] mt-3 mb-7 text-base md:text-lg max-w-2xl leading-relaxed font-medium mx-auto">
            Explore our expertly curated collection of medical-grade skincare. 
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {products.map((item) => (
            <div key={item._id || item.id} className="bg-surface border border-border-ui rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col h-full">
              {/* Product Image */}
              <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>

              {/* Product Content */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-2xl font-bold text-secondary mb-2">${item.price}</span>
                <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">{item.name}</h3>
                
                {/* Description added as requested */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {item.description || "High-quality clinical formula for your skin."}
                </p>

                <Link href={`/products/${item.id}`} className="mt-auto w-full bg-secondary text-white py-3 rounded-md text-center font-bold hover:bg-opacity-90 transition-colors">
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