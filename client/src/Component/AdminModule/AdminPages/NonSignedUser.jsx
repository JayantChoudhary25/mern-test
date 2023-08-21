import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "../../Css/admin.module.css";
// import Pagination from "../Pagination/Index";
// import Loader from "../Loder/Index";

export const NonSignedUser = () => {
  const [allData, setallData] = useState([]);
  const [isLoader, setLoader] = useState(false);

  const visiblePageCount = 15;

  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    setLoader(true);
    await axios
      .get(`/api/auth/userFalseNDA`)
      .then((res) => {
        console.log(res)
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
      {/* {isLoader && <Loader />} */}
      <div className={style.top_section}>
        <h6 className="mb-0">Non Signed User</h6>
      </div>
      <div className="px-2 w-100 pt-4 dashboard_table">
        <table className="table table-striped table-bordered table-responsive ">
          <thead>
            <tr>
              <td>No.</td>
              <td>Full Name</td>
              <td>Email</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {allData?.users?.length > 0
              ? allData?.users?.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1 }</td>
                      <td>
                        {items?.fullname}
                      </td>
                      <td>{items?.email}</td>
                      <td className="py-3" > <button className="btn btn-light">Send Access Code</button></td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      {/* {allData?.totalPages > 1 && (
        <Pagination
          currentpage={allData?.page}
          totalCount={allData?.totalPages}
          visiblePageCount={visiblePageCount}
          getAllData={getAllData}
        />
      )} */}
    </div>
  );
};
