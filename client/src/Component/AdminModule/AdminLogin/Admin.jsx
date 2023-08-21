import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import avatar from "../../Assets/logo.svg"
import "./Admin.css";


export const Admin_Login = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );

  // useEffect(()=>{

  //     if(token){
  //         navigate("/admindash")
  //     }
  // },[])

  const [admindata, setAdmindata] = useState({
    email: "",
    password: "",
  });

  const input_handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdmindata({ ...admindata, [name]: value });
  };

  const form_handler = async (e) => {
    e.preventDefault();
    navigate("/admin");
    await axios
      .post("/api/auth/login", admindata, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        
        console.log(res);
        if (res?.status === 200) {
          localStorage.setItem("accessToken", JSON.stringify(res?.data?.token));
          setUserDetails(res?.data?.user);
          toast.success("Login successfully!");
        } else {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="contentAdmin">
        <div className="login">
          <div className="avatar"><img src={avatar} /></div>
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
            <div class="textbox mb-3">
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                name="password"
                onChange={input_handler}
                required
              />
              <span class="material-symbols-outlined">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            <button type="submit">LOGIN</button>
            <Link to="">
              <a href="#">Forgot your credentials?</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
