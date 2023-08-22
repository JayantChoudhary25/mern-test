import React from "react";
import "./mobile.css";
import michel from "../../../Assets/michel.png";
import call from "../../../Assets/fi_3059446.svg";
import email from "../../../Assets/icon.svg";
import location from "../../../Assets/Vector (1).svg";
import Animated from "../animated";

const Mobile = () => {
  return (
    <>
      <section>
        <div className="container" id="mob">
         
            <div className="">
              <img className="w-100" src={michel} alt="image" />
            </div>
            <div className=" mobile-digitall">
              <span className="mobile-digital">
                <b>Michael</b> Pricharda
              </span>
            </div>
            <div 
              className="bg-dark relative w-100 text-white px-5 py-5
               "
            >
              <div id="mobile-details" className="d-flex pt-5  pb-4 text-white">
                <div className="m-height-s">
                  <p id="m-about-U">Height : 6'2"</p>
                  <p id="m-about-U">Sex : Male</p>
                </div>
                <div className="m-height-s" >
                  <p id="m-about-U">Weight : 180lbs</p>
                  <p id="m-about-U">Pronouns : He/Him</p>
                </div>
              </div>
              <h4>
                <b id="m-e-edu" className="">
                  EDUCATION
                </b>
              </h4>
              <div className="r-blue-bar my-3 mb-4"></div>
              <p>
                <b id="m-e-cllg">International Business & Marketing</b>
              </p>
              <p id="m-e-cllg-year">(Albright Collage 2000-2003 )</p>
            </div>
            <div className="mobile-right-michel-divv">
              <div className=" m-r-digital-div">
                <span className="m-r-digital">DIGITAL UTILITY EXPERT</span>
              </div>
              <p className="m-r-profile">PROFILE</p>
              <div className="m-r-blue-bar"></div>
              <div className="m-r-paragraph">
                Uses modern technology to customize solutions to bridge the gaps
                in growth margins. Expertise entails creating digital assets,
                developing different profile-raising strategies, identifying new
                opportunities, and opening new channels to create an ideal
                customer/community network. Skilled in integrating various
                elements to design highly engaging and target-audience-centric
                content for digital/online spaces and platforms, embodying
                clients' vision to increase market share and profitability.
              </div>
            </div>
            <div className="m-left-inner">
              <p className="m-r-work">WORK EXPERIENCE</p>
              <div className="m-r-blue-bar-2"></div>
              <p className="m-r-ceo">CEO, President</p>
              <div id="work-flex" className="d-flex">
                <div className="m-r-current">
                  <p className="m-r-current-t">2023 &gt; Current</p>
                </div>
                <p className="m-r-trained">Trained O.S.A.I.</p>
              </div>
              <p className="m-r-para-2">
                Defined company's vision and strategy, driving the development
                of AI technologies that address industry challenges. Secured
                multiple high-profile sponsors, fostering strategic
                partnerships. Assembled a dynamic team of experts, fostering a
                collaborative environment that’s propelled the company's
                innovation. Navigate complex regulatory landscapes and ethical
                considerations, ensuring the company's AI solutions adhere to
                the highest standards of responsibility and transparency.
              </p>

              <p className="m-r-ceo-e">Executive Director, President</p>
              <div id="work-flex"  className="d-flex">
                <div className="m-r-current">
                  <p className="m-r-current-t-2">2014 &gt; Current</p>
                </div>
                <p className="m-r-trained">The CoCreate Group</p>
              </div>
              <p className="m-r-para-2">
                Pioneered nonprofit initiative guiding startups and nonprofits
                through their early years. Orchestrated development of unique
                programs and resources, equipping emerging organizations with
                tools, mentorship, and strategies needed to thrive. Forged
                strategic partnerships, vertically integrating with companies to
                broaden impact, and drive collective success.
              </p>

              <p className="m-r-ceo-g">Growth, IT, Strategy Consultant</p>
              <div id="work-flex"  className="d-flex">
                <div className="m-r-current">
                  <p className="m-r-current-t">2003 &gt; Current</p>
                </div>
                <p id="growth-train" className="m-r-trained">DBA Michael Pricharda</p>
              </div>
              <p className="m-r-para-2 ">
                Championed integrating growth strategies with innovative IT
                solutions to optimize operational efficiency and bottom-line
                results. Pioneered digital, event, and experiential marketing
                campaigns, consistently exceeding client expectations. Served as
                a trusted advisor to leadership teams, offering actionable
                insights to drive business success. Honed skills and expertise
                to stay at the forefront of industry trends and emerging
                technologies to provide clients with up-to-date and effective
                solutions.
              </p>

              <h3 className="m-skills">SKILLS</h3>
              <div id="m-blue-barr" className="m-r-blue-bar"></div>
              <div id="m-skills-div" className="d-flex justify-content-between mt-4">
                <div className="">
                  <ul id="m-m-list">
                    <li id="m-list">
                      Advertising / Branding / Digital Marketing
                    </li>
                    <li id="m-list">Budgeting, Expense Planning</li>
                    <li id="m-list">Campaign Design and Management</li>
                    <li id="m-list">Collaborative Communication</li>
                    <li id="m-list">Consultative Sales</li>
                    <li id="m-list">Cost Control</li>
                    <li id="m-list">Critical Thinking & Analysis</li>
                    <li id="m-list">Customer Care</li>
                    <li id="m-list">Event Management</li>
                    <li id="m-list">Independent and Teamwork</li>
                    <li id="m-list">Lean Management</li>
                    <li id="m-list">Operations Management</li>
                  </ul>
                </div>
                <div className="m-skills-2">
                  <ul id="m-m-list">
                    <li id="m-list">Presentations</li>
                    <li id="m-list">PR & Negotiation</li>
                    <li id="m-list">Process Improvement </li>
                    <li id="m-list"> Problem-Solving </li>
                    <li id="m-list">Project Ownership</li>
                    <li id="m-list">
                      {" "}
                      Public Speaking & Relationship Building
                    </li>
                    <li id="m-list"> SEO / SMO</li>
                    <li id="m-list"> Strategic Planning and Implementing </li>
                    <li id="m-list"> Supervision & Activities Coordination</li>
                    <li id="m-list"> Team Development</li>
                    <li id="m-list">Time Management</li>
                    <li id="m-list">Workload Prioritization & Multitasking</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="m-sec_3">
              <div id="m-hm" className=" m-auto">
                <h4>
                  <b className="" id="m-expr">
                    EXPERTISE
                  </b>
                </h4>
                <div id="m-blue-ex" className="m-r-blue-bar mt-2"></div>
                <div className="d-flex"></div>

                <div
                  id="m-progress-box"
                  className="row justify-content-center align-items-center"
                >
                  <div className="col-md-6 mt-2">
                    <div className="m-tool" id="m-results">
                      Growth Strategy
                      {/* <p className="tooltiptext">
                          Growth Strategy: 99% Responsible for developing and
                          implementing strategic plans and initiatives aimed at
                          expanding a company's market presence, increasing
                          revenue, and maximizing overall business growth. This
                          involves analyzing market trends, identifying
                          opportunities for expansion, optimizing processes, and
                          aligning resources to achieve sustainable and
                          accelerated growth.
                        </p> */}
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <Animated progressRange={100} />
                  </div>

                  <div className="col-md-6 mt-2">
                    <h6 className="line-hov" id="m-results">
                      Innovation
                    </h6>
                  </div>
                  <div className="col-md-6 mt-2">
                    <Animated progressRange={60} />
                  </div>

                  <div className="col-md-6 mt-2">
                    <h6 className="line-hov" id="m-results">
                      AI Solutions
                    </h6>
                  </div>
                  <div className="col-md-6 mt-2">
                    <Animated progressRange={50} />
                  </div>
                  <div className="col-md-6 mt-2">
                    <h6 className="line-hov" id="m-results">
                      IT Solutions
                    </h6>
                  </div>
                  <div className="col-md-6 mt-2">
                    <Animated progressRange={80} />
                  </div>
                  <div className="col-md-6 mt-2">
                    <h6 className="line-hov" id="m-results">
                      Marketing
                    </h6>
                  </div>
                  <div className="col-md-6 mt-2">
                    <Animated progressRange={50} />
                  </div>
                </div>
              </div>
              <div id="m-hm" className=" m-auto py-1 pt-5">
                <h4>
                  <b id="m-interest" className="py-2 ">
                    INTERESTS
                  </b>
                </h4>
                <div className="m-r-blue-bar"></div>
                <div id="inter-div" className="d-flex justify-content-around lh-lg ">
                  <div className="mt-3">
                    <div id="hari" className="d-flex">
                      <li id="m-finance"></li>
                      <p id="m-cat-inter">Finance</p>
                    </div>

                    <div className="d-flex">
                      <li id="m-enginee"></li>
                      <p id="m-cat-inter">Engineering</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex">
                      <li id="m-techno"></li>
                      <p id="m-cat-inter">Technology</p>
                    </div>
                    <div className="d-flex">
                      <li id="m-reading"></li>
                      <p id="m-cat-inter">Reading</p>
                    </div>
                  </div>
                </div>
              </div>
              <div  className="d-flex  m-auto mt-5s ">
                <div className="icon-sec mt-4 ">
                  <img id="m-icon-resume" src={call} />
                  <img id="m-icon-resume" className="" src={email} />
                  <img
                    id="m-icon-resume"
                    className="w-50"
                    src={location}
                  />
                </div>
                <div className="mt-4 ">
                  <div className="">
                    <h6 id="m-info"> Call me!</h6>
                    <a href="tel:1(866)3761970" id="m-info-c">
                      1(866)-376-1970
                    </a>
                  </div>
                  <div className="">
                    <h6 id="m-info"> Email me!</h6>
                    <a href="mailto:mpricharda@gmail.com" id="m-info-c">
                      mpricharda@gmail.com
                    </a>
                  </div>
                  <div className="  pb-3">
                    <h6 id="m-info"> Send me coupons!</h6>
                    <a id="m-info-c-l">Reading, pA, USA</a>
                  </div>
                </div>
              </div>
            </div>
            <div className=" m-auto py-5">
              <div
                className="row d-flex justify-content-center align-items-center mb-5"
                style={{ gap: "10px" }}
              >
                <div className="col-lg-2 col-md-3 col-6">
                  <button type="button" id="b-contact" className="btn  custom_btn">
                    DOWNLOAD
                  </button>
                </div>
                <div className="col-lg-2 col-md-3 col-6">
                  <button type="button" className="btn  custom_btn" id="b-contact">
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

export default Mobile;
