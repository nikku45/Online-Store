import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      toast.success('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || 'Registration failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
