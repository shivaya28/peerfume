import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { getProductById } from '../data/productsData'; // IMPORT

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Map cart items with product details from central data
    const itemsWithDetails = cart.map(item => {
      const product = getProductById(item.productId);
      return {
        ...item,
        product: product || item.productDetails
      };
    });
    setCartItems(itemsWithDetails);
  }, [cart]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gst = (subtotal * 0.18).toFixed(2);
  const total = (subtotal + parseFloat(gst)).toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
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
          <span className="text-gray-900">Shopping Cart</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.product?.images?.[0] || item.product?.image || '/placeholder.png'}
                      alt={item.product?.name}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    >
                      {item.product?.name || 'Product'}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{item.product?.price || 0}
                      </span>
                      {item.product?.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-auto text-red-500 hover:text-red-700 transition text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="w-full bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition mb-3"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">Free Shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">Easy 30-day returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
