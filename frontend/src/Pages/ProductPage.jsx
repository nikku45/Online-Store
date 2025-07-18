
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You need to login first.');
        return;
      }

      await api.post(
        '/cart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        <div>
          Added to cart!{' '}
          <span
            onClick={() => navigate('/cart')}
            className="underline cursor-pointer"
          >
            View Cart
          </span>
        </div>,
        { autoClose: 3000 }
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart.');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You need to login first.');
        return;
      }

      await api.post(
        '/wishlist',
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Added to wishlist!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to wishlist.');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading product...</p>;
  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white shadow rounded-lg p-6 md:flex md:gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="mt-4 md:mt-0 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-black">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-green-700 mb-6">
              ₹{product.price}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
