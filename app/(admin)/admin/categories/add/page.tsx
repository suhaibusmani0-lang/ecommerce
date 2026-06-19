"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/categories",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Category Added Successfully");

        router.push(
          "/admin/categories"
        );
      } else {
        alert(
          data.message ||
            "Failed to add category"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Add Category
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter category name"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Slug
            </label>

            <input
              type="text"
              value={formData.slug}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
              placeholder="Category description"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive:
                    e.target.checked,
                })
              }
            />

            <span>Active Category</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}