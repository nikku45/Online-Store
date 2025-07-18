import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  console.log('Order ID:', orderId);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await api.get(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrder(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-8">Loading order...</p>;

  if (!order)
    return (
      <div className="text-center mt-8">
        <p>Order not found or you don't have access.</p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Orders
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-16">
      <div className="mb-6">
        <button
          onClick={() => navigate('/orders')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Orders
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-black">Order Information</h3>
            <div className="space-y-2 text-black">
              <p><span className="font-medium">Order ID:</span> #{order._id.slice(-8).toUpperCase()}</p>
              <p><span className="font-medium">Date:</span> {dayjs(order.createdAt).format('DD MMM YYYY, hh:mm A')}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-700' 
                    : order.status === 'Shipped'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-black">Order Summary</h3>
            <div className="space-y-2 text-black">
              <p><span className="font-medium">Items:</span> {order.items.length}</p>
              <p><span className="font-medium">Total Amount:</span> ₹{order.total}</p>
              <p><span className="font-medium">Payment:</span> Card Payment</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  {item.productId.image ? (
                    <img 
                      src={item.productId.image} 
                      alt={item.productId.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-2xl">📦</div>
                  )}
                </div>
                
                <div className="flex-1 text-black">
                  <h4 className="font-medium text-gray-800">{item.productId.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-sm text-gray-600">Price: ₹{item.productId.price} each</p>
                </div>
                
                <div className="text-right text-black">
                  <p className="font-semibold text-gray-800">₹{item.productId.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-black">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">₹{order.total}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/orders')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
        >
          Back to Orders
        </button>
        
        {order.status === 'Delivered' && (
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Download Invoice
          </button>
        )}
        
        {(order.status === 'Shipped' || order.status === 'Processing') && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Track Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;