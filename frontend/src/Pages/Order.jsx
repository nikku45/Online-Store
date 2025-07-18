// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const res = await api.get('/orders/myorders', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-8">Loading orders...</p>;

//   if (!orders.length)
//     return (
//       <div className="text-center mt-8">
//         <p>You have no orders yet.</p>
//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Start Shopping
//         </button>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4 max-w-4xl pt-16">
//       <h2 className="text-3xl font-bold mb-6">My Orders</h2>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white shadow rounded p-4 border border-gray-200"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <div>
//                 <p className="font-semibold">
//                   Order ID: <span className="text-sm">{order._id}</span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Placed on: {dayjs(order.createdAt).format('DD MMM YYYY, hh:mm A')}
//                 </p>
//               </div>
//               <div>
//                 <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
//                   {order.status}
//                 </span>
//               </div>
//             </div>

//             <div className="divide-y">
//               {order.items.map((item) => (
//                 <div
//                   key={item.productId._id}
//                   className="flex justify-between py-2"
//                 >
//                   <div>
//                     <p className="font-medium text-black">{item.productId.name}</p>
//                     <p className="text-sm text-gray-600">Qty: {item.qty}</p>
//                   </div>
//                   <p className="text-black">₹{item.productId.price * item.qty}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="text-right mt-2 font-bold text-black">
//               Total: ₹{order.total}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '📦';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="container mx-auto p-4 max-w-4xl pt-20">
        <div className="bg-white shadow-lg rounded-lg p-12 text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
          >
            <span className="mr-2">🛒</span>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl pt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Orders</h1>
        <div className="text-sm text-gray-600">
          {orders.length} order{orders.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📅 Placed on: {dayjs(order.createdAt).format('DD MMM YYYY, hh:mm A')}</p>
                    <p>💰 Total Amount: <span className="font-semibold text-gray-800">₹{order.total}</span></p>
                    <p>📦 Items: {order.items.reduce((sum, item) => sum + item.qty, 0)} item{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                  >
                    <span className="mr-2">👁️</span>
                    View Details
                  </button>
                  
                  {order.status.toLowerCase() === 'delivered' && (
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center text-sm"
                    >
                      <span className="mr-2">⭐</span>
                      Rate & Review
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      📦
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{item.productId.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                      <p className="text-sm font-semibold text-gray-800">₹{item.productId.price * item.qty}</p>
                    </div>
                  </div>
                ))}
                
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">+{order.items.length - 3} more items</p>
                      <button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                      >
                        View all items
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600">
                  Order ID: <span className="font-mono">{order._id}</span>
                </div>
                <div className="flex space-x-4">
                  {order.status.toLowerCase() === 'pending' && (
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Cancel Order
                    </button>
                  )}
                  {(order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered') && (
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Track Order
                    </button>
                  )}
                  <button 
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Order Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Orders;