

import AddToCartButton from '@/component/AddToCartButton';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://derma-care-hub.vercel.app";

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary">
        <h2 className="text-3xl font-black mb-4">Product Not Found</h2>
        <Link href="/Allproducts" className="px-6 py-3 bg-secondary text-white rounded-full">
          Return to Shop
        </Link>
      </div>
    );
  }

  const product = await res.json();
  const productImages = product.images || [product.image];

  return (
    // <div className="min-h-screen bg-background transition-colors duration-500 pt-20">
    //   <div className="container mx-auto px-4 py-12">
    //     <nav className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-12 opacity-50 text-primary">
    //       <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
    //       <span>/</span>
    //       <Link href="/Allproducts" className="hover:text-secondary transition-colors">Shop</Link>
    //       <span>/</span>
    //       <span className="text-secondary">{product.name}</span>
    //     </nav>

    //     <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
    //       <div className="lg:col-span-7 grid grid-cols-12 gap-4">
    //         <div className="col-span-2 flex flex-col gap-3">
    //           {productImages.map((img, index) => (
    //             <label key={index} htmlFor={`image-${index}`} className="aspect-square border border-border-ui rounded-lg overflow-hidden cursor-pointer bg-white">
    //               <img src={img} alt="" className="w-full h-full object-cover" />
    //             </label>
    //           ))}
    //         </div>
    //         <div className="col-span-10 bg-white border border-border-ui rounded-[1.5rem] h-[500px] md:h-[650px] overflow-hidden relative group">
    //           {productImages.map((img, index) => (
    //             <div key={index}>
    //               <input type="radio" name="gallery-control" id={`image-${index}`} className="peer hidden" defaultChecked={index === 0} />
    //               <img src={img} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 peer-checked:opacity-100 transition-all duration-700" />
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="lg:col-span-5 flex flex-col justify-center">
    //         <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 uppercase">{product.name}</h1>
    //         <p className="text-5xl font-light text-primary italic mb-10">${product.price}</p>
    //         <p className="text-lg text-primary/70 leading-relaxed mb-12">{product.description}</p>
    //         <AddToCartButton className="w-full py-5 bg-secondary text-white rounded-2xl font-bold" productPrice={product.price} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-background transition-colors duration-500 pt-20">
      <div className="container mx-auto px-4 py-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-12 opacity-50 text-primary">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/Allproducts" className="hover:text-secondary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-secondary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- বাম পাশ: ইমেজ গ্যালারি --- */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            {/* থাম্বনেইলস */}
            <div className="col-span-2 flex flex-col gap-3">
              {productImages.map((img, index) => (
                <label 
                  key={`thumb-${index}`} 
                  htmlFor={`image-${index}`} 
                  className="aspect-square border border-border-ui rounded-lg overflow-hidden cursor-pointer hover:border-secondary transition-all active:scale-95 bg-white"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </label>
              ))}
            </div>
            
            {/* মেইন ইমেজ ভিউপোর্ট */}
            <div className="col-span-10 bg-white border border-border-ui rounded-[1.5rem] h-[500px] md:h-[650px] overflow-hidden relative group shadow-sm">
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/80 backdrop-blur-md border border-border-ui rounded-full text-[9px] font-black uppercase text-primary">
                Full Spectrum Formula
              </div>
              
              {productImages.map((img, index) => (
                <div key={`main-${index}`}>
                  <input 
                    type="radio" 
                    name="gallery-control" 
                    id={`image-${index}`} 
                    className="peer hidden" 
                    defaultChecked={index === 0} 
                  />
                  
                  <img 
                    src={img} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover 
                               opacity-0 scale-105
                               peer-checked:opacity-100 peer-checked:scale-100
                               transition-all duration-700 ease-in-out
                               group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 peer-checked:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* --- ডান পাশ: প্রোডাক্ট ইনফো --- */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                In Stock & Ready to Ship
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-[1.1] mb-4 uppercase">
                {product.name}
              </h1>
              <p className="text-sm font-bold text-primary/40 uppercase tracking-[0.2em]">
                {product.category || "Clinical"} • Science-Backed Formula
              </p>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="text-5xl font-light text-primary italic">${product.price}</span>
              <div className="h-10 w-[1px] bg-border-ui" />
              <span className="text-xs font-bold opacity-50 leading-tight text-primary">
                Tax included.<br/>Shipping calculated at checkout.
              </span>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3 underline decoration-secondary decoration-2 underline-offset-4">The Science</h4>
                <p className="text-lg text-primary/70 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* অ্যাডিশনাল ডিটেইলস কার্ডস */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-center">
                   <p className="text-[10px] font-black uppercase opacity-60 text-primary">PH Level</p>
                   <p className="font-bold text-secondary text-lg">{product.phLevel || "5.5 - 6.0"}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-center">
                   <p className="text-[10px] font-black uppercase opacity-60 text-primary">Skin Type</p>
                   <p className="font-bold text-secondary text-lg">{product.skinType || "All Types"}</p>
                </div>
              </div>
            </div>

            {/* কল টু অ্যাকশন */}
            <div className="flex flex-col gap-4">
              <AddToCartButton 
                className="w-full py-5 bg-secondary text-white rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-secondary/20" 
                productPrice={product.price} 
              />
            </div>

            {/* ট্রাস্ট ব্যাজ */}
            <div className="mt-12 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
               <img src="https://cdn-icons-png.flaticon.com/512/3062/3062331.png" className="h-10 w-auto" alt="Cruelty Free" />
               <img src="https://cdn-icons-png.flaticon.com/512/2105/2105292.png" className="h-10 w-auto" alt="Vegan" />
               <img src="https://cdn-icons-png.flaticon.com/512/8205/8205777.png" className="h-10 w-auto" alt="Eco Friendly" />
            </div>
          </div>
        </div>
      </div>
    </div>
 
  );
}