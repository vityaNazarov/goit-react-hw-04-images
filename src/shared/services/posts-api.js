import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',

  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    key: '32092680-3b49782323b5bf3e8b9e41587',
  },
});

export const fetchData = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
      per_page: 12,
    },
  });
  return data;
};
