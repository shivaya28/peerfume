import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { getAllOrders } from '../data/productsData'; // IMPORT


const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getMyOrders();
      setOrders(data);
    } catch (error) {
      // Load from localStorage first, if not found use central data
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (localOrders.length > 0) {
        setOrders(localOrders);
      } else {
        setOrders(getAllOrders());
      }
    }
    setLoading(false);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Processing':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Shipped':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'Cancelled':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };


  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track, manage and reorder your purchases</p>
        </div>


        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
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
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div 
                key={order.id || order.orderId} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-blue-100 text-xs uppercase tracking-wide mb-1">Order Number</p>
                      <p className="font-bold text-lg">{order.orderNumber || order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs uppercase tracking-wide mb-1">Order Date</p>
                      <p className="font-semibold">
                        {new Date(order.date || order.orderDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs uppercase tracking-wide mb-1">Total Amount</p>
                      <p className="font-bold text-xl">₹{(order.total || order.totalAmount).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs uppercase tracking-wide mb-1">Status</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusColor(order.status || 'Processing')}`}>
                        {order.status || 'Processing'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    {(order.items || [order.product]).map((item, index) => (
                      <div key={index} className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="relative group">
                          <img
                            src={item.image || item.product?.image || item.product?.images?.[0]}
                            alt={item.name || item.product?.name}
                            className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/96'; }}
                          />
                          <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg">
                            {item.quantity || order.quantity || 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name || item.product?.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {item.color && (
                              <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-gray-800 border-2 border-white shadow"></span>
                                {item.color}
                              </span>
                            )}
                            {item.size && <span className="bg-white px-3 py-1 rounded-full font-medium">Size: {item.size}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-xl">₹{(item.price || item.product?.price).toLocaleString('en-IN')}</p>
                          {(item.quantity || 1) > 1 && (
                            <p className="text-sm text-gray-600 mt-1">Total: ₹{((item.price || item.product?.price) * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View Full Details
                    </button>
                    {(order.status === 'Delivered') && (
                      <button className="flex-1 min-w-[200px] border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Reorder
                        </span>
                      </button>
                    )}
                    {order.trackingNumber && (
                      <button className="flex-1 min-w-[200px] bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-md">
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Track Package
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal code remains same - just updated to handle both order formats */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 flex justify-between items-center z-10 rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold">Order Details</h2>
                <p className="text-blue-100 mt-1">{selectedOrder.orderNumber || selectedOrder.orderId}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-xl transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Order Date', value: new Date(selectedOrder.date || selectedOrder.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), icon: '📅' },
                  { label: 'Status', value: selectedOrder.status || 'Processing', icon: '✅', badge: true },
                  { label: 'Tracking Number', value: selectedOrder.trackingNumber || 'N/A', icon: '📦' },
                  { label: 'Total Amount', value: `₹${(selectedOrder.total || selectedOrder.totalAmount).toLocaleString('en-IN')}`, icon: '💰' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition">
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </p>
                    {item.badge ? (
                      <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(item.value)}`}>
                        {item.value}
                      </span>
                    ) : (
                      <p className="font-bold text-gray-900">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {selectedOrder.timeline && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <span className="text-2xl">🚚</span>
                    Order Timeline
                  </h3>
                  <div className="space-y-6">
                    {selectedOrder.timeline.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                            step.completed 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110' 
                              : 'bg-white border-2 border-gray-300 text-gray-400'
                          }`}>
                            {step.completed ? (
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="font-bold">{index + 1}</span>
                            )}
                          </div>
                          {index < selectedOrder.timeline.length - 1 && (
                            <div className={`w-1 h-16 rounded-full ${step.completed ? 'bg-gradient-to-b from-green-500 to-emerald-500' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p className={`font-bold text-lg ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.status}
                          </p>
                          {step.date && (
                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(step.date).toLocaleDateString('en-IN')} {step.time && `at ${step.time}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedOrder.shippingAddress && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    Shipping Address
                  </h3>
                  <div className="bg-white p-5 rounded-xl">
                    <p className="font-bold text-gray-900 text-lg">{selectedOrder.shippingAddress.name || selectedOrder.shippingDetails?.fullName}</p>
                    <p className="text-gray-700 mt-2">{selectedOrder.shippingAddress.address || selectedOrder.shippingDetails?.address}</p>
                    <p className="text-gray-700">
                      {selectedOrder.shippingAddress.city || selectedOrder.shippingDetails?.city}, {selectedOrder.shippingAddress.state || selectedOrder.shippingDetails?.state} - {selectedOrder.shippingAddress.pincode || selectedOrder.shippingDetails?.pincode}
                    </p>
                    <p className="text-gray-700 mt-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-semibold">{selectedOrder.shippingAddress.phone || selectedOrder.shippingDetails?.phone}</span>
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">🛍️</span>
                  Order Items
                </h3>
                <div className="space-y-4">
                  {(selectedOrder.items || [selectedOrder.product]).map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
                      <img
                        src={item.image || item.product?.image || item.product?.images?.[0]}
                        alt={item.name || item.product?.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.name || item.product?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.quantity || selectedOrder.quantity || 1} {item.color && `• ${item.color}`} {item.size && `• Size: ${item.size}`}
                        </p>
                      </div>
                      <p className="font-bold text-xl text-gray-900">₹{((item.price || item.product?.price) * (item.quantity || selectedOrder.quantity || 1)).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">💳</span>
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{(selectedOrder.subtotal || selectedOrder.totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-bold text-green-600">
                      {(selectedOrder.shipping || 0) === 0 ? 'FREE ✨' : `₹${selectedOrder.shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-semibold text-gray-900">₹{(selectedOrder.tax || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t-2 border-blue-200 pt-3 flex justify-between">
                    <span className="font-bold text-xl text-gray-900">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ₹{(selectedOrder.total || selectedOrder.totalAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Invoice
                  </span>
                </button>
                <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need Help?
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
