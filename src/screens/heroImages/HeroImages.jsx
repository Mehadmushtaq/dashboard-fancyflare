import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import Header from '../../components/header/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { NewsPaper } from '../../SVGS';
import NoDataView from '../../Error/NoDataView';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { PRIMARY } from '../../constants/Colors';
import ModalComp from '../../components/modal/ModalComp';
import icons_bank from '../../Icons';

import {
  deleteImage,
  getSliderImages,
  postImages,
} from '../../api/sliderImages';

export default function HeroImages() {
  const icon = () => {
    return <NewsPaper width='26' height='30' fill={PRIMARY} />;
  };

  const location = useLocation();
  const CurrPage =
    location.state && location.state ? location.state.page : null;

  const [page, setPage] = useState(CurrPage !== null ? CurrPage : 1);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paginationDisplay, setPaginationDisplay] = useState('block');
  const [err, setErr] = useState(false);
  const [searchString, setSearchString] = useState('');

  const [selectedFile, setSelectedFile] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    fetchData(page);
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchString.trim() !== '') fetchData(page, searchString);
    }, 1500);
    return () => {
      clearTimeout(delay);
    };
  }, [searchString]);

  const fetchData = (pageNumber, searchTxt) => {
    setErr(false);
    setisLoading(true);
    getSliderImages()
      .then(({ data }) => {
        setisLoading(false);
        if (data.error_code === ErrorCode.success) {
          setData(data.result);
          setPage(pageNumber);
        } else if (data.error_code === ErrorCode.not_exist) {
          setData([]);
          setErrorMsg('No data found');
        } else if (data.error_code === ErrorCode.failed) {
          setErr(true);
          setErrorMsg(ErrorMessages.failed);
        } else {
          setErr(true);
          setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        setErr(true);
        setErrorMsg(ErrorMessages.network_error);
        setisLoading(false);
      });
  };

  const saveOnclick = () => {
    setisLoading(true);
    postImages(selectedFile)
      .then(({ data }) => {
        setisLoading(false);
        setData((prev) => [data.result, ...prev]);
        setSelectedImg('');
      })
      .catch((err) => {
        setErr(true);
        setErrorMsg(ErrorMessages.network_error);
        setisLoading(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (pageNumber >= 1) {
      fetchData(pageNumber, searchString);
    }
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
    if (e.target.value === '') {
      fetchData(page);
    }
  };

  function setIsDeleted(id) {
    let arr = [...data.filter((item) => item.id !== id)];
    setData([...arr]);
  }

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText='MainImages' />
        </div>

        <div className='dashPanel border-lt-Gra' style={{ padding: '4% 2%' }}>
          {isLoading ? (
            <LoadingSpinner height={'40px'} width={'40px'} />
          ) : (
            <>
              {err ? (
                <div className='network-err-msg' style={{ display: 'flex' }}>
                  {errorMsg}
                </div>
              ) : null}
              <h2 style={{ marginBottom: '2rem' }}>Images</h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <div
                  className='left'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <input
                    type='file'
                    accept='image/jpeg, image/png, image/jpg'
                    hidden
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <div
                    onClick={handleImageUploadClick}
                    style={{
                      border: '2px dotted grey',
                      height: '40vh',
                      width: '70vh',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundImage: `url(${selectedImg})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      position: 'relative',
                    }}
                  >
                    {!selectedImg && 'Select Image to upload'}
                  </div>

                  {selectedImg && (
                    <div
                      style={{
                        color: 'blue',
                        marginTop: '20px',
                      }}
                    >
                      Click to change
                    </div>
                  )}

                  <button
                    className='editPage_btn'
                    style={{
                      marginTop: '20px',
                    }}
                    disabled={!selectedImg || data.length >= 5}
                    onClick={saveOnclick}
                  >
                    Upload
                  </button>
                </div>

                <div className='right'>
                  {data?.length > 0 ? (
                    <div
                      style={{
                        overflowY: 'scroll',
                        maxHeight: '50vh',
                      }}
                    >
                      <div className='tableContainer'>
                        <table className='roleViewTable'>
                          <tbody>
                            {data?.map((dta) => (
                              <Rows
                                key={dta.id}
                                data={dta}
                                page={page}
                                setIsDeleted={(id) => setIsDeleted(id)}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className='paginationDiv'
                        style={{ display: paginationDisplay }}
                      ></div>
                    </div>
                  ) : (
                    <NoDataView />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
const Rows = ({ data, page, setIsDeleted }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [delErr, setdelErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const Icon = icons_bank[data.icon_number - 1];
  const deleteOnclick = () => {
    setModalIsOpen(true);
  };

  const deleteClick = () => {
    setdelErr(false);
    let obj = {
      id: data ? data.id : null,
    };
    setIsLoading(true);
    deleteImage(obj)
      .then(({ data }) => {
        setIsLoading(false);
        if (data.error_code === ErrorCode.success) {
          setModalIsOpen(false);
          setIsDeleted(obj?.id);
        } else if (data.error_code === ErrorCode.failed) {
          setdelErr(true);
          setErrMsg(ErrorMessages.failed);
        } else {
          setdelErr(true);
          setErrMsg(data.message);
        }
      })
      .catch(() => {
        setErrMsg(ErrorMessages.network_error);
        setdelErr(true);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ModalComp
        isVisible={modalIsOpen}
        isCaution
        setIsVisible={() => {
          setdelErr(false);
          setModalIsOpen(false);
        }}
        isErr={delErr}
        errMsg={errMsg}
        onClick={deleteClick}
        isLoading={isLoading}
        msg={'Are you sure you want to delete?'}
      />
      {data ? (
        <tr>
          <td className='break-line-200'>
            <img
              height='100rem'
              width='175rem'
              src={`${process.env.REACT_APP_BASE_URL}${data?.image_url}`}
            />
          </td>
          <td
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: '60px',
            }}
          >
            <button onClick={deleteOnclick} className='Actionbtn delBtn'>
              <RiDeleteBin6Line />
            </button>
          </td>
        </tr>
      ) : null}
    </>
  );
};
