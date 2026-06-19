"use client";

import { useEffect, useState } from "react";

export default function RecycleBinPage() {

  const [products, setProducts] = useState([]);

  const fetchTrash = async () => {

    const res = await fetch(
      "/api/admin/products/recycle-bin"
    );

    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const restore = async (id) => {

    await fetch(
      `/api/admin/products/restore/${id}`,
      {
        method: "PATCH"
      }
    );

    fetchTrash();
  };

  const permanentDelete = async (id) => {

    await fetch(
      `/api/admin/products/permanent-delete/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchTrash();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Recycle Bin
      </h1>

      {products.map((item) => (

        <div
          key={item._id}
          className="border rounded p-4 mb-4"
        >

          <h3 className="font-bold">
            {item.name}
          </h3>

          <div className="flex gap-2 mt-3">

            <button
              onClick={() =>
                restore(item._id)
              }
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Restore
            </button>

            <button
              onClick={() =>
                permanentDelete(item._id)
              }
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Delete Forever
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}