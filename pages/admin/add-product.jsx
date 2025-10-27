import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Product added!");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Image URL" onChange={e => setForm({ ...form, image: e.target.value })} />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">Add Product</button>
      </form>
    </div>
  );
}
