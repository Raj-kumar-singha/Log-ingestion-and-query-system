import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchLogs = async (filters) => {
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params[key] = value;
  });
  const res = await axios.get(`${API_URL}/logs`, { params });
  return res.data;
};

export const postLog = async (log) => {
  const res = await axios.post(`${API_URL}/logs`, log);
  return res.data;
}; 