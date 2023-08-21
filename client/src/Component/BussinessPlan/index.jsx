import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import card from "../Assets/card.png";
import group from "../Assets/Group 9.svg";


import "./style.css";
import AccessPopup from "./modal/accessPopup";
import SendMailPopup from "./modal/sendMailPopup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const dummyArray = [
  {
    id: 1,
    plan: "trial",
    price: "$09.99",
  },
  {
    id: 2,
    plan: "standard",
    price: "$09.99",
  },
  {
    id: 3,
    plan: "pro",
    price: "$09.99",
  },
];

const BusinessPlan = () => {
  const [open, setOpen] = useState(false);
  const [businessPlan, setBusinessPlan] = useState("");
  const [isAccessCode, setAccessCode] = useState(false);

  const handleOpen = (plan) => {
    setOpen(true);
    setBusinessPlan(plan)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAccess = () => {
    setAccessCode(true);
  };
  const closeAccessModal = () => {
    setAccessCode(false);
  };

  const BusinessCard = () => {
    return (
      <>
        {dummyArray.map((row) => {
          return (
            <div className="custom_card py-3" key={row.id}>
              <div className="card_img">
                <img src={card} alt="plan" className="business_img" />
                <div className="card_label">{row.plan}</div>
                <div className="card_price">
                  <p className="mb-1">{row.price}</p>
                  <small>per month</small>
                </div>
              </div>
              <div className="mx-1">
                <div className="text-start">
                  <ul className="business_list pt-4">
                    <li>
                      There are many variations of passages of Lorem Ipsum
                      available
                    </li>
                    <li>Contrary to popular belief lorem Ipsum</li>
                    <li>Contrary to popular belief lorem Ipsum</li>
                  </ul>

                  <div className="d-flex align-items-center my-3 ">
                    <button
                      role="button"
                      className="btn btn_link me-2"
                      onClick={()=>handleOpen(row.plan)}
                    >
                      <b className="me-2">Start Now</b>
                    <img src={group} alt="start" height="20" width="20" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <section className="business_main  justify-content-center align-items-center text-center py-50">
      <div className="container">
        <div className="bussiness_head row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12">
            <h5 className="py-3 ">Choose your business plan</h5>
            <p className="pb-5 mb-0">
              A serial entrepreneur must find resourceful ways to bootstrap! If
              you are an accredited investor who has intentionally visited this
              page please request an access code for the business plan you wish
              to view by selecting the plan and providing an email.
            </p>
          </div>
        </div>
        <div className="row justify-content-between align-items-center pb-md-5 bplan_cards">
          <BusinessCard />
        </div>
      </div>

      {/* =-======  send Email ========== */}

      <React.Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <SendMailPopup 
              openAccModal={handleOpenAccess}
              closeModal={handleClose}
              businessPlan={businessPlan}
            />
          </Box>
        </Modal>
      </React.Fragment>


      {/* =-======  Access code ========== */}
      <React.Fragment>
        <Modal
          open={isAccessCode}
          onClose={closeAccessModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <AccessPopup closeModal={closeAccessModal} />
          </Box>
        </Modal>
      </React.Fragment>

      {/* =================================================================== */}
    </section>
  );
};

export default BusinessPlan;
