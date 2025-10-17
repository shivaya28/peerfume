import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const result = await addToCart(product._id || product.id);
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(result.error || 'Failed to add to cart');
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/buynow/${product._id || product.id}`, {
      state: { 
        product,
        quantity: 1
      }
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            -{product.discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4" fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews || 0})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Updated Buttons Section */}
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            className=" cursor-pointer flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm font-semibold"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="cursor-pointer flex-1 bg-primary bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg hover:bg-secondary transition text-sm font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
