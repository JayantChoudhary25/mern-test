import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import { logout } from "../actions/UserAction";
import styledashboard from "../Component/Css/Dashboard.module.css";
import perswell_logo from "./Assets/logo.svg";
import arrawdown from "./Assets/arrowdown.svg";
import svg1 from "./Assets/svg1.svg";
import svg2 from "./Assets/svg2.svg";
import svg3 from "./Assets/svg3.svg";
import svg4 from "./Assets/svg4.svg";
import svg5 from "./Assets/svg5.svg";
import Loader from "./Loder/Index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rowId, setRowId] = useState("");
  const [isDropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedProducted, setSelectedProducted] = useState("");
  const [allData, setAllData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (user?.role === "Admin") {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
  }, [user]);

  const handleClose = () => setOpen(false);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleOpenModal = (label) => {
    setRowId("");
    setOpen(true);
    setSelectedProducted(label);
  };

  const handleOpen = () => {
    dispatch(logout());
    toast.info("Logout");
    navigate("/login");
  };

  const handleClick = (event, id) => {
    setRowId(id);
  };

  // select product start
  const handleYes = (product) => {
    setOpen(false);
    select_product(product);
  };

  const select_product = async (product) => {
    setLoader(true);
    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/selectProduct", { product: product }, config)
      .then((res) => {
        if (res?.status === 200) {
          setIsSelect(true);
          setConfirmMessage(res?.data?.message);
          setLoader(false);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          setLoader(false);
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong , Please try again");
        console.log(e);
      });
  };
  // select product end

  // get all Products start
  useEffect(() => {
    getAllProducts();
  }, [isRefresh]);

  const getAllProducts = async () => {
    setLoader(true);
    await axios
      .get("/api/auth/get_all_products")
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          setAllData(res?.data?.products);
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

  // get all Products end

  return (
    <div className="user_dshboard">
      <div className="container">
        {isLoader && <Loader />}
        <div className="perswell_header">
          <div className="perswell_logo">
            <a href="/Dashboard" style={{ cursor: "pointer" }}>
              <img src={perswell_logo} alt="loading..." className="img-fluid" />
            </a>
          </div>
          <div className="d-flex justify-content-center align-items-start">
            <div className="user me-3">
              <p className={`mb-0 ${styledashboard.welcome_text}`}>Welcome</p>
              <h6 className={styledashboard.user_name}>
                {user?.Firstname} {user?.lastname}
              </h6>
            </div>
            <div
              className="cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => setDropdown(!isDropdown)}
            >
              <div className={`${styledashboard.profile}`}>
                <img src={arrawdown} alt="" />
                {isDropdown && (
                  <div className={`${styledashboard.custom_dropdown}`}>
                    <a className="" href="/profile">
                      Profile
                    </a>
                    <div className={styledashboard.border_bottom}></div>
                    <a className="" onClick={handleOpen}>
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
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

        <div className="login">
          <p className={`mb-2 ${styledashboard.select_para}`}>
            Select your Free Subscription
          </p>
          {allData?.length > 0 && (
            <div
              className={`product row mx-lg-2 w-100 ${styledashboard.custom_card}`}
            >
              {allData?.length > 0 &&
                allData?.map((row, inx) => (
                  <div
                    className="col-lg-4 col-md-6 col-12 mb-5 px-xl-4"
                    key={inx}
                  >
                    <>
                      <div className={` ${styledashboard.custom_box}`}>
                        <div
                          className={` ${styledashboard.custom_logobox} ${
                            row?._id !== rowId && "mb-50"
                          }`}
                        >
                          <img
                            src={row?.image}
                            alt=""
                            style={{
                              width: "100px",
                              height: "auto",
                            }}
                          />
                        </div>
                        <div className="px-xl-4">
                          <div className="row justify-content-center align-items-center">
                            <div className="col-md-12 col-12 ">
                              {row?._id !== rowId && (
                                <>
                                  {row?.Product ? (
                                    <h6 className="">{row?.Product}</h6>
                                  ) : (
                                    <div className="my-4"></div>
                                  )}
                                  <div className="row justify-content-center align-items-center">
                                    <div className="col-md-8 col-10 buttons mt-50">
                                      <button
                                        type="button"
                                        className="cta-02 mx-auto"
                                        onClick={(event) =>
                                          handleClick(event, row?._id)
                                        }
                                      >
                                        more Info
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                              {row?._id === rowId && (
                                <div className={styledashboard.custom_popup}>
                                  <div
                                    className={styledashboard.close_icon}
                                    onClick={() => setRowId("")}
                                  >
                                    <CloseIcon
                                      style={{ width: "16px", height: "16px" }}
                                    />
                                  </div>
                                  <div
                                    className={styledashboard.popup_content}
                                    dangerouslySetInnerHTML={{
                                      __html: row?.description,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="row justify-content-center align-items-center">
                              <div className="col-md-8 col-10 px-0  buttons mt-3">
                                {user?.product ? (
                                  <>
                                    {row?.Product === user?.product ? (
                                      <button className="btn   active_btn">
                                        Selected
                                      </button>
                                    ) : (
                                      <button className="btn  inactive_btn">
                                        Select
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <div className="buttons">
                                    <button
                                      className="cta-01 mx-auto"
                                      onClick={() => {
                                        handleOpenModal(row?.Product);
                                      }}
                                    >
                                      <span>Select</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                ))}
            </div>
          )}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styledashboard.custom_modal}>
          <h4 className={`text-center ${styledashboard.modal_head}`}>
            Would you like to select this product?
          </h4>
          <div className="buttons d-flex mt-5 justify-content-center">
            <button className="cta-02" onClick={handleClose}>
              <span>No</span>
            </button>
            {isLoader ? (
              <button className="cta-01 btn_inactive">
                <span>...</span>
              </button>
            ) : (
              <button
                className="cta-01"
                onClick={() => handleYes(selectedProducted)}
              >
                <span>Yes</span>
              </button>
            )}
          </div>
        </Box>
      </Modal>

      <Modal
        open={isSelect}
        onClose={() => setIsSelect(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-lg-4 p-2">
            <div
              className={styledashboard.close_icon}
              onClick={() => setIsSelect(false)}
            >
              x
            </div>
            {confirmMessage && (
              <p
                className={`text-center  px-md-5 px-2 py-3 ${styledashboard.para}`}
              >
                {confirmMessage}
              </p>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
