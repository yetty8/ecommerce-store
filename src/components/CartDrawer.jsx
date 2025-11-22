import React from "react";
import { useCart } from "../contexts/CartContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum =
      typeof item.price === "string"
        ? Number(item.price.replace(/[^0-9.-]+/g, ""))
        : item.price;
    return sum + priceNum * (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    onClose(); // close the cart
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    onClose(); // just close the cart
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} aria-label="Close cart">
          <FaTimes />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-200px)]">
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

      <div className="p-4 border-t border-gray-700 space-y-2">
        <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>

        <button
          onClick={handleCheckout}
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Checkout
        </button>

        <button
          onClick={handleContinueShopping}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Continue Shopping
        </button>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}
