import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search';
//Request to API
const apiKey = import.meta.env.VITE_API_KEY;
export const fetchImages = async (imgName, page) => {
  const response = await axios.get(
    `/photos?page=${page}&per_page=10&client_id=${apiKey}&query=${imgName}`
  );
  return response.data.results;
};
