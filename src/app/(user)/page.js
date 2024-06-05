import { TypewriterEffectDemo } from "@/components/TypewriterEffectDemo";
import AllCategories from "@/components/home/AllCategories";
import ArozeenProvides from "@/components/home/ArozeenProvides";

import FeaturedProductSlider from "@/components/home/FeaturedProductSlider";
import HeroSection from "@/components/home/HeroSection";
import HunderedsLowerPrices from "@/components/home/HunderedsLowerPrices";
import InstagramSection from "@/components/home/InstagramSection";
import LatestArticle from "@/components/home/LatestArticle";
import Newsletters from "@/components/home/Newsletters";
import ProductsHome from "@/components/home/ProductsHome";
import WinterCollection from "@/components/home/WinterCollection";

export default function Home() {
  return (
    <div>
      <div className="">
        <HeroSection />
      </div>
      <TypewriterEffectDemo />
      <FeaturedProductSlider />
      <AllCategories />
      <ProductsHome />
      <HunderedsLowerPrices />
      <LatestArticle />
      <WinterCollection />
      <InstagramSection />
      <ArozeenProvides />
      <Newsletters />
    </div>
  );
}
