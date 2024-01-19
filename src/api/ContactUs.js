import { apiInstance } from "./apiMiddleware";

export const getAllContact = (limit, pageNumber, searchTxt) => {
  let params = {};
  if (limit) params.limit = limit;
  if (pageNumber) params.page = pageNumber;
  if (searchTxt) params.search = searchTxt;

  const api = apiInstance();
  return api.get("api/contact-us/get-all", { params });
};

export const contactUsPost = (data) => {
  const api = apiInstance();
  return api.post("api/contact-us/post", data);
};
export const deleteContact = (data) => {
  const api = apiInstance();
  return api.post("api/contact-us/delete", data);
};
