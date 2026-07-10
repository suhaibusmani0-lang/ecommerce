import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Grid, List } from "lucide-react";
import ProductFilterSidebar from "@/components/website/ProductFilterSidebar";

// --- NAYE DATABASE IMPORTS ---
import { connectDB } from "@/lib/databaseConnection";
import Product from "@/models/Product.model";
// -----------------------------

type SearchParams = Record<string, string | string[] | undefined>;

async function getProducts(searchParams: SearchParams) {
  await connectDB();

  try {
    const page = parseInt(typeof searchParams.page === "string" ? searchParams.page : "1") || 1;
    const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest";
    const limit = 12; // Products per page
    const skip = (page - 1) * limit;

    // Yahan agar filter lagane hain toh query object me add kar sakte hain
    const query: any = {};

    // Sorting logic
    let sortOption: any = { createdAt: -1 }; // newest
    if (sort === "price-low") sortOption = { price: 1 };
    if (sort === "price-high") sortOption = { price: -1 };
    if (sort === "popular") sortOption = { "ratings.average": -1 };

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(query)
    ]);

    const pages = Math.ceil(total / limit);
    const hasMore = page < pages;

    // Plain JSON stringify taaki Next.js client component ko problem na ho
    return JSON.parse(JSON.stringify({
      products: products || [],
      total,
      pages,
      hasMore
    }));
  } catch (error) {
    console.error("Error fetching all products from DB:", error);
    return null;
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const sp = await searchParams as SearchParams;

  const page = parseInt(typeof sp.page === "string" ? sp.page : "1");
  const sort = typeof sp.sort === "string" ? sp.sort : "newest";

  const data = await getProducts(sp);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Products not found
      </div>
    );
  }

  const { products, total, pages, hasMore } = data;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-12 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-white/70">
            Browse our complete collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilterSidebar basePath="/products" />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <p className="text-sm text-[#1A1A1A]/60">
                Showing {products.length} of {total} products
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-[#1A1A1A] text-white rounded-lg">
                    <Grid size={18} />
                  </button>

                  <button className="p-2 bg-white rounded-lg">
                    <List size={18} />
                  </button>
                </div>

                <select
                  defaultValue={sort}
                  className="px-4 py-2 border rounded-lg bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price Low to High</option>
                  <option value="price-high">Price High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {products?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product: any) => (
                    <Link
                      key={product._id}
                      href={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition">
                        <div className="aspect-square relative">
                          {product.images?.[0]?.url ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium line-clamp-2 mb-2">
                            {product.name}
                          </h3>

                          <div className="flex gap-2 items-center">
                            <span className="font-semibold text-[#C17A56]">
                              ₹
                              {(
                                product.salePrice || product.price
                              ).toLocaleString()}
                            </span>

                            {product.salePrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from(
                      { length: Math.min(5, pages) },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/products?page=${pageNum}&sort=${sort}`}
                        className={`px-4 py-2 rounded-lg ${
                          pageNum === page
                            ? "bg-[#C17A56] text-white"
                            : "bg-white border"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                No Products Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}