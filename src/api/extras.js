import { apiInstance } from "./apiMiddleware";

export const getAllExtraPrices = (page) => {
  const api = apiInstance();
  return api.get("api/extras-detail/get-all");
};
