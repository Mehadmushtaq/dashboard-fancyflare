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
                <h3>Order Details</h3>
                <div className='booking_details'>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      No. of storey:
                    </span>
                    <span className='booking_data_selection'>
                      {data.storey_label}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      No. of bedroom:
                    </span>
                    <span className='booking_data_selection'>
                      {data.bedroom_label}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      No. of bathroom:
                    </span>
                    <span className='booking_data_selection'>
                      {data.bathroom_label}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Date of booking:
                    </span>
                    <span className='booking_data_selection'>
                      {data?.date_of_booking
                        ? moment(data.date_of_booking).format('YYYY-MM-DD')
                        : 'Not selected'}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Time of cleaner arrival:
                    </span>
                    <span className='booking_data_selection'>
                      {data?.time_of_booking_label}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Will you be home?{' '}
                    </span>
                    <span className='booking_data_selection'>
                      {data.is_home === Enums.is_home.yes
                        ? " Yes, I'll be home"
                        : ' No, I will leave key out'}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Property type:
                    </span>
                    <span className='booking_data_selection'>
                      {data.property_type === Enums.property_type.un_furnished
                        ? ' Un-Furnished'
                        : ' Furnished'}
                    </span>
                  </div>
                  <div className='booking_data'>
                    <span className='booking_data_question'>
                      Power availability:
                    </span>
                    <span className='booking_data_selection'>
                      {data.is_power_available === Enums.is_power_available.yes
                        ? ' Yes, Power is available'
                        : ' No, Power is not available'}
                    </span>
                  </div>
                </div>

                <div className='extras_booking_details_main'>
                  <h4>Extras</h4>
                  <div className='booking_details'>
                    {data?.balcony_label ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          Additional Balcony to clean:
                        </span>
                        <span className='booking_data_selection'>
                          {data?.balcony_label}
                        </span>
                      </div>
                    ) : null}

                    {data?.blind_label ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          No. of blinds to clean:
                        </span>
                        <span className='booking_data_selection'>
                          {data?.blind_label}
                        </span>
                      </div>
                    ) : null}

                    {data?.carpet ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          No. of rooms for carpet Steam Clean:
                        </span>
                        <span className='booking_data_selection'>
                          {data?.carpet?.label}
                        </span>
                      </div>
                    ) : null}

                    {data?.wall_label ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          No. of rooms for wall wash:
                        </span>
                        <span className='booking_data_selection'>
                          {data?.wall_label}
                        </span>
                      </div>
                    ) : null}

                    {data?.windows_label ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          No. of Outside windows to clean:
                        </span>
                        <span className='booking_data_selection'>
                          {data?.windows_label}
                        </span>
                      </div>
                    ) : null}

                    {data?.misc_label ? (
                      <div className='booking_data'>
                        <span className='booking_data_question'>
                          miscellaneous service (by price):
                        </span>
                        <span className='booking_data_selection'>
                          {data?.misc_label}
                        </span>
                      </div>
                    ) : null}
                    {/* singles slections */}

                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Garage Cleaning:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.garage === 1 ? ' Included' : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Fridge cleaning:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.fridge === 1 ? ' Included' : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Double Fridge cleaning:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.double_fridge === 1
                          ? ' Included'
                          : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Pressure washing:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.pressure_washing === 1
                          ? ' Included'
                          : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>Travel Fee:</span>
                      <span className='booking_data_selection'>
                        {data?.travel_fee === 1 ? ' Included' : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>
                        Living area cleaning:
                      </span>
                      <span className='booking_data_selection'>
                        {data?.living_area === 1
                          ? ' Included'
                          : ' Not included'}
                      </span>
                    </div>
                    <div className='booking_data'>
                      <span className='booking_data_question'>Urgent Job:</span>
                      <span className='booking_data_selection'>
                        {data?.urgent_job === 1 ? ' Included' : ' Not included'}
                      </span>
                    </div>
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
