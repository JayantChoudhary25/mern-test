import React from "react";
import "./style.css";
import icon1 from "../Assets/icon1.png";
import icon2 from "../Assets/icon2.png";
import victor from "../Assets/Vector 2.svg";
import Footer from "../Home/Footer";

const ContactUs = () => {
  return (
    <>
    <div className="container">
    <div id="form-head" className="text-center">
            <h1 className="text-center" id="form-h1">
              <b>Contact Me</b>
            </h1>
            <p className="text-center w-50 m-auto" id="form-p">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </div>
    </div>
      <section className="contact_main">
        <div className="container">
         
          <div id="form-middle" className="">
            <div className=" row pb-5">
              <div className="col-md-6 d-flex" id="mail-call">
                <div className="border  w-100 mx-2 px-4 py-5 bg-white" id="mail-me">
                  <img src={icon1} id="icons"/>
                  <h5 id="form-h5">Mail Me</h5>
                  <p className=" text-secondary mb-4" id="form-box-p">
                    You will reverted in 24hrs
                  </p>
                  
                  <p className="g-mail">mpricharda@gmail.com</p>
                  
                </div>
                <div className="border w-100 mx-2 px-4  py-5 bg-white" id="call-me">
                  <img src={icon2} id="icons"/>
                  <h5 id="form-h5">Call Me</h5>
                  <p className=" text-secondary" id="form-box-p">
                    Mon - Fri from 8am to 5pm{" "}
                  </p>
                  <a>+1 (484) 966 1553</a>
                </div>
              </div>
            <div className="col-md-6  form-input-box">
              <div className="d-flex">
                <input
                  className="inputs border border-1border-secondary text-secondary w-100"
                  id="form-inputs"
                  type="text"
                  placeholder="Enter your name"
                />
                <input
                  className="inputs border border-1border-secondary w-100"
                  id="form-inputs"
                  type="text"
                  placeholder="Your email address"
                />
              </div>

              <div className="d-flex ">
                <input
                  className="inputs border border-1border-secondary w-100"
                  id="form-inputs"
                  type="text"
                  placeholder="Phone number"
                />
                <input
                  className=" inputs border border-1border-secondary w-100"
                  id="form-inputs"
                  type="text"
                  placeholder="Subject"
                />
              </div>

              <textarea
                className="inputs border border-1border-secondary py-1"
                id="form-textarea"
                type="text area"
                placeholder="Message"
              />
            </div>
            </div>
          </div>
        </div>
        {/* <div className="contact_bottom">
          <img src={victor} style={{ width: "100%" }} id="box_1" />
        </div> */}
      </section>

    </>
  );
};

export default ContactUs;
