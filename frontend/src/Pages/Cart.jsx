'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CartDrawer({ open, setOpen }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log('Fetching cart with token:', token);
      if (!token) {
        setOpen(false);
        toast.error('Please login to view your cart');
        navigate('/login');
        return;
      }

      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQty = async (productId, currentQty, action) => {
    console.log('Updating quantity:', productId, currentQty, action);
    try {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (action === 'increment') {
     const res= await api.post(
        '/cart',
        { productId, quantity: currentQty + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Increment response:', res.data);
    } else if (action === 'decrement') {
      if (currentQty === 1) {
        // remove the item
        await handleRemove(productId);
      } else {
        await api.post(
          '/cart',
          { productId, quantity: currentQty - 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }

    // Refresh cart after update
    fetchCart();
  } catch (err) {
    console.error(err);
  }
  }

  useEffect(() => {
    if (open) fetchCart();
  }, [open]);

  const subtotal =
    cart?.items?.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    ) || 0;

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform bg-white shadow-xl transition-all">
              <div className="flex h-full flex-col overflow-y-auto">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {loading ? (
                        <p>Loading cart...</p>
                      ) : !cart?.items?.length ? (
                        <p>Your cart is empty.</p>
                      ) : (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.items.map((item) => (
                            <li key={item.productId._id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.productId.name}
                                  src={
                                    item.productId.image ||
                                    'https://via.placeholder.com/50'
                                  }
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.productId.name}</h3>
                                    <p className="ml-4">
                                      ₹{item.productId.price * item.qty}
                                    </p>
                                  </div>
                                  <button onClick={() => handleUpdateQty(item.productId._id, item.qty,"decrement")} className='font-bold'>-</button>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Qty: {item.qty}
                                  </p>
                                  <button onClick={() => handleUpdateQty(item.productId._id, item.qty,"increment")} className='font-bold'>+</button>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        handleRemove(item.productId._id)
                                      }
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₹{subtotal}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping <span aria-hidden="true">→</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
