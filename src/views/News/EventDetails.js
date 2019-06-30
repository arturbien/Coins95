import React, { useState } from "react";
import styled from "styled-components";

import { setEventSeen } from "../../store/actions/events";

import { Window, WindowContent, Cutout, Toolbar, Button } from "react95";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

let SWindow = styled(Window)`
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  height: 50%;
  width: 100%;
  z-index: 9999;

  display: flex;
  flex-direction: column;
`;
let SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0.25rem;
`;
let SCutout = styled(Cutout)`
  flex: 1;
  background: white;
  overflow: hidden;
`;
let Description = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  overflow-y: scroll;
`;
let Details = styled.div`
  height: 100px;
  flex-shrink: 0;
`;
let SToolbar = styled(Toolbar)`
  flex-shrink: 0;
`;
const EventDetails = ({ events, initialIndex, onClose, setEventSeen }) => {
  const [eventIndex, setEventIndex] = useState(initialIndex);
  useLockBodyScroll();

  const { title, description } = events[eventIndex];
  if (!events[eventIndex].seen) {
    setEventSeen(events[eventIndex].id);
  }
  return (
    <SWindow>
      <SWindowContent>
        <Details>{title}</Details>
        <Button onClick={onClose}>🦎</Button>
        <SCutout>
          <Description>{description}</Description>
        </SCutout>
      </SWindowContent>
      <SToolbar>
        <Button
          onClick={() => setEventIndex(eventIndex - 1)}
          disabled={eventIndex <= 0}
          fullWidth
        >
          Back
        </Button>
        <Button
          onClick={() => setEventIndex(eventIndex + 1)}
          disabled={eventIndex >= events.length - 1}
          fullWidth
        >
          Next
        </Button>
      </SToolbar>
    </SWindow>
  );
};

export default EventDetails;
