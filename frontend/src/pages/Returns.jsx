const Returns = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Return & Refund Policy</h1>
          <p className="text-xl text-gray-600">We want you to be completely satisfied with your purchase</p>
        </div>

        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            Quick Summary
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>30-day return window</strong> for most items</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Free return shipping</strong> on all orders over ₹999</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Full refund</strong> processed within 5-7 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Easy online return</strong> process through your account</span>
            </li>
          </ul>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">How to Return an Item</h2>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {[
                { step: 1, title: 'Log into Your Account', desc: 'Go to My Orders and select the order you want to return' },
                { step: 2, title: 'Select Return Reason', desc: 'Choose the reason for return and provide any additional details' },
                { step: 3, title: 'Print Return Label', desc: 'Download and print the prepaid return shipping label' },
                { step: 4, title: 'Pack the Item', desc: 'Pack the item securely in its original packaging with all accessories' },
                { step: 5, title: 'Ship the Package', desc: 'Drop off the package at any courier location or schedule a pickup' }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          {[
            {
              title: 'Return Eligibility',
              icon: '📋',
              points: [
                'Items must be unused and in original condition',
                'Original packaging and tags must be intact',
                'Return must be initiated within 30 days of delivery',
                'Proof of purchase (order number) is required'
              ]
            },
            {
              title: 'Non-Returnable Items',
              icon: '🚫',
              points: [
                'Personalized or custom-made products',
                'Opened hygiene products (earphones, personal care items)',
                'Perishable goods',
                'Gift cards and downloadable products'
              ]
            },
            {
              title: 'Refund Process',
              icon: '💰',
              points: [
                'Refunds are processed within 5-7 business days of receiving the return',
                'Money will be credited to your original payment method',
                'You will receive an email confirmation once refund is processed',
                'Bank processing may take additional 2-3 business days'
              ]
            },
            {
              title: 'Exchange Policy',
              icon: '🔄',
              points: [
                'We offer exchanges for wrong size or defective items',
                'Contact us within 7 days of delivery for exchanges',
                'Replacement will be shipped once we receive the original item',
                'No additional shipping charges for exchanges'
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-4xl">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Return?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is available to assist you</p>
          <div className="flex gap-4 justify-center">
            <a href="/contact" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
              Contact Us
            </a>
            <a href="/orders" className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all">
              View My Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
