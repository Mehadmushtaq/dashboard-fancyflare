import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import InputField from '../../components/InputField/InputField';
import 'animate.css';
import Header from '../../components/header/Header';
import { ContactIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { getAllCategories, postCategory } from '../../api/categories';

export default function Categories({ isEdit }) {
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
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('');

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.data.error_code === ErrorCode.success) {
        setCategories(res.data.result);
      }
    });
  }, []);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const saveOnclick = () => {
    setErr(false);
    setIsLoading(true);
    postCategory({ name })
      .then(({ data }) => {
        setIsLoading(false);
        if (
          data.error_code === ErrorCode.success ||
          data.error_code === ErrorCode.updated
        ) {
          setName('');
          navigate('/dashboard/categories', {
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
  };

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText={'Categories'} />
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
                    value={name}
                    onChange={(e) => {
                      settitleErr(false);
                      handleChange(e);
                    }}
                    cat={'Name'}
                    placeholder={'Cartegory Name'}
                    radius='7px'
                    width='400px'
                  />

                  <button
                    className='editPage_btn'
                    style={{ backgroundColor: PRIMARY, color: 'white' }}
                    disabled={isLoading}
                    onClick={saveOnclick}
                  >
                    {isLoading ? <LoadingSpinner /> : 'Add new'}
                  </button>
                </div>
              </div>
              <div>
                <h3>All Categories</h3>
                {categories &&
                  categories.map((category) => (
                    <div
                      key={category.id}
                      style={{
                        border: '1px solid grey',
                        margin: '2px',
                        padding: '1rem 3rem',
                      }}
                    >
                      <p>{category.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
