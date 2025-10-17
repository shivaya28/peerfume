import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Use logo2.png for desktop (wide), logo1.png for mobile */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo1.png" 
              alt="Logo" 
              className="hidden md:block h-10 object-contain"
            />
            <img 
              src="/logo1.png" 
              alt="Logo" 
              className="md:hidden h-10 w-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition ${
                isActive('/') && location.pathname === '/'
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`transition ${
                isActive('/search')
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Search
            </Link>
            <Link 
              to="/orders" 
              className={`transition ${
                isActive('/orders')
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              My Orders
            </Link>
            <Link 
              to="/account" 
              className={`transition ${
                isActive('/account')
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              My Account
            </Link>
          </div>

          {/* Cart & User Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <svg 
                className={`w-6 h-6 transition ${
                  isActive('/cart')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around py-3 border-t">
          <Link 
            to="/" 
            className={`text-sm transition ${
              isActive('/') && location.pathname === '/'
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className={`text-sm transition ${
              isActive('/search')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Search
          </Link>
          <Link 
            to="/cart" 
            className={`text-sm transition relative ${
              isActive('/cart')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
          <Link 
            to="/orders" 
            className={`text-sm transition ${
              isActive('/orders')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Orders
          </Link>
          <Link 
            to="/account" 
            className={`text-sm transition ${
              isActive('/account')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
