import { apiFormDataInstance, apiInstance } from './apiMiddleware';

export const getSliderImages = () => {
  const api = apiInstance();
  return api.get('api/slider-image/get-all?page=1&limit=10');
};

export const postImages = (image) => {
  const formData = new FormData();
  formData.append('image', image);
  const api = apiFormDataInstance();
  return api.post('api/slider-image/post', formData);
};

export const deleteImage = (data) => {
  const api = apiInstance();
  return api.post('/api/slider-image/delete', data);
};
