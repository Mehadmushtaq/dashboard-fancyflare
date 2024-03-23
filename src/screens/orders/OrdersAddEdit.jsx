import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import 'animate.css';
import Header from '../../components/header/Header';
import { OrdersIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';
import { Enums } from '../../constants/Enums';
import moment from 'moment';

export default function OrdersAddEdit() {
  const icon = () => {
    return <OrdersIcon width='26' height='30' fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const data =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Orders'} />
        </div>
        <div className='dashPanel' style={{ position: 'relative' }}>
          <>
            <div className='ar-dashpanel'>
              <div className='payment_main_container'>
                <h3>Order Details :</h3>
                <div className='booking_details'>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      No. of Products:
                    </span>
                    <span className='booking_data_selection'>
                      ({data?.checkout_checkout_product?.length}) products
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Payment Method:
                    </span>
                    <span className='booking_data_selection'>
                      {data?.payment_method == 1
                        ? 'Credit Card'
                        : 'Cash On Delivery'}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>Order Amount:</span>
                    <span className='booking_data_selection'>
                      {data?.total_amount || 0} Rs
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>Order Date:</span>
                    <span className='booking_data_selection'>
                      {data?.createdAt
                        ? moment(data.createdAt).format('YYYY-MM-DD')
                        : 'Not selected'}
                    </span>
                  </div>
                </div>

                <div className='extras_booking_details_main'>
                  <h4>Customer Info :</h4>
                  <div className='booking_details'>
                    <div className='booking_data'>
                      <span className='booking_data_question'>Name:</span>
                      <span className='booking_data_selection'>
                        {data?.first_name} {data?.last_name}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Contact Number#
                      </span>
                      <span className='booking_data_selection'>
                        {data?.contact_number}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Address Line 01:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.address_line_01}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Address Line 02:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.address_line_02}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>City:</span>
                      <span className='booking_data_selection'>
                        {data?.city}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>State:</span>
                      <span className='booking_data_selection'>
                        {data?.state}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>Zip Code:</span>
                      <span className='booking_data_selection'>
                        {data?.zip_code}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='payment_main_container'>
                <div className='extras_booking_details_main'>
                  <h4>Products :</h4>
                  <div className='booking_details'>
                    {data?.checkout_checkout_product && (
                      <div
                        style={{
                          maxHeight: '50vh',
                          overflowY: 'scroll',
                          lineHeight: '1.5rem',
                        }}
                      >
                        {data?.checkout_checkout_product?.map(
                          (product, index) => (
                            <div
                              key={index}
                              style={{
                                padding: '0.5rem 0rem',
                                margin: '1rem 0rem',
                                borderBottom: '1px solid lightgrey',
                              }}
                            >
                              <p>{product?.checkout_product_product?.name || 'product_name'}</p>
                              <p>
                                {product.color}{' '}
                                {product.variant}
                              </p>
                              <p>
                                <b>Price: </b>
                                {product.price} Rs
                              </p>
                              <p>
                                <b>Qty: </b>
                                {product.quantity}
                              </p>
                              <p></p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='addEdit-btns'>
                <div className='ev-btnDel ev-btn'>
                  <button
                    className='editPage_btn order'
                    onClick={() => {
                      navigate('/dashboard/order', {
                        state: { page: page },
                      });
                    }}
                  >
                    {'Back'}
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
