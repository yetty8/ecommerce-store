import React from "react";
import { useCart } from "../components/CartContext";
import { FaTimes } from "react-icons/fa";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Safely calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    let priceNum = 0;
    if (typeof item.price === "string") {
      priceNum = Number(item.price.replace(/[^0-9.-]+/g, ""));
    } else if (typeof item.price === "number") {
      priceNum = item.price;
    }
    return sum + priceNum * (item.quantity || 1);
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-800 p-2 rounded"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-2">
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  ${typeof item.price === "string" ? item.price.replace(/[^0-9.-]+/g, "") : item.price} x {item.quantity || 1}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
