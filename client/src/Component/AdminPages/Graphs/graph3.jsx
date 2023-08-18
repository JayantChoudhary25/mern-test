import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function Graph3() {
  const [data, setallData] = useState([]);

  const COLORS = ["#0088FE",  "#FFBB28", "#FF8042"];

  useEffect(() => {
    getAllData(1);
  }, []);

  const getAllData = async (page) => {
    await axios
      .get(`/api/auth/user-without-products`)
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
    <div className="d-flex justify-content-center align-items-center">
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          // labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {data[index]?.Users} {data[index]?.value}%
              </text>
            );
          }}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          payload={data.map((entry, index) => ({
            id: entry.Users,
            type: "square",
            value: `${entry.Users}`,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </div>
  );
}
