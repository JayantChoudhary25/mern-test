import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import style from "../Component/Css/Login.module.css";
import style2 from "../Component/Css/ForgotPassword.module.css";

import perswell_logo from "./Assets/logo.svg";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [isLoading, SetLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true);

    await axios
      .post("/api/auth/forgotPassword", { email: email })
      .then((res) => {
        console.log("res", res);
        if (res?.status === 200) {
          toast.success("Reset link send to your email !");
          setEmail("");
          SetLoading(false);
        } else {
          SetLoading(false);
          setEmail("");
          toast.error("Something went wrong, please try again !");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e?.response?.data);
        SetLoading(false);
      });
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
                    <h6 className={`${style2.heading}`}>Forgot Password</h6>
                    <div className="mt-5 mb-3 w-100">
                      <label
                        htmlFor=""
                        className={`px-1 ${style2.label}`}
                        style={{ display: "flex", width: "inherit" }}
                      >
                        Enter your mail to reset password
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="new-password"
                        required
                        className={style.custom_input}
                      />
                    </div>

                    <div className="buttons mt-5">
                      {isLoading ? (
                        <button disabled className="cta-01 inactive_btn">
                          <span>Loading... </span>
                        </button>
                      ) : (
                        <button type="submit" className="cta-01">
                          <span>Send </span>
                        </button>
                      )}
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
