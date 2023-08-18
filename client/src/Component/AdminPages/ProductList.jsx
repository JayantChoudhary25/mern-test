import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Box,
  Modal,
  Grid,
  Button,
  Fade,
  TextField,
  Backdrop,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import style from "../Css/admin.module.css";
import EditModal from "../Modal/EditModal";
import Pagination from "../Pagination/Index";
import Loader from "../Loder/Index";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "16px",
};

export const AllProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUploded, setImageUploded] = useState(false);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [allData, setallData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [editId, setEditId] = useState("");
  const { user } = useSelector((state) => state.user);

  const [isLoadingBtn, setLoadingBtn] = useState(false);
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const visiblePageCount = 5;
  const [isDelPopup, setDeletePopup] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearInput();
  };
  const closeEditModal = () => setOpenEdit(false);

  const clearInput = () => {
    setTitle("");
    setImageUrl("");
    setImageUploded(false);
    setDescription("");
  };

  const UserList = [
    "Dashboard",
    "User List",
    "Get Users",
    "Subscription List",
    "Invitation List",
  ];

  useEffect(() => {
    getAllData(1);
  }, [isRefresh]);

  const getAllData = async (page) => {
    setLoader(true);
    await axios
      .get(`/api/auth/get_all_products?page=${page}&limit=${visiblePageCount}`)
      .then((res) => {
        if (res?.status === 200) {
          setallData(res?.data);
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
  };

  //----------------------------

  const imgselcting = async (e) => {
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

    console.log(payload);

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
  // ----------------------------

  const SubmitForm = async () => {
    setLoadingBtn(true);
    const reqbody = {
      image: imageUrl,
      Product: title,
      title: title,
      description: description,
    };

    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/add_product", reqbody, config)
      .then((res) => {
        if (res?.status === 200) {
          setLoadingBtn(false);
          handleClose();
          toast.success("Product added successfully!");
          getAllData();
        } else {
          setLoadingBtn(false);
          toast.error("Something went wrong , Please try again");
        }
      })
      .catch((err) => console.log(err));
  };

  // edit fuction
  const handleEdit = async (row) => {
    setEditData(row);
    setOpenEdit(true);
    setEditId(row?._id);
  };

  // open delete popup
  const handleDeleteModal = async (id) => {
    setDeletePopup(true);
    setEditId(id);
  };

  // delete fuction
  const deleteProduct = async (id) => {
    setLoadingBtn(true);
    const config = { headers: { "Content-Type": "Application/json" } };
    await axios
      .post("/api/auth/delete_product", { id: id }, config)
      .then((res) => {
        if (res?.status === 200) {
          getAllData();
          toast.success("Product deleted successfully!");
          setLoadingBtn(false);
          setDeletePopup(false);
        } else {
          setLoadingBtn(false);
          toast.error("Something went wrong , Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingBtn(false);
        setDeletePopup(false);
      });
  };

  const RefreshData = () => {
    setRefresh(!isRefresh);
  };

  return (
    <>
      <div className="p-md-4 p-2">
      {isLoader && <Loader />}
        <div className={style.top_section}>
          <h6 className="mb-0">All Products</h6>
          <div className="buttons">
            <button
              type="submit"
              onClick={handleOpen}
              className="cta-01 mx-auto px-md-5"
            >
              <span> Add New </span>
            </button>
          </div>
        </div>
        <div className="px-2 w-100 pt-4 dashboard_table">
          <table className="table table-bordered table-responsive w-100">
            <thead>
              <tr>
                <td>No.</td>
                <td>Product Name</td>
                <td>Image</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {allData?.products?.length > 0 &&
                allData?.products?.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1 + (allData?.page - 1) * 10}</td>
                      <td>{items?.Product}</td>
                      <td>
                        {items?.image && (
                          <img
                            src={items?.image}
                            alt=""
                            className="img-fluid"
                            style={{
                              height: "auto",
                              width: "100px",
                              // borderRadius: "50%",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: items?.description,
                          }}
                        />
                      </td>
                      <td>
                        <div className="flex">
                          <Button
                            onClick={() => handleEdit(items)}
                            color="success"
                          >
                            <EditIcon
                              style={{ height: "18px", width: "18px" }}
                            />
                          </Button>
                          <Button
                            onClick={() => handleDeleteModal(items?._id)}
                            color="error"
                            className=""
                          >
                            <DeleteForeverIcon
                              style={{ height: "18px", width: "18px" }}
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {allData?.totalPages > 1 && (
          <Pagination
            currentpage={allData?.page}
            totalCount={allData?.totalPages}
            visiblePageCount={visiblePageCount}
            getAllData={getAllData}
          />
        )}
      </div>

      {/*---- Add modal ----*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={styleModal} className="styleModal">
            <div className="mt-3 mb-3 w-100">
              <h5 className="text-center pb-2">Add New Product</h5>
              <TextField
                label="Title"
                variant="outlined"
                className="mt-2 w-100"
                autocomplete="off"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="upload-photo" className="mt-4 w-100 mb-2">
                Description
              </label>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Enter more info here ..</p>"
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
                  <Button
                    variant="outlined"
                    component="span"
                    className="mt-3 w-100"
                  >
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
                          onChange={imgselcting}
                          accept="image/*"
                        />

                        <Button
                          variant="outlined"
                          component="span"
                          className="mt-3 w-100"
                        >
                          Upload Image
                        </Button>
                      </>
                    )}
                  </>
                )}
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-2">
              <Button onClick={handleClose} variant="outlined" className="w-50">
                Cancel
              </Button>
              {isLoadingBtn ? (
                <Button variant="outlined" disabled className="ms-2 w-50">
                  Loading...
                </Button>
              ) : (
                <>
                  {imageUrl === "" || title === "" || description === "" ? (
                    <Button variant="outlined" disabled className="ms-2 w-50">
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={SubmitForm}
                      variant="contained"
                      className="ms-2 w-50"
                    >
                      Submit
                    </Button>
                  )}
                </>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>

      {/*---- edit modal ----*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEdit}>
          <Box
            sx={styleModal}
            className="styleModal"
            style={{ height: "510px" }}
          >
            <EditModal
              closeEditModal={closeEditModal}
              editData={editData}
              editId={editId}
              RefreshData={RefreshData}
            />
          </Box>
        </Fade>
      </Modal>

      {/*---- delete modal ----*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDelPopup}
        onClose={() => setDeletePopup(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isDelPopup}>
          <Box
            sx={styleModal}
            className="px-5 py-5"
            style={{ height: "auto", width: "auto" }}
          >
            <div className="mt-2 w-100">
              <h5 className="text-center pb-4">
                Are you sure you want to delete product?
              </h5>
              <div className="row justify-content-center align-items-center mt-3">
                <div className="col-md-4 col-12">
                  <Button
                    onClick={() => setDeletePopup(false)}
                    variant="outlined"
                    className="w-100"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="col-md-4 col-12">
                  <Button
                    onClick={() => deleteProduct(editId)}
                    variant="contained"
                    className="w-100"
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
