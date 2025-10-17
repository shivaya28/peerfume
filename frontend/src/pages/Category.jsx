import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, getProductById } from '../data/productsData'; // IMPORT


const Category = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchCategoryProducts();
  }, [slug]);


  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getByCategory(slug);
      setProducts(data);
    } catch (error) {
      // Special category pages (from Picks for You) show products 11, 12, 13
      const specialCategories = ['and-ajmal', 'skinn', 'the-man-company', 'vokka-arabian-&-desert'];
      
      if (specialCategories.includes(slug.toLowerCase())) {
        // Show special attar collection products
        const specialProducts = [
          getProductById(11), // Gold Series
          getProductById(12), // Oud of Dubai
          getProductById(13), // Royal Essence
        ].filter(Boolean);
        setProducts(specialProducts);
      } else {
        // Normal category filtering
        const categoryProducts = getProductsByCategory(slug);
        setProducts(categoryProducts);
      }
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-secondary mb-6 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>


        <h1 className="text-3xl font-bold mb-8 capitalize">{slug.replace(/-/g, ' ')}</h1>


        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-6">There are no products in this category yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Category;
