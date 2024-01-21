import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import InputField from "../../components/InputField/InputField";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import "animate.css";
import Header from "../../components/header/Header";
import noImage from "../../assets/avatar1.png";
import { ContactIcon, FaqIcon } from "../../SVGS";
import { PRIMARY } from "../../constants/Colors";
import { Enums } from "../../constants/Enums";
import { postFaq } from "../../api/faq";
import { ErrorCode, ErrorMessages } from "../../constants/ErrorCodes";
import icons_bank from "../../Icons";
import { ConsoleData } from "../../constants/CommonFunctions";
import { postServiceCard } from "../../api/service";
import { postWhyChooseUsCards } from "../../api/WhyChooseUs";

export default function SpecialityAddEdit({ isEdit }) {
  const icon = () => {
    return <ContactIcon width="26" height="30" fill={PRIMARY} />;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const prevData =
    location.state && location.state ? location.state.editData : null;
  const page = location.state && location.state ? location.state.page : null;

  const [isLoading, setIsLoading] = useState(false);
  const [titleErr, settitleErr] = useState(false);
  const [typeErr, settypeErr] = useState(false);
  const [descriptionErr, setdescriptionErr] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [iconArray, setIconArray] = useState([]);
  const [isMainArr, setIsMainArr] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [newData, setNewData] = useState({
    id: prevData ? prevData.id : 0,
    icon_number: prevData ? prevData.icon_number : null,
    heading: prevData ? prevData.heading : "",
    description: prevData ? prevData.description : "",
  });

  // fetching initial data
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsMainArr([
      { value: 1, label: "Home page" },
      { value: 2, label: "Services page icon card" },
      { value: 3, label: "Services page service qualities" },
    ]);
    if (newData.icon_number) {
      let Icon = icons_bank[newData.icon_number - 1];
      setSelectedIcon({
        value: newData.icon_number,
        label: [
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px" }}>{newData.icon_number}.</span>
            <Icon size={16} fill={PRIMARY} />
          </div>,
        ],
      });
    } else setSelectedIcon({ value: 0, label: "None" });
    setOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const setOptions = () => {
    let arr = [{ value: 0, label: "None" }];
    for (let index = 0; index < icons_bank.length; index++) {
      const Element = icons_bank[index];
      let obj = {
        value: index + 1,
        label: [
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px" }}>{index + 1}.</span>
            <Element size={18} fill={PRIMARY} />
          </div>,
        ],
      };
      arr.push(obj);
    }
    setIconArray(arr);
  };

  const saveOnclick = () => {
    if (isValidData()) {
      let obj = {
        id: newData.id,
        icon_number: newData.is_main == 2 ? newData.icon_number : null,
        heading: newData.heading,
        description: newData.description,
      };
      setErr(false);
      setIsLoading(true);
      postWhyChooseUsCards(obj)
        .then(({ data }) => {
          setIsLoading(false);
          if (
            data.error_code == ErrorCode.success ||
            data.error_code == ErrorCode.updated
          ) {
            navigate("/dashboard/speciality", {
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
    }
  };

  function isValidData() {
    if (!newData.heading) settitleErr(true);
    else if (!newData.description) setdescriptionErr(true);
    else return true;
    return false;
  }

  return (
    <>
      <div className="mainDashView">
        <div>
          <Header svg={icon} DashboardNavText={"Speciality Cards"} />
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
                      name={"heading"}
                      isErr={titleErr}
                      errorMsg={"Please fill in the field"}
                      value={newData?.heading}
                      onChange={(e) => {
                        settitleErr(false);
                        handleChange(e);
                      }}
                      cat={"Title"}
                      placeholder={"Title of the card"}
                      radius="7px"
                      width="400px"
                    />
                  </div>
                  <div
                    className="ae-inputField"
                    style={{ position: "relative", marginLeft: "25px" }}
                  >
                    <div className="ar-selectText">Icon</div>
                    <Select
                      options={iconArray}
                      placeholder={"Select Icon"}
                      value={selectedIcon}
                      className="ae-select"
                      onChange={(data) => {
                        setSelectedIcon(data);
                        handleChange({
                          target: { name: "icon_number", value: data.value },
                        });
                      }}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "310px",
                          border: `1px solid lightgray`,
                          borderColor: "lightgray",
                          //   marginLeft: "4px",
                          marginRight: "0px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          padding: "0px 13px",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="ae-formFields">
                  <div className="ae-inputField">
                    <label className="input-main-style">
                      <div className="if-txt">Description</div>
                      <textarea
                        name={"description"}
                        rows={5}
                        className="description_text"
                        value={newData?.description}
                        onChange={(e) => {
                          setdescriptionErr(false);
                          handleChange(e);
                        }}
                        placeholder={"Write the description"}
                      />
                      {descriptionErr ? (
                        <div
                          className="err-txt"
                          style={{
                            display: "flex",
                            width: "150px",
                            position: "absolute",
                          }}
                        >
                          Required*
                        </div>
                      ) : null}
                    </label>
                  </div>
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
                      navigate("/dashboard/service-cards", {
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
