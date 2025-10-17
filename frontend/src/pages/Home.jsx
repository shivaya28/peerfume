import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import HeroCarousel from '../components/HeroCarousel';
import { getAllProducts } from '../data/productsData'; // IMPORT


const Home = () => {
  const { products, setProducts, loading, setLoading } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('perfume');


  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      // Use central data file
      setProducts(getAllProducts());
    }
    setLoading(false);
  };

  // Rest of the code remains same...
  const brandLogos = [
    '/brand/1.png',
    '/brand/2.png',
    '/brand/3.png',
    '/brand/4.png',
    '/brand/5.png',
    '/brand/6.png',
    '/brand/7.png',
    '/brand/8.png',
  ];

  const testimonials = [
    {
      id: 1,
      image: 'https://www.avon.co.in/cdn/shop/files/FA.jpg?v=1743154882&width=600',
      username: 'KOMAL_T',
      time: '12h',
      text: 'The vanilla fragrance smells so yummy! Been using this for years, and I just can\'t get enough of it 🥰',
      likes: 121
    },
    {
      id: 2,
      image: 'https://www.avon.co.in/cdn/shop/files/LBD_d2b127b6-8361-46b9-94a9-455a917051d2.jpg?v=1743154882&width=600',
      username: 'ANJALI_JAIN09',
      time: '12h',
      text: 'I have been a fan of this perfume since day one! I ordered it casually and now I can\'t use any other perfume. This is my absolute favorite! ❤️',
      likes: 121
    },
    {
      id: 3,
      image: 'https://www.avon.co.in/cdn/shop/files/Vit_C.jpg?v=1743154882&width=600',
      username: 'ADITI_S',
      time: '8h',
      text: 'Since I have started using this Vit-C serum my skin feels completely different. It has given me a radiant look and healthy! 🌿',
      likes: 70
    }
  ];

  const picksForYou = [
    {
      id: 1,
      image: '/picks/1.png',
      title: 'AND AJMAL',
    },
    {
      id: 2,
      image: '/picks/2.png',
      title: 'Skinn',
    },
    {
      id: 3,
      image: '/picks/3.png',
      title: 'The Man Company',
    },
    {
      id: 4,
      image: '/picks/4.png',
      title: 'Vokka Arabian & Desert',
    }
  ];

  const categories = [
    { id: 'perfume', name: 'PERFUME' },
    { id: 'deodorant', name: 'DEODORANT' },
    { id: 'attar', name: 'ATTAR' },
  ];

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroCarousel />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest Fragrances</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#F5E6D3] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Picks for You</h2>
            <p className="text-gray-700 max-w-2xl leading-relaxed">
              Discover a wide range of refreshing fragrances, each crafted to lift your mood and define your style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {picksForYou.map((pick) => (
              <div 
                key={pick.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/category/${pick.title.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="p-6 flex items-center justify-center h-[350px] relative overflow-hidden">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                  />
                </div>
                <div className="bg-white py-4 text-center">
                  <h3 className="font-bold text-lg">{pick.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 4).map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={testimonial.image}
                alt={`Testimonial by ${testimonial.username}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-900">Our Brand Partners</h2>
        </div>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scroll-left">
            {brandLogos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="inline-flex items-center justify-center flex-shrink-0 mx-12 md:mx-16"
              >
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="h-16 md:h-20 w-auto object-contain grayscale transition-all duration-300 pointer-events-none"
                />
              </div>
            ))}

            {brandLogos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="inline-flex items-center justify-center flex-shrink-0 mx-12 md:mx-16"
              >
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="h-16 md:h-20 w-auto object-contain grayscale transition-all duration-300 pointer-events-none"
                />
              </div>
            ))}

            {brandLogos.map((logo, index) => (
              <div
                key={`logo-3-${index}`}
                className="inline-flex items-center justify-center flex-shrink-0 mx-12 md:mx-16"
              >
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="h-16 md:h-20 w-auto object-contain grayscale transition-all duration-300 pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
