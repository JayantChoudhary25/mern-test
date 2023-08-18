import React, { useState } from "react";
import victor2 from "../../Assets/Vector 1.png";


const AccessPopup = ({ closeModal }) => {

  const [accessCode, setAccessCode] = useState("");

  const hideModal = () => {
    closeModal();
  };

  const submitAccessCode = (e) => {
    e.preventDefault()
    hideModal();

  };

  return (
    <div className="modal-content">
      <button type="button" className="btn-close" onClick={hideModal}></button>
      <img src={victor2} style={{ width: "100%" }} />

      <div className="row justify-content-center pb-5">
        <div className="col-10">
          <div className="" id="B-plan-label-2"> Secret code has been sent to your email id  </div>
          
          <form action="" className="" onSubmit={submitAccessCode}>
            <div className="business_row">
              <input
                type="text"
                placeholder="Enter secret code"
                id="B-plan-field"
                className="custom_input"
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <button
                id="icon-2"
                data-bs-target="#exampleModalToggle2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessPopup;
