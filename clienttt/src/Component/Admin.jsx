import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";

import socket from "../Socket";
import { Subscription } from "./AdminPages/Subscription";
import { UserList } from "./AdminPages/UserList";
import { Invitation } from "./AdminPages/Invitation";
import { SendInvitation } from "./AdminPages/SendInvitation";
import { AllProduct } from "./AdminPages/ProductList";
import { logout } from "../actions/UserAction";

import style from "./Css/admin.module.css";
import stylelogin from "./Css/Login.module.css";
import "./Css/style.css";

import perswell_logo from "./Assets/logo.svg";
import dashboard_Img from "./Assets/admin_dashboard.svg";
import Home from "./Assets/dashboard/Home.svg";
import menu_icon from "./Assets/dashboard/menu_icon.svg";
import id_card from "./Assets/dashboard/id_card.svg";
import Message from "./Assets/dashboard/Message.svg";
import subscription from "./Assets/dashboard/subscription.svg";
import User from "./Assets/dashboard/User.svg";
import product from "./Assets/dashboard/package.svg";
import logoutIcon from "./Assets/dashboard/logout.svg";
import garphIcon from "./Assets/dashboard/bar_chart.svg";
import { GraphsPage } from "./AdminPages/GraphsPage";
import NotificationsIcon from "@mui/icons-material/Notifications";

const stylebox = {
  border: "1px solid #f3f3f3",
  borderRadius: "10px",
  py: 2,
  background: "white",
  px: 2,
};

const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const [noti, setNoti] = useState("");
  const [shownoti, Setshownoti] = useState(false);
  const [isRefresh, SetRefresh] = useState(false);

  const refreshData = () => {
    SetRefresh(!isRefresh);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  useEffect(() => {
    getAllNotification();
  }, [isRefresh]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("event", (data) => {
      console.log("Received event from server:", data);
    });

    socket.on("selectproduct", (data) => {
      console.log("Received event:", data);
      setNoti(data?.data);
      notifun();
      refreshData();
    });

    const notifun = () => {
      Setshownoti(true);
      setTimeout(() => {
        Setshownoti(false);
      }, 5000);
    };
    console.log("shownoti", shownoti);

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [shownoti]);

  const getAllNotification = async () => {
    await axios
      .get(`/api/auth/getMessages`)
      .then((res) => {
        console.log("res==>", res);
        if (res.status === 200) {
          setNotifications(res?.data);
        } else {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clearNotifications = async () => {
    await axios
      .post(`/api/auth/clearMessages`)
      .then((res) => {
        if (res.status === 200) {
          refreshData();
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
      <button
        aria-describedby={id}
        type="button"
        className="btn"
        onClick={handleClick}
        style={{ position: "fixed", right: "10px", top: "10px" }}
      >
        {notifications?.length > 0 ? (
          <Badge
            badgeContent={notifications?.length}
            color="error"
            // style={{ background: "#e68713" }}
          >
            <NotificationsIcon />
          </Badge>
        ) : (
          <NotificationsIcon />
        )}
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={stylebox}>
              {notifications?.length === 0 ? (
                <h6 className="mb-0 text-center">No nofitications yet</h6>
              ) : (
                <>
                  <div
                    className={`${
                      notifications?.length > 5
                        ? "notify_main_scroll"
                        : "notify_main"
                    }`}
                  >
                    {notifications?.map((item, index) => (
                      <div className="custom_notify">
                        <div className="notify_circle"></div>
                        <p key={index} className="nofity_list mb-0">
                          {item?.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={clearNotifications}
                      style={{ fontSize: "12px", color: "#ee860e" }}
                    >
                      Clear All
                    </button>
                  </div>
                </>
              )}
            </Box>
          </Fade>
        )}
      </Popper>

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
            <img src={dashboard_Img} alt="" className="img-fluid" />
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
    icon: `${Home}`,
  },
  {
    id: 2,
    label: "User List",
    component: <UserList />,
    icon: `${User}`,
  },
  {
    id: 3,
    label: "Send Invitation",
    component: <SendInvitation />,
    icon: `${Message}`,
  },
  {
    id: 4,
    label: "Subscription List",
    component: <Subscription />,
    icon: `${subscription}`,
  },
  {
    id: 5,
    label: "Invitation List",
    component: <Invitation />,
    icon: `${id_card}`,
  },
  {
    id: 6,
    label: "All Products",
    component: <AllProduct />,
    icon: `${product}`,
  },
  {
    id: 7,
    label: "Graphs",
    component: <GraphsPage />,
    icon: `${garphIcon}`,
  },
];

export const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState("Dashboard");
  const [labelId, setLabelId] = useState(1);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role === "Admin" && isAuthenticated) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [user]);

  // logout
  const handleOpen = () => {
    dispatch(logout());
    navigate("/");
    toast.info("Logout");
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
                  <img
                    src={perswell_logo}
                    alt="loading..."
                    className="img-fluid"
                  />
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
        <div className={`${style.left_section}`}>
          <div className="">
            <div className={`${stylelogin.headers}`}>
              <img src={perswell_logo} alt="loading..." className="img-fluid" />
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
