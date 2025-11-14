import React from "react";
import { useCart } from "../components/CartContext";

export default function ProductCard({ id, name, price, img }) {
  const { addToCart } = useCart();

  // Ensure price is stored as string with $
  const priceStr = typeof price === "number" ? `$${price}` : price;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xs mx-auto">
      <img
        src={img}
        alt={name}
        className="w-full h-36 sm:h-40 md:h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-blue-500 font-bold mt-2">{priceStr}</p>
        <button
          onClick={() => addToCart({ id, name, price, img, quantity: 1 })}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
