import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchUsers = () => api.get('/users');
export const fetchUser = (userId) => api.get(`/user/${userId}`);

export const fetchEvents = () => api.get('/events');
export const fetchEvent = (eventId) => {
  return fetch(`${BASE_URL}/events/${eventId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};

export const fetchPricing = () => api.get('/pricing_list');

export const fetchAuthorizations = () => api.get('/authorizations');

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

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