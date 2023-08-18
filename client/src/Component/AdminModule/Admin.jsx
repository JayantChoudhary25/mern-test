import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "../Css/admin.module.css";
import stylelogin from "../Css/Login.module.css";
import "../Css/style.css";
import "./style.css"

import logo from "../Assets/logo.svg";
import menu_icon from "../Assets/menu_icon.svg";
import logoutIcon from "../Assets/admin/logout.svg";

const MainPage = () => {
  return (
    <>
      <div className={style.dashboard_main}>
        <div className="">
          <div className={style.dahboard_inner}>
            <p className={`text-center mb-3 ${style.welcome}`}>Welcome to </p>
            <p className={`text-center ${style.heading}`}>
              <span className="text_secondary fw-600">Admin</span>
              <span className="text_primary ms-md-3 ms-2">Dashboard</span>
            </p>
          </div>
          <div className={`text-center mb-3 ${style.dashboard_img}`}>
            <img src="" alt="" className="img-fluid" />
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
    icon: `$`,
  },
  {
    id: 2,
    label: "User List",
    component: "",
    icon: ``,
  },
  {
    id: 3,
    label: "Send Invitation",
    component: "",
    icon: ``,
  },
  {
    id: 4,
    label: "Subscription List",
    component: "",
    icon: ``,
  },
  {
    id: 5,
    label: "Invitation List",
    component: "",
    icon: ``,
  },
  {
    id: 6,
    label: "All Products",
    component: "",
    icon: ``,
  },
  {
    id: 7,
    label: "Graphs",
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
    navigate("/");
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
                      <img
                        src={list.icon}
                        alt=""
                        style={{ height: "18px", width: "18px" }}
                      />
                      {/* {list.label} */}
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
                ></button>
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
                          <img
                            src={list.icon}
                            alt=""
                            style={{ height: "18px", width: "18px" }}
                          />
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
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={handleOpen}
                  >
                    <img
                      src={logoutIcon}
                      alt="logout"
                      style={{
                        height: "18px",
                        width: "18px",
                        marginRight: "6px",
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
        <div className={`${style.left_section} left_section` }>
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
                    <img
                      src={list.icon}
                      alt=""
                      style={{ height: "18px", width: "18px" }}
                    />
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
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={handleOpen}
            >
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
