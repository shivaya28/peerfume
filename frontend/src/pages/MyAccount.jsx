import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../data/productsData'; // IMPORT


const MyAccount = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '3 Digree',
    email: 'info.3digree@gmail.com',
    phone: '+91 9999999928',
    address: '3, Digree Street, Digree Nagar, Jaipur, Rajasthan'
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);


  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);


  const loadOrders = () => {
    // Load from localStorage first (placed orders), then fallback to central data
    const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (localOrders.length > 0) {
      setOrders(localOrders.slice(0, 2)); // Show only first 2 orders
    } else {
      setOrders(getAllOrders());
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Profile updated successfully! ✅');
      setEditing(false);
      setLoading(false);
    }, 1000);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Processing':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Shipped':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Profile Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    {profile.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-blue-500 hover:bg-blue-50 transition">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold text-xl mt-4 text-gray-900">{profile.name}</h3>
                <p className="text-gray-600 text-sm">{profile.email}</p>
              </div>


              {/* Navigation Tabs - Only Profile and Orders */}
              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile Info', icon: '👤' },
                  { id: 'orders', label: 'My Orders', icon: '📦' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>


              {/* Logout Button */}
              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>


          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                    <p className="text-blue-100 mt-1">Update your personal details</p>
                  </div>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-2 rounded-xl text-white font-semibold transition flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>


                {/* Form */}
                <form onSubmit={handleUpdate} className="p-8">
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-xl">👤</span>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!editing}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>


                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-xl">📧</span>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!editing}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>


                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-xl">📱</span>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!editing}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition text-lg"
                        placeholder="+91 98765 43210"
                      />
                    </div>


                    {/* Address */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-xl">🏠</span>
                        Address
                      </label>
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        disabled={!editing}
                        rows={4}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition text-lg resize-none"
                        placeholder="Enter your complete address"
                      />
                    </div>
                  </div>


                  {/* Action Buttons */}
                  {editing && (
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="px-8 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </span>
                      </button>
                    </div>
                  )}
                </form>


                {/* Account Stats */}
                {!editing && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 grid grid-cols-3 gap-4 border-t">
                    {[
                      { label: 'Total Orders', value: orders.length.toString(), icon: '📦' },
                      { label: 'Wishlist Items', value: '8', icon: '❤️' },
                      { label: 'Rewards Points', value: '1,250', icon: '⭐' }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}


            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 rounded-2xl text-white shadow-lg">
                  <h2 className="text-2xl font-bold">My Orders</h2>
                  <p className="text-blue-100 mt-1">View and track your order history</p>
                </div>


                {orders.length > 0 ? (
                  <>
                    {orders.map((order, idx) => (
                      <div 
                        key={order.id || order.orderId} 
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
                      >
                        {/* Order Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Order Number</p>
                            <p className="font-bold text-lg text-gray-900">{order.orderNumber || order.orderId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Status</p>
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold shadow-md ${getStatusColor(order.status || 'Processing')}`}>
                              {order.status || 'Processing'}
                            </span>
                          </div>
                        </div>


                        {/* Order Items */}
                        <div className="p-6">
                          <div className="space-y-4">
                            {(order.items || [order.product]).map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                <img
                                  src={item.image || item.product?.image || item.product?.images?.[0]}
                                  alt={item.name || item.product?.name}
                                  className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                                />
                                <div className="flex-1">
                                  <h3 className="font-bold text-gray-900">{item.name || item.product?.name}</h3>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity || order.quantity || 1}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-xl text-gray-900">₹{(item.price || item.product?.price).toLocaleString('en-IN')}</p>
                                </div>
                              </div>
                            ))}
                          </div>


                          {/* Order Footer */}
                          <div className="flex justify-between items-center mt-6 pt-4 border-t">
                            <div>
                              <p className="text-sm text-gray-600">Order Date</p>
                              <p className="font-semibold text-gray-900">
                                {new Date(order.date || order.orderDate).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Total Amount</p>
                              <p className="font-bold text-2xl text-gray-900">₹{(order.total || order.totalAmount).toLocaleString('en-IN')}</p>
                            </div>
                          </div>


                          {/* Action Button */}
                          <button 
                            onClick={() => navigate('/orders')}
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                          >
                            View Full Details
                          </button>
                        </div>
                      </div>
                    ))}


                    {/* View All Button */}
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full bg-white text-gray-700 py-4 rounded-2xl font-bold border-2 border-gray-300 hover:bg-gray-50 transition-all shadow-md"
                    >
                      View All Orders →
                    </button>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyAccount;
