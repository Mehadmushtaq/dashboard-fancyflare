import React, { useState, useEffect } from "react";
import "./faq.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import InputField from "../../components/InputField/InputField";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import "animate.css";
import Header from "../../components/header/Header";
import noImage from "../../assets/avatar1.png";
import { FaqIcon } from "../../SVGS";
import { PRIMARY } from "../../constants/Colors";
import { Enums } from "../../constants/Enums";
import { postFaq } from "../../api/faq";
import { ErrorCode, ErrorMessages } from "../../constants/ErrorCodes";

export default function FaqAddEdit({ isEdit }) {
  const icon = () => {
    return <FaqIcon width="26" height="30" fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  const [isLoading, setIsLoading] = useState(false);
  const [questionErr, setQuestionErr] = useState(false);
  const [ansErr, setansErr] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [newData, setNewData] = useState({
    id: prevData ? prevData.id : 0,
    question: prevData ? prevData.question : "",
    answer: prevData ? prevData.answer : "",
    page: prevData ? prevData.page : 1,
  });

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const saveOnclick = () => {
    setErr(false);
    setIsLoading(true);
    postFaq(newData)
      .then(({ data }) => {
        setIsLoading(false);
        if (
          data.error_code == ErrorCode.success ||
          data.error_code == ErrorCode.updated
        ) {
          navigate("/dashboard/faq", {
            state: { page: page },
          });
        } else if (data.error_code == ErrorCode.failed) {
          setErr(true);
          setErrMsg(ErrorMessages.failed);
        } else {
          setErr(true);
          setErrMsg("Oops some error occured. EC:" + data.error_code);
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
      <div className="mainDashView">
        <div>
          <Header svg={icon} DashboardNavText={"FAQ's"} />
        </div>
        <div className="dashPanel" style={{ position: "relative" }}>
          <>
            <div className="ar-dashpanel">
              {err ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    position: "absolute",
                    top: "7px",
                    fontSize: "0.95rem",
                    width: "90%",
                  }}
                >
                  <p>{errMsg}</p>
                </div>
              ) : null}

              <div>
                <div className="ae-formFields">
                  <div className="ae-inputField">
                    <InputField
                      name={"question"}
                      isErr={questionErr}
                      errorMsg={"Please fill in the field"}
                      value={newData?.question}
                      onChange={(e) => {
                        setQuestionErr(false);
                        handleChange(e);
                      }}
                      placeholder={"Enter the question"}
                      radius="7px"
                      width="500px"
                    />
                  </div>
                </div>

                <div className="ae-formFields">
                  <div className="ae-inputField">
                    <InputField
                      name={"answer"}
                      isErr={ansErr}
                      errorMsg={"Please fill in the field"}
                      value={newData?.answer}
                      onChange={(e) => {
                        setansErr(false);
                        handleChange(e);
                      }}
                      placeholder={"Write the answer"}
                      radius="7px"
                      width="500px"
                    />
                  </div>

                  {/* <div
                      className="ae-inputField"
                      style={{ position: "relative" }}
                    >
                      <div className="ar-selectText">Content Type</div>
                      <Select
                        options={options}
                        placeholder={"Select Content Type"}
                        value={options[recentNews?.content_type]}
                        className="ae-select"
                        onChange={(data) => {
                          setcontentErr(false);
                          handleChange({
                            target: { name: "content_type", value: data.value },
                          });
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            //   backgroundColor: state.isFocused ? "white" : "#F5F6FA",
                            width: "310px",
                            border: `1px solid ${
                              contentErr ? "red" : " lightgray"
                            }`,
                            borderColor: contentErr ? "red" : "lightgray",
                            //   marginLeft: "4px",
                            marginRight: "0px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            padding: "0px 13px",
                          }),
                        }}
                      />
                      <div
                        className="err-txt"
                        style={{
                          display: contentErr ? "flex" : "none",
                          width: "150px",
                          position: "absolute",
                          bottom: "0",
                        }}
                      >
                        Catageory is required
                      </div>
                    </div> */}
                </div>
              </div>

              <div className="addEdit-btns">
                <div className="ev-btnAdd ev-btn">
                  <button
                    className="editPage_btn"
                    style={{ backgroundColor: PRIMARY, color: "white" }}
                    disabled={isLoading}
                    onClick={saveOnclick}
                  >
                    {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Add"}
                  </button>
                </div>
                <div className="ev-btnDel ev-btn">
                  <button
                    className="editPage_btn"
                    style={{ color: PRIMARY }}
                    disabled={isLoading}
                    onClick={() => {
                      navigate("/dashboard/faq", {
                        state: { page: page },
                      });
                    }}
                  >
                    {isEdit ? "Discard" : "Back"}
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
