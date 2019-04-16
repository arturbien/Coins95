import React from "react";

import Loader from "../../components/Loader/Loader";

const CenteredLoader = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0
    }}
  >
    <Loader
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)"
      }}
    />
  </div>
);

export default CenteredLoader;
