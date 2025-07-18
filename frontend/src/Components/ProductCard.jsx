import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded shadow-sm p-3 hover:shadow-md transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="w-full h-40 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-700">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
