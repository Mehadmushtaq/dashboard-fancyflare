import { apiFormDataInstance, apiInstance } from './apiMiddleware';

export const getAllProducts = (limit, page,searchTxt) => {
  let params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (searchTxt) params.search = searchTxt;
  
  const api = apiInstance();
  return api.get('api/product/get-all', {params});
};

export const postProduct = (data) => {
  if (data.after_discount_price > 0) {
    data.is_discount = 1;
  } else data.is_discount = 0;
  
  if(data.isMainProduct){
    data.isMainProduct = 1;
  }
  else data.isMainProduct = 0;

  const formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('price', data.price);
  formData.append('is_discount', data.is_discount);
  formData.append('after_discount_price', data.after_discount_price);
  formData.append('is_stiched', data.is_stiched);
  formData.append('available_stock', data.available_stock);
  formData.append('is_main_product', data.isMainProduct);
  formData.append('size', data.size);
  formData.append('image[0][image]', data.images.mainSelected);
  formData.append('image[1][image]', data.images.img2Selected);
  formData.append('image[2][image]', data.images.img3Selected);
  formData.append('category_id', data.category_id);
  formData.append('image[0][is_main]', 1);
  formData.append('image[1][is_main]', 0);
  formData.append('image[2][is_main]', 0);
  formData.append(
    'product_color[0][small_size_quantity]',
    data.productColor1.small_size_quantity
  );
  formData.append(
    'product_color[0][small_size_price]',
    data.productColor1.small_size_price
  );
  formData.append(
    'product_color[0][medium_size_quantity]',
    data.productColor1.medium_size_quantity
  );
  formData.append(
    'product_color[0][medium_size_price]',
    data.productColor1.medium_size_price
  );
  formData.append(
    'product_color[0][large_size_quantity]',
    data.productColor1.large_size_quantity
  );
  formData.append(
    'product_color[0][large_size_price]',
    data.productColor1.large_size_price
  );
  formData.append(
    'product_color[0][extra_large_size_quantity]',
    data.productColor1.extra_large_size_quantity
  );
  formData.append(
    'product_color[0][extra_large_size_price]',
    data.productColor1.extra_large_size_price
  );
  formData.append('product_color[0][color]', data.productColor1.color);

  formData.append(
    'product_color[1][small_size_quantity]',
    data.productColor2.small_size_quantity
  );
  formData.append(
    'product_color[1][small_size_price]',
    data.productColor2.small_size_price
  );
  formData.append(
    'product_color[1][medium_size_quantity]',
    data.productColor2.medium_size_quantity
  );
  formData.append(
    'product_color[1][medium_size_price]',
    data.productColor2.medium_size_price
  );
  formData.append(
    'product_color[1][large_size_quantity]',
    data.productColor2.large_size_quantity
  );
  formData.append(
    'product_color[1][large_size_price]',
    data.productColor2.large_size_price
  );
  formData.append(
    'product_color[1][extra_large_size_quantity]',
    data.productColor2.extra_large_size_quantity
  );
  formData.append(
    'product_color[1][extra_large_size_price]',
    data.productColor2.extra_large_size_price
  );
  formData.append('product_color[1][color]', data.productColor2.color);

  const api = apiFormDataInstance();
  return api.post('api/product/post', formData);
};

export const deleteProduct = (data) => {
  const api = apiInstance();
  return api.post('api/product/delete', data);
};
