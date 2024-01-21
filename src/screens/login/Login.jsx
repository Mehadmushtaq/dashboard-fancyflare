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
import { login } from "../../api/user";
import { isValidEmail } from "../../constants/TextUtils";
import { ErrorCode, ErrorMessages } from "../../constants/ErrorCodes";
import { LOGIN_USER } from "../../constants/ConstantVariable";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passErr, setPassErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("err");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errDisplay, setErrDisplay] = useState("none");
  const [showPass, setshowPass] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem(LOGIN_USER));
    if (user) navigate("/dashboard");
  }, []);

  const signinOnclick = () => {
    if (!email) setEmailErr(true);
    else if (isValidEmail(email)) {
      setEmailErr(true);
      setEmailErrMsg("Invalid email");
    } else if (!pass) {
      setEmailErr(false);
      setPassErr(true);
    } else {
      setIsErr(false);
      setEmailErr(false);
      setPassErr(false);
      let user = {
        email: email,
        password: pass,
      };
      setIsLoading(true);
      login(user)
        .then(({ data }) => {
          setIsLoading(false);
          if (data.error_code == ErrorCode.success) {
            localStorage.setItem(
              LOGIN_USER,
              JSON.stringify(data?.result?.email)
            );
            setErrDisplay("none");
            navigate("/dashboard/main");
          } else if (
            data.error_code == ErrorCode.invalid_cred ||
            data.error_code == ErrorCode.invalid_password ||
            data.error_code == ErrorCode.not_exist
          ) {
            setIsErr(true);
            setErrMsg(ErrorMessages.invalid_credentials);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsErr(true);
          setErrMsg(ErrorMessages.network_error);
        });
    }
  };

  function handlePasswordVisibility() {
    setshowPass(!showPass);
  }

  return (
    <div className="main_container_login">
      <div className="login-MainContainer">
        <div className="login-logo">
          <span className="logoImg">
            <img height="75" width="280" src={Logo} alt="logo" />
          </span>
        </div>

        <div style={{ minHeight: "170px" }}>
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
            <div className="login-field email">
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
              {emailErr ? (
                <div className="invalid_err">
                  {emailErrMsg ? emailErrMsg : "Email is required"}*
                </div>
              ) : null}
            </div>
            <div className="login-field pass">
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
                  {showPass ? <BsEye size={19} /> : <BsEyeSlash size={16} />}
                </div>
              </label>
              {passErr ? (
                <div className="invalid_err">Password is required*</div>
              ) : null}
              <p className="login_fp">
                <NavLink to="/forgetPass">Forgot Password?</NavLink>
              </p>
            </div>
          </div>
        </div>

        <div className="loginbuttonDiv">
          {isErr ? (
            <div className="ErrMsg">Invalid Email or Password</div>
          ) : null}
          <button
            className="loginbutton"
            disabled={isLoading}
            onClick={signinOnclick}
          >
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
