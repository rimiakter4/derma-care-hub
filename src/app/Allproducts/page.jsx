
// import Link from 'next/link';

// export default async function Allproducts() {
//   // লোকালহোস্ট এরর এড়াতে try-catch ব্লক
//   let products = [];
//   try {
//     const res = await fetch('http://localhost:3000/api/products', {
//       cache: 'no-store' 
//     });
//     if (res.ok) {
//       products = await res.json();
//     }
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//   }
  
//   if (products.length === 0) {
//     return <div className="text-center py-24 text-red-500 font-bold">Failed to load products.</div>;
//   }

//   return (
    
//     <div className="min-h-screen py-20 transition-colors duration-300">
//       <div className="container mx-auto px-4">
        
//         {/* --- Section Header --- */}
//         {/* <div className="mb-12 border-b border-border-ui pb-8">
//           <h2 className="text-3xl font-bold text-primary tracking-tight">
//             Clinical <span className="text-secondary italic">Collection</span>
//           </h2>
//           <p className="opacity-70 mt-2 text-sm max-w-xl">
//             Expertly curated medical-grade skincare solutions for professional results at home.
//           </p>
//         </div> */}

// <div className="mb-16 border-b border-zinc-200 text-center dark:border-white/10 pb-10">
//   {/* Modern Badge */}
//   <span className="text-[10px] font-black mt-5 uppercase tracking-[0.3em] text-secondary mb-3 block">
//     Advanced Formulations
//   </span>

//   {/* Main Heading */}
//   <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
//     All Clinical  
//     <span className="text-secondary italic"> Collection</span>
//   </h2>

//   {/* Description */}
//   <div className="flex justify-center"> 
//     <p className="text-primary/60 mt-6 text-base md:text-lg max-w-2xl leading-relaxed font-medium mx-auto">
//       Explore our expertly curated collection of medical-grade skincare. 
//     </p>
//   </div>
// </div>
//         {/* --- Product Grid --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((item) => (
//             <div 
//               key={item.id} 
//               className="flex flex-col bg-surface border border-border-ui rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               {/* Product Image Section */}
//               {/* <div className="relative aspect-square w-full bg-accent flex items-center justify-center p-6">
//                 <img 
//                   src={item.image} 
//                   alt={item.name} 
//                   className="h-[200px] w-full object-contain mix-blend-multiply dark:mix-blend-normal" 
//                 />
//               </div> */}
//               {/* Product Image Section - Ekhane h-48 ortha 192px fixed kora hoyeche */}
// <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
//   <img 
//     src={item.image} 
//     alt={item.name} 
//     className="h-full w-full  transition-transform duration-500 hover:scale-105" 
//   />
// </div>

//               {/* Product Info */}
//               <div className="p-5 flex flex-col flex-grow">
//                 {/* Price */}
//                 <div className="flex items-baseline gap-1 mb-2">
//                   <span className="text-2xl font-bold text-secondary">$ {Math.floor(item.price)}</span>
//                   <span className="text-[10px] font-bold text-secondary/70 uppercase tracking-tighter"></span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-bold text-primary leading-tight mb-2 min-h-[3rem] line-clamp-2">
//                   {item.name}
//                 </h3>

//                 {/* Description */}
//                 <p className="opacity-60 text-xs leading-relaxed mb-6 line-clamp-3">
//                   {item.description}
//                 </p>

//                 {/* Details Button */}
//                 <Link 
//                   href={`/products/${item.id}`} 
//                   className="mt-auto w-full bg-secondary text-white dark:text-slate-900 py-3 rounded-md text-center text-sm font-bold hover:opacity-90 transition-all active:scale-[0.98]"
//                 >
//                   See Details
//                 </Link>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center border-b pb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-3 block">Advanced Formulations</span>
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">All Clinical <span className="text-secondary italic">Collection</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="flex flex-col border rounded-xl overflow-hidden hover:shadow-xl transition-all">
              <div className="relative h-[300px] w-full bg-gray-100">
                <img src={item.image || "https://placehold.co/400x600"} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-2xl font-bold text-secondary mb-2">$ {Math.floor(item.price)}</span>
                <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{item.name}</h3>
                <p className="opacity-60 text-xs mb-6 line-clamp-3">{item.description}</p>
                <Link href={`/products/${item.id}`} className="mt-auto w-full bg-secondary text-white py-3 rounded-md text-center font-bold">See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}