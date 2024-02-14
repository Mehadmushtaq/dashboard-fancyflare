import React, { useState, useEffect } from 'react';
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
  p;
  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  //to handle discount/sale
  const [isDiscount, setIsDiscount] = useState(false);
  useEffect(() => {
    if (prevData && prevData?.product?.is_discount === 1) setIsDiscount(true);
    else setIsDiscount(false);
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.data.error_code === ErrorCode.success) {
        setCategories(res.data.result);
      }
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [newData, setNewData] = useState({
    name: prevData ? prevData?.product?.name : '',
    price: prevData ? prevData?.product?.price : 0,
    after_discount_price: prevData
      ? prevData?.product?.after_discount_price
      : 0,
    available_stock: prevData ? prevData?.product?.available_stock : 0,
    size: prevData ? prevData?.product?.size : '',
    color: prevData ? prevData?.product?.color : '',
    category_name: prevData ? prevData?.product?.category_name : '',
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleCheckboxChange = () => {
    setIsDiscount(!isDiscount);
  };

  const [mainImage, setMainImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const handleImageSelect = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // const handleImageRemove = (setImage) => {
  //   setImage('');
  // };

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const saveOnclick = () => {
    if (!newData.name) setNameErr(true);
    else if (!newData.price) setPriceErr(true);
    else {
      setErr(false);
      setIsLoading(true);
      postProduct({
        ...newData,
        isDiscount,
        images: { mainImage, image2, image3 },
      });
      // .then(({ data }) => {
      //   setIsLoading(false);
      //   if (
      //     data.error_code === ErrorCode.success ||
      //     data.error_code === ErrorCode.updated
      //   ) {
      //     navigate('/dashboard/faq', {
      //       state: { page: page },
      //     });
      //   } else if (data.error_code === ErrorCode.failed) {
      //     setErr(true);
      //     setErrMsg(ErrorMessages.failed);
      //   } else {
      //     setErr(true);
      //     setErrMsg('Oops some error occured. EC:' + data.error_code);
      //   }
      // })
      // .catch((err) => {
      //   setIsLoading(false);
      //   setErr(true);
      //   setErrMsg(ErrorMessages.network_error);
      // });
    }
  };

  const handleEdit = () => {
    navigate('/dashboard/product/edit', {
      state: { editData: prevData },
    });
  };

  console.log({ prevData });
  // console.log({ mainImage });
  // console.log(prevData.image_product[0].image_url);

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Product'} />
        </div>
        <div className='dashPanel' style={{ position: 'relative' }}>
          <>
            <div className='ar-dashpanel'>
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

              <div>
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
                      placeholder={'Title'}
                      radius='7px'
                      width='700px'
                      disable={isView}
                    />
                  </div>
                </div>
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
                      placeholder={'price'}
                      radius='7px'
                      width='100px'
                      disable={isView}
                    />
                  </div>
                  <div className='ae-selectField'>
                    <p className='if-txt'>Sale </p>
                    <input
                      type='checkbox'
                      name={'isDiscount'}
                      checked={isDiscount}
                      onChange={handleCheckboxChange}
                      placeholder={'Sale'}
                      radius='7px'
                      disabled={isView}
                    />
                  </div>
                  {isDiscount && (
                    <div className='ae-inputField'>
                      <InputField
                        type='number'
                        name={'after_discount_price'}
                        value={newData?.after_discount_price}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder={'Discounted Price'}
                        radius='7px'
                        width='100px'
                        disable={isView}
                      />
                    </div>
                  )}

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
                      width='200px'
                      disable={isView}
                    />
                  </div>
                </div>
                <div className='ae-formFields'>
                  <div className='ae-inputField'>
                    <InputField
                      name={'size'}
                      value={newData?.size}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder={'Size'}
                      radius='7px'
                      width='200px'
                      disable={isView}
                    />
                  </div>
                  <div className='ae-inputField'>
                    <InputField
                      name={'color'}
                      value={newData?.color}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder={'Color'}
                      radius='7px'
                      width='200px'
                      disable={isView}
                    />
                  </div>

                  <div className='ae-selectField'>
                    <p className='if-txt'>Category</p>
                    <select
                      name={'category_name'}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      disabled={isView}
                      className='custom-select'
                    >
                      {/* <option value='' disabled>
                        select Category
                      </option> */}
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={newData?.category_name === category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* IMAGES SECTION */}

                <div className='container'>
                  <div className='box'>
                    <label htmlFor='main-image' className='box-label'>
                      Main Image
                    </label>
                    <input
                      type='file'
                      id='main-image'
                      className='input-file'
                      accept='.jpg, .jpeg, .png'
                      onChange={(e) => handleImageSelect(e, setMainImage)}
                      disabled={isView}
                    />
                    <div className='image-container'>
                      <img
                        src={
                          mainImage
                            ? mainImage
                            : `${BASE_URL}${prevData?.image_product[0]?.image_url}`
                        }
                        alt='Main'
                        className='image'
                      />
                      {/* <button
                        className='remove-button'
                        onClick={() => handleImageRemove(setMainImage)}
                        hidden={isView}
                      >
                        x
                      </button> */}
                    </div>
                  </div>
                  <div className='box'>
                    <label htmlFor='image-2' className='box-label'>
                      Image 2
                    </label>
                    <input
                      type='file'
                      id='image-2'
                      className='input-file'
                      accept='.jpg, .jpeg, .png'
                      onChange={(e) => handleImageSelect(e, setImage2)}
                      disabled={isView}
                    />
                    <div className='image-container'>
                      <img
                        src={
                          image2
                            ? image2
                            : `${BASE_URL}${prevData?.image_product[1]?.image_url}`
                        }
                        alt='Image 2'
                        className='image'
                      />
                      {/* <button
                          className='remove-button'
                          onClick={() => handleImageRemove(setImage2)}
                          hidden={isView}
                        >
                          x
                        </button> */}
                    </div>
                  </div>
                  <div className='box'>
                    <label htmlFor='image-3' className='box-label'>
                      Image 3
                    </label>
                    <input
                      type='file'
                      id='image-3'
                      className='input-file'
                      accept='.jpg, .jpeg, .png'
                      onChange={(e) => handleImageSelect(e, setImage3)}
                      disabled={isView}
                    />
                    <div className='image-container'>
                      <img
                        src={
                          image3
                            ? image3
                            : `${BASE_URL}${prevData?.image_product[2]?.image_url}`
                        }
                        alt='Image 3'
                        className='image'
                      />
                      {/* <button
                          className='remove-button'
                          onClick={() => handleImageRemove(setImage3)}
                          hidden={isView}
                        >
                          x
                        </button> */}
                    </div>
                  </div>
                </div>
                {!isView && (
                  <p style={{ color: 'red', marginTop: '0.5rem' }}>
                    * click on text to upload/change product image
                  </p>
                )}
              </div>

              <div className='addEdit-btns'>
                {!isView && (
                  <div className='ev-btnAdd ev-btn'>
                    <button
                      className='editPage_btn'
                      style={{ backgroundColor: PRIMARY, color: 'white' }}
                      // disabled={isLoading}
                      // onClick={saveOnclick}
                      disable
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : isEdit ? (
                        'Update'
                      ) : (
                        'Add'
                      )}
                    </button>
                  </div>
                )}

                {isView && (
                  <div className='ev-btnAdd ev-btn'>
                    <button
                      className='editPage_btn'
                      style={{ backgroundColor: PRIMARY, color: 'white' }}
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className='ev-btnDel ev-btn'>
                  <button
                    className='editPage_btn'
                    style={{ color: PRIMARY }}
                    disabled={isLoading}
                    onClick={() => {
                      navigate('/dashboard/products', {
                        state: { page: page },
                      });
                    }}
                  >
                    {isEdit ? 'Discard' : 'Back'}
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
