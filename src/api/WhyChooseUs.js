import { apiInstance } from "./apiMiddleware";

export const getWhyChooseUsCards = () => {
  const api = apiInstance();
  return api.get("api/speciality/get-all");
};

export const postWhyChooseUsCards = (data) => {
  const api = apiInstance();
  return api.post("api/speciality/post", data);
};

export const deleteWhyChooseUsCards = (data) => {
  const api = apiInstance();
  return api.post("api/speciality/delete", data);
};
