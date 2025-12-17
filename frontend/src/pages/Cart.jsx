// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQty,
    getCartTotal,
    getCartCount,
  } = useCart();

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {getCartCount() === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                <div className="col-span-5 font-medium text-gray-600">Product</div>
                <div className="col-span-2 font-medium text-gray-600">Price</div>
                <div className="col-span-3 font-medium text-gray-600">Quantity</div>
                <div className="col-span-2 font-medium text-gray-600">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 p-4 border-b items-center"
                >
                  <div className="col-span-5 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center"
                      >
                        <XMarkIcon className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-gray-700">${item.price.toFixed(2)}</div>
                  <div className="col-span-3">
                    <div className="flex items-center border rounded-md w-32">
                      <button
                        onClick={() => updateQty(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item._id, item.qty + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 font-medium">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg border-t pt-4">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={checkoutHandler}
                  disabled={getCartCount() === 0}
                  className={`w-full py-2 rounded-md transition-colors ${
                    getCartCount() === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;