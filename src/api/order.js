import { apiInstance } from './apiMiddleware';

export const getAllOrders = (limit, page, search) => {
  let params = {};
  if (page) params.page = page;
  if(limit) params.limit = limit;
  if (search) params.search = search;
  const api = apiInstance();
  return api.get('api/checkout/get-all',{params});
};

export const postOrder = (data) => {
  const api = apiInstance();
  return api.post('api/order-detail/post', data);
};

export const deleteOrder = (data) => {
  const api = apiInstance();
  return api.post('api/checkout/delete', data);
};
