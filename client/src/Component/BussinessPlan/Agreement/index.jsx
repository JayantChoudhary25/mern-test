import React, { Component, useRef, useState, useEffect } from "react";
import axios from "axios";
import { render } from "react-dom";
import SignatureCanvas from "react-signature-canvas";
import html2pdf from "html2pdf.js";

import "./style.css";

function NDAAgreement() {
  const sigRef = useRef();
  const [signature, setSignature] = useState(null);
  const [signUrl, setSignUrl] = useState(null);
  const [isSign, setSign] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const handleSignatureEnd = () => {
    setSignature(sigRef.current.toDataURL());
  };

  const clearSignature = () => {
    sigRef?.current?.clear();
    setSignature(null);
    setSign(false);
  };

  useEffect(() => {
    console.log(signature);

    if (signature !== null) {
      setSign(true);
    }
  }, [signature]);

  const handleSubmitAgreement = async () => {
    const reqbody = {
      ndaStatus: isSign,
      email: "user@gmail.com",
      pdfBase64Data: signUrl,
    };

    if (signUrl === null) {
      alert("Please sign the agreement first");
    } else {
      // to generate PDF
      generatePDF();

      setLoader(true);
      await axios
        .post("/api/auth/agreementStatus", reqbody, "")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert(res?.data?.message);
            setLoader(false);
          } else {
            setLoader(false);
            return;
          }
        })
        .catch((e) => {
          setLoader(false);
          console.log(e);
        });
    }
  };

  const generatePDF = async () => {
    const element = document.getElementById("html-element");
    const pageBreakElements = element.getElementsByClassName("page-break");
    const pageBreakCount = pageBreakElements.length;
    for (let i = 0; i < pageBreakCount; i++) {
      const pageBreakElement = pageBreakElements[i];
      pageBreakElement.style.pageBreakAfter = "always";
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `NDA.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
    // Generate the PDF and convert it to base64
    const pdfData = await html2pdf().set(opt).from(element).outputPdf();

    // Convert the PDF data to base64
    const base64PDF = btoa(pdfData);

    // Now you have the base64 encoded PDF
    console.log(base64PDF);
    setSignUrl(base64PDF);
  };

  return (
    <section className="agreement_main">
      <div className="container">
        <div className="inner pt-5" id="html-element">
          
          <div className="">
            <h2>Lorem Ipsum Non-Disclosure Agreement</h2>
            <p>
              This Non-Disclosure Agreement ("Agreement") is made and entered
              into this __________ day of ______________, 20____ ("Effective
              Date"), by and between:
            </p>

            <div className="details row">
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className=""
                  placeholder="Your Name or Company Name"
                  onChange=""
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className=""
                  placeholder="Address"
                  onChange=""
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className=""
                  placeholder="City, State, Zip Code"
                  onChange=""
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className=""
                  placeholder="Disclosing Party"
                  onChange=""
                />
              </div>
            </div>

            <div className="party mt-4">
              <p>[Recipient's Name or Company Name]</p>
              <p>[Address]</p>
              <p>[City, State, Zip Code]</p>
              <p>("Receiving Party")</p>
            </div>

            <p>(collectively referred to as the "Parties").</p>

            <h3>1. Purpose of Disclosure</h3>
            <p>
              The Disclosing Party and the Receiving Party (collectively
              referred to as the "Parties") anticipate that they may disclose
              certain confidential information to each other for the purpose of
              [describe the purpose, e.g., "evaluating a potential business
              partnership," "discussing a potential investment," etc.].
            </p>

            <h3>2. Definition of Confidential Information</h3>
            <p>
              "Confidential Information" refers to any and all information, in
              whatever form or medium, whether oral, written, or in electronic
              format, that is disclosed by the Disclosing Party to the Receiving
              Party, including but not limited to:
            </p>
            <ul>
              <li>a. Trade secrets</li>
              <li>b. Business plans and strategies</li>
              <li>c. Financial information</li>
              <li>d. Product designs and specifications</li>
              <li>e. Customer lists and information</li>
              <li>f. Marketing plans and strategies</li>
              <li>
                g. Any other information identified as confidential at the time
                of disclosure
              </li>
            </ul>
            <div className="page-break"></div>
            <h3>3. Obligations of the Receiving Party</h3>
            <p>The Receiving Party agrees to:</p>
            <ol>
              <li>
                a. Keep the Confidential Information confidential and not
                disclose it to any third party without the prior written consent
                of the Disclosing Party.
              </li>
              <li>
                b. Use the Confidential Information solely for the purpose
                stated in this Agreement.
              </li>
              <li>
                c. Take reasonable measures to protect the Confidential
                Information from unauthorized disclosure or use.
              </li>
              <li>
                d. Limit access to the Confidential Information to employees,
                contractors, or agents with a legitimate need to know.
              </li>
              <li>
                e. Promptly return or destroy all Confidential Information,
                including any copies or reproductions, upon the written request
                of the Disclosing Party or upon the termination of this
                Agreement.
              </li>
            </ol>

            <h3>4. Exceptions</h3>
            <p>
              The obligations set forth in Section 3 shall not apply to any
              information that:
            </p>
            <ol>
              <li>
                a. Was already known to the Receiving Party prior to the
                disclosure, as evidenced by written records.
              </li>
              <li>
                b. Is or becomes publicly known through no fault of the
                Receiving Party.
              </li>
              <li>
                c. Is received from a third party without restrictions on
                disclosure.
              </li>
              <li>
                d. Is independently developed by the Receiving Party without
                reference to the Confidential Information.
              </li>
            </ol>

            <h3>5. Term and Termination</h3>
            <p>
              This Agreement shall remain in effect for a period of [specify
              duration] years from the Effective Date unless terminated earlier
              by written agreement of the Parties.
            </p>

            <h3>6. Governing Law</h3>
            <p>
              This Agreement shall be governed by and construed in accordance
              with the laws of [insert the governing jurisdiction, e.g., "the
              State of [State]"].
            </p>
            <div className="page-break pb-3"></div>
            <h3>7. Entire Agreement</h3>
            <p>
              This Agreement contains the entire agreement between the Parties
              concerning the subject matter herein and supersedes all prior and
              contemporaneous agreements and understandings, whether oral or
              written.
            </p>

            <p>
              IN WITNESS WHEREOF, the Parties hereto have executed this
              Non-Disclosure Agreement as of the Effective Date.
            </p>
          </div>

          <div className="d-flex justify-content-between pt-5 pb-3">
            <div className="signature">
              <p>[Your Name or Company Name]</p>
              <p>(Signature)</p>
            </div>

            <div className="signature ">
              <p>[Recipient's Name or Company Name]</p>
              <p>(Signature)</p>
              <div>
                {signature !== null ? (
                  <div className="">
                    <img src={signature} alt="" />
                  </div>
                ) : (
                  <div>
                    <SignatureCanvas
                      penColor="green"
                      canvasProps={{ className: "signature_pad" }}
                      ref={sigRef}
                      onEnd={handleSignatureEnd}
                    />
                  </div>
                )}
                <button className="px-4 btn" onClick={clearSignature}>
                  {" "}
                  Clear{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-end mb-4 pb-4">
          <div className="col-lg-2 col-md-4 col-10">
            {isSign ? (
              <button className="btn custom_btn w-100 " onClick={generatePDF}>
                Submit
              </button>
            ) : (
              <button className="btn custom_btn disabled w-100 ">Submit</button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default NDAAgreement;
