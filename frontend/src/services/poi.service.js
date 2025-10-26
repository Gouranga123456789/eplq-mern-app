import api from './api';

const upload = async (name, latitude, longitude) => {
  const { data } = await api.post('/pois/upload', {
    name,
    latitude,
    longitude,
  });
  return data;
};

const search = async (latitude, longitude, radius) => {
  const { data } = await api.post('/pois/search', {
    latitude,
    longitude,
    radius,
  });
  return data;
};

const poiService = {
  upload,
  search,
};

export default poiService;