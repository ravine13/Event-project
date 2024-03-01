import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchUsers = () => api.get('/users');
export const fetchUser = (userId) => api.get(`/user/${userId}`);

// export const fetchProfiles = () => api.get('/profile');
export const fetchProfile = (profileId) => api.get(`/profile${profileId}`);

export const fetchEvents = () => api.get('/events');

export const fetchEvent = (eventId) => {
  return api.get(`${BASE_URL}/events/${eventId}`)
    .then(response => {
      if (!response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    })
    .catch(error => {
      throw error.response.data;
    });
};

export const fetchPricing = () => api.get('/pricing_list');
export const fetchBookings = () => api.get('/bookings');

export const fetchAuthorizations = () => api.get('/authorizations');

export const fetchBilling = () => api.get('/billing_info');

export const fetchBillingDetails = () => api.get('/billing_details');

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addEvent = async (eventData) => {
  try {
    const response = await api.post('/new_event', eventData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const data = response.data;
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      return data;
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
};

// const isTokenExpired = (token) => {
//   const expiry = token.exp * 1000;
//   return Date.now() >= expiry;
// };

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllEvents = async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export default api;