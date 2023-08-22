import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import avatar from "../../Assets/logo.svg";
import "./Admin.css";

export const Admin_Login = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [isLoader, setLoader] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("accessToken"))
  );

  const [admindata, setAdmindata] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (token) {
  //     navigate("/admin");
  //   }
  // }, []);

  const input_handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdmindata({ ...admindata, [name]: value });
  };

  const form_handler = async (e) => {
    e.preventDefault();
    setLoader(true);
    await axios
      .post("/api/auth/login", admindata, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          sessionStorage.setItem("accessToken", JSON.stringify(res?.data?.token));
          setUserDetails(res?.data?.user);
          navigate("/admin");
          toast.success("Login successfully!");
          setLoader(false);
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  function handleClickShowPassword() {
    setShowPass(!isShowPass);
  }

  return (
    <>
      <div className="contentAdmin">
        <div className="login">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <h3>Welcome to Admin Login</h3>

          <form className="login-form" onSubmit={form_handler}>
            <div className="textbox my-2">
              <input
                type="email"
                placeholder="Username"
                id="uname"
                name="email"
                onChange={input_handler}
                required
              />
              <span class="material-symbols-outlined">
                {" "}
                <i class="fas fa-user-alt"></i>{" "}
              </span>
            </div>
            <div class="textbox pwd_input">
              <input
                placeholder="Password"
                type={isShowPass ? "text" : "password"}
                id="pwd"
                name="password"
                onChange={input_handler}
                required
              />
              <div
                className="pwd_icon"
                onClick={handleClickShowPassword}
              >
                {isShowPass ? (
                  <RemoveRedEyeIcon style={{ height: "18px", width: "16px" }} />
                ) : (
                  <VisibilityOffIcon
                    style={{ height: "18px", width: "16px" }}
                  />
                )}
              </div>
            </div>
            {isLoader ? (
              <button type="button" className="inactive_btn">
                Loading...
              </button>
            ) : (
              <button type="submit">LOGIN</button>
            )}
            <Link to="">
              <a href="#">Forgot your credentials?</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
