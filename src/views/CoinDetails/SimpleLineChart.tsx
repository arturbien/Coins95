import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  // XAxis
} from "recharts";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

type Props = {
  data: {
    AVG: number;
    HIGH: number;
    LOW: number;
  }[];
};

const SimpleLineChart = ({ data }: Props) => {
  const themeContext = useContext(ThemeContext);
  const lineColor = themeContext.progress;
  const textColor = themeContext.canvasText;

  return (
    <div style={{ position: "absolute", inset: 0, padding: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            mirror
            tick={{ stroke: textColor }}
          />

          <CartesianGrid strokeDasharray="3 3" stroke={textColor} />
          <Line
            type="monotone"
            dataKey="AVG"
            stroke={lineColor}
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
    </div>
  );
};
export default SimpleLineChart;
