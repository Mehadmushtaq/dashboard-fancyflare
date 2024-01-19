import { apiInstance } from "./apiMiddleware";

export const getServiceCards = (is_main) => {
  let params = {};
  if (is_main == 0 || is_main) params.is_main = is_main;
  const api = apiInstance();
  return api.get("api/service/get-all", { params });
};
