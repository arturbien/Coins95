import React from "react";
import styled from "styled-components";

import {
  WindowContent,
  Select,
  Cutout,
  Toolbar,
  Button,
  Bar
} from "react95";

import FullPageWindow from "../../components/FullPageWindow/FullPageWindow";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import EventExplorerIcon from "../../assets/img/eventExplorer.png";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

const EventDetails = ({ events:eventsProp, openedEventIndex, setOpenedEvent }) => {
  useLockBodyScroll();
  const events = eventsProp.map(e => ({label: e.title, value: e.id}))
  const {
    title,
    description,
    screenshot,
    start_date,
    end_date,
    organizer
    // website,
    // email
  } = eventsProp[openedEventIndex];
  return (
    <SWindow>
      <WindowHeader>
        <img
          alt="Planet Earth icon"
          src={EventExplorerIcon}
          style={{ height: 24, marginTop: -1, marginRight: "0.5rem" }}
        />
        Event explorer
        <Button
          square
          size="sm"
          style={{
            position: "absolute",
            right: 2,
            top: 3,
            fontWeight: "bold"
          }}
          onClick={() => setOpenedEvent(null)}
        >
          <CloseIcon />
        </Button>
      </WindowHeader>
      <SWindowContent>
        <EventSelectWrapper>
          <div style={{ flexShrink: 0, margin: "0 0.5rem 0 0.125rem", height: 35 }}>
            <Bar />
            <Bar />
          </div>
          <Select
            // TODO can't test select due to lack of events caused by COVID19
            disabled
            options={events}
            value={events[openedEventIndex].value}
            width={'100%'}
            onChange={index => setOpenedEvent(index)}
          />
        </EventSelectWrapper>
        <SCutout>
          <Description>
            <EventImage src={screenshot} />

            <Row>
              <Col>{organizer}</Col>
              <Col style={{ textAlign: "right" }}>
                {start_date}-{end_date}
              </Col>
            </Row>
            {/* <div>Email: {email}</div>
            <br />
            <div>
              Website:{" "}
              <Anchor href={website}>{new URL(website).hostname}</Anchor>
            </div>
            <br /> */}
            <h1>{title}</h1>
            <br />
            <p>{description}</p>
          </Description>
        </SCutout>
      </SWindowContent>
      <SToolbar>
        <Button
          onClick={() => setOpenedEvent(openedEventIndex - 1)}
          disabled={openedEventIndex <= 0}
          fullWidth
        >
          Back
        </Button>
        <Button
          onClick={() => setOpenedEvent(openedEventIndex + 1)}
          disabled={openedEventIndex >= events.length - 1}
          fullWidth
        >
          Next
        </Button>
      </SToolbar>
    </SWindow>
  );
};

export default EventDetails;

const SWindow = styled(FullPageWindow)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

const SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0.25rem;
`;
const SCutout = styled(Cutout)`
  flex: 1;
  background: white;
  overflow: hidden;
`;
const Description = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  overflow-y: scroll;
  line-height: 1.5;

  > h1 {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
const SToolbar = styled(Toolbar)`
  flex-shrink: 0;
`;

const EventSelectWrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  margin-right: 2px;
  padding: 0.25rem;
  padding-top: calc(0.25rem + 2px);
  border: 2px solid ${({ theme }) => theme.borderDark};
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.borderLightest};
  }
`;
const EventImage = styled.img`
  width: 100%;
  margin-bottom: 1rem;
  height: auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  line-height: 1.8;
`;
const Col = styled.div`
  width: 50%;
`;
