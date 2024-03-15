import { apiInstance } from './apiMiddleware';

export const getAllContact = (limit, pageNumber, searchTxt) => {
  let params = {};
  if (limit) params.limit = limit;
  if (pageNumber) params.page = pageNumber;
  if (searchTxt) params.search = searchTxt;

  const api = apiInstance();
  return api.get('api/user/get-all',{params});
};

export const postContact = (data) => {
  const api = apiInstance();
  return api.post('api/user/post', data);
};
export const deleteContact = (data) => {
  const api = apiInstance();
  return api.post('api/user/delete', data);
};
