import axios from 'axios';

export const fetchImage = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const KEY = '32829243-8ce4d52288749b879b0aaea3c';
  const OPTOINS = `q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${BASE_URL}/?${OPTOINS}`);
  return response.data;
};
