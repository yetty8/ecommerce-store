import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum =
      typeof item.price === "string"
        ? Number(item.price.replace(/[^0-9.-]+/g, ""))
        : item.price;
    return sum + priceNum * (item.quantity || 1);
  }, 0);

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/success");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px-64px)] px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* Scrollable cart list */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 bg-gray-100 rounded-lg gap-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-center sm:text-left">{item.name}</h2>
                  <p className="text-center sm:text-left">
                    ${typeof item.price === "string" ? item.price.replace(/[^0-9.-]+/g, "") : item.price} × {item.quantity || 1}
                  </p>
                </div>
                <p className="font-bold text-center sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total + Place Order button */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-4">
            <div className="flex items-center justify-between text-lg sm:text-xl font-bold mb-4">
              <p>Total Amount:</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
