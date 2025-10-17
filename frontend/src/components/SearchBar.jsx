import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const LOCAL_PRODUCTS = [
  { id: 1, name: 'Blue Blood', price: 2999, image: '/product/p1.png' },
  { id: 2, name: 'Red Oxygen', price: 1499, image: '/product/p2.png' },
  { id: 3, name: 'Miss Pink', price: 3499, image: '/product/p3.png' },
  { id: 4, name: 'Professional Running Shoes', price: 2499, image: '/product/p4.png' },
];

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const { data } = await productAPI.search(query);
      setSuggestions(data.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      // console.error('Failed to fetch suggestions:', error);
      // Local search fallback
      const lowercaseQuery = query.toLowerCase();
      const filtered = LOCAL_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery)
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${product.id || product._id}`);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />

          {loading && (
            <div className="absolute right-12">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            </div>
          )}

          {searchQuery && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-12 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            className="absolute right-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {suggestions.map((product, index) => (
            <div
              key={product.id || product._id}
              onClick={() => handleSuggestionClick(product)}
              className={`flex items-center gap-4 p-3 cursor-pointer transition ${
                index === selectedIndex
                  ? 'bg-blue-50 border-l-4 border-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
                
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600">₹{product.price}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}

          <div
            onClick={handleSearch}
            className="border-t border-gray-200 p-3 text-center text-sm text-primary hover:bg-gray-50 cursor-pointer font-medium"
          >
            View all results for "{searchQuery}"
          </div>
        </div>
      )}

      {showSuggestions && !loading && searchQuery && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No products found for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
