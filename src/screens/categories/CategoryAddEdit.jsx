import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import InputField from '../../components/InputField/InputField';
import 'animate.css';
import Header from '../../components/header/Header';
import { ContactIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { postCategory } from '../../api/categories';

export default function CategoryAddEdit({ isEdit }) {
  const icon = () => {
    return <ContactIcon width='26' height='30' fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState(prevData && prevData.name || ''); 

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const saveOnclick = () => {
      setIsLoading(true);
      postCategory({id: prevData.id, name})
        .then(({ data }) => {
          setIsLoading(false);
          if (
            data.error_code === ErrorCode.success ||
            data.error_code === ErrorCode.updated
          ) {
            navigate('/dashboard/categories');
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
  

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Update Category'} />
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
                      value={name}
                      onChange={handleChange}
                      cat={'Name'}
                      placeholder={'Cartegory Name'}
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
                    {isLoading ? <LoadingSpinner /> : 'Update'}
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
