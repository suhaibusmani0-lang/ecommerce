import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 md:py-20 lg:py-24 border-t border-[#E3D9C9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-7 sm:mb-10">
          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8B6F52] mb-1 sm:mb-2">Just Arrived</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A]">New This Week</h2>
          </div>
          <a
            href="/new"
            className="hidden sm:inline text-[11px] tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#C17A56] hover:border-[#C17A56] transition-colors whitespace-nowrap"
          >
            View All
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-7 text-center sm:hidden">
          <a href="/new" className="text-xs tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5">
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
