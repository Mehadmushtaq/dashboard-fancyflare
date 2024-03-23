import { apiFormDataInstance, apiInstance } from './apiMiddleware';

export const getAllProducts = (limit, page, searchTxt) => {
  let params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (searchTxt) params.search = searchTxt;

  const api = apiInstance();
  return api.get('api/product/get-all', { params });
};

export const postProduct = (data) => {
  // console.log(data);
  // return;

  if (data.after_discount_price > 0) {
    data.is_discount = 1;
  } else data.is_discount = 0;

  data.is_main_product = Number(data.is_main_product);
  data.after_discount_price = Number(data.after_discount_price);
  data.price = Number(data.price);
  data.available_stock = Number(data.available_stock);
  data.category_id = Number(data.category_id);

  const formData = new FormData();
  formData.append('id', data?.id);
  formData.append('name', data?.name);
  formData.append('price', data?.price);
  formData.append('is_discount', data?.is_discount);
  formData.append('after_discount_price', data?.after_discount_price);
  formData.append('is_stiched', data?.is_stiched);
  formData.append('available_stock', data?.available_stock);
  formData.append('is_main_product', data?.is_main_product);
  formData.append('size', data?.size);

  let count=0;
  if (data?.selectedImages.every((element) => element === null)) {
    formData.append('images', '{}');
  } else {
    data?.selectedImages.forEach((image, index) => {
      if (image !== null) {
        formData.append(`image[${count}][image]`, image);
        formData.append(`image[${count}][is_main]`, index === 0 ? 1 : 0);
        count++;
      } 
    });
  }

  data?.changedImageIds.forEach((id, index) => {
    formData.append(`delete_image[${index}]`, id);
  });
  formData.append('category_id', data?.category_id);

  if (data?.productColors && data?.productColors.length > 0) {
    data.productColors.forEach((color, index) => {
      const { color: colorName, sizes } = color;
      formData.append(`product_color[${index}][color]`, colorName);

      Object.entries(sizes).forEach(([size, value]) => {
        formData.append(`product_color[${index}][${size}]`, value);
      });
    });
  } else {
    formData.append('product_color', '{}');
  }

  const api = apiFormDataInstance();
  return api.post('api/product/post', formData);
};

export const deleteProduct = (data) => {
  const api = apiInstance();
  return api.post('api/product/delete', data);
};
