import { apiInstance } from "./apiMiddleware";

export const getPopertyPrices = () => {
  const api = apiInstance();
  return api.get("api/property-detail/get-all");
};
