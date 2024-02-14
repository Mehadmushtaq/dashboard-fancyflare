import { apiInstance } from './apiMiddleware';

export const getWhyChooseUsCards = () => {
  const api = apiInstance();
  return api.get('api/subscribers/get-all?page=1&limit=10');
};

export const postWhyChooseUsCards = (data) => {
  const api = apiInstance();
  return api.post('api/user/post', data);
};

export const deleteWhyChooseUsCards = (data) => {
  const api = apiInstance();
  return api.post('/api/subscribers/delete', data);
};
