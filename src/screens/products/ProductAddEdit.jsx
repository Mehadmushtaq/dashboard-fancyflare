import React, { useState, useEffect, useRef } from 'react';
import './products.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
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
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [mainImage, setMainImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [showImage, setShowImage] = useState(false);
  
  const [mainSelected, setMainSelected] = useState('');
  const [img2Selected, setImg2Selected] = useState('');
  const [img3Selected, setImg3Selected] = useState('');
  
  const [displayVariants, setDisplayVariants] = useState(false);
  const [showSize, setShowSize] = useState(true);
  
  const [isMainProduct, setIsMainProduct] = useState(false);

  const [newData, setNewData] = useState({
    id: prevData ? prevData.product?.id : 0,
    name: prevData ? prevData.product?.name : '',
    price: prevData ? prevData.product?.price : 0,
    after_discount_price: prevData ? prevData.product?.after_discount_price : 0,
    size: prevData ? prevData.product?.size : '',
    is_stiched: prevData ? prevData.product?.is_stiched : "",
    category_id : prevData ? prevData.product?.category_id : "",   
    available_stock: prevData ? prevData?.product?.available_stock : 0,
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //in use
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const handleImageUploadClick = (fileRef) => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  
  const [productColor1, setProductColor1] = useState({
    color: prevData ? prevData?.product_color[0]?.color : '',
    small_size_quantity: prevData
      ? prevData?.product_color[0]?.small_size_quantity
      : 0,
    small_size_price: prevData
      ? prevData?.product_color[0]?.small_size_price
      : 0,
    medium_size_quantity: prevData
      ? prevData?.product_color[0]?.medium_size_quantity
      : 0,
    medium_size_price: prevData
      ? prevData?.product_color[0]?.medium_size_price
      : 0,
    large_size_quantity: prevData
      ? prevData?.product_color[0]?.large_size_quantity
      : 0,
    large_size_price: prevData
      ? prevData?.product_color[0]?.large_size_price
      : 0,
    extra_large_size_quantity: prevData
      ? prevData?.product_color[0]?.extra_large_size_quantity
      : 0,
    extra_large_size_price: prevData
      ? prevData?.product_color[0]?.extra_large_size_price
      : 0,
  });
  const [productColor2, setProductColor2] = useState({
    color: prevData ? prevData?.product_color[1]?.color : '',
    small_size_quantity: prevData
      ? prevData?.product_color[1]?.small_size_quantity
      : 0,
    small_size_price: prevData
      ? prevData?.product_color[1]?.small_size_price
      : 0,
    medium_size_quantity: prevData
      ? prevData?.product_color[1]?.medium_size_quantity
      : 0,
    medium_size_price: prevData
      ? prevData?.product_color[1]?.medium_size_price
      : 0,
    large_size_quantity: prevData
      ? prevData?.product_color[1]?.large_size_quantity
      : 0,
    large_size_price: prevData
      ? prevData?.product_color[1]?.large_size_price
      : 0,
    extra_large_size_quantity: prevData
      ? prevData?.product_color[1]?.extra_large_size_quantity
      : 0,
    extra_large_size_price: prevData
      ? prevData?.product_color[1]?.extra_large_size_price
      : 0,
  });

  useEffect(() => {
    if (prevData && prevData?.product?.is_main_product === 1)
    {
      console.log('main product h');
      setIsMainProduct(true);
    }
    else setIsMainProduct(false);
  }, []);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.data.error_code === ErrorCode.success) {
        setCategories(res.data.result);
      }
    });

    if (isEdit || isView) {
      setShowImage(true);
    }
  }, []);

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleChange = (e) => {
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
        setProductColor1('');
        setProductColor2('');
      } else {
        setDisplayVariants(false);
        setShowSize(true);
      }
    } else {
      setNewData({ ...newData, [name]: value });
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setProductColor1({ ...productColor1, [name]: value });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setProductColor2({ ...productColor2, [name]: value });
  };
  
  const handleCheckboxChange = () => {
    setIsMainProduct(!isMainProduct);
  };

  const saveOnclick = () => {
    if (!newData.name) setNameErr(true);
    else if (!newData.price) setPriceErr(true);
    else if (!mainImage) {
      setErr(true);
      setErrMsg('Must select first(main) image');
    }else if (!newData.category_id) {
      setErr(true);
      setErrMsg('Select category');
    } else {
      setErr(false);
      setIsLoading(true);
      postProduct({
        ...newData,
        isMainProduct,
        images: { mainSelected, img2Selected, img3Selected },
        productColor1,
        productColor2,
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
    // navigate('/dashboard/product/edit', {
    //   state: { editData: prevData },
    // });
  };

  const handleFileChange = (event, setFile, selectedFile) => {
    const file = event.target.files[0];
    console.log('file', file);
    if (file) {
      selectedFile(file);
      setFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Product'} />
        </div>
        <div className='dashPanel' style={{ position: 'relative' }}>
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
                    hidden={isView}
                  >
                    Discard
                  </button>
                  <button
                    className='editPage_btn'
                    style={{ backgroundColor: PRIMARY, color: 'white' }}
                    onClick={saveOnclick}
                    hidden={isView}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Add Product')}
                  </button>
                  {/* {isView && (
                    <div className='ev-btnAdd ev-btn'>
                      <button
                        className='editPage_btn'
                        style={{ backgroundColor: PRIMARY, color: 'white' }}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </div>
                  )} */}
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
                          width='19vw'
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
                          width='19vw'
                          disable={isView}
                        />
                      </div>
                      <div 
                      style={{
                        padding:"1rem 0",
                        display:"flex",
                        alignItems:'center'
                      }}>
                        <input
                          type='checkbox'
                          value={isMainProduct}
                          onChange={
                            handleCheckboxChange
                          }
                          disabled={isView}
                          />
                          <p style={{
                            padding:"1rem 0.5rem"
                          }}>Make this product main product</p>
                      </div>
                    </div>
                  </div>

                  {displayVariants && (
                    <div
                      style={{
                        backgroundColor: '#f6f6f6',
                        padding: '1rem 0rem',
                        padding: '1rem',
                      }}
                    >
                      <h3>Variants</h3>

                      <table>
                        <thead>
                          <th rowSpan='2'>Color</th>
                          <th colSpan='4'>Quantity</th>
                          <th colSpan='4'>Price</th>
                        </thead>

                        <tr>
                          <th>S</th>
                          <th>M</th>
                          <th>L</th>
                          <th>XL</th>
                          <th>S</th>
                          <th>M</th>
                          <th>L</th>
                          <th>XL</th>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type='text'
                              name={'color'}
                              value={productColor1?.color}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              placeholder={'Color'}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              name='small_size_quantity'
                              value={productColor1?.small_size_quantity}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              name='medium_size_quantity'
                              value={productColor1?.medium_size_quantity}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              name='large_size_quantity'
                              value={productColor1?.large_size_quantity}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              name='extra_large_size_quantity'
                              value={productColor1?.extra_large_size_quantity}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              name='small_size_price'
                              value={productColor1?.small_size_price}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              name='medium_size_price'
                              value={productColor1?.medium_size_price}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              name='large_size_price'
                              value={productColor1?.large_size_price}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              name='extra_large_size_price'
                              value={productColor1?.extra_large_size_price}
                              size={5}
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              disabled={isView}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type='text'
                              value={productColor2?.color}
                              name={'color'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              placeholder={'Color'}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              value={productColor2?.small_size_quantity}
                              name={'small_size_quantity'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              value={productColor2?.medium_size_quantity}
                              name={'medium_size_quantity'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              value={productColor2?.large_size_quantity}
                              name={'large_size_quantity'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              value={productColor2?.extra_large_size_quantity}
                              name={'extra_large_size_quantity'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              value={productColor2?.small_size_price}
                              name={'small_size_price'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              value={productColor2?.medium_size_price}
                              name={'medium_size_price'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>

                          <td>
                            <input
                              type='tel'
                              value={productColor2?.large_size_price}
                              name={'large_size_price'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type='tel'
                              value={productColor2?.extra_large_size_price}
                              name={'extra_large_size_price'}
                              onChange={(e) => {
                                handleChange2(e);
                              }}
                              size={5}
                              disabled={isView}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  )}
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

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        margin: '0.5rem 0rem',
                        padding: '1rem 0rem',
                      }}
                    >
                      <input
                        type='file'
                        accept='image/jpeg, image/png, image/jpg'
                        hidden
                        onChange={(e) =>
                          handleFileChange(e, setMainImage, setMainSelected)
                        }
                        ref={fileInputRef1}
                        disabled={isView}
                      />
                      <div
                        onClick={() => handleImageUploadClick(fileInputRef1)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '2px dotted grey',
                          height: '15vh',
                          width: '7vw',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundImage: showImage
                            ? `url(${BASE_URL}${prevData?.image_product[0]?.image_url})`
                            : `url(${mainImage})`,
                          backgroundPosition: 'center center',
                          backgroundSize: 'cover',
                        }}
                      >
                        {!mainImage && !prevData && 'Select Image to upload'}
                      </div>
                      <input
                        type='file'
                        accept='image/jpeg, image/png, image/jpg'
                        hidden
                        onChange={(e) =>
                          handleFileChange(e, setImage2, setImg2Selected)
                        }
                        ref={fileInputRef2}
                        disabled={isView}
                      />
                      <div
                        onClick={() => handleImageUploadClick(fileInputRef2)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '2px dotted grey',
                          height: '15vh',
                          width: '7vw',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundImage: showImage
                            ? `url(${BASE_URL}${prevData?.image_product[1]?.image_url})`
                            : `url(${image2})`,
                          backgroundPosition: 'center center',
                          backgroundSize: 'cover',
                        }}
                      >
                        {!image2 && !prevData && 'Select Image to upload'}
                      </div>
                      <input
                        type='file'
                        accept='image/jpeg, image/png, image/jpg'
                        hidden
                        onChange={(e) =>
                          handleFileChange(e, setImage3, setImg3Selected)
                        }
                        ref={fileInputRef3}
                        disabled={isView}
                      />
                      <div
                        onClick={() => handleImageUploadClick(fileInputRef3)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '2px dotted grey',
                          height: '15vh',
                          width: '7vw',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundImage: showImage
                            ? `url(${BASE_URL}${prevData?.image_product[2]?.image_url})`
                            : `url(${image3})`,
                          backgroundPosition: 'center center',
                          backgroundSize: 'cover',
                        }}
                      >
                        {!image3 && !prevData && 'Select Image to upload'}
                      </div>
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
                        name={"category_id"}
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
                  <div
                    style={{
                      backgroundColor: '#f6f6f6',
                      padding: '1.5rem 2rem 1rem 1.5rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3>Inventory</h3>
                    <div className='ae-formFields'>
                      <div className='ae-inputField'>
                        <InputField
                          type='number'
                          name={'available_stock'}
                          value={newData?.available_stock}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder={'Available Stock'}
                          radius='7px'
                          width='50px'
                          disable={isView}
                        />
                      </div>
                      <div className='ae-inputField'>
                        <InputField
                          // onChange={(e) => {
                          //   handleChange(e);
                          // }}
                          width='50px'
                          placeholder={'SKU (optional)'}
                          radius='7px'
                          disable={isView}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
