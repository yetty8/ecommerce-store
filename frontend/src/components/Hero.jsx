// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <div className="relative bg-gray-900">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/Toronto.jpg"
          alt="Fashionable products"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Yetbarek Store
        </h1>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Your Style
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Explore our curated collection of premium products designed to elevate your lifestyle.
        </p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Shop Now
            <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;