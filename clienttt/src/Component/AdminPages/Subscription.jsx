import React, { useEffect, useState } from "react";
import axios from "axios";

import DownloadIcon from "@mui/icons-material/Download";

import style from "../Css/admin.module.css";
import Pagination from "../Pagination/Index";
import Loader from "../Loder/Index";

export const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const visiblePageCount = 20;

  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    setLoader(true);
    await axios
      .post(
        `/api/auth/subscription_list?page=${page}&limit=${visiblePageCount}`
      )
      .then((res) => {
        if (res.status === 200) {
          setSubscriptionData(res?.data);
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
    <div className="p-md-4 p-2">
        {isLoader && <Loader/>}
      <div className={style.top_section}>
        <h6 className="mb-0">Subscription List</h6>
      </div>
      <div className="px-2 w-100 pt-4 dashboard_table">
        <table className="table table-striped table-bordered table-responsive ">
          <thead>
            <tr>
              <td>No.</td>
              <td>User Name</td>
              <td>Email</td>
              <td>Product</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {subscriptionData?.users?.length > 0
              ? subscriptionData?.users?.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1 + (subscriptionData?.page - 1) * 10}</td>
                      <td>
                        {items?.Firstname} {items?.lastname}
                      </td>
                      <td>{items?.email}</td>
                      <td>{items?.product}</td>
                      <td>
                        <a
                          href={`http://50.17.174.239/api/auth/exportSubscription/${items?._id}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <DownloadIcon />
                        </a>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      {subscriptionData?.totalPages > 1 && (
        <Pagination
          currentpage={subscriptionData?.page}
          totalCount={subscriptionData?.totalPages}
          visiblePageCount={visiblePageCount}
          getAllData={subscriptionData}
        />
      )}
    </div>
  );
};
