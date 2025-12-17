// src/pages/Products.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import products from '../data/products';

const Products = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative pb-2/3 h-64">
              <img
                src={product.image}
                alt={product.name}
                className="absolute h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <span className="text-lg font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 text-xs ml-1">
                    ({product.numReviews})
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className={`w-full py-2 px-4 rounded transition-colors ${
                    product.countInStock > 0
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;