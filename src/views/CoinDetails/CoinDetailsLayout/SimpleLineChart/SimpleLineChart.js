import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const SimpleLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        {/* <XAxis dataKey="name" /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="AVG"
          stroke="#e980fc"
          strokeWidth={4}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="LOW"
          stroke="#000000"
          strokeWidth={1}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="HIGH"
          stroke="#ffffff"
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SimpleLineChart;
