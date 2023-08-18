import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function Graph2() {
  const [allData, setallData] = useState([]);

  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    await axios
      .get(`/api/auth/user-selected-products`)
      .then((res) => {
        if (res.status === 200) {
          setallData(res?.data);
        } else {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <BarChart
      width={1000}
      height={400}
      data={allData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Product" />
      <YAxis dataKey="Users" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Users" fill="#82ca9d" barSize={40} />
    </BarChart>
  );
}
