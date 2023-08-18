import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "../Css/admin.module.css";
import Pagination from "../Pagination/Index";
import Loader from "../Loder/Index";

export const UserList = () => {
  const [allData, setallData] = useState([]);
  const [isLoader, setLoader] = useState(false);

  const visiblePageCount = 15;

  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    setLoader(true);
    await axios
      .get(`/api/auth/first_login_users?page=${page}&limit=${visiblePageCount}`)
      .then((res) => {
        if (res.status === 200) {
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

  return (
    <div className="p-md-4 p-2 ">
      {isLoader && <Loader />}
      <div className={style.top_section}>
        <h6 className="mb-0">User List</h6>
      </div>
      <div className="px-2 w-100 pt-4 dashboard_table">
        <table className="table table-striped table-bordered table-responsive ">
          <thead>
            <tr>
              <td>No.</td>
              <td>Full Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {allData?.Users?.length > 0
              ? allData?.Users?.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1 + (allData?.page - 1) * 10}</td>
                      <td>
                        {items?.Firstname} {items?.lastname}
                      </td>
                      <td>{items?.email}</td>
                    </tr>
                  );
                })
              : ""}
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
  );
};
