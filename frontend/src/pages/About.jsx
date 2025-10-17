import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🌸',
      title: 'Premium Fragrances',
      description: 'Curated collection of luxury perfumes, attars, and deodorants from world-renowned brands.'
    },
    {
      icon: '✨',
      title: 'Authentic Products',
      description: '100% genuine fragrances with authenticity certificates. No duplicates, only originals.'
    },
    {
      icon: '🎁',
      title: 'Perfect Gifting',
      description: 'Elegant packaging and personalized gift options for every special occasion.'
    },
    {
      icon: '💝',
      title: 'Best Prices',
      description: 'Premium quality at competitive prices with exciting offers and discounts.'
    }
  ];

  const stats = [
    { value: '15,000+', label: 'Happy Customers' },
    { value: '250+', label: 'Fragrance Options' },
    { value: '30+', label: 'Premium Brands' },
    { value: '4.9★', label: 'Customer Rating' }
  ];

  const collections = [
    {
      name: 'Luxury Perfumes',
      icon: '💎',
      description: 'Premium international perfumes from top brands like Valintino, Faun Walk, and more.'
    },
    {
      name: 'Traditional Attars',
      icon: '🌿',
      description: 'Authentic Arabian and Indian attars crafted with pure essential oils.'
    },
    {
      name: 'Body Deodorants',
      icon: '🌊',
      description: 'Long-lasting deodorants including Denver, Mamaearth, and other trusted brands.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to 3 Digree</h1>
            <p className="text-xl text-pink-100 leading-relaxed">
              Jaipur's premier destination for authentic perfumes, luxury attars, and premium deodorants. 
              Discover your signature scent with our curated collection of world-class fragrances.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Fragrance Journey</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded in the heart of Jaipur, Rajasthan, <strong>3 Digree</strong> was born from a passion 
              for exquisite fragrances and a dream to make luxury perfumes accessible to everyone. We understand 
              that a signature scent is more than just a fragrance—it's an expression of personality, mood, and style.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our carefully curated collection features premium perfumes from international brands like 
              <strong> Valintino, Faun Walk</strong>, traditional attars including <strong>Atarstory, 
              Gold Series, Oud of Dubai</strong>, and popular deodorants from <strong>Denver, Mamaearth, 
              Bright Peach</strong>, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every fragrance we offer is 100% authentic and sourced directly from verified suppliers. 
              Whether you're looking for a bold, lasting perfume, a subtle traditional attar, or a refreshing 
              daily deodorant, 3 Digree has the perfect scent for every occasion and personality.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-pink-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose 3 Digree</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Collections Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {collections.map((collection, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-pink-100"
              >
                <div className="text-6xl mb-4">{collection.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {collection.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Partners */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Brands</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              '🌟 Valintino',
              '🦌 Faun Walk', 
              '🌿 Mamaearth',
              '💪 Denver',
              '🌺 Atarstory',
              '👔 Clive',
              '🍑 Bright Peach',
              '✨ Whisky Smoke'
            ].map((brand, index) => (
              <div 
                key={index}
                className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl font-semibold text-gray-800 hover:shadow-md transition"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Authenticity',
                  icon: '✓',
                  description: 'Only genuine products with authentication guarantees on every purchase.'
                },
                {
                  title: 'Quality',
                  icon: '⭐',
                  description: 'Premium fragrances that last longer and smell better, every single time.'
                },
                {
                  title: 'Trust',
                  icon: '🤝',
                  description: 'Building lasting relationships with customers through honesty and service.'
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-purple-100"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Find Your Perfect Fragrance Today
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Explore our exclusive collection of perfumes, attars, and deodorants. 
            Whether it's for daily wear or a special occasion, we have the perfect scent for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              🛍️ Shop Collection
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              💬 Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Store Location */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Visit Our Store</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3 Digree Fragrance Store</h3>
            <p className="text-lg text-gray-700 mb-2">3, Digree Street, Digree Nagar</p>
            <p className="text-lg text-gray-700 mb-2">Jaipur, Rajasthan 302001</p>
            <p className="text-lg text-gray-700 mb-6">India</p>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mt-6">
              <h4 className="font-bold text-lg mb-4">Get In Touch</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📞</span>
                  <span className="text-gray-700 font-semibold">+91 9999999928</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📧</span>
                  <span className="text-gray-700 font-semibold">info.3digree@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-gray-600">
              <p className="text-sm">🕐 Store Hours: Monday - Saturday, 10:00 AM - 8:00 PM</p>
              <p className="text-sm">🎁 Free perfume samples with every visit!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
