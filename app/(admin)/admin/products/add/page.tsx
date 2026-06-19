"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/products", {
        cache: "no-store",
      });

      const result = await res.json();

      console.log("API Response:", result);

      let productData = [];

      if (Array.isArray(result)) {
        productData = result;
      } else if (Array.isArray(result?.products)) {
        productData = result.products;
      } else if (Array.isArray(result?.data?.products)) {
        productData = result.data.products;
      }

      setProducts(productData);
    } catch (error) {
      console.error("Fetch Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <Link
          href="/admin/products/add"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Stock</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6"
                >
                  Loading...
                </td>
              </tr>
            ) : !Array.isArray(products) ||
              products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item._id}>
                  <td className="border p-3">
                    <img
                      src={
                        item?.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={item?.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="border p-3">
                    {item?.name}
                  </td>

                  <td className="border p-3">
                    {item?.category?.name ||
                      "N/A"}
                  </td>

                  <td className="border p-3">
                    ₹{item?.price}
                  </td>

                  <td className="border p-3">
                    {item?.stock}
                  </td>

                  <td className="border p-3">
                    {item?.isActive
                      ? "Active"
                      : "Inactive"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}