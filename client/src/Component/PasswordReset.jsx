import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import style from "../Component/Css/Login.module.css";
import style2 from "../Component/Css/ForgotPassword.module.css";

import perswell_logo from "./Assets/logo.svg";

export const PasswordReset = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams("");

  const [password, setPassword] = useState("");
  const [isLoading, SetLoading] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setInterval(() => {
      const valued = e.target.value.trim();
      if (valued.length < 8) {
        setErrorMessage(true);
      } 
    }, 2000);
  };

  function handleClickShowPassword() {
    setShowPass(!isShowPass);
  }

  const handleSubmit = async (e) => {
alert("ok")
    e.preventDefault();
    const reqBody = {
      resetToken: token,
      password: password,
    };
    if(!errorMessage){
        SetLoading(true);
        await axios
          .post("/api/auth/resetPassword", reqBody)
          .then((res) => {
            console.log("res", res);
            if (res?.status === 201) {
              toast.success(res?.data?.data);
              setPassword("");
              setErrorMessage(false);
              SetLoading(false);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              SetLoading(false);
              setPassword(false);
              toast.error("Something went wrong, please try again !");
              return;
            }
          })
          .catch((e) => {
            SetLoading(false);
            console.log(e);
            toast.error(e?.response?.data);
          });
    }
  };

  return (
    <div>
      <div className={style2.section}>
        <div className={`container`}>
          {/* header start*/}
          <div className="perswell_header">
            <div className="perswell_logo">
              <img src={perswell_logo} alt="loading..." className="img-fluid" />
            </div>
          </div>
          {/* header end*/}

          {/* center div */}
          <div className={`${style.centerbox}`}>
            <div
              className="Line1"
              style={{
                width: "100%",
                border: "0.50px #FEFCFF solid",
              }}
            ></div>
            <div className={`${style2.box}`}>
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-7 col-md-8 col-11">
                  <form
                    onSubmit={handleSubmit}
                    className={`w-100 ${style.loginform}`}
                  >
                    <h6 className={`${style2.heading}`}>Reset Password</h6>
                    <div
                      className="mt-5 mb-3 w-100"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <input
                        required
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        className={style.custom_input}
                        placeholder="Enter new password"
                        type={isShowPass ? "text" : "password"}
                      />
                      <div
                        className={`${style.pwd_icon} `}
                        onClick={handleClickShowPassword}
                      >
                        {isShowPass ? (
                          <RemoveRedEyeIcon
                            style={{ height: "18px", width: "16px" }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            style={{ height: "18px", width: "16px" }}
                          />
                        )}
                      </div>
                    </div>
                    {errorMessage? null : (
                      <p className={`${style.errorText} `}>Password is less than 8</p>
                    )}

                    <div className="buttons mt-5">
                    {
                        isLoading?
                      <button disabled className="cta-01 inactive_btn">
                        <span>Loading... </span>
                      </button>
                      :
                      <button type="submit" className="cta-01">
                        <span>Reset </span>
                      </button>
                    }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};
