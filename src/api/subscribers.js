import { apiInstance } from './apiMiddleware';

export const getEmailSubscribers = () => {
  const api = apiInstance();
  return api.get('api/subscribers/get-all?page=1&limit=10');
};

export const deleteEmailSubscriber = (data) => {
  const api = apiInstance();
  return api.post('/api/subscribers/delete', data);
};

export const getPhoneSubscribers = () => {
  const api = apiInstance();
  return api.get('api/subscribers-phone/get-all?page=1&limit=10');
};

export const deletePhoneSubscriber = (data) => {
  const api = apiInstance();
  return api.post('/api/subscribers-phone/delete', data);
};
