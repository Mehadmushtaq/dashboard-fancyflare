import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import InputField from '../../components/InputField/InputField';
import 'animate.css';
import Header from '../../components/header/Header';
import { ContactIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { postContact } from '../../api/ContactUs';

export default function CustomerAddEdit({ isEdit }) {
  const icon = () => {
    return <ContactIcon width='26' height='30' fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  const [isLoading, setIsLoading] = useState(false);
  const [titleErr, settitleErr] = useState(false);
  const [descriptionErr, setdescriptionErr] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newData, setNewData] = useState({
    id: prevData ? prevData.id : 0,
    name: prevData ? prevData.name : '',
    email: prevData ? prevData.email : '',
    password: prevData ? prevData.password : '',
  });

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
    if (isValidData()) {
      let obj = {
        id: newData.id,
        name: newData.name,
        email: newData.email,
        password: newData.password,
      };
      setErr(false);
      setIsLoading(true);
      postContact(obj)
        .then(({ data }) => {
          setIsLoading(false);
          if (
            data.error_code === ErrorCode.success ||
            data.error_code === ErrorCode.updated
          ) {
            navigate('/dashboard/customers', {
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

  function isValidData() {
    if (!newData.email) settitleErr(true);
    else if (!newData.password) setdescriptionErr(true);
    else return true;
    return false;
  }

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Add Customer'} />
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
                <div className='ae-inputField'>
                  <InputField
                    name={'name'}
                    isErr={titleErr}
                    errorMsg={'Please fill in the field'}
                    value={newData?.name}
                    onChange={(e) => {
                      settitleErr(false);
                      handleChange(e);
                    }}
                    cat={'Name'}
                    placeholder={'Name'}
                    radius='7px'
                    width='400px'
                  />
                </div>

                <div className='ae-inputField'>
                  <InputField
                    name={'email'}
                    isErr={titleErr}
                    errorMsg={'Please fill in the field'}
                    value={newData?.email}
                    onChange={(e) => {
                      settitleErr(false);
                      handleChange(e);
                    }}
                    cat={'Email'}
                    placeholder={'Email'}
                    radius='7px'
                    width='400px'
                  />
                </div>
                <div className='ae-inputField'>
                  <InputField
                    name={'password'}
                    isErr={titleErr}
                    errorMsg={'Please fill in the field'}
                    value={newData?.password}
                    onChange={(e) => {
                      settitleErr(false);
                      handleChange(e);
                    }}
                    cat={'Password'}
                    placeholder={'Password'}
                    radius='7px'
                    width='400px'
                  />
                </div>
              </div>

              <div className='addEdit-btns'>
                <div className='ev-btnAdd ev-btn'>
                  <button
                    className='editPage_btn'
                    style={{ backgroundColor: PRIMARY, color: 'white' }}
                    disabled={isLoading}
                    onClick={saveOnclick}
                  >
                    {isLoading ? <LoadingSpinner /> : isEdit ? 'Update' : 'Add'}
                  </button>
                </div>
                <div className='ev-btnDel ev-btn'>
                  <button
                    className='editPage_btn'
                    style={{ color: PRIMARY }}
                    disabled={isLoading}
                    onClick={() => {
                      navigate('/dashboard/customers', {
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
