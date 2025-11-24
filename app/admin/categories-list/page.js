"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CategoriesListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        alert("Failed to fetch categories!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while fetching categories!");
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  // Delete category
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Category deleted successfully!");
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        alert("Failed to delete category!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting!");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-gray-800 font-semibold mb-6">Categories List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-black border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Slug</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-left">Created At</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{cat.id}</td>
                  <td className="px-4 py-2 border-b">{cat.name}</td>
                  <td className="px-4 py-2 border-b">{cat.slug}</td>
                  <td className="px-4 py-2 border-b">{cat.description}</td>
                  <td className="px-4 py-2 border-b">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{new Date(cat.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b text-center space-x-2">
                    <button
                      onClick={() => alert(JSON.stringify(cat, null, 2))}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Info
                    </button>
                    <button
                      onClick={() => alert("Edit functionality coming soon!")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
      </div>
    </div>
  );
}
