import React from "react";
import "./style.css";
import michel from "./..//../Assets/michel.png";
import call from "./..//../Assets/fi_3059446.svg";
import email from "./..//../Assets/icon.svg";
import location from "./..//../Assets/Vector (1).svg";
import Animated from "./animated";
import Mobile from "./mobileview/mobile";

const Resume = () => {
  return (
    <>
      <section >
        <Mobile/>
        <div id="desk" className=" container">
          <div className=" r-main-div d-flex">
            <div className=" r-michel">
              <div>
                <img className="r-michel-img" src={michel} alt="image" />
              </div>
              <div className=" r-digitall">
                <span className="r-digital">DIGITAL UTILITY EXPERT</span>
              </div>
              <div
                className="bg-dark relative  text-white px-5 py-5
               "
              >
                <div
                  id="details"
                  className="d-flex py-3 justify-content-evenly text-white"
                >
                  <div className="height-s">
                    <p id="about-U">Height:6'2"</p>
                    <p id="about-U">Sex:Male</p>
                  </div>
                  <div>
                    <p id="about-U">Weight:180lbs</p>
                    <p id="about-U">Pronouns:He/Him</p>
                  </div>
                </div>
                <h4>
                  <b id="e-edu" className="">
                    EDUCATION
                  </b>
                </h4>
                <div className="r-blue-bar my-3 mb-4"></div>
                <p>
                  <b id="e-cllg" className="pt-2">
                    International Business & Marketing
                  </b>
                </p>
                <p id="e-cllg-year" className="pb-4">
                  (Albright Collage 2000-2003 )
                </p>
              </div>
              <div className="sec_3">
                <div id="hm" className=" m-auto py-5 pt-5">
                  <h4>
                    <b className="pt-4" id="expr ">
                      EXPERTISE
                    </b>
                  </h4>
                  <div className="r-blue-bar mt-3"></div>
                  <div className="d-flex"></div>

                  <div
                    id="progress-box"
                    className="row justify-content-center align-items-center"
                  >
                    <div className="col-md-6 mt-3">
                      <div className="tool" id="results">
                        Growth Strategy
                        <p className="tooltiptext">
                          Growth Strategy: 99% Responsible for developing and
                          implementing strategic plans and initiatives aimed at
                          expanding a company's market presence, increasing
                          revenue, and maximizing overall business growth. This
                          involves analyzing market trends, identifying
                          opportunities for expansion, optimizing processes, and
                          aligning resources to achieve sustainable and
                          accelerated growth.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      {/* <div id="pro-bar" className="progress bg-dark">
                        <div className="growth-progress"></div>
                      </div> */}
                      <Animated progressRange={100} />
                    </div>

                    <div className="col-md-6 mt-2">
                      <h6 className="line-hov" id="results">
                        Innovation
                      </h6>
                    </div>
                    <div className="col-md-6 mt-2">
                      {/* <div id="pro-bar" className="progress bg-dark">
                        <div className="innov-progress"></div>
                      </div> */}
                      <Animated progressRange={60} />
                    </div>

                    <div className="col-md-6 mt-2">
                      <h6 className="line-hov" id="results">
                        AI Solutions
                      </h6>
                    </div>
                    <div className="col-md-6 mt-2">
                      {/* <div id="pro-bar" className="progress bg-dark">
                        <div className="AI-progress"></div>
                      </div> */}
                      <Animated progressRange={50} />
                    </div>
                    <div className="col-md-6 mt-2">
                      <h6 className="line-hov" id="results">
                        IT Solutions
                      </h6>
                    </div>
                    <div className="col-md-6 mt-2">
                      {/* <div id="pro-bar" className="progress bg-dark">
                        <div className="IT-progress"></div>
                      </div> */}
                      <Animated progressRange={80} />
                    </div>
                    <div className="col-md-6 mt-2">
                      <h6 className="line-hov" id="results">
                        Marketing
                      </h6>
                    </div>
                    <div className="col-md-6 mt-2">
                      {/* <div id="pro-bar" className="progress bg-dark">
                        <div className="marketing-progress"></div>
                      </div> */}
                      <Animated progressRange={50} />
                    </div>
                  </div>
                </div>
                <div id="hm" className=" m-auto py-4">
                  <h4>
                    <b id="interest" className="py-2">
                      INTERESTS
                    </b>
                  </h4>
                  <div className="r-blue-bar"></div>
                  <div className="d-flex justify-content-between lh-lg">
                    <div className="mt-3">
                      <div className="d-flex">
                        <li id="finance"></li>
                        <p id="cat-inter">Finance</p>
                      </div>

                      <div className="d-flex">
                        <li id="enginee"></li>
                        <p id="cat-inter">Engineering</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="d-flex">
                        <li id="techno"></li>
                        <p id="cat-inter">Technology</p>
                      </div>
                      <div className="d-flex">
                        <li id="reading"></li>
                        <p id="cat-inter">Reading</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className=" wow fadeInUp"
                  style={{
                    visibility: "visible",
                    animationDuration: "1000ms",
                    animationDelay: "300ms",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div id="hm" className="d-flex  m-auto mt-5s ">
                    <div className="icon-sec mt-4 pb-5">
                      <img id="icon-resume" src={call} />
                      <img id="icon-resume" className="my-5" src={email} />
                      <img
                        id="icon-resume"
                        className="my-3 w-50 p-1"
                        src={location}
                      />
                    </div>
                    <div className="mt-4 ">
                      <div className="pb-3">
                        <h6 id="info"> Call me!</h6>
                        <a href="tel:1(866)3761970" id="info-c">
                          1(866)-376-1970
                        </a>
                      </div>
                      <div className="pt-3 pb-3">
                        <h6 id="info"> Email me!</h6>
                        <a href="mailto:mpricharda@gmail.com" id="info-c">
                          mpricharda@gmail.com
                        </a>
                      </div>
                      <div className="pt-3  pb-3">
                        <h6 id="info"> Send me coupons!</h6>
                        <a id="info-c-l">Reading, pA, USA</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="r-left-dive">
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

                <div className="left-inner">
                  <p className="r-work">WORK EXPERIENCE</p>
                  <div className="r-blue-bar-2"></div>
                  <p className="r-ceo">CEO, President</p>
                  <div className="d-flex">
                    <div className="r-current">
                      <p className="r-current-t">2023 &gt; Current</p>
                    </div>
                    <p className="r-trained">Trained O.S.A.I.</p>
                  </div>
                  <p className="r-para-2">
                    Defined company's vision and strategy, driving the
                    development of AI technologies that address industry
                    challenges. Secured multiple high-profile sponsors,
                    fostering strategic partnerships. Assembled a dynamic team
                    of experts, fostering a collaborative environment that’s
                    propelled the company's innovation. Navigate complex
                    regulatory landscapes and ethical considerations, ensuring
                    the company's AI solutions adhere to the highest standards
                    of responsibility and transparency.
                  </p>

                  <p className="r-ceo-e">Executive Director, President</p>
                  <div className="d-flex">
                    <div className="r-current">
                      <p className="r-current-t-2">2014 &gt; Current</p>
                    </div>
                    <p className="r-trained">The CoCreate Group</p>
                  </div>
                  <p className="r-para-2">
                    Pioneered nonprofit initiative guiding startups and
                    nonprofits through their early years. Orchestrated
                    development of unique programs and resources, equipping
                    emerging organizations with tools, mentorship, and
                    strategies needed to thrive. Forged strategic partnerships,
                    vertically integrating with companies to broaden impact, and
                    drive collective success.
                  </p>

                  <p className="r-ceo-g">Growth, IT, Strategy Consultant</p>
                  <div className="d-flex">
                    <div className="r-current">
                      <p className="r-current-t">2003 &gt; Current</p>
                    </div>
                    <p className="r-trained">DBA Michael Pricharda</p>
                  </div>
                  <p className="r-para-2 ">
                    Championed integrating growth strategies with innovative IT
                    solutions to optimize operational efficiency and bottom-line
                    results. Pioneered digital, event, and experiential
                    marketing campaigns, consistently exceeding client
                    expectations. Served as a trusted advisor to leadership
                    teams, offering actionable insights to drive business
                    success. Honed skills and expertise to stay at the forefront
                    of industry trends and emerging technologies to provide
                    clients with up-to-date and effective solutions.
                  </p>

                  <h3 className="skills">SKILLS</h3>
                  <div className="r-blue-bar"></div>
                  <div className="d-flex justify-content-between mt-4">
                    <div className="">
                      <ul id="list">
                        <li id="list">
                          Advertising / Branding / Digital Marketing
                        </li>
                        <li id="list">Budgeting, Expense Planning</li>
                        <li id="list">Campaign Design and Management</li>
                        <li id="list">Collaborative Communication</li>
                        <li id="list">Consultative Sales</li>
                        <li id="list">Cost Control</li>
                        <li id="list">Critical Thinking & Analysis</li>
                        <li id="list">Customer Care</li>
                        <li id="list">Event Management</li>
                        <li id="list">Independent and Teamwork</li>
                        <li id="list">Lean Management</li>
                        <li id="list">Operations Management</li>
                      </ul>
                    </div>
                    <div className="">
                      <ul id="list">
                        <li id="list">Presentations</li>
                        <li id="list">PR & Negotiation</li>
                        <li id="list">Process Improvement </li>
                        <li id="list"> Problem-Solving </li>
                        <li id="list">Project Ownership</li>
                        <li id="list">
                          {" "}
                          Public Speaking & Relationship Building
                        </li>
                        <li id="list"> SEO / SMO</li>
                        <li id="list"> Strategic Planning and Implementing </li>
                        <li id="list">
                          {" "}
                          Supervision & Activities Coordination
                        </li>
                        <li id="list"> Team Development</li>
                        <li id="list">Time Management</li>
                        <li id="list">
                          Workload Prioritization & Multitasking
                        </li>
                      </ul>
                    </div>
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

export default Resume;
