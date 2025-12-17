// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';   
import { ArrowRightIcon, ShoppingBagIcon, TagIcon, ShieldCheckIcon, TruckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: '/images/WirelessHeadphones.jpg',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 249.99,
      image: '/images/SmartWatch.jpg',
      category: 'Wearables'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 129.99,
      image: '/images/NikeSneakers.jpg',
      category: 'Footwear'
    }
  ];

  const categories = [
    { name: 'Electronics', count: 24, image: '/images/android.jpg' },
    { name: 'Fashion', count: 36, image: '/images/sweatshirt.jpg' },
    { name: 'Home & Living', count: 18, image: '/images/smarttv.jpg' },
    { name: 'Sports', count: 12, image: '/images/basketball.jpg' },
  ];

  const openImageModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Hero />
      <div className="bg-white">
        {/* Image Modal */}
        {selectedProduct && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <button
                onClick={closeImageModal}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <div className="bg-white rounded-lg overflow-hidden max-h-[80vh] flex flex-col">
                <div className="flex-1 overflow-auto">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </div>
                <div className="p-4 border-t">
                  <h3 className="text-lg font-medium text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-gray-500">{selectedProduct.category}</p>
                  <p className="text-lg font-medium text-gray-900 mt-2">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <TruckIcon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Secure Payment</h3>
                  <p className="text-gray-500">100% secure payment</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <TagIcon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Best Price</h3>
                  <p className="text-gray-500">Guaranteed best prices</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <ShoppingBagIcon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Easy Returns</h3>
                  <p className="text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Discover our most popular products
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div 
                    className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer"
                    onClick={() => openImageModal(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product.id}`} className="hover:text-indigo-600">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View all products
                <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Shop by Category</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 text-center">
              Browse our wide range of categories
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <div key={category.name} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/products?category=${category.name.toLowerCase()}`}
                        className="bg-white text-gray-900 px-6 py-2 rounded-md font-medium"
                      >
                        Shop {category.name}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/products?category=${category.name.toLowerCase()}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {category.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Sign up for our newsletter
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                Stay up to date with our latest products and exclusive offers.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                We care about your data. Read our{' '}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;