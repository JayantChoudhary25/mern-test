import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Box, Modal, Fade, Backdrop, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import style from "../Css/AdminDash.module.css";
import EmailTemplate from "../Modal/EmailTemplate";
import Spreadsheet from "react-spreadsheet";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "16px",
  width: "auto",
};

export const SendInvitation = () => {
  const [isLoading, SetLoading] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [isSpredsheet, setSpredsheet] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [userList, setUserList] = useState({
    fName: "",
    lName: "",
    email: "",
  });
  const [data, setData] = useState([
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
  ]);
  const [duplicateEmail, setDuplicateEmail] = useState([]);
  const [isShowErr, setShowErr] = useState(false);

  const closeModal = () => {
    setPopup(false);
  };

  const handleInput = (e) => {
    setUserList({ ...userList, [e.target.name]: e.target.value });
  };

  const submitform = async (e) => {
    const reqBody = {
      email: userList.email,
      Firstname: userList.fName,
      lastname: userList.lName,
    };

    e.preventDefault();
    if (
      userList.fName === "" ||
      userList.lName === "" ||
      userList.email === ""
    ) {
      toast.error("All feilds are mendatory !");
    } else {
      SetLoading(true);
      await axios
        .post("/api/auth/singleInvite", reqBody)
        .then((res) => {
          console.log("res===>", res);
          if (res?.status === 200) {
            toast.success(res?.data?.message);
            SetLoading(false);
            clearFeilds();
          } else {
            SetLoading(false);
            toast.error("Something went wrong , Please try again!");
            clearFeilds();
            return;
          }
        })
        .catch((e) => {
          console.log("e===>", e);
          SetLoading(false);
          toast.error(e?.response?.data?.message);
        });
    }
  };

  const RefreshData = () => {
    setRefresh(!isRefresh);
  };

  const clearFeilds = () => {
    setUserList({
      fName: "",
      lName: "",
      email: "",
    });
  };

  const handleSubmit = async () => {
    const transformedData = data.map((row) => ({
      Firstname: row[0].value,
      lastname: row[1].value,
      email: row[2].value,
    }));

    // Remove objects with empty fields
    const filteredData = transformedData.filter(
      (entry) => entry.Firstname || entry.lastname || entry.email
    );

    console.log("filteredData", filteredData);
    const reqbody = {
      users: filteredData,
    };

    SetLoading(true);
    await axios
      .post("/api/auth/invite_user", reqbody)
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res?.data?.message);
          SetLoading(false);
          clearFeilds();
          setSpredsheet(false);
          RefreshData();
          toast.succes("Email sent successfully");
        } else {
          SetLoading(false);
          clearFeilds();

          return;
        }
      })
      .catch((e) => {
        console.log("e===>", e);
        SetLoading(false);
        setSpredsheet(false);
        if (e?.response?.data?.invitations) {
          setDuplicateEmail(e?.response?.data?.invitations);
        }
        setShowErr(true);
        RefreshData();
      });
  };

  return (
    <>
      <div
        className={style.mainPage}
        style={{ padding: "10px 0px !important" }}
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-md-9 col-sm-10 col-12">
            <div className={style.admin_card} style={{ position: "relative" }}>
              <h6 className="text-center">send invitation</h6>

              <form onSubmit={submitform}>
                <div className="row justify-content-center align-items-center py-md-4 py-2">
                  <div className="col-md-7 col-sm-10 col-12 my-3">
                    <input
                      type="text"
                      name="fName"
                      placeholder="First Name"
                      value={userList.fName}
                      onChange={handleInput}
                      autoComplete="new-password"
                      className={style.custom_input}
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                  <div className="col-md-7 col-sm-10 col-12 my-3">
                    <input
                      type="text"
                      name="lName"
                      placeholder="Last Name"
                      value={userList.lName}
                      onChange={handleInput}
                      autoComplete="new-password"
                      className={style.custom_input}
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>

                  <div className="col-md-7 col-sm-10 col-12 my-3">
                    <input
                      required
                      value={userList.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleInput}
                      className={style.custom_input}
                    />
                  </div>

                  <div className=" col-md-5 col-sm-10 col-12 my-3 mx-1">
                    <div className="buttons mt-4 d-flex">
                      {isLoading ? (
                        <button className="cta-02 mx-auto px-md-5">
                          <span>Loading..</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="cta-02 mx-auto px-md-5"
                        >
                          <span> Send invitation</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" row justify-content-center align-items-center">
                  <div className=" col-lg-4 col-md-6 col-sm-10 col-12 mt-2 buttons px-lg-2">
                    <a
                      href="http://50.17.174.239/api/auth/exportUser"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <button type="button" className="cta-01  mx-auto px-md-5">
                        <span> Get User Details </span>
                      </button>
                    </a>
                  </div>
                  <div className=" col-lg-4 col-md-6 col-sm-10 col-12 mt-2 buttons px-lg-2">
                    <button
                      type="button"
                      className="cta-01 mx-auto ml-3"
                      onClick={() => setSpredsheet(true)}
                    >
                      <span> Send multiple Invitation</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*mulitple email send  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isSpredsheet}
        onClose={() => setSpredsheet(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isSpredsheet}>
          <Box sx={styleModal} className="px-lg-5 py-lg-5 styleModal">
            <div
              onClick={() => setSpredsheet(false)}
              style={{
                position: "fixed",
                right: "15px",
                top: "15px",
                cursor: "pointer",
              }}
            >
              <CloseIcon />
            </div>
            <div className="">
              <h4 className="mb-4 pt-2 text-center">
                Enter user's details to send Invitation
              </h4>
              <Spreadsheet
                data={data}
                onChange={(d) => {
                  setData(d);
                }}
                onSelect={(d) => {}}
                columnLabels={["FirstName", "Lastname", "Email"]}
                // darkMode={true}
              />
            </div>
            <div className="style_modal">
              <div className="row buttons justify-content-center align-items-center mt-4 ">
                <div className="col-md-4 col-12">
                  <button
                    className="btn cta-01 w-100"
                    onClick={() => setSpredsheet(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-4 col-12">
                  {isLoading ? (
                    <Button variant="outlined" className="ms-2 w-50" disabled>
                      Loading..
                    </Button>
                  ) : (
                    <button
                      className="btn cta-02 w-100 mt-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/*---- Email template modal ----*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isPopup}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isPopup}>
          <Box
            sx={styleModal}
            className="styleModal"
            style={{ height: "510px" }}
          >
            <EmailTemplate closeModal={closeModal} RefreshData={RefreshData} />
          </Box>
        </Fade>
      </Modal>

      {/* Error Modal show if email already sent */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isShowErr}
        onClose={() => setShowErr(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isShowErr}>
          <Box sx={styleModal}>
            <div
              onClick={() => setShowErr(false)}
              style={{
                position: "fixed",
                right: "15px",
                top: "15px",
                cursor: "pointer",
              }}
            >
              <CloseIcon />
            </div>
            <div className="styleModal" style={{ height: "auto" }}>
              <h4 className="mb-4 pt-2 text-center">
                Invitation already sent to these emails
              </h4>
              <div className="px-4 mx-auto row justify-content-around align-items-center ">
                {duplicateEmail?.map((list, inx) => {
                  return (
                    <div className="col-md-5 col-6 mb-3">
                      <span className="">
                        {inx + 1}. &nbsp;{list?.email}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="row buttons justify-content-center align-items-center mt-4 ">
                <div className="col-md-4 col-12">
                  <button
                    className="btn cta-01 w-100"
                    onClick={() => setShowErr(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
