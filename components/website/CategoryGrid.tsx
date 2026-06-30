import Link from "next/link";
import Image from "next/image";

// Define proper types
interface CategoryImage {
  url: string;
  alt?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: CategoryImage;
  description?: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, {
     // cache: "no-store",
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoryGrid() {
  const categories = await getCategories();

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <section className="bg-[#FAF7F2] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8B6F52] mb-2">Explore</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A]">Shop by Category</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-[#8B6F52]">No categories available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8B6F52] mb-2">Explore</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A]">Shop by Category</h2>
        </div>

        {/* 2-col on mobile, 3-col on sm/md, 6-col on lg+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat: Category) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#E3D9C9]"
              style={{ aspectRatio: "3/4" }}
            >
              {cat.image?.url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={cat.image.url}
                    alt={cat.image.alt || cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.67vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#D4C4B0]">
                  <span className="text-2xl sm:text-3xl text-[#8B6F52] font-semibold">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-[#1A1A1A]/20 to-transparent" />
              <span className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold drop-shadow-lg">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}