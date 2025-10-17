import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart function - works without backend
  const addToCart = async (productId, quantity = 1, productDetails = null) => {
    try {
      const existingItem = cart.find(item => item.productId === productId);
      
      if (existingItem) {
        setCart(cart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      } else {
        setCart([...cart, { 
          productId, 
          quantity,
          productDetails 
        }]);
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to add to cart' };
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.productId === productId 
        ? { ...item, quantity }
        : item
    ));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = {
    products,
    setProducts,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    loading,
    setLoading,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
