import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold mb-10 text-center">Featured Products</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
