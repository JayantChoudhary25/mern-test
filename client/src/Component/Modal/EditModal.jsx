import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Grid, Button, TextField } from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect } from "react";

const EditModal = ({ closeEditModal, editData, editId, RefreshData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [isImageUploded, setImageUploded] = useState(false);


  const hideModal = () => {
    closeEditModal();
    RefreshData();
  };

  useEffect(() => {
    setImageUrl(editData?.image);
    setTitle(editData?.title);
    setDescription(editData?.description);
  }, []);

  const handleImage = async (e) => {
    // if (e.target.files.length > 0) {
    //   toast.error("Can't upload image! try again");
    // }
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          let width = image.width;
          let height = image.height;

          if (file.size > maxSize) {
            const aspectRatio = width / height;
            const newWidth = Math.sqrt(maxSize * aspectRatio);
            const newHeight = newWidth / aspectRatio;
            width = newWidth;
            height = newHeight;
          }
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.8); // Use 0.8 for 80% image quality, adjust if needed
          console.log(dataUrl);

          uploadImage(file, dataUrl);
        };
      };
    }
  };

  const uploadImage = async (file, dataUrl) => {
    setLoadingImage(true);

    const payload = {
      content: dataUrl,
      fileName: file?.name,
    };

    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/uploadImage", payload, config)
      .then((res) => {
        if (res?.status === 200) {
          console.log("res", res?.data?.url);
          setImageUploded(true);
          setImageUrl(res?.data?.url);
          setLoadingImage(false);
        } else {
          setImageUploded(false);
          setLoadingImage(false);
        }
      })
      .catch((err) => {
        toast.error("Can't upload image! try again");
        setLoadingImage(false);
      });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const reqBody = {
      image: imageUrl,
      Product: title,
      title: title,
      description: description,
      _id: editId,
    };

    console.log(reqBody);

    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/update_product", reqBody, config)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Product Updated successfully!");
          hideModal();
          setLoading(false);
        } else {
          toast.error("Something went wrong , Please try again");
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="mt-2 mb-3 w-100">
        <h5 className="text-center  pb-4">Edit Product</h5>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="mt-2 w-100"
          defaultValue={editData?.Product}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="upload-photo" className="mt-4 w-100 mb-2">
          Description
        </label>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CKEditor
              editor={ClassicEditor}
              data={editData.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                setDescription(data);
              }}
            />
          </Grid>
        </Grid>

        <label htmlFor="upload-photo" className="mt-2 w-100">

          {isLoadingImage ? (
            <Button variant="outlined"  disable component="span" className="mt-3 w-100">
              Uploading ...
            </Button>
          ) : (
            <>
              {isImageUploded ? (
                <Button
                  variant="contained"
                  disabled
                  component="span"
                  className="mt-3 w-100"
                >
                  Image Uploaded
                </Button>
              ) : (
                <>
                  <input
                    style={{ display: "none", width: "100%" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    className="mt-3 w-100"
                    onChange={handleImage}
                    accept="image/*"
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    className="mt-3 w-100"
                  >
                    Change Image
                  </Button>
                </>
              )}
            </>
          )}
        </label>
      </div>
      <div className="d-flex justify-content-between align-items-center pt-2">
        <Button onClick={hideModal} variant="outlined" className=" w-50">
          Cancel
        </Button>
        {isLoading ? (
          <Button variant="outlined" className="ms-2 w-50" disabled>
            Loading..
          </Button>
        ) : (
          <Button
            onClick={handleUpdate}
            variant="contained"
            className="ms-2 w-50"
          >
            Update
          </Button>
        )}
      </div>
    </>
  );
};

export default EditModal;
