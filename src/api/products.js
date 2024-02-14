import { apiInstance } from './apiMiddleware';

export const getAllProducts = (page) => {
  // let params = {};
  // if (page) params.page = page;
  const api = apiInstance();
  return api.get('api/product/get-all');
};

export const postProduct = (data) => {
  console.log('-=--------------=-=-=-=-=-=-');
  console.log(data);
  console.log('-=--------------=-=-=-=-=-=-');
  // const api = apiInstance();
  // return api.post('api/question/post', data);
};

export const deleteProduct = (data) => {
  const api = apiInstance();
  return api.post('api/product/delete', data);
};
