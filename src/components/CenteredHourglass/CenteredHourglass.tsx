import React from "react";

import { Hourglass } from "react95";

const CenteredHourglass = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
    }}
  >
    <Hourglass
      // @ts-ignore
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
  </div>
);

export default CenteredHourglass;
