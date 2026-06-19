import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8B6F52] mb-2">Explore</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A]">Shop by Category</h2>
        </div>

        {/* 2-col on mobile, 3-col on sm/md, 6-col on lg+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#E3D9C9]"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
              <span className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center text-white text-[10px] sm:text-xs tracking-widest uppercase font-semibold drop-shadow">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
