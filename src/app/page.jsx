

import SkinProblem from "@/component/SkinProblem";
import HeroBanner from "@/app/Banner/page"; // এটি যদি আপনার পাঠানো কোডটি হয়
import HowItWorks from "@/component/HowitWork";
import WhyRecommended from "@/component/WhyRecomanded";
import Brands from "@/component/Brands";
import ExpertBoard from "@/component/Expertise";
import ReviewClient from "@/component/ReviewClient";
import ClinicalEvidence from "@/component/BeforeAfter";
import Allproducts from "./Allproducts/page"; 
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <main>
      {/* ব্যানারটি এখানে */}
      <HeroBanner />
      
      <div className="space-y-10">
        <SkinProblem />
        <ProductsPage></ProductsPage>
       
        <Brands />
        <HowItWorks />
        <WhyRecommended />
        <ClinicalEvidence />
        <ExpertBoard />
        <ReviewClient />
      </div>
    </main>
  );
}