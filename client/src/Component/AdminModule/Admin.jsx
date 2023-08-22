import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { UserList } from "./AdminPages/UserList";
import Dashboard from "../Assets/admin/dashboard.svg";
import { Business_page } from "./AdminPages/BusinessPage";
import { NonSignedUser } from "./AdminPages/NonSignedUser";
import { SubscribedUser } from "./AdminPages/SubscribedUser";
import { SignedUser } from "./AdminPages/SignedUser";

import style from "../Css/admin.module.css";
import stylelogin from "../Css/Login.module.css";
import "../Css/style.css";
import "./style.css";

import logo from "../Assets/logo.svg";
import menu_icon from "../Assets/menu_icon.svg";
import logoutIcon from "../Assets/admin/logout.svg";
import User from "../Assets/dashboard/user.svg";
import Test from "./test";
import Home from "./Assets/Home";

const MainPage = () => {
  return (
    <>
      <div className={style.dashboard_main}>
        <div className="">
          <div className={style.dahboard_inner}>
            <p className={`text-center mb-1 ${style.welcome}`}>Welcome to </p>
            <p className={`text-center ${style.heading}`}>
              <span className="text_secondary fw-600">Admin</span>
              <span className="text_primary ms-md-3 ms-2">Dashboard</span>
            </p>
          </div>
          <div className={`text-center mb-3 ${style.dashboard_img}`}>
            <img src={Dashboard} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

const adminDashList = [
  {
    id: 1,
    label: "Dashboard",
    component: <MainPage />,
    icon: "",
  },
  {
    id: 2,
    label: "All Users",
    component: <UserList />,
    icon: "",
  },
  {
    id: 3,
    label: "Business Plan",
    component: <Business_page />,
    icon: "",
  },
  {
    id: 4,
    label: "Signed User",
    component: <SignedUser />,
    icon: "",
  },
  {
    id: 5,
    label: "Non-Signed User",
    component: <NonSignedUser />,
    icon: '',
  },
  {
    id: 6,
    label: "Subscribed User",
    component: <SubscribedUser />,
    icon: '',
  },
  {
    id: 7,
    label: "",
    component: "",
    icon: ``,
  },
];

export const Admin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("Dashboard");
  const [labelId, setLabelId] = useState(1);

  // logout
  const handleOpen = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/admin-login");
  };

  const handleComponent = (label, id) => {
    setShow(label);
    setLabelId(id);
  };

  return (
    <section className={style.dashboard_section}>
      {/* mobile drawer start */}
      <div className="mobile_drawer">
        <nav className="navbar fixed-top">
          <div className="container-fluid">
            <div className="w-100 toggle_btn">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <img
                  src={menu_icon}
                  alt=""
                  style={{ height: "25px", width: "25px" }}
                />
              </button>
              <div className="mobile_leftsection">
                <div className="left_menu w-100 px-md-2 px-1">
                  {adminDashList.map((list, inx) => (
                    <span
                      key={inx}
                      className={` ${
                        list?.id === labelId ? style.active : style.menu_links
                      }`}
                      onClick={() => handleComponent(list.label, list.id)}
                    >
                      {/* <img
                        src={list.icon}
                        alt=""
                        style={{ height: "18px", width: "18px" }}
                      /> */}
                      {list.icon}
                    </span>
                  ))}
                </div>
                <b
                  className="text-center px-2 mb-4"
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  onClick={handleOpen}
                >
                  <img
                    src={logoutIcon}
                    alt="logout"
                    style={{
                      height: "18px",
                      width: "18px",
                      marginRight: "3px",
                    }}
                  />
                </b>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <div className={`${stylelogin.headers}`}>
                  <img src={logo} alt="loading..." className="img-fluid" />
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <HighlightOffIcon />
                </button>
              </div>
              <div className={`${style.mobile_left_section}`}>
                <div className="">
                  <div className="">
                    <div className={`${style.left_menu}`}>
                      {adminDashList.map((list, inx) => (
                        <span
                          key={inx}
                          className={` ${
                            list?.id === labelId
                              ? style.active
                              : style.menu_links
                          }`}
                          onClick={() => handleComponent(list.label, list.id)}
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          {/* <img
                            src={list.icon}
                            alt=""
                            style={{ height: "18px", width: "18px" }}
                          /> */}
                          <span
                            className=""
                            style={{ height: "20px", width: "20px" }}
                          >
                            {list.icon}
                          </span>
                          {list.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className=" mb-4">
                  <div
                    className="px-2 mb-5"
                    style={{
                      width: "95%",
                      border: "0.20px #FEFCFF solid",
                    }}
                  ></div>
                  <b
                    className="text-center px-2"
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={handleOpen}
                  >
                    <img
                      src={logoutIcon}
                      alt="logout"
                      style={{
                        height: "18px",
                        width: "18px",
                        marginRight: "10px",
                      }}
                    />
                    Sign Out
                  </b>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* mobile drawer end */}

      {/* desktop view start*/}
      <div className="d-flex">
        <div className={`${style.left_section} left_section`}>
          <div className="">
            <div className={`${stylelogin.headers}`}>
              <img src={logo} alt="loading..." className="img-fluid" />
            </div>
            <div className="">
              <div className={`${style.left_menu}`}>
                {adminDashList.map((list, inx) => (
                  <span
                    key={inx}
                    className={` ${
                      list?.id === labelId ? style.active : style.menu_links
                    }`}
                    onClick={() => handleComponent(list.label, list.id)}
                  >
                    {/* <img
                      src={list.icon}
                      alt=""
                      style={{ height: "18px", width: "18px" }}
                    /> */}

                    {list.icon}
                    {list.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className=" mb-4">
            <div
              className="px-2 mb-5"
              style={{
                width: "95%",
                border: "0.20px #FEFCFF solid",
              }}
            ></div>
            <b className="text-center px-2 sign_out" onClick={handleOpen}>
              <img
                src={logoutIcon}
                alt="logout"
                style={{ height: "18px", width: "18px", marginRight: "5px" }}
              />
              Sign Out
            </b>
          </div>
        </div>
        <div className={`${style.right_section}`}>
          {adminDashList.map((item, inx) => (
            <div>{item.id === labelId && item.component}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
