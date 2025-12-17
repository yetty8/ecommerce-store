// src/pages/OrderDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    }
  }, [id, token]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Order not found</h2>
        <Link
          to="/orders"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order #{order._id.substring(0, 8).toUpperCase()}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {order.user?.name || 'N/A'}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Email:</span> {order.user?.email || 'N/A'}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Address:</span> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.isDelivered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.isDelivered
                    ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`
                    : 'Not Delivered'}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {order.orderItems?.map((item) => (
                  <div key={item._id} className="flex items-center border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600">${item.price} x {item.qty}</p>
                    </div>
                    <div className="text-gray-900 font-medium">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shippingPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.taxPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {!order.isPaid && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment</h3>
                <button
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    // Implement payment integration here
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;