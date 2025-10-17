import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import { getProductById } from '../data/productsData'; // IMPORT


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProductDetails();
  }, [id]);


  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getById(id);
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setSelectedImage(0);
      }
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
    } catch (error) {
      // Use central data file
      const productData = getProductById(parseInt(id));
      
      if (productData) {
        setProduct(productData);
        setSelectedImage(0);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } else {
        setProduct(null);
      }
    }
    setLoading(false);
  };


  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const result = await addToCart(product.id || product._id, quantity);
    if (result.success) {
      alert('Added to cart successfully!');
    } else {
      alert(result.error || 'Failed to add to cart');
    }
  };


  const handleBuyNow = () => {
    if (!product.inStock) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    navigate(`/buynow/${product.id || product._id}`, {
      state: { 
        product, 
        quantity,
        selectedSize,
        selectedColor 
      }
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-6">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-primary capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-6">
          <div>
            {!product.inStock && (
              <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
                <p className="text-lg font-bold">OUT OF STOCK</p>
                <p className="text-sm mt-1">This product is currently unavailable</p>
              </div>
            )}

            {product.discount && product.inStock && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full inline-block mb-4 text-sm font-semibold">
                -{product.discount}% OFF
              </div>
            )}

            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
              <img
                src={product.images?.[selectedImage] || product.image || 'https://via.placeholder.com/600'}
                alt={product.name}
                className={`w-full h-96 object-cover ${!product.inStock ? 'opacity-50' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600?text=' + product.name;
                }}
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                    OUT OF STOCK
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  } hover:border-primary transition ${!product.inStock ? 'opacity-50' : ''}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-2">Prices include GST</p>

            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className={`w-10 h-10 border border-gray-300 rounded-lg transition ${
                    product.inStock 
                      ? 'hover:bg-gray-100 cursor-pointer' 
                      : 'bg-gray-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className={`w-10 h-10 border border-gray-300 rounded-lg transition ${
                    product.inStock 
                      ? 'hover:bg-gray-100 cursor-pointer' 
                      : 'bg-gray-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                  >
                    BUY NOW
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  BUY NOW
                </button>
              )}
              
              <button 
                className={`w-12 h-12 border-2 border-gray-300 rounded-lg transition ${
                  product.inStock 
                    ? 'hover:bg-gray-100 cursor-pointer' 
                    : 'bg-gray-200 cursor-not-allowed opacity-50'
                }`}
                disabled={!product.inStock}
              >
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{product.shipping}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{product.returns}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h3 className="text-lg font-bold mb-3">Description</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              {product.features && (
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
