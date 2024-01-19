import React, { useState, useEffect } from "react";
import "./Login.css";
// import 'animate.css'
import Modal from "react-modal";
// import { loginUser } from "../../api";
import Logo from "../../assets/logo.png";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { RxCross2 } from "react-icons/rx";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passErr, setPassErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errDisplay, setErrDisplay] = useState("none");
  const [showPass, setshowPass] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("adminUser"));
    if (user) navigate("/dashboard");
  }, []);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const signinOnclick = () => {
    if (email === "") setEmailErr(true);
    else if (!validateEmail(email)) {
      setEmailErr(true);
      setEmailErrMsg("Invalid email");
    } else if (pass === "") {
      setEmailErr(false);
      setPassErr(true);
    } else {
      setEmailErr(false);
      setPassErr(false);
      let user = {
        email: email,
        password: pass,
      };
      setIsErr(false);
      setIsLoading(true);
      // loginUser(user)
      //   .then(({ data }) => {
      //     setIsLoading(false);
      //     if (data.success) {
      //       localStorage.setItem(
      //         "adminUser",
      //         JSON.stringify(data.result.email)
      //       );
      //       setErrDisplay("none");
      //       navigate("/dashboard/dashPanel", {
      //         state: { adminUserData: data.result },
      //       });
      //     } else {
      //       // setIsErr(true);
      //       setModalIsOpen(true);
      //       setErrMsg(data.message);
      //     }
      //     if (data.message === "No Record Found.") {
      //       setErrDisplay("block");
      //     }
      //   })
      //   .catch((err) => {
      //     setIsLoading(false);
      //     setIsErr(true);
      //     setErrMsg(err.message);
      //     alert("Login Response Error", err);
      //   });
    }
  };

  const handleModal = () => {
    setModalIsOpen(false);
  };

  function handlePasswordVisibility() {
    setshowPass(!showPass);
  }

  return (
    <>
      {/* <Modal
        isOpen={modalIsOpen}
        className="loginModal animate__animated animate__zoomIn"
        style={{ display: "flex" }}
      >
        <>
          <div
            className="delClient-cross"
            onClick={(e) => {
              setModalIsOpen(false);
            }}
          >
            <RxCross2 color="white" size={"20"} />
          </div>
          <>
            <h3 style={{ color: "white", marginBottom: "60px" }}>{errMsg}</h3>

            <Gbtn
              text="OK"
              color="#EE282E"
              radius="6px"
              width="40%"
              func={handleModal}
            />
          </>
        </>
      </Modal> */}
      <div className="login-MainContainer">
        <div className="login-logo">
          <span className="logoImg">
            <img height="95" width="225" src={Logo} alt="logo" />
          </span>
          <h2 className="logoTxt">Get Started</h2>
        </div>

        <div className="ErrMsg" style={{ display: errDisplay }}>
          Invalid Email or Password !!
        </div>
        <div style={{ minHeight: "170px" }}>
          {isLoading ? (
            <div
              style={{
                height: "170px",
              }}
            >
              <LoadingSpinner height="100%" />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div
                className="err"
                style={{
                  display: isErr ? "none" : "none",
                  fontSize: "0.9rem",
                  position: "absolute",
                  top: "-5px",
                  left: "3px",
                }}
              >
                {errMsg}
              </div>
              <div className="login-field">
                <p className="login-fieldTxt">Email</p>
                <input
                  className="login-input border"
                  type="email"
                  defaultValue={email ? email : ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrMsg("");
                    setErrDisplay("none");
                  }}
                />
                <label htmlFor="email"></label>
                <div
                  className="err-txt"
                  style={{
                    display: emailErr ? "flex" : "none",
                    width: "150px",
                    position: "absolute",
                  }}
                >
                  {emailErrMsg ? emailErrMsg : "Email is required"}
                </div>
              </div>
              <div className="login-field">
                <p className="login-fieldTxt">Password</p>
                <label
                  className="login-input-label"
                  style={{ display: "flex", border: "1px solid lightgray" }}
                >
                  <input
                    className="login-input no-border"
                    type={showPass ? "text" : "password"}
                    defaultValue={pass ? pass : ""}
                    onChange={(e) => {
                      setPass(e.target.value);
                      setErrDisplay("none");
                    }}
                  />
                  <div className="pass-eye" onClick={handlePasswordVisibility}>
                    {showPass ? <BsEye size={19} /> : <BsEyeSlash size={19} />}
                  </div>
                </label>
                <div
                  className="err-txt"
                  style={{
                    display: passErr ? "flex" : "none",
                    width: "150px",
                    position: "absolute",
                  }}
                >
                  Password is required
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="loginbuttonDiv">
          <button
            className="loginbutton"
            disabled={isLoading}
            onClick={signinOnclick}
          >
            Sign In
          </button>
        </div>
        {/* <p className="login-fp">
          <NavLink to="">Forgot Password?</NavLink>
        </p> */}
      </div>
    </>
  );
}

export default Login;
