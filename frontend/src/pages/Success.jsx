import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px-64px)] px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
        Order Successful!
      </h1>
      <p className="text-md sm:text-lg text-gray-700 mb-6">
        Thank you for your order, Yetty! 🎉  
      </p>

      <button
        onClick={() => navigate("/")}
        className="w-full sm:w-auto max-w-xs py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Back to Home
      </button>
    </div>
  );
}
