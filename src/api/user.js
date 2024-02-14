import { apiInstance } from './apiMiddleware';

export const login = (data) => {
  const api = apiInstance();
  return api.post('api/user/login', data);
};
export const generateCode = (data) => {
  const api = apiInstance();
  return api.post('api/user/generate-code', data);
};
export const verifyCode = (data) => {
  const api = apiInstance();
  return api.post('api/user/verify-code', data);
};
export const resetPassword = (data) => {
  const api = apiInstance();
  return api.post('api/user/reset-password', data);
};
