import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Graph1() {
  const [allData, setallData] = useState([]);

  console.log("page", allData);
  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    await axios
      .get(`/api/auth/monthlyUserCount`)
      .then((res) => {
        console.log(res);
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
    <LineChart
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
      <XAxis dataKey="Month" />
      <YAxis dataKey="TotalUsers" tickCount={4} />
      <Tooltip />
      <Legend />
      <Line
      className="graph_line"
        type="monotone"
        dataKey="TotalUsers"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        style={{ TextTransform: "capitalize" }}
      />
      <Line
        type="monotone"
        dataKey="Month"
        stroke="#82ca9d"
        style={{ TextTransform: "capitalize" }}
      />
    </LineChart>
  );
}
