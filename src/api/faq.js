import { apiInstance } from "./apiMiddleware";

export const getAllFaqs = (page) => {
  let params = {};
  if (page) params.page = page;
  const api = apiInstance();
  return api.get("api/question/get-all", { params });
};

export const postFaq = (data) => {
  const api = apiInstance();
  return api.post("api/question/post", data);
};

export const deleteFaq = (data) => {
  const api = apiInstance();
  return api.post("api/question/delete", data);
};
