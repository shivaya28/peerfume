import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Thank you for contacting us! We will get back to you soon. ✅');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you! Send us a message.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {[
              {
                icon: '📧',
                title: 'Email Us',
                content: 'info.3digree@gmail.com',
                link: 'mailto:info.3digree@gmail.com'
              },
              {
                icon: '📱',
                title: 'Call Us',
                content: '+91 9999999928',
                link: 'tel:+919999999928'
              },
              {
                icon: '📍',
                title: 'Visit Us',
                content: '3, Digree Street, Digree Nagar, Jaipur, Rajasthan',
                link: null
              },
              {
                icon: '⏰',
                title: 'Business Hours',
                content: 'Mon - Sat: 9:00 AM - 6:00 PM',
                link: null
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-blue-600 hover:text-blue-700 transition">
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.content}</p>
                )}
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                  <button key={social} className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-xl transition">
                    <span className="text-sm font-semibold">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Send Us a Message</h2>
                <p className="text-blue-100 mt-2">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="product">Product Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message 📤'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for Quick Answers?</h3>
          <p className="text-gray-600 mb-6">Check out our FAQ page for instant answers to common questions</p>
          <a href="/faq" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            View FAQ →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
