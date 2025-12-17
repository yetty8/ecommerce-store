// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { getCartCount } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              E-Commerce
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-indigo-600">
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-indigo-600">
                  Products
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;