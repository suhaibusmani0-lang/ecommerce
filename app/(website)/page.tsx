import HeroSlider from "@/components/website/HeroSlider";
import PromiseStrip from "@/components/website/PromiseStrip";
import CategoryGrid from "@/components/website/CategoryGrid";
import ProductGrid from "@/components/website/ProductGrid";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PromiseStrip />
      <CategoryGrid />
      <ProductGrid />
    </>
  );
}
