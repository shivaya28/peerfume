import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { getProductById } from '../data/productsData'; // IMPORT


const BuyNow = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });


  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setQuantity(location.state.quantity || 1);
      setLoading(false);
    } else {
      fetchProductDetails();
    }
  }, [id, location.state]);


  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getById(id);
      setProduct(data);
    } catch (error) {
      // Use central data file
      const productData = getProductById(parseInt(id));
      if (productData) {
        setProduct(productData);
      } else {
        setProduct(null);
      }
    }
    setLoading(false);
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    const orderData = {
      product,
      quantity,
      totalAmount: product.price * quantity,
      shippingDetails: formData,
      orderId: 'ORD' + Date.now(),
      orderDate: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    alert(`Order placed successfully! Order ID: ${orderData.orderId}`);
    navigate('/orders');
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


  const totalAmount = product.price * quantity;
  const gstAmount = (totalAmount * 0.18).toFixed(2);
  const finalAmount = (totalAmount + parseFloat(gstAmount)).toFixed(2);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-6">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate(`/product/${id}`)}>Product</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive the product</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    disabled
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">Online Payment</p>
                    <p className="text-sm text-gray-600">Buy Template to enable online payment feature</p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition"
              >
                PLACE ORDER
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="flex gap-4 mb-6 pb-6 border-b">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {quantity}</p>
                  <p className="text-lg font-bold text-primary">₹{product.price}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">₹{finalAmount}</span>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-700">{product.shipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
