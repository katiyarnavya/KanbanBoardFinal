import axios from 'axios';

const API_BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchData = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
