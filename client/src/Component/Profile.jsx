import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import profileStyle from "../Component/Css/Profile.module.css";
import styledashboard from "../Component/Css/Dashboard.module.css";

import perswell_logo from "./Assets/logo.svg";
import noImg from "./Assets/img1.png";
import { Button } from "@mui/material";

export const Profile = () => {
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user) {
      if (user?.role === "User" && !isAuthenticated) {
        navigate("/Dashboard");
      }
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={profileStyle.section}>
      <div className="container">
        <div className="perswell_header">
          <div className="perswell_logo">
            <a href="/Dashboard" style={{ cursor: "pointer" }}>
              <img src={perswell_logo} alt="loading..." className="img-fluid" />
            </a>
          </div>
          <div className="">
            <div className="me-3" onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <div
          className="Line1 mt-2"
          style={{
            width: "100%",
            border: "0.50px #FEFCFF solid",
          }}
        ></div>
        <div>
          <div className="row justify-content-around pt-5 mt-lg-5 px-lg-5">
            <div className="col-lg-5 col-md-9 col-12">
              <h6 className={profileStyle.product_head}>Personal Details</h6>
              <div className={profileStyle.card}>
                <img
                  src={noImg}
                  alt=""
                  className={`img-fluid ${profileStyle.no_img}`}
                />
                <div className={profileStyle.persol_info}>
                  <div className="d-flex align-items-center mt-3 mb-2">
                    <small className="">Name :</small>
                    <p className=" mb-0 ms-3">
                      {user?.Firstname}&nbsp; {user?.lastname}
                    </p>
                  </div>
                  <div className="d-flex align-items-center mt-3 mb-2">
                    <small className="text-nowrap">Email :</small>
                    <p className=" mb-0 ms-3">{user?.email}</p>
                  </div>
                  {user?.accessCode && (
                    <div className="d-flex align-items-center mt-2 mb-2">
                      <small className="">Access code :</small>
                      <p className=" mb-0 ms-3">{user?.accessCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={profileStyle.border_right}></div>
            <div className="col-lg-5 col-md-9 col-12">
              <h6 className={profileStyle.product_head}>
                Subscription Details
              </h6>
              <div className={profileStyle.card}>
                {user?.product ? (
                  <>
                    <div className="d-flex align-items-center justify-center">
                      <img
                        src={user?.productImage}
                        alt=""
                        className={`px-4 ${profileStyle.product_img}`}
                      />

                      <div className={profileStyle.persol_info}>
                        <p className="mb-0 pt-2 text-center">{user?.product}</p>

                        <div
                          className={styledashboard.popup_content}
                          dangerouslySetInnerHTML={{
                            __html: user?.description,
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={profileStyle.persol_info}>
                      <p className="mb-0 py-5 text-center">
                        No Product Selected Yet
                      </p>
                    </div>
                    <div className={profileStyle.persol_info}>
                      <a
                        href="/Dashboard"
                        style={{
                          textAlign: "center",
                          color: "#1F1F1F",
                          fontSize: 16,
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          wordWrap: "break-word",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Make Your Selection
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
