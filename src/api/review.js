import { apiFormDataInstance, apiInstance } from "./apiMiddleware";

export const getAllReviews = (limit, pageNumber, searchTxt) => {
  let params = {};
  if (limit) params.limit = limit;
  if (pageNumber) params.page = pageNumber;
  if (searchTxt) params.search = searchTxt;

  const api = apiInstance();
  return api.get("api/review/get-all", { params });
};

export const postReview = (data) => {
  const api = apiFormDataInstance();
  return api.post("api/review/post", data);
};
export const deleteReview = (data) => {
  const api = apiInstance();
  return api.post("api/review/delete", data);
};
