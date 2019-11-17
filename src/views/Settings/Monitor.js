import React from "react";
import styled from "styled-components";
import monitorIMG from "../../assets/img/monitor.png";

const Wrapper = styled.div`
  position: relative;
  width: 194px;
  height: 176px;
  margin: auto;
`;
const MonitorFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: url(${monitorIMG}) no-repeat 50%;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
`;
const MonitorContent = styled.div`
  width: 100%;
  height: 85%;
  background: ${({ backgroundColor, imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : backgroundColor || "transparent"};
`;
const Monitor = ({ backgroundColor, imageSrc }) => (
  <Wrapper>
    <MonitorContent backgroundColor={backgroundColor} imageSrc={imageSrc} />
    <MonitorFrame backgroundColor={!imageSrc && backgroundColor} />
  </Wrapper>
);
export default Monitor;
