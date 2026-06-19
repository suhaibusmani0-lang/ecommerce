"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/categories", {
        cache: "no-store",
      });

      const data = await res.json();

      // Handle both response formats
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories(data?.categories || []);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Categories
        </h1>

        <Link
          href="/admin/categories/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Category
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">
                Name
              </th>
              <th className="border p-3 text-left">
                Slug
              </th>
              <th className="border p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-6"
                >
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-6"
                >
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="border p-3">
                    {cat.name}
                  </td>

                  <td className="border p-3">
                    {cat.slug}
                  </td>

                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        cat.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cat.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
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