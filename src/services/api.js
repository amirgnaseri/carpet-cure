import axios from 'axios';

// API base URL - change this based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get user' };
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/me', userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

// ==================== ORDER APIs ====================

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create order' };
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get orders' };
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get order' };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to cancel order' };
  }
};

// ==================== CARPET APIs ====================

export const addCarpet = async (carpetData) => {
  try {
    const response = await api.post('/carpets', carpetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add carpet' };
  }
};

export const getCarpets = async () => {
  try {
    const response = await api.get('/carpets');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get carpets' };
  }
};

export const updateCarpet = async (carpetId, carpetData) => {
  try {
    const response = await api.put(`/carpets/${carpetId}`, carpetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update carpet' };
  }
};

export const deleteCarpet = async (carpetId) => {
  try {
    const response = await api.delete(`/carpets/${carpetId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete carpet' };
  }
};

// ==================== ADMIN APIs ====================

export const getAllOrders = async () => {
  try {
    const response = await api.get('/admin/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get all orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/admin/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order status' };
  }
};

export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get stats' };
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await api.get('/admin/customers');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get customers' };
  }
};

// ==================== HELPER FUNCTIONS ====================

export const getToken = () => localStorage.getItem('token');

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const user = getStoredUser();
  return user?.role === 'admin';
};

// Default export
export default api;
