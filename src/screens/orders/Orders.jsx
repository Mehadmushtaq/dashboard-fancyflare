import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import "./order.css";
import Modal from "react-modal";
import Header from "../../components/header/Header";
import { RiSignalWifiErrorLine, RiDeleteBin6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ContactIcon, FaqIcon, OrdersIcon, PaperIcon } from "../../SVGS";
import NoDataView from "../../Error/NoDataView";
import { deleteReview, getAllReviews } from "../../api/review";
import { ErrorCode, ErrorMessages } from "../../constants/ErrorCodes";
import { ConsoleData } from "../../constants/CommonFunctions";
import noImage from "../../assets/avatar1.png";
import { BASE_URL } from "../../constants/ConstantVariable";
import { PRIMARY } from "../../constants/Colors";
import ModalComp from "../../components/modal/ModalComp";
import { FiEdit } from "react-icons/fi";
import { deleteFaq, getAllFaqs } from "../../api/faq";
import { getServiceCards } from "../../api/service";
import icons_bank from "../../Icons";
import {
  deleteWhyChooseUsCards,
  getWhyChooseUsCards,
} from "../../api/WhyChooseUs";
import { deleteOrder, getAllOrders } from "../../api/order";

export default function Orders() {
  const icon = () => {
    return <OrdersIcon width="26" height="30" fill={PRIMARY} />;
  };

  const location = useLocation();
  const CurrPage =
    location.state && location.state ? location.state.page : null;

  const navigate = useNavigate();

  const [page, setPage] = useState(CurrPage !== null ? CurrPage : 1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [paginationDisplay, setPaginationDisplay] = useState("block");
  const [err, setErr] = useState(false);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchData(page);
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchString.trim() !== "") fetchData(page, searchString);
    }, 1500);
    return () => {
      clearTimeout(delay);
    };
  }, [searchString]);

  const fetchData = (pageNumber, searchTxt) => {
    setErr(false);
    setisLoading(true);
    getAllOrders(null, searchTxt)
      .then(({ data }) => {
        setisLoading(false);
        if (data.error_code == ErrorCode.success) {
          setData(data.result);
        } else if (data.error_code == ErrorCode.not_exist) {
          setData([]);
          setErrorMsg("No data found");
        } else if (data.error_code == ErrorCode.failed) {
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
      behavior: "smooth",
    });
    if (pageNumber >= 1) {
      fetchData(pageNumber, searchString);
    }
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
    if (e.target.value === "") {
      fetchData(page);
    }
  };

  function setIsDeleted(id) {
    let arr = [...data.filter((item) => item.id != id)];
    setData([...arr]);
  }

  return (
    <>
      <div className="mainDashView">
        <div>
          <Header svg={icon} DashboardNavText="Orders" />
        </div>

        <div className="dashPanel border-lt-Gra" style={{ padding: "4% 2%" }}>
          <div className="r-ViewBar">
            <div
              className="r-ViewBar2"
              style={{
                width: "100%",
              }}
            >
              <div>
                <input
                  type="search"
                  value={searchString}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="rolesSearch"
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <LoadingSpinner height={"40px"} width={"40px"} />
          ) : (
            <>
              {err ? (
                <div className="network-err-msg" style={{ display: "flex" }}>
                  {errorMsg}
                </div>
              ) : null}
              {data?.length > 0 ? (
                <div className="main_content_container">
                  <div className="tableContainer">
                    <table className="roleViewTable">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Amount</th>
                          <th>Details</th>
                          <th style={{ paddingRight: "20px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((data) => (
                          <Rows
                            data={data}
                            page={page}
                            setIsDeleted={(id) => setIsDeleted(id)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="paginationDiv"
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
  const [imgErr, setImgErr] = useState(false);
  const [delErr, setdelErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const deleteOnclick = () => {
    setModalIsOpen(true);
  };

  const deleteClick = () => {
    setdelErr(false);
    let obj = {
      id: data ? data.id : null,
    };
    setIsLoading(true);
    deleteOrder(obj)
      .then(({ data }) => {
        setIsLoading(false);
        if (data.error_code == ErrorCode.success) {
          setModalIsOpen(false);
          setIsDeleted(obj?.id);
        } else if (data.error_code == ErrorCode.failed) {
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

  function viewData() {
    navigate("/dashboard/order/view", {
      state: { editData: data },
    });
  }

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
        msg={"Are you sure you want to delete?"}
      />
      {data ? (
        <tr>
          <td className="break-line-170">
            {data?.firstName?.length > 150
              ? data.firstName.substring(0, 145) + "..."
              : data.firstName}
          </td>
          <td className="break-line-170">
            {data?.lastName?.length > 150
              ? data.lastName.substring(0, 145) + "..."
              : data.lastName}
          </td>
          <td className="break-line-170">
            {data?.phone?.length > 150
              ? data.phone.substring(0, 145) + "..."
              : data.phone}
          </td>
          <td className="break-line-270">
            {data?.email?.length > 200
              ? data.email.substring(0, 200) + "..."
              : data.email}
          </td>
          <td className="break-line-270">{data?.amount}</td>
          <td>
            <span onClick={viewData} className="view_details">
              View Details
            </span>
          </td>
          <td
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: "60px",
            }}
          >
            <button onClick={deleteOnclick} className="Actionbtn delBtn">
              <RiDeleteBin6Line />
            </button>
          </td>
        </tr>
      ) : null}
    </>
  );
};
