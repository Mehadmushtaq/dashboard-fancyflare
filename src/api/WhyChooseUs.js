import { apiInstance } from "./ApiMiddleware";

export const getWhyChooseUsCards = () => {
  const api = apiInstance();
  return api.get("api/speciality/get-all");
};
