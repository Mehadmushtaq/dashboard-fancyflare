import { apiInstance } from './apiMiddleware';

export const getEmailSubscribers = (limit, page, search) => {
  let params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (search) params.search = search;

  const api = apiInstance();
  return api.get('api/subscribers/get-all', { params });
};

export const deleteEmailSubscriber = (data) => {
  const api = apiInstance();
  return api.post('/api/subscribers/delete', data);
};

export const getPhoneSubscribers = (limit, page, search) => {
  let params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (search) params.search = search;

  const api = apiInstance();
  return api.get('api/subscribers-phone/get-all', { params });
};

export const deletePhoneSubscriber = (data) => {
  const api = apiInstance();
  return api.post('/api/subscribers-phone/delete', data);
};
