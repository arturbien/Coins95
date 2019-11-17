import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  YAxis
  // XAxis
} from "recharts";

const SimpleLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          mirror
          tick={{ stroke: "#ffffff" }}
        />

        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
        <Line
          type="monotone"
          dataKey="AVG"
          stroke="#ff0000"
          strokeWidth={2}
          dot={false}
        />
        {/* <Line
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
        /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SimpleLineChart;
