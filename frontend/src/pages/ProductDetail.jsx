import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ title, price, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg hover:shadow-teal-500/10 transition-all"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-teal-400 font-bold mb-3">${price}</p>
      <button className="w-full bg-teal-500 py-2 rounded-xl hover:bg-teal-600 transition">
        Add to Cart
      </button>
    </motion.div>
  );
}