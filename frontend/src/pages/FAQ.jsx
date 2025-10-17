import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    {
      name: 'Orders & Payment',
      icon: '🛒',
      faqs: [
        { q: 'How do I place an order?', a: 'Browse our products, add items to cart, proceed to checkout, fill in shipping details, and complete payment. You will receive an order confirmation email.' },
        { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit Cards, Net Banking, UPI, Wallets, and Cash on Delivery (COD) for eligible orders.' },
        { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placing. Contact us immediately or go to My Orders section.' },
        { q: 'Do you offer EMI options?', a: 'Yes, we offer No Cost EMI on orders above ₹3,000 through select credit cards and payment partners.' }
      ]
    },
    {
      name: 'Shipping & Delivery',
      icon: '📦',
      faqs: [
        { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days. Express shipping takes 1-3 business days. Processing time is 1-2 business days.' },
        { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all orders over ₹999. Express shipping is free on orders over ₹2,500.' },
        { q: 'Can I track my order?', a: 'Yes, once shipped you will receive a tracking number via email. You can also track orders in the My Orders section.' },
        { q: 'Do you ship internationally?', a: 'Yes, we ship to select international destinations. Shipping rates and delivery times vary by location.' }
      ]
    },
    {
      name: 'Returns & Refunds',
      icon: '↩️',
      faqs: [
        { q: 'What is your return policy?', a: 'We offer a 30-day return window for most items. Items must be unused, in original packaging with tags intact.' },
        { q: 'How do I return an item?', a: 'Go to My Orders, select the item, choose return reason, print the return label, and ship it back. Return shipping is free.' },
        { q: 'How long do refunds take?', a: 'Refunds are processed within 5-7 business days of receiving the return. Bank processing may take additional 2-3 days.' },
        { q: 'Can I exchange an item?', a: 'Yes, we offer exchanges for wrong size or defective items. Contact us within 7 days of delivery.' }
      ]
    },
    {
      name: 'Account & Security',
      icon: '🔐',
      faqs: [
        { q: 'How do I create an account?', a: 'Click on the Account icon, select Sign Up, fill in your details, and verify your email address.' },
        { q: 'I forgot my password. What should I do?', a: 'Click on "Forgot Password" on the login page. Enter your email and we will send you a password reset link.' },
        { q: 'Is my payment information secure?', a: 'Yes, all transactions are encrypted using SSL technology. We do not store complete card details on our servers.' },
        { q: 'How do I update my account information?', a: 'Log in to your account, go to My Account section, click Edit Profile, make changes, and save.' }
      ]
    },
    {
      name: 'Products & Stock',
      icon: '🏷️',
      faqs: [
        { q: 'Are your products authentic?', a: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors and brands.' },
        { q: 'How do I know if an item is in stock?', a: 'Stock availability is shown on the product page. If out of stock, you can sign up for restock notifications.' },
        { q: 'Do you offer gift wrapping?', a: 'Yes, gift wrapping is available for ₹99 during checkout. We also include a personalized gift message.' },
        { q: 'Can I pre-order upcoming products?', a: 'Yes, pre-orders are available for select products. You will be charged when the item ships.' }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg"
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  {category.name}
                </h2>
              </div>

              <div className="p-4">
                {category.faqs.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`;
                  const isOpen = openIndex === key;

                  return (
                    <div key={faqIdx} className="border-b border-gray-200 last:border-0">
                      <button
                        onClick={() => toggleFAQ(catIdx, faqIdx)}
                        className="w-full px-6 py-5 text-left hover:bg-gray-50 transition flex justify-between items-center gap-4"
                      >
                        <span className="font-semibold text-gray-900 text-lg">{faq.q}</span>
                        <svg
                          className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-gray-700 leading-relaxed animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help!</p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
