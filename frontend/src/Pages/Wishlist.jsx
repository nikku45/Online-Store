import { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await api.get('/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Removed from wishlist');
      fetchWishlist();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading wishlist...</p>;

  if (!wishlist.length)
    return (
      <div className="text-center mt-8">
        <p>Your wishlist is empty.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="container mx-auto pt-16 p-4">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map((product) => (
          <div key={product._id} className="relative">
           
            <div className="bg-white shadow rounded p-4 flex flex-col">
              <img
                src={product.image || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="h-48 w-full object-cover mb-2"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-lg font-semibold mt-2">₹{product.price}</p>
            </div>
         
            <button
              onClick={() => handleRemove(product._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
