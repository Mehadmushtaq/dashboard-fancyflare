import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Modal from 'react-modal';
import Header from '../../components/header/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { InventoryIcon } from '../../SVGS';
import NoDataView from '../../Error/NoDataView';
import { ErrorCode, ErrorMessages } from '../../constants/ErrorCodes';
import { PRIMARY } from '../../constants/Colors';
import ModalComp from '../../components/modal/ModalComp';
import { deleteProduct, getAllProducts } from '../../api/products';

export default function Products() {
  const icon = () => {
    return <InventoryIcon width='26' height='30' fill={PRIMARY} />;
  };

  const location = useLocation();
  const CurrPage =
    location.state && location.state ? location.state.page : null;

  const navigate = useNavigate();

  const [page, setPage] = useState(CurrPage !== null ? CurrPage : 1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paginationDisplay, setPaginationDisplay] = useState('block');
  const [err, setErr] = useState(false);
  const [searchString, setSearchString] = useState('');

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
    getAllProducts(limit, pageNumber, searchTxt)
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
    // let arr = [...data.filter((item) => item.product.id !== id)];
    // setData([...arr]);
    fetchData(page);
  }

  return (
    <>
      <div className='mainDashView'>
        <div>
          <Header svg={icon} DashboardNavText='Products' />
        </div>

        <div className='dashPanel border-lt-Gra' style={{ padding: '4% 2%' }}>
          <div className='r-ViewBar'>
            <div
              className='r-ViewBar2'
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type='search'
                  value={searchString}
                  onChange={handleSearch}
                  placeholder='Search'
                  className='rolesSearch'
                />
              </div>

              <button
                className='editPage_btn'
                style={{ backgroundColor: PRIMARY, color: 'white' }}
                disabled={isLoading}
                onClick={() => {
                  navigate('/dashboard/product/add');
                }}
              >
                Add New Product
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner height={'40px'} width={'40px'} />
          ) : (
            <>
              {err ? (
                <div className='network-err-msg' style={{ display: 'flex' }}>
                  {errorMsg}
                </div>
              ) : null}
              {data?.length > 0 ? (
                <div className='main_content_container'>
                  <div className='tableContainer'>
                    <table className='roleViewTable'>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price (PKR)</th>

                          <th style={{ paddingRight: '20px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((data) => (
                          <Rows
                            key={data.product.id}
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
  const navigate = useNavigate();
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
      id: data ? data.product.id : null,
    };
    setIsLoading(true);
    deleteProduct(obj)
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

  function editData() {
    navigate('/dashboard/product/edit', {
      state: { editData: data },
    });
  }

  function viewProduct() {
    navigate('/dashboard/product/view', {
      state: { editData: data },
    });
  }

  const calculatePrice = (product) => {
    let price = product.price;

    if (product.is_discount === 1) {
      const discountAmount =
        (product.price * product.after_discount_price) / 100;
      price -= discountAmount;
    }

    return Math.floor(price);
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
        isDisabled={isLoading}
        // isLoading={isLoading}
        msg={'Are you sure you want to delete?'}
      />
      {data ? (
        <tr>
          <td className='break-line-270'>
            <img
              style={{
                width: '4rem',
                height: 'auto',
                borderRadius: '0.2rem',
              }}
              src={`${process.env.REACT_APP_BASE_URL}${
                data?.image_product?.find((img) => img.is_main === 1)?.image_url
              }`}
            />
          </td>
          <td className='break-line-270'>
            {data?.product?.name?.length > 100
              ? data?.product?.name.substring(0, 100) + '...'
              : data?.product?.name}
          </td>
          <td className='break-line-270'>
            {data?.product?.category_name}
          </td>
          <td className='break-line-270'>{calculatePrice(data?.product)}</td>
          <td
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: '60px',
            }}
          >
            <button onClick={viewProduct} className='Actionbtn editBtn'>
              <GrView />
            </button>
            {/* <button onClick={editData} className='Actionbtn delBtn'>
              <FiEdit />
            </button> */}
            <button onClick={deleteOnclick} className='Actionbtn delBtn'>
              <RiDeleteBin6Line />
            </button>
          </td>
        </tr>
      ) : null}
    </>
  );
};
