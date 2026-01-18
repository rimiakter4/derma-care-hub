// import Link from 'next/link';

// export default async function ProductsPage() {
//   const res = await fetch('http://localhost:3000/api/products', {
//     cache: 'no-store' 
//   });
  
//   if (!res.ok) {
//     return <div className="text-center py-24 text-red-500 font-bold">Failed to load products.</div>;
//   }

//   const products = await res.json();

//   return (
//     <div className="bg-white min-h-screen py-20">
//       <div className="container mx-auto px-4">
        
//         {/* --- Section Header --- */}
//         <div className="mb-12 border-b border-gray-100 pb-8">
//           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
//             Clinical <span className="text-secondary italic">Collection</span>
//           </h2>
//           <p className="text-slate-500 mt-2 text-sm max-w-xl">
//             Expertly curated medical-grade skincare solutions for professional results at home.
//           </p>
//         </div>

//         {/* --- Product Grid (আপনার স্ক্রিনশটের মতো ৪ কলামের গ্রিড) --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((item) => (
//             <div 
//               key={item.id} 
//               className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
//             >
//               {/* Product Image */}
//               <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-6">
//                 <img 
//                   src={item.image} 
//                   alt={item.name} 
//                   className="max-h-full max-w-full object-contain mix-blend-multiply" 
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="p-5 flex flex-col flex-grow">
//                 {/* Price (আপনার স্ক্রিনশটের স্টাইল অনুযায়ী) */}
//                 <div className="flex items-baseline gap-1 mb-2">
//                   <span className="text-2xl font-bold text-secondary">{Math.floor(item.price)}</span>
//                   <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">USD</span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 min-h-[3rem] line-clamp-2">
//                   {item.name}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
//                   {item.description}
//                 </p>

//                 {/* Details Button (Full Width) */}
//                 <Link 
//                   href={`/products/${item.id}`} 
//                   className="mt-auto w-full bg-secondary text-white py-3 rounded-md text-center text-sm font-bold hover:bg-opacity-90 transition-all active:scale-[0.98]"
//                 >
//                   See Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
// //     কার্ডের মেইন ডিভ
// // <div 
// //   key={item.id} 
// //   className="flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
// // >
// //   {/* ইমেজ সেকশন - হালকা হাইলাইট ব্যাকগ্রাউন্ড */}
// //   <div className="relative aspect-square w-full bg-[var(--accent)] flex items-center justify-center p-6">
// //     <img 
// //     src={item.image} 
// //       alt={item.name} 
// //       className="max-h-full max-w-full object-contain mix-blend-multiply" 
// //     />
// //   </div>

// //   <div className="p-5 flex flex-col flex-grow">
// //     {/* Price - secondary color ব্যবহার করুন */}
// //     <div className="flex items-baseline gap-1 mb-2">
// //       <span className="text-2xl font-bold text-secondary">{Math.floor(item.price)}</span>
// //       <span className="text-[10px] font-bold text-secondary/70 uppercase tracking-tighter">USD</span>
// //     </div>

// //     {/* Title - primary color ব্যবহার করুন */}
// //     <h3 className="text-lg font-bold text-primary leading-tight mb-2 min-h-[3rem] line-clamp-2">
// //       {item.name}
// //     </h3>
    
// //     {/* ... বাকি কোড ... */}
// //   </div>
// // </div>
//   );
// }
// import Link from 'next/link';

// export default async function ProductsPage() {
//   const res = await fetch('http://localhost:3000/api/products', {
//     cache: 'no-store' 
//   });
  
//   if (!res.ok) {
//     return <div className="text-center py-24 text-red-500 font-bold">Failed to load products.</div>;
//   }

//   const products = await res.json();

//   return (
//     <div className="min-h-screen py-20 transition-colors duration-300">
//       <div className="container mx-auto px-4">
        
//         {/* --- Section Header --- */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
//             Clinical <span className="text-secondary italic">Collection</span>
//           </h2>
//           <p className="mt-6 text-text-main/60 font-medium">
//             Expertly curated medical-grade skincare solutions for professional results at home.
//           </p>
//         </div>
         

//         {/* --- Product Grid --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((item) => (
//             <div 
//               key={item.id} 
//               className="flex flex-col bg-surface border border-border-ui rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               {/* Product Image Section */}
//               <div className="relative aspect-square w-full bg-accent flex items-center justify-center ">
//                 <img 
//                   src={item.image} 
//                   alt={item.name} 
//                   className="w-full h-[300px] object-cover mix-blend-multiply dark:mix-blend-normal" 
//                 />
//               </div>

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
// export const dynamic = "force-dynamic";
// import Link from 'next/link';

// export default async function ProductsPage() {
//   // const res = await fetch('http://localhost:3000/api/products', {
//   //   cache: 'no-store' 
//   // });
//   // ১. প্রথমে বেস ইউআরএল সেট করে নিন
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;

// // ২. এখন ফেচ করার সময় baseUrl ব্যবহার করুন
// const res = await fetch(`${baseUrl}/api/products`, {
//   cache: 'no-store' 
// });
//   if (!res.ok) {
//     return <div className="text-center py-24 text-red-500 font-bold">Failed to load products.</div>;
//   }

//   const products = await res.json();

//   return (
//     <div className="min-h-screen py-20 transition-colors duration-300">
//       <div className="container mx-auto px-4">
        
       
//        <div className="text-center max-w-3xl mx-auto mb-16">
//   {/* Medical Authority Badge */}
//   <span className="inline-block px-5 py-2 bg-accent text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10">
//     Medical Authority
//   </span>

//   {/* Main Heading */}
//   <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-tight">
//      Clinical  
//     <span className="text-secondary italic"> Collection</span>
//   </h2>
//   <p className="opacity-70 mt-2 text-sm text-center">
//             Expertly curated medical-grade skincare solutions for professional results at home.
//           </p>
//   {/* Optional: নিচের দিকে একটি ছোট লাইন দিলে ডিজাইন আরও সুন্দর লাগবে */}
 
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
// //             <div 
// //   key={item.id} 
// //   className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md w-full max-w-[280px]"
// // >
// //   {/* Product Image Section - Fixed Height & Cover */}
// //   <div className="relative h-48 w-full bg-gray-100">
// //     <img 
// //       src={item.image} 
// //       alt={item.name} 
// //       className="h-full w-full object-cover" 
// //     />
// //   </div>

// //   {/* Product Info Section */}
// //   <div className="p-4 flex flex-col flex-grow">
// //     {/* Price & Currency */}
// //     <div className="flex items-center gap-1 mb-2">
// //       <span className="text-xl font-bold text-[#00bfa5]">{Math.floor(item.price)}</span>
// //       <span className="text-[10px] font-bold text-[#00bfa5] uppercase">USD</span>
// //     </div>

// //     {/* Product Title */}
// //     <h3 className="text-md font-bold text-gray-800 leading-tight mb-2 line-clamp-1">
// //       {item.name}
// //     </h3>

// //     {/* Description */}
// //     <p className="text-gray-500 text-xs leading-snug mb-4 line-clamp-2 h-[32px]">
// //       {item.description}
// //     </p>

// //     {/* Details Button - Screenshot er moto Teal color */}
// //     <Link 
// //       href={`/products/${item.id}`} 
// //       className="mt-auto w-full bg-[#00bfa5] text-white py-2 rounded-md text-center text-sm font-medium hover:bg-[#00a693] transition-colors"
// //     >
// //       See Details
// //     </Link>
// //   </div>
// // </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-primary mb-16">Clinical <span className="text-secondary italic">Collection</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {products.map((item) => (
            <div key={item.id} className="bg-surface border border-border-ui rounded-xl overflow-hidden hover:shadow-xl transition-all">
              <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5 flex flex-col">
                <span className="text-2xl font-bold text-secondary mb-2">${item.price}</span>
                <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{item.name}</h3>
                <Link href={`/products/${item.id}`} className="mt-4 w-full bg-secondary text-white py-3 rounded-md text-center font-bold">
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