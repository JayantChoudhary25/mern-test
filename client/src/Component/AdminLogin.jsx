import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { adminlogin } from "../actions/UserAction";
import style from "../Component/Css/Login.module.css";

import perswell_logo from "./Assets/logo.svg";

export const AdminLogin = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminlogin(userDetail));
  };
  const handlechange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const handle = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
    setInterval(() => {
      const valued = e.target.value.trim();
      if (valued.length < 8) {
        setErrorMessage("Password is less 8 than");
      } else {
        setErrorMessage("");
      }
    }, 2000);
  };

  function handleClickShowPassword() {
    setShowPass(!isShowPass);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        toast.success("Login Successfull");
        navigate("/admin");
      } else if (user.role === "User") {
        toast.success("Login Successfull");
        navigate("/Dashboard");
      }
    }
    if (isAuthenticated === "true") {
      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "User") {
        toast.success("Login Successfull");
        navigate("/Dashboard");
      }
    }
    if (error) {
      console.log(error);
      toast.error(error);
    }
  }, [user, isAuthenticated]);

  return (
    <div>
      <div className={style.login_screen}>
        <div className="container">
          {/* header */}
          <div className="perswell_header">
            <div className="perswell_logo">
              <img src={perswell_logo} alt="loading..." className="img-fluid" />
            </div>
          </div>
          {/* header */}

          {/* center div */}
          <div className={` ${style.centerbox}`}>
            <div
              className="Line1"
              style={{
                width: "100%",
                border: "0.50px #FEFCFF solid",
              }}
            ></div>
            <h1 className={`${style.WelcomeToPerswell}`}>
              Welcome to Perswell
            </h1>
            <div className={`mb-5 ${style.Rectangle}`}>
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-7 col-md-8 col-10">
                  <form
                    onSubmit={handleSubmit}
                    className={`w-100 ${style.loginform}`}
                  >
                    <div className={` ${style.formheading}`}>
                      Log in to admin account
                    </div>
                    <div className="my-4 w-100">
                      <label
                        htmlFor=""
                        style={{ display: "flex", width: "inherit" }}
                      >
                        <input
                          type="email"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Work Email"
                          name="email"
                          value={userDetail.email}
                          onChange={handlechange}
                          autoComplete="new-password"
                          required
                          className={style.custom_input}
                        />
                      </label>
                    </div>
                    <div
                      className="my-4 w-100"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <input
                        placeholder="Password"
                        type={isShowPass ? "text" : "password"}
                        id="exampleInputPassword1"
                        required
                        onChange={handlechange}
                        value={userDetail.password}
                        name="password"
                        autoComplete="new-password"
                        className={style.custom_input}
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
                    {errorMessage === "" ? null : (
                      <p className={`${style.errorText} `}>{errorMessage}</p>
                    )}
                    <div className="row justify-content-center align-items-center w-100">
                      <div className="col-lg-8 col-md-6 col-10 buttons mt-5">
                        {loading ? (
                          <button type="submit" className="cta-01 inactive_btn">
                            <span> Loading..</span>
                          </button>
                        ) : (
                          <button type="submit" className="cta-01 ms-0">
                            <span> Log in </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};