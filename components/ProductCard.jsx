// components/ProductCard.jsx
'use client';
import { useCart } from '../lib/cartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition flex flex-col">
      <img
        src={product.image || '/products/placeholder.png'}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-500 mb-2">${Number(product.price).toFixed(2)}</p>
      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{product.description || ''}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
