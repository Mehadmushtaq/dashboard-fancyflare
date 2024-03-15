import { apiInstance } from './apiMiddleware';

export const getSliderImages = () => {
  const api = apiInstance();
  return api.get('api/slider-image/get-all?page=1&limit=10');
};

export const postCategory = (data) => {
  const api = apiInstance();
  return api.post('api/category/post', data);
};

export const deleteCategory = (data) => {
  const api = apiInstance();
  return api.post('/api/category/delete', data);
};

export const getAllCategories = (limit, page, search) => {
  let params = {};
  if (page) params.page = page;
  if(limit) params.limit = limit;
  if (search) params.search = search;

  const api = apiInstance();
  return api.get('api/category/get-all',{params});
};
