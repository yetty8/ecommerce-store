// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowsUpDownIcon, 
  StarIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const mockProducts = [
  {
    _id: '1',
    name: 'Android Phone',
    price: 2999.99,
    image: '/images/android.jpg',
    description: '2026 Android Phone with 128GB Storage',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    createdAt: '2025-10-15'
  },
  {
    _id: '2',
    name: 'iPhone',
    price: 2999.99,
    image: '/images/iphone.jpg',
    description: '2026 iPhone with 128GB Storage',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 142,
    isNew: true,
    createdAt: '2025-10-10'
  },
  {
    _id: '3',
    name: 'Basketball',
    price: 89.99,
    image: '/images/basketball.jpg',
    description: 'NBA Basketball',
    category: 'Sports',
    rating: 5,
    reviewCount: 253,
    isNew: true,
    createdAt: '2025-09-20'
  },
  {
    _id: '4',
    name: 'Coca-Cola',
    price: 3.99,
    image: '/images/cocacola.jpg',
    description: 'Coca-Cola 20 oz',
    category: 'Beverages',
    rating: 4.5,
    reviewCount: 171,
    isNew: true,
    createdAt: '2025-11-01'
  },
  {
    _id: '5',
    name: 'Gatorade',
    price: 2.99,
    image: '/images/gatorade.jpg',
    description: 'Gatorade energy drink',
    category: 'Beverages',
    rating: 4.5,
    reviewCount: 174,
    isNew: true,
    createdAt: '2025-11-05'
  },
  {
    _id: '6',
    name: 'Jewelry',
    price: 899.99,
    image: '/images/Jewelry.jpg',
    description: 'Nickel plated jewelry',
    category: 'Accessories',
    rating: 4,
    reviewCount: 132,
    isNew: true,
    createdAt: '2025-10-25'
  },
  {
    _id: '7',
    name: 'Leather BackPack',
    price: 97.99,
    image: '/images/LeatherBackpack.jpg',
    description: 'Leather backpack for men and women',
    category: 'Accessories',
    rating: 4.5,
    reviewCount: 291,
    isNew: true,
    createdAt: '2025-09-15'
  },
  {
    _id: '8',
    name: 'Nike Sneakers',
    price: 149.99,
    image: '/images/NikeSneakers.jpg',
    description: 'Lightweight running shoes with cushioning',
    category: 'Sports',
    rating: 4.5,
    reviewCount: 140,
    isNew: true,
    createdAt: '2025-10-05'
  },
  {
    _id: '9',
    name: 'Nike Shoes',
    price: 169.99,
    image: '/images/Nikeshoes1.jpg',
    description: 'Jump like a pro',
    category: 'Sports',
    rating: 4.5,
    reviewCount: 129,
    isNew: true,
    createdAt: '2025-10-18'
  },
  {
    _id: '10',
    name: 'PlayStation',
    price: 599.99,
    image: '/images/playstation5.jpg',
    description: 'PlayStation 5',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 219,
    isNew: true,
    createdAt: '2025-09-10'
  },
  {
    _id: '11',
    name: 'Protein Powder',
    price: 89.99,
    image: '/images/proteinpowder.jpg',
    description: 'Protein Powder for muscle growth',
    category: 'Sports',
    rating: 4.5,
    reviewCount: 144,
    isNew: true,
    createdAt: '2025-11-10'
  },
  {
    _id: '12',
    name: 'Smart Tv',
    price: 1999.99,
    image: '/images/smarttv.jpg',
    description: 'Smart TV with 4K resolution',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 293,
    isNew: true,
    createdAt: '2025-09-05'
  },
  {
    _id: '13',
    name: 'Smart Watch',
    price: 499.99,
    image: '/images/SmartWatch.jpg',
    description: 'Smart Watch with fitness tracking',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 271,
    isNew: true,
    createdAt: '2025-10-20'
  },
  {
    _id: '14',
    name: 'Soccer Ball',
    price: 29.99,
    image: '/images/soccerball.jpg',
    description: 'Professional soccer ball',
    category: 'Sports',
    rating: 4.5,
    reviewCount: 122,
    isNew: true,
    createdAt: '2025-11-15'
  },
  {
    _id: '15',
    name: 'Sweatshirt',
    price: 39.99,
    image: '/images/sweatshirt.jpg',
    description: 'Comfortable cotton sweatshirt',
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 184,
    isNew: true,
    createdAt: '2025-10-30'
  },
  {
    _id: '16',
    name: 'Wireless Headphones',
    price: 199.99,
    image: '/images/WirelessHeadphones.jpg',
    description: 'Noise-cancelling wireless headphones',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 283,
    isNew: true,
    createdAt: '2025-10-12'
  },
  {
     _id: '17',
    name: 'Basketball',
    price: 199.99,
    image: '/images/basketball.jpg',
    description: 'NBA Basketball',
    category: 'Sports',
    rating: 4.5,
    reviewCount: 323,
    isNew: true,
    createdAt: '2025-10-12'
  }
];

const Products = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 9;
  const categories = ['All', ...new Set(mockProducts.map(product => product.category))];
  const filteredProducts = mockProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0;
      }
    });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentPage, sortBy, searchTerm, selectedCategory, priceRange]);
  const openQuickView = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };
  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">Our Products</h1>
        
        <div className="relative mb-4 sm:mb-6 px-2 sm:px-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-4 sm:space-y-0 px-2 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <select
                className="block w-full text-sm sm:text-base bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowsUpDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <select
                className="block w-full text-sm sm:text-base bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <div className="w-full bg-white p-3 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Min: ${priceRange[0]}</span>
                  <span>Max: ${priceRange[1]}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="10"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), Math.max(parseInt(e.target.value), priceRange[1] - 100)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[0] + 100), parseInt(e.target.value)])}
                    className="absolute top-0 w-full h-2 bg-transparent pointer-events-none"
                    style={{ background: 'none', WebkitAppearance: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openQuickView(product)}
                />
                {product.isNew && (
                  <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">{product.name}</h2>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
                </div>
                
                <div className="mt-1 flex items-center">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-indigo-600 text-white text-xs sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3 rounded hover:bg-indigo-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => openQuickView(product)}
                    className="flex-1 border border-gray-300 text-gray-700 text-xs sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3 rounded hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No products found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8 px-2 sm:px-0">
          <nav className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2.5 py-1 sm:px-4 sm:py-2 text-sm border rounded-md ${
                        currentPage === pageNum
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-start sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto"
          onClick={closeQuickView}
        >
          <div 
            className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-lg sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{selectedProduct.name}</h2>
              <button
                onClick={closeQuickView}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="sm:flex">
                <div className="sm:w-1/2 p-4 sm:p-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] object-contain"
                  />
                </div>
                <div className="p-4 sm:p-6 sm:w-1/2">
                  <p className="text-indigo-600 text-xl font-semibold mb-2">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({selectedProduct.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Category</h3>
                    <p className="text-sm text-gray-500">{selectedProduct.category}</p>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        closeQuickView();
                      }}
                      className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Products;