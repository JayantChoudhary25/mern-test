import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import victor2 from "../../Assets/Vector 1.png";
import SendIcon from "./assets/send";

const SendMail = ({ openAccModal, businessPlan, closeModal }) => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [isLoader, setLoader] = useState(false);

  const hideModal = () => {
    closeModal();
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    navigate("/agreement");
    const reqbody = {
      businessName: businessPlan,
      email: email,
    };

    setLoader(true);
    await axios
      .post("/api/auth/sendInvite", reqbody, "")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert(res?.data?.message);
          setLoader(false);
          hideModal();
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

  return (
    <div className="">
      <button type="button" className="btn-close" onClick={hideModal}></button>
      <img src={victor2} style={{ width: "100%" }} />
      <div className="row justify-content-center pb-5">
        <div className="col-10">
          <form action="" className="" onSubmit={submitEmail}>
            <label id="B-plan-label"> Enter your email </label>
            <div className="business_row mt-3">
              <input
                required
                type="email"
                id="B-plan-field"
                className="custom_input"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" id="icon">
                <SendIcon style={{ height: "20px", width: "20px" }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
