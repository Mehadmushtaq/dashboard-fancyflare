import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { generateCode, login, resetPassword, verifyCode } from "../../api/user";
import { ErrorCode, ErrorMessages } from "../../constants/ErrorCodes";
import { ADMIN_EMAIL } from "../../constants/ConstantVariable";

export default function ForgetPass() {
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [codeErr, setCodeErr] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [view, setview] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const navigate = useNavigate("");

  const sendCodeOnclick = () => {
    setIsLoading(true);
    generateCode({ email: ADMIN_EMAIL })
      .then(({ data }) => {
        setIsLoading(false);
        if (data.error_code == ErrorCode.success) {
          setview(2);
          setIsCodeSent(true);
        } else if (
          data.error_code == ErrorCode.invalid_cred ||
          data.error_code == ErrorCode.not_exist
        ) {
          alert(ErrorMessages.invalid_credentials);
          //   setErrMsg(ErrorMessages.invalid_credentials);
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert(ErrorMessages.network_error);
      });
  };

  function verifyCodeOnclick() {
    if (!code) setCodeErr(true);
    else {
      setIsLoading(true);
      let obj = { email: ADMIN_EMAIL, code: code };
      verifyCode(obj)
        .then(({ data }) => {
          setIsLoading(false);
          if (data.error_code == ErrorCode.success) {
            setview(3);
            setIsCodeSent(false);
            setIsCodeVerified(true);
          } else if (
            data.error_code == ErrorCode.invalid_cred ||
            data.error_code == ErrorCode.not_exist
          ) {
            setIsErr(true);
            // alert(ErrorMessages.invalid_credentials);
          } else alert("Some error occured.");
        })
        .catch(() => {
          setIsLoading(false);
          alert(ErrorMessages.network_error);
        });
    }
  }

  function resetPass() {
    if (!pass) setPassErr(true);
    else if (pass != confirmPass) setConfirmErr(true);
    else {
      setIsLoading(true);
      let obj = { email: ADMIN_EMAIL, new_password: pass };
      resetPassword(obj)
        .then(({ data }) => {
          setIsLoading(false);
          if (data.error_code == ErrorCode.success) {
            navigate("/");
          }
        })
        .catch(() => {
          setIsLoading(false);
          alert(ErrorMessages.network_error);
        });
    }
  }

  return (
    <div className="main_container_login">
      {view == 1 ? (
        <div className="login-MainContainer">
          {isCodeSent || isCodeVerified ? null : (
            <div className="login-logo">
              <h4 style={{ color: "white" }}>Send code on email</h4>
            </div>
          )}
          <div className="loginbuttonDiv">
            <button
              className="loginbutton"
              disabled={isLoading}
              onClick={sendCodeOnclick}
            >
              {isLoading ? <LoadingSpinner /> : "Send code"}
            </button>
          </div>
        </div>
      ) : view == 2 ? (
        <div className="login-MainContainer">
          <div>
            <div style={{ position: "relative" }}>
              <div className="login-field">
                <input
                  className="login-input border"
                  placeholder="Enter the code send on your email"
                  type="number"
                  defaultValue={code ? code : ""}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeErr(false);
                    setIsErr(false);
                  }}
                  style={{ width: "100%", margin: "10px 0" }}
                />
                <label htmlFor="email"></label>
                {codeErr ? (
                  <div className="invalid_err" style={{ top: "-7px" }}>
                    Code is required*
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="loginbuttonDiv">
            {isErr ? <div className="ErrMsg">Invalid code</div> : null}
            <button
              className="loginbutton"
              disabled={isLoading}
              onClick={verifyCodeOnclick}
            >
              {isLoading ? <LoadingSpinner /> : "Verify Code"}
            </button>
          </div>
        </div>
      ) : (
        <div className="login-MainContainer">
          {isCodeSent || isCodeVerified ? null : (
            <div className="login-logo">
              <h4 style={{ color: "white" }}>Reset Password</h4>
            </div>
          )}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div className="login-field email">
                <input
                  className="login-input border"
                  placeholder="Password"
                  type="text"
                  defaultValue={pass ? pass : ""}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setPassErr(false);
                  }}
                />
                <label htmlFor="email"></label>
                {passErr ? <div className="invalid_err">Required*</div> : null}
              </div>
            </div>
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <div className="login-field email">
                <input
                  className="login-input border"
                  placeholder="Confirm password"
                  type="text"
                  defaultValue={confirmPass ? confirmPass : ""}
                  onChange={(e) => {
                    setConfirmErr(false);
                    setConfirmPass(e.target.value);
                  }}
                />
                <label htmlFor="email"></label>
                {confirmErr ? (
                  <div className="invalid_err">Both fields not matched</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="loginbuttonDiv">
            <button
              className="loginbutton"
              disabled={isLoading}
              onClick={resetPass}
            >
              {isLoading ? <LoadingSpinner /> : "Reset"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
