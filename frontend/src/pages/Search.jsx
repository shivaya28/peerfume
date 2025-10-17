import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { getAllProducts, searchProducts } from '../data/productsData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const fetchAllProducts = async () => {
    setInitialLoading(true);
    try {
      const { data } = await productAPI.getAll();
      setAllProducts(data);
    } catch (error) {
      setAllProducts(getAllProducts());
    }
    setInitialLoading(false);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const { data } = await productAPI.search(query);
      setSearchResults(data);
    } catch (error) {
      const filtered = searchProducts(query);
      setSearchResults(filtered);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setSearchParams({});
  };

  // Initial loading state - Simple black spinner
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, categories..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button 
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Searching products...</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && hasSearched && (
          <>
            {searchResults.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </h2>
                  <button
                    onClick={handleClearSearch}
                    className="text-primary hover:text-secondary transition text-sm"
                  >
                    Clear Search
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id || product._id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <button
                  onClick={handleClearSearch}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial State - Show all products */}
        {!loading && !hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches Suggestions */}
        {!hasSearched && (
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Perfume', 'Attar', 'Deodorant', 'Faun', 'Denver', 'Mamaearth'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setSearchParams({ q: term });
                    performSearch(term);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
