// import Image from "next/image";
// import Banner from "./Banner/page";
// import HowItWorks from "@/Component/HowitWork";

// export default function Home() {
//   return (
//   <div>
//  {/* {/* <Banner></Banner> */}
//  {/* <HowItWorks></HowItWorks>  */}
//  <section > {/* এটি ডার্ক মোডেও হোয়াইটই থাকবে */}
//   <h2>Hello</h2>
//    <HowItWorks></HowItWorks>
// </section>
   

//   </div>
//   );
// }
// import Image from "next/image";
// import Banner from "./Banner/page";
// import HowItWorks from "@/Component/HowitWork";

// export default function Home() {
//   return (
//     <div>
//       {/* বাড়তি <section> ট্যাগটি সরিয়ে সরাসরি কম্পোনেন্ট কল করুন */}
//       <HowItWorks />
      
//       {/* যদি আলাদা করে কিছু লিখতে চান, তবে সেটিতেও ক্লাস দিন */}
//       <section className="bg-white dark:bg-[#060b13] text-slate-900 dark:text-white p-10">
//         <h2 className="text-2xl font-bold">Hello</h2>
//       </section>
//     </div>
//   );
// }

import SkinProblem from "@/component/SkinProblem";
import Banner from "./Banner/page";
import HowItWorks from "@/component/HowitWork";
import WhyRecommended from "@/component/WhyRecomanded";
import Brands from "@/component/Brands";
import ExpertBoard from "@/component/Expertise";
import ReviewClient from "@/component/ReviewClient";
import Authenticity from "@/component/Authecity";
import ClinicalEvidence from "@/component/BeforeAfter";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
 
      <HowItWorks></HowItWorks>
      <SkinProblem></SkinProblem>
     <WhyRecommended></WhyRecommended>
     <Brands></Brands>
     <ExpertBoard></ExpertBoard>
    <ReviewClient></ReviewClient>
  
    <ClinicalEvidence></ClinicalEvidence>
    </div>
  );
}