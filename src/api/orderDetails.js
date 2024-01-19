import { apiInstance } from "./ApiMiddleware";

export const postOrder = (data) => {
  const api = apiInstance();
  return api.post("api/order-detail/post", data);
};
