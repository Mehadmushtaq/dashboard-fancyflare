import React, { useState, useEffect } from 'react';
import './products.css';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import 'animate.css';
import Header from '../../components/header/Header';
import { InventoryIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';
import { postProduct } from '../../api/products';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { getAllCategories } from '../../api/categories';

export default function ProductAddEdit({ isEdit, isView }) {
  const icon = () => {
    return <InventoryIcon width='26' height='30' fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  const [categories, setCategories] = useState([]);

  //validation
  const [isLoading, setIsLoading] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [stockErr, setStockErr] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [displayVariants, setDisplayVariants] = useState(false);
  const [showSize, setShowSize] = useState(true);

  const [newData, setNewData] = useState({
    id: prevData ? prevData.product?.id : 0,
    name: prevData ? prevData.product?.name : '',
    price: prevData ? prevData.product?.price : 0,
    after_discount_price: prevData ? prevData.product?.after_discount_price : 0,
    size: prevData ? prevData.product?.size : '',
    is_stiched: prevData ? prevData.product?.is_stiched : '',
    category_id: prevData ? prevData.product?.category_id : '',
    available_stock: prevData ? prevData?.product?.available_stock : 0,
    is_main_product: prevData ? !!prevData?.product?.is_main_product : false, //convert to boolean !!1 = True and !!0 = False
  });

  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [prevImageUrls, setPrevImageUrls] = useState([]);
  const [changedImageIds, setChangedImageIds] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [productColors, setProductColors] = useState([]);

  const handlenewChange = (index, e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    if (name === 'color') {
      setProductColors((prevColors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = {
          ...updatedColors[index],
          color: value,
        };
        return updatedColors;
      });
    } else {
      setProductColors((prevColors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = {
          ...updatedColors[index],
          sizes: {
            ...updatedColors[index].sizes,
            [name]: value,
          },
        };
        return updatedColors;
      });
    }
  };

  const addColor = () => {
    setProductColors([
      ...productColors,
      {
        color: '',
        sizes: sizes.reduce((acc, size) => {
          acc[`${size.name}_size_quantity`] = 0;
          acc[`${size.name}_size_price`] = 0;
          return acc;
        }, {}),
      },
    ]);
  };

  const removeColor = (index) => {
    const updatedColors = [...productColors];
    updatedColors.splice(index, 1);
    setProductColors(updatedColors);
  };

  const sizes = [
    { name: 'small', label: 'S' },
    { name: 'medium', label: 'M' },
    { name: 'large', label: 'L' },
    { name: 'extra_large', label: 'XL' },
  ];

  useEffect(() => {
    if (prevData && prevData?.product?.is_stiched == 1) {
      setShowSize(false);
      setDisplayVariants(true);
    }
  }, []);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.data.error_code === ErrorCode.success) {
        setCategories(res.data.result);
      }
    });
  }, []);

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleChange = (e) => {
    setErr(false);

    const { name, value } = e.target;
    if (name === 'is_stiched') {
      const isStichedValue = parseInt(value);
      const newSize = isStichedValue === 1 ? 'wide-range' : '';
      setNewData((prevData) => ({
        ...prevData,
        [name]: isStichedValue,
        size: newSize,
      }));

      if (isStichedValue == 1) {
        setShowSize(false);
        setDisplayVariants(true);
      } else {
        setDisplayVariants(false);
        setShowSize(true);
      }
    } else {
      setNewData({ ...newData, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    setNewData({ ...newData, is_main_product: !newData.is_main_product });
  };

  const selectImage = (index) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => handleImageChange(e, index);
    fileInput.click();
  };

  const handleImageChange = (e, index) => {
    setErr(false);

    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = file;
      setSelectedImages(updatedImages);

      if (prevImageUrls[index] && prevImageUrls[index].id) {
        setChangedImageIds((prevIds) => [...prevIds, prevImageUrls[index].id]);
      }
    }
  };

  const saveOnclick = () => {
    // console.log('saveonClick');
    if (!newData.name) setNameErr(true);
    else if (!newData.price) setPriceErr(true);
    else if (newData?.product?.is_stiched ===0 && !newData.available_stock) setStockErr(true);
    
    else if (!newData.category_id) {
      setErr(true);
      setErrMsg('MUst Select category');
    } 
    // else if (!selectedImages[0] && !prevImageUrls[0]) {
    //   setErr(true);
    //   setErrMsg('First Image is mendatory');
    // }
    
    else {
      setErr(false);
      setIsLoading(true);
      postProduct({
        ...newData,
        changedImageIds,
        selectedImages,
        productColors,
      })
        .then(({ data }) => {
          setIsLoading(false);
          if (
            data.error_code === ErrorCode.success ||
            data.error_code === ErrorCode.updated
          ) {
            navigate('/dashboard/products', {
              state: { page: page },
            });
          } else if (data.error_code === ErrorCode.failed) {
            setErr(true);
            setErrMsg(ErrorMessages.failed);
          } else {
            setErr(true);
            setErrMsg('Oops some error occured. EC:' + data.error_code);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setErr(true);
          setErrMsg(ErrorMessages.network_error);
        });
    }
  };

  const handleEdit = () => {
    navigate('/dashboard/product/edit', {
      state: { editData: prevData },
    });
  };

  const handleDeleteImage = (index) => {
    if (prevImageUrls[index] && prevImageUrls[index].id) {
      console.log('image exist');
      setChangedImageIds((prevIds) => [...prevIds, prevImageUrls[index].id]);
    }
    const updatedImages = [...selectedImages];
    updatedImages[index] = null;
    setSelectedImages(updatedImages);

    const updatedUrls = [...prevImageUrls];
    updatedUrls[index] = null;
    setPrevImageUrls(updatedUrls);
  };

  // console.log('changedImageIds', changedImageIds);
  // console.log('selectedImages', selectedImages);
  // console.log('prevImageUrls', prevImageUrls);

  useEffect(() => {
    if (prevData && prevData.product_color && prevData.product.is_stiched === 1) {
      setProductColors(
        prevData.product_color.map((color) => ({
          color: color.color,
          sizes: {
            small_size_quantity: color.small_size_quantity || 0,
            small_size_price: color.small_size_price || 0,
            medium_size_quantity: color.medium_size_quantity || 0,
            medium_size_price: color.medium_size_price || 0,
            large_size_quantity: color.large_size_quantity || 0,
            large_size_price: color.large_size_price || 0,
            extra_large_size_quantity: color.extra_large_size_quantity || 0,
            extra_large_size_price: color.extra_large_size_price || 0,
          },
        }))
      );
    }
  }, [prevData]);

useEffect(() => {
  if (prevData && prevData.image_product) {
    
    const images = prevData.image_product.map((image) => ({
      id: image?.id,
      imageUrl: image?.image_url,
      isMain: image?.is_main
    }));
    
    //find index of main image
    var mainImage = images.find(image => image.isMain === 1);
    mainImage = mainImage ? mainImage : null;
    const remainingImages = images.filter(image => image.id !== mainImage?.id);
    const newArray = [mainImage, ...remainingImages];
    setPrevImageUrls(newArray);
  }
}, [prevData]);

  
  // console.log("prevImages", prevImageUrls);
  
  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Product'} />
        </div>
        <div className='productDashPanel' style={{ position: 'relative' }}>
          <>
            <div className=''>
              {err ? (
                <div
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    position: 'absolute',
                    top: '7px',
                    fontSize: '0.95rem',
                    width: '90%',
                  }}
                >
                  <p>{errMsg}</p>
                </div>
              ) : null}

              {/* topbar */}
              <div className='product-topbar'>
                {isEdit ? (
                  <h3>Update Product</h3>
                ) : isView ? (
                  <h3>Product Details</h3>
                ) : (
                  <h3>Add New Product</h3>
                )}

                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <button
                    className='editPage_btn'
                    style={{ color: PRIMARY }}
                    onClick={() => navigate('/dashboard/products')}
                  >
                    {isView ? 'Back' : 'Cancel'}
                  </button>
                  <button
                    className='editPage_btn'
                    style={{
                      backgroundColor: PRIMARY,
                      color: 'white',
                      marginLeft: '0.5rem',
                    }}
                    onClick={saveOnclick}
                    hidden={isView}
                    // disabled={isLoading}
                  >
                    {isLoading
                      ? 'Saving...'
                      : isEdit
                      ? 'Update'
                      : 'Add Product'}
                  </button>
                  {isView && (
                    <div className='ev-btnAdd ev-btn'>
                      <button
                        className='editPage_btn'
                        style={{
                          backgroundColor: PRIMARY,
                          color: 'white',
                          marginLeft: '0.5rem',
                        }}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* main area */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {/* left side */}
                <div
                  style={{
                    width: '60%',
                  }}
                >
                  <div className='product-leftpanel'>
                    <h3>General Information</h3>
                    <div className='ae-formFields'>
                      <div className='ae-inputField'>
                        <InputField
                          name={'name'}
                          isErr={nameErr}
                          errorMsg={'Please fill in the field'}
                          value={newData?.name}
                          onChange={(e) => {
                            setNameErr(false);
                            handleChange(e);
                          }}
                          placeholder={'Product Name'}
                          radius='7px'
                          width='38vw'
                          disable={isView}
                        />
                      </div>
                    </div>
                    <div className='ae-formFields'>
                      
                      <div className='ae-selectField'>
                        <p className='if-txt'>Type</p>
                        <select
                          name={'is_stiched'}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          disabled={isView}
                          className='type-select'
                          value={newData?.is_stiched}
                        >
                          <option value='' disabled>
                            select Type
                          </option>

                          <option value={1}>Stitched</option>
                          <option value={0}>Un-Stitched</option>
                        </select>
                      </div>
                      <div className='ae-selectField'>
                        <p className='if-txt'>Size</p>
                        <select
                          name={'size'}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          disabled={isView || !showSize}
                          className='type-select'
                          value={newData?.size}
                        >
                          <option value='' disabled>
                            select Size
                          </option>

                          <option value='wide-range'>Wide range sized</option>
                          <option value='2-piece'>2-piece</option>
                          <option value='3-piece'>3-piece</option>
                        </select>
                      </div>
                    </div>

                    {/* <h3>Pricing</h3> */}
                    <div className='ae-formFields'>
                      <div className='ae-inputField'>
                        <InputField
                          type='number'
                          name={'price'}
                          isErr={priceErr}
                          errorMsg={'Please fill in the field'}
                          value={newData?.price}
                          onChange={(e) => {
                            setPriceErr(false);
                            handleChange(e);
                          }}
                          placeholder={'Base Price'}
                          radius='7px'
                          width='12vw'
                          disable={isView}
                        />
                      </div>
                      <div className='ae-inputField'>
                        <InputField
                          type='number'
                          name={'after_discount_price'}
                          value={newData?.after_discount_price}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder={'Discout Percentage(%)'}
                          radius='7px'
                          width='12vw'
                          disable={isView}
                        />
                      </div>
                      <div className='ae-inputField'>
                        <InputField
                          type='number'
                          name={'available_stock'}
                          value={newData?.available_stock}
                          isErr={stockErr}
                          errorMsg={'Please fill in the field'}
                          onChange={(e) => {
                            setStockErr(false);
                            handleChange(e);
                          }}
                          placeholder={'Available Stock'}
                          radius='7px'
                          width='12vw'
                          disable={isView}
                        />
                      </div>

                      <div
                        style={{
                          padding: '1rem 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <input
                          type='checkbox'
                          checked={newData?.is_main_product}
                          onChange={handleCheckboxChange}
                          disabled={isView}
                        />
                        <p
                          style={{
                            padding: '1rem 0.5rem',
                          }}
                        >
                          Make this product main product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right side */}
                <div
                  style={{
                    width: '38%',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#f6f6f6',
                      padding: '1.5rem 2rem 1rem 1.5rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3>Product Images</h3>
                    <p>Click to Choose or Change Image/s</p>

                    <div style={{ display: 'flex' }}>
                      {selectedImages.map((image, index) => (     //array of 3 images
                        <div
                          key={index}
                          style={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            border: '2px dotted #ccc',
                            margin: '10px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: isView ? 'default' : 'pointer',
                          }}
                          onClick={
                            !isView ? () => selectImage(index) : undefined
                          }
                        >
                          {image  || (prevImageUrls[index] && prevImageUrls[index].imageUrl !== null) ? (
                            <>
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '5px',
                                }}
                                src={
                                  image instanceof File
                                    ? URL.createObjectURL(image)
                                    : `${BASE_URL}${prevImageUrls[index]?.imageUrl}`
                                }
                                alt='no_img'
                              />
                              {/* Delete Icon/Button/Text */}
                              {!isView && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent onClick on parent div
                                    handleDeleteImage(index); // Call delete image function
                                  }}
                                >
                                  X
                                </div>
                              )}
                              {/* Caption Overlay */}
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  width: '100%',
                                  background: 'rgba(0, 0, 0, 0.5)',
                                  color: '#fff',
                                  padding: '5px',
                                  borderRadius: '0 0 5px 5px',
                                }}
                              >
                                {index === 0 ? 'Main Image' :  `Image ${index + 1}`}
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#f6f6f6',
                      padding: '1.5rem 2rem 1rem 1.5rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3>Category</h3>
                    <div className='ae-selectField'>
                      <p className='if-txt'>Category</p>
                      <select
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        disabled={isView}
                        className='custom-select'
                        name={'category_id'}
                        value={newData?.category_id}
                      >
                        <option value='' disabled>
                          select Category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {displayVariants && (
                <div
                  style={{
                    backgroundColor: '#f6f6f6',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3>Variants</h3>
                    <button
                      onClick={addColor}
                      className='editPage_btn'
                      style={{ backgroundColor: PRIMARY, color: 'white' }}
                      disabled={isView}
                    >
                      Add New Variant
                    </button>
                  </div>
                  <div style={{ maxHeight: '12vh', overflowY: 'scroll' }}>
                    {productColors.length === 0 && (
                      <div
                        style={{
                          height: '5vh',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        Not Variants yet.. add new{' '}
                      </div>
                    )}
                    {productColors.length > 0 && (
                      <table>
                        <thead>
                          <tr>
                            <th rowSpan='2' align='start'>
                              Color
                            </th>
                            {sizes.map((size) => (
                              <th key={size.name} align='start'>
                                {size.label} {'( Qty, Price )'}
                              </th>
                            ))}
                            <th rowSpan='2' align='start'>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productColors.map((color, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type='text'
                                  name='color'
                                  value={color.color}
                                  onChange={(e) => handlenewChange(index, e)}
                                  placeholder='Color'
                                  disabled={isView}
                                />
                              </td>
                              {sizes.map((size) => (
                                <td
                                  key={`${color.color}-${size.name}`}
                                  align='start'
                                >
                                  <input
                                    type='tel'
                                    name={`${size.name}_size_quantity`}
                                    value={
                                      color.sizes[`${size.name}_size_quantity`]
                                    }
                                    onChange={(e) => handlenewChange(index, e)}
                                    size={5}
                                    disabled={isView}
                                  />
                                  <input
                                    type='tel'
                                    name={`${size.name}_size_price`}
                                    value={
                                      color.sizes[`${size.name}_size_price`]
                                    }
                                    onChange={(e) => handlenewChange(index, e)}
                                    size={5}
                                    disabled={isView}
                                  />
                                </td>
                              ))}
                              <td>
                                <button
                                  onClick={() => removeColor(index)}
                                  className='editPage_btn'
                                  disabled={isView}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
