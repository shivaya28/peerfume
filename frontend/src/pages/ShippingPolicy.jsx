const ShippingPolicy = () => {
  const sections = [
    {
      title: 'Processing Time',
      icon: '⏱️',
      content: 'Orders are typically processed within 1-2 business days. You will receive a confirmation email once your order has been shipped with tracking information.'
    },
    {
      title: 'Domestic Shipping',
      icon: '🇮🇳',
      content: 'We offer free standard shipping on all orders over ₹999. Standard delivery takes 3-7 business days. Express shipping is available for ₹150 and takes 1-3 business days.'
    },
    {
      title: 'International Shipping',
      icon: '🌍',
      content: 'We currently ship to select international destinations. International shipping rates and delivery times vary by location. Additional customs fees may apply.'
    },
    {
      title: 'Order Tracking',
      icon: '📦',
      content: 'Once your order ships, you will receive a tracking number via email. You can track your order status in the My Orders section of your account.'
    },
    {
      title: 'Shipping Restrictions',
      icon: '⚠️',
      content: 'Some products may have shipping restrictions. We cannot ship to P.O. boxes. Please ensure your shipping address is complete and accurate.'
    },
    {
      title: 'Lost or Damaged Packages',
      icon: '📮',
      content: 'If your package is lost or arrives damaged, please contact us within 7 days of the expected delivery date. We will work with the carrier to resolve the issue.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-xl text-gray-600">Everything you need to know about our shipping process</p>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg mb-8">
          <p className="text-blue-900 font-semibold">Last Updated: October 11, 2025</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{section.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Rates Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Shipping Rates</h2>
          </div>
          <div className="p-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Order Value</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Standard Shipping</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Express Shipping</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Below ₹999</td>
                  <td className="py-4 px-4">₹99</td>
                  <td className="py-4 px-4">₹199</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">₹999 - ₹2,499</td>
                  <td className="py-4 px-4 text-green-600 font-bold">FREE</td>
                  <td className="py-4 px-4">₹150</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Above ₹2,500</td>
                  <td className="py-4 px-4 text-green-600 font-bold">FREE</td>
                  <td className="py-4 px-4 text-green-600 font-bold">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Shipping?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is here to help</p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            Contact Us →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
