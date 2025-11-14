import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

// Motion variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Animate children with a small delay
    },
  },
};

// Motion variants for each product card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
};

export default function Products() {
  return (
      <motion.section
    id="products"
    className="py-20 bg-gray-900 text-gray-100"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-12">
          Featured <span className="text-blue-500">Products</span>
        </h2>

        {/* Updated grid for smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                img={product.img}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
