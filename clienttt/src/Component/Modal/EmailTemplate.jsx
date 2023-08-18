import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Grid, Button, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./style.css";

const EmailTemplate = ({ closeModal, RefreshData }) => {
  const [emailText, setEmailText] = useState("");
  const [isLoading, SetLoading] = useState(false);

  const hideModal = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    console.log(emailText);

    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/EmailTemplate", { emailText: emailText }, config)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Email Template Updated successfully!");
          hideModal();
          SetLoading(false);
        } else {
          toast.error("Something went wrong , Please try again");
          SetLoading(false);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="">
        <div
          className=""
          onClick={hideModal}
          style={{
            position: "fixed",
            right: "10px",
            top: "10px",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </div>
        <h3 className="mb-4 pt-2">Edit Your Email Template</h3>
        <div className="pt-4 template_popup style_modal">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CKEditor
                editor={ClassicEditor}
                data="<h6>Hello,</h6> <p>You have been invited to join the Member Portal..</p>"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setEmailText(data);
                }}
              />
            </Grid>
          </Grid>
          <div className="row buttons justify-content-end align-items-center mt-4">
            <div className="col-md-4 col-12">
              <button className="btn cta-01 w-100" onClick={hideModal}>
                Cancel
              </button>
            </div>
            <div className="col-md-4 col-12">
              {isLoading ? (
                <Button variant="outlined" className="ms-2 w-50" disabled>
                  Loading..
                </Button>
              ) : (
                <button className="btn cta-02 w-100" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
