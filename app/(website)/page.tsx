import HeroSlider from "@/components/website/HeroSlider";
import PromiseStrip from "@/components/website/PromiseStrip";
import CategoryGrid from "@/components/website/CategoryGrid";
import ProductGrid from "@/components/website/ProductGrid";
import HomePageCenterItem from "@/components/website/HomePageCenterItem";
import HomePageValues from "@/components/website/HomePageValues";
 
import HomePageDesignCrew from "@/components/website/header/HomePageDesignCrew";
export default function Home() {
  return (
    <>
      <HeroSlider />
      <PromiseStrip />
      <CategoryGrid /> 
      <HomePageCenterItem />
      <ProductGrid />
      
      <HomePageValues />
      <HomePageDesignCrew imageSrc="/assets/images/gettotouch.png"
  imageAlt="Interior design consultation"
  />
    </>
  );
}
