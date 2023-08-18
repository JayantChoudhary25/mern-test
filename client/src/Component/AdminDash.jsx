import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

import HorizontalSplitSharpIcon from '@mui/icons-material/HorizontalSplitSharp';

import style from "../Component/Css/AdminDash.module.css";
import stylelogin from "../Component/Css/Login.module.css";
import perswell_logo from "./Assets/logo.png";

export const AdminDash = () => {
  const [noti, setNoti] = useState();
  const [email, setEmail] = useState();
  const [userdata, setUserdata] = useState();
  const [shownoti, Setshownoti] = useState(false);
  const [showtable, setshowtable] = useState(false);

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "User") {
        navigate("/Dashboard");
      }
    }
  }, [user]);

  useEffect(() => {
    // Listen for Socket.IO events
    socket.on("userCreated", (data) => {
      // Update state or perform actions based on the received event
    });
    socket.on("selectproduct", (data) => {
      console.log(data.data);
      console.log(data);
      // setNoti(data.message);
      setNoti(data.data);
      notifun();
      // Update state or perform actions based on the received event
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("event");
    };
  }, []);

  const emitEvent = () => {
    socket.emit("event", { message: "Some event data" });
    // Emit Socket.IO event
  };

  const submitform = async (e) => {
    e.preventDefault();
    const data = await axios.post("/api/auth/invite_user", { email: email });
    toast.success(data.data.message);
  };

  const getuserdetail = async () => {
    await axios.get("/api/auth/getuserrDetail").then((res) => {
      console.log(res.data);
      setUserdata(res.data);
      setshowtable(true);
      exportToCSV();
    });
  };

  const exportToCSV = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // Get the current year
    const month = currentDate.getMonth() + 1; // Get the current month (add 1 since it's zero-based)
    const day = currentDate.getDate(); // Get the current day
    const hours = currentDate.getHours(); // Get the current hour
    const minutes = currentDate.getMinutes(); // Get the current minute
    const seconds = currentDate.getSeconds(); // Get the current second
    const formattedDateTime = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}_${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    // Convert the table into a worksheet
    const worksheet = XLSX.utils.table_to_sheet(
      document.querySelector(".table-bordered")
    );

    // Create a workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a Blob object from the buffer
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a download link and click it to download the file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `UserDetail_${formattedDateTime}.xlsx`;
    link.click();
    setshowtable(false);
  };

  const notifun = () => {
    Setshownoti(true);
    setTimeout(() => {
      Setshownoti(false);
    }, 5000);
  };
  // console.log(shownoti);
  return (
    <div className="container">
      <header>
        <div className={` ${stylelogin.headers}`}>
          <img
            src={perswell_logo}
            alt="loading..."
            className={stylelogin.logo_img}
          />
        </div>
        
      </header>
      <div
        className="Line1 mt-2"
        style={{
          width: "100%",
          border: "0.50px #FEFCFF solid",
        }}
      ></div>
      <div
        className="login"
        style={{ flexDirection: "row", padding: "10px 0px !important" }}
      >
        <div className={style.admin_card}>
          <h6 className="text-center mb-5">send invitation</h6>
          <form onSubmit={submitform}>
            <div className="row justify-content-center align-items-center my-5 py-4">
              <div className="col-lg-4 col-md-6 col-12">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={style.custom_input}
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <input
                  type="submit"
                  value="send invitation "
                  style={{ width: "200px", marginTop: "10px" }}
                  className="btn secondary_btn"
                />
              </div>
            </div>
          </form>
          <button
            onClick={getuserdetail}
            className="btn primary_btn w-lg-50 px-5"
          >
            Get User Details
          </button>
        </div>

        {shownoti === true ? noti : ""}
      </div>
      <div
        className="table-bordered"
        style={{ display: showtable === false ? "none" : "block" }}
      >
        <table className="table">
          <tr>
            <th>Firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>Product</th>
          </tr>

          {userdata &&
            userdata.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item?.Firstname}</td>
                    <td>{item?.lastname}</td>
                    <td>{item.email}</td>
                    <td>
                      <td>{item.product.join(", ")}</td>
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
};
