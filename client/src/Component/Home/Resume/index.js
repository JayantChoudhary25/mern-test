import React from "react";
import "./style.css";
import michel from "./..//../Assets/michel.png";
import call from "./..//../Assets/fi_3059446.svg";
import email from "./..//../Assets/icon.svg";
import location from "./..//../Assets/Vector (1).svg";


const Index = () => {
  return (
    <>
      <section>
        <div className=" container">
          <div className=" r-main-div d-flex">
            <div className=" r-michel">
              <div>
                <img className="r-michel-img" src={michel} alt="image" />
              </div>
              <div className=" r-digitall">
                    <span className="r-digital">DIGITAL UTILITY EXPERT</span>
                  </div>
              <div className="bg-dark relative text-white px-5 py-5 ">
                {/* <div className="position-absolute w-25" id="utility" >
                 <h5 className="bg-primary text-white w-50 text-center " >DIGITAL UTILITY EXPERT</h5>
                 </div> */}
                <div className="d-flex py-4 justify-content-between w-75 text-white">
                  <div className="">
                    <p id="about-U">Height:6'2"</p>
                    <p id="about-U">Sex:Male</p>
                  </div>
                  <div>
                    <p id="about-U">Weight:180lbs</p>
                    <p id="about-U">Pronouns:He/Him</p>
                  </div>
                </div>
                <h4>
                  <b id="e-edu" className="my-0">EDUCATION</b>
                </h4>
                <div className="r-blue-bar my-3 mb-4"></div>
                <p>
                  <b id="e-cllg">International Business & Marketing</b>
                </p>
                <p id="e-cllg-year">(Albright Collage 2000-2003 )</p>
              </div>
              <div className="sec_3">
                <div className="w-75 m-auto py-5 pt-5">
                  <h4>
                    <b id="expr">EXPERTISE</b>
                  </h4>
                  <div className="r-blue-bar"></div>
                  <div className="d-flex"></div>

                  <div id="progress-box" className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                      <div className="tool" id="results">
                      Growth Strategy
                        <p className="tooltiptext">Growth Strategy: 99%
Responsible for developing and implementing strategic plans and initiatives aimed at expanding a company's market presence, increasing revenue, and maximizing overall business growth. This involves analyzing market trends, identifying opportunities for expansion, optimizing processes, and aligning resources to achieve sustainable and accelerated growth.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div id="pro-bar" className="progress bg-dark">
                        <div className="growth-progress"></div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h6 className="line-hov"id="results">
                        Innovation
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <div id="pro-bar" className="progress bg-dark">
                        <div className="innov-progress"></div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h6 className="line-hov"id="results">
                        AI Solutions
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <div id="pro-bar" className="progress bg-dark">
                        <div className="AI-progress"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="line-hov" id="results">
                        IT Solutions
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <div id="pro-bar" className="progress bg-dark">
                        <div className="IT-progress"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="line-hov" id="results">
                        Marketing
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <div id="pro-bar" className="progress bg-dark">
                        <div className="marketing-progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-75 m-auto py-5">
                  <h4>
                    <b id="interest">Interests</b>
                  </h4>
                  <div className="r-blue-bar"></div>
                  <div className="d-flex justify-content-between lh-lg">
                    <div>
                      <div className="d-flex">
                        <li id="finance"></li>
                        <p id="cat-inter">Finance</p>
                      </div>
                      <div className="d-flex">
                        <li id="techno"></li>
                        <p id="cat-inter">Technology</p>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex">
                        <li id="enginee"></li>
                        <p id="cat-inter">Engineering</p>
                      </div>
                      <div className="d-flex">
                        <li id="reading"></li>
                        <p id="cat-inter">Reading</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex w-75 m-auto `">
                  <div className="icon-sec ">
                    <img id="icon-resume" src={call} />
                    <img  id="icon-resume" className="my-5" src={email} />
                    <img id="icon-resume" className="my-4" src={location} />
                  </div>
                  <div>
                    <div>
                      <h6 id="info"> Call me!</h6>
                      <p id="info-c">1(866)-376-1970</p>
                    </div>
                    <div className="py-4">
                      <h6 id="info"> Email me!</h6>
                      <p id="info-c">mpricharda@gmail.com</p>
                    </div>
                    <div className="">
                      <h6 id="info"> Send me coupons!</h6>
                      <p id="info-c" className="pb-5">Reading, pA, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="r-left-dive">
              <div className="    resume-right-top">
                <div className="right-michel-divv">
                  <p className="r-michel-head">
                    {" "}
                    Michael <span className="r-picharda-head">Pricharda</span>
                  </p>
                  <div className=" r-digital-div">
                    <span className="r-digital">DIGITAL UTILITY EXPERT</span>
                  </div>
                  <p className="r-profile">PROFILE</p>
                  <div className="r-blue-bar"></div>
                  <div className="r-paragraph">
                    Uses modern technology to customize solutions to bridge the
                    gaps in growth margins. Expertise entails creating digital
                    assets, developing different profile-raising strategies,
                    identifying new opportunities, and opening new channels to
                    create an ideal customer/community network. Skilled in
                    integrating various elements to design highly engaging and
                    target-audience-centric content for digital/online spaces
                    and platforms, embodying clients' vision to increase market
                    share and profitability.
                  </div>
                </div>
              </div>

              <div className="left-inner">
                <p className="r-work">WORK EXPERIENCE</p>
                <div className="r-blue-bar"></div>
                <p className="r-ceo">CEO, President</p>
                <div className="d-flex">
                  <div className="r-current">
                    <p className="r-current-t">2023 &gt; Current</p>
                  </div>
                  <p className="r-trained">Trained O.S.A.I.</p>
                </div>
                <p className="r-para-2">
                  Defined company's vision and strategy, driving the development
                  of AI technologies that address industry challenges. Secured
                  multiple high-profile sponsors, fostering strategic
                  partnerships. Assembled a dynamic team of experts, fostering a
                  collaborative environment that’s propelled the company's
                  innovation. Navigate complex regulatory landscapes and ethical
                  considerations, ensuring the company's AI solutions adhere to
                  the highest standards of responsibility and transparency.
                </p>

                <p className="r-ceo">Executive Director, President</p>
                <div className="d-flex">
                  <div className="r-current">
                    <p className="r-current-t">2014 &gt; Current</p>
                  </div>
                  <p className="r-trained">The CoCreate Group</p>
                </div>
                <p className="r-para-2 ">
                  Pioneered nonprofit initiative guiding startups and nonprofits
                  through their early years. Orchestrated development of unique
                  programs and resources, equipping emerging organizations with
                  tools, mentorship, and strategies needed to thrive. Forged
                  strategic partnerships, vertically integrating with companies
                  to broaden impact, and drive collective success.
                </p>

                <p className="r-ceo">Growth, IT, Strategy Consultant</p>
                <div className="d-flex">
                  <div className="r-current">
                    <p className="r-current-t">2003 &gt; Current</p>
                  </div>
                  <p className="r-trained">DBA Michael Pricharda</p>
                </div>
                <p className="r-para-2 ">
                  Championed integrating growth strategies with innovative IT
                  solutions to optimize operational efficiency and bottom-line
                  results. Pioneered digital, event, and experiential marketing
                  campaigns, consistently exceeding client expectations. Served
                  as a trusted advisor to leadership teams, offering actionable
                  insights to drive business success. Honed skills and expertise
                  to stay at the forefront of industry trends and emerging
                  technologies to provide clients with up-to-date and effective
                  solutions.
                </p>

                <h3 className="skills">SKILLS</h3>
                <div className="r-blue-bar"></div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <ul className="list">
                      <li>Advertising / Branding / Digital Marketing</li>
                      <li>Budgeting, Expense Planning</li>
                      <li>Campaign Design and Management</li>
                      <li>Collaborative Communication</li>
                      <li>Consultative Sales</li>
                      <li>Cost Control</li>
                      <li>Critical Thinking & Analysis</li>
                      <li>Customer Care</li>
                      <li>Event Management</li>
                      <li>Independent and Teamwork</li>
                      <li>Lean Management</li>
                      <li>Operations Management</li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="list">
                      <li>Presentations</li>
                      <li>PR & Negotiation</li>
                      <li>Process Improvement </li>
                      <li> Problem-Solving </li>
                      <li>Project Ownership</li>
                      <li> Public Speaking & Relationship Building</li>
                      <li> SEO / SMO</li>
                      <li> Strategic Planning and Implementing </li>
                      <li> Supervision & Activities Coordination</li>
                      <li> Team Development</li>
                      <li>Time Management</li>
                      <li>Workload Prioritization & Multitasking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className=" m-auto py-5">
          <div
            className="row justify-content-center align-items-center mb-5"
            style={{ gap: "10px" }}
          >
            <div className="col-lg-2 col-md-3 col-10">
              <button type="button" className="btn  custom_btn">
                DOWNLOAD
              </button>
            </div>
            <div className="col-lg-2 col-md-3 col-10">
              <button type="button" className="btn  custom_btn">
                <a className="b-contact" href="/contact">
                  CONTACT ME
                </a>
              </button>
            </div>
          </div>
        </div>
        </div>

      </section>
    </>
  );
};

export default Index;
