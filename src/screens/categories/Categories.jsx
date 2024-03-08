import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Modal from 'react-modal';
import Header from '../../components/header/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ContactIcon, FaqIcon, PaperIcon } from '../../SVGS';
import NoDataView from '../../Error/NoDataView';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { PRIMARY } from '../../constants/Colors';
import ModalComp from '../../components/modal/ModalComp';
import icons_bank from '../../Icons';
import InputField from '../../components/InputField/InputField';
import {
  deleteCategory,
  getAllCategories,
  postCategory,
} from '../../api/categories';

export default function Subscribers() {
  const icon = () => {
    return <ContactIcon width='26' height='30' fill={PRIMARY} />;
  };
  const location = useLocation();

  const CurrPage =
    location.state && location.state ? location.state.page : null;

  const [page, setPage] = useState(CurrPage !== null ? CurrPage : 1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paginationDisplay, setPaginationDisplay] = useState('block');
  const [searchString, setSearchString] = useState('');
  const [titleErr, settitleErr] = useState(false);
  const [name, setName] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

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
    getAllCategories()
      .then(({ data }) => {
        setisLoading(false);
        if (data.error_code === ErrorCode.success) {
          setData(data.result);
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
    if (!name.trim()) {
      settitleErr(true); 
      return; 
    }
    setErr(false);
    setisLoading(true);
    postCategory({ name })
      .then(({ data }) => {
        console.log('postcategory', data);
        setisLoading(false);
        if (
          data.error_code === ErrorCode.success ||
          data.error_code === ErrorCode.updated
        ) {
          setName('');
          setData((prev) => [data.result, ...prev]);
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
        setisLoading(false);
        setErr(true);
        setErrMsg(ErrorMessages.network_error);
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

  const handleChange = (e) => {
    setName(e.target.value);
  };

  function setIsDeleted(id) {
    let arr = [...data.filter((item) => item.id !== id)];
    setData([...arr]);
  }

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText='Subscribers' />
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

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
              </div>

              {data?.length > 0 ? (
                <div className='main_content_container'>
                  <div className='tableContainer'>
                    <table className='roleViewTable'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th style={{ paddingRight: '20px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((data) => (
                          <Rows
                            key={data.id}
                            data={data}
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
                  >
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={limit}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={3}
                      onChange={(pageNumber) => {
                        handlePageChange(pageNumber);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <NoDataView />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
const Rows = ({ data, page, setIsDeleted }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [delErr, setdelErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const deleteOnclick = () => {
    setModalIsOpen(true);
  };

  const deleteClick = () => {
    setdelErr(false);
    let obj = {
      id: data ? data.id : null,
    };
    setIsLoading(true);
    deleteCategory(obj)
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
          <td className='break-line-200'>{data?.name}</td>

          <td
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: '60px',
            }}
          >
            {data.id > 5 && (
              <button onClick={deleteOnclick} className='Actionbtn delBtn'>
                <RiDeleteBin6Line />
              </button>
            )}
          </td>
        </tr>
      ) : null}
    </>
  );
};
