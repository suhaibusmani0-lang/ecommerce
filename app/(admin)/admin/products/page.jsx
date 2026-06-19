"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    const res = await fetch(
      "/api/admin/products"
    );

    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {

    await fetch(
      `/api/admin/products/delete/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Products
      </h1>

      <table className="w-full border">

        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map((item) => (

            <tr key={item._id}>

              <td>{item.name}</td>

              <td>
                ₹{item.price}
              </td>

              <td>
                {item.stock}
              </td>

              <td>

                <button
                  onClick={() =>
                    deleteProduct(item._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}