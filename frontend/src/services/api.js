// Complete api.js file - Replace everything
import axios from 'axios';

// Backend API base URL - CHANGE THIS to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - COMPLETELY SILENT
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // SILENT error handling - NO console logs
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      // Backend not running - silently reject with flag
      return Promise.reject({ 
        message: 'Backend not available', 
        useLocalData: true,
        silent: true 
      });
    }
    return Promise.reject(error);
  }
);

// API endpoints ready for backend
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get(`/products/search?q=${query}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
};

export const orderAPI = {
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateCart: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
};

export default api;
