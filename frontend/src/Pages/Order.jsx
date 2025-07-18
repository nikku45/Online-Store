import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await api.get('/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading orders...</p>;

  if (!orders.length)
    return (
      <div className="text-center mt-8">
        <p>You have no orders yet.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Shopping
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-16">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">
                  Order ID: <span className="text-sm">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Placed on: {dayjs(order.createdAt).format('DD MMM YYYY, hh:mm A')}
                </p>
              </div>
              <div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex justify-between py-2"
                >
                  <div>
                    <p className="font-medium text-black">{item.productId.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                  <p className="text-black">₹{item.productId.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="text-right mt-2 font-bold text-black">
              Total: ₹{order.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
