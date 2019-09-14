import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { fetchEvents, setEventSeen } from "../../store/actions/events";

import { createMaterialStyles } from "../../utils";

import EventDetails from "./EventDetails";

import Well from "../../components/Well/Well";
import { Bar } from "react95";

const Events = ({ events, fetchEvents, setEventSeen }) => {
  const [openedEventIndex, setOpenedEventIndex] = useState(null);

  useEffect(() => {
    if (!events) {
      fetchEvents();
    }
  }, []);
  const setOpenedEvent = index => {
    if (index === null) {
      setOpenedEventIndex(null);
    } else if (index >= 0 && index < events.length) {
      const { id, seen } = events[index];
      if (!seen) {
        setEventSeen(id);
      }
      setOpenedEventIndex(index);
    }
  };

  let eventsList;
  if (events) {
    eventsList = events.map((e, i) => (
      <li key={e.id}>
        <Event onClick={() => setOpenedEvent(i)}>
          <EventImageWrapper seen={e.seen}>
            <EventIMG src={e.screenshot} />
          </EventImageWrapper>
          <EventTitle>{e.city}</EventTitle>
        </Event>
      </li>
    ));
  }
  return (
    <>
      <EventSlider>
        <EventListWrapper>
          <PullBars>
            <SBar />
            <SBar />
          </PullBars>
          <EventList>{eventsList && eventsList}</EventList>
        </EventListWrapper>
      </EventSlider>
      <FeedFooter>
        <Well>
          {events ? `Next event: ${events[0].title}` : "Loading events..."}{" "}
        </Well>
        <Well>{events && `${events.length} event(s)`} </Well>
      </FeedFooter>
      {openedEventIndex !== null && (
        <EventDetails
          setOpenedEvent={setOpenedEvent}
          events={events}
          openedEventIndex={openedEventIndex}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  let events = state.events;
  if (events !== null) {
    events = events.map(event => {
      return { ...event, seen: state.user.seenEvents.includes(event.id) };
    });
  }
  return {
    events
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  setEventSeen: eventID => dispatch(setEventSeen(eventID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
let EventSlider = styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    width: 0 !important;
    display: none;
  }
`;
let EventListWrapper = styled.div`
  ${createMaterialStyles("top")}

  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  min-width: 100%;
  height: 6.25rem;
  padding: 0.5rem;

  background: ${({ theme }) => theme.material};
`;
let PullBars = styled.div`
  margin-left: 0.75rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;
let SBar = styled(Bar)`
  position: relative;
  height: 4rem;
  margin-top: 12px;
`;
let EventList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
`;
let Event = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
let EventImageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 4rem;
  width: 4rem;
  margin-bottom: 0.25rem;
  border-radius: 50%;
  overflow: hidden;
  &:after {
    box-sizing: border-box;
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  ${({ seen, theme }) =>
    seen
      ? css`
          background: ${theme.borderDark};
          border: 1px solid transparent;
          &:after {
            border: 4px solid ${({ theme }) => theme.material};
          }
        `
      : css`
          background-image: linear-gradient(
            to bottom right,
            #ff71ce,
            #ff71ce,
            blue,
            teal
          );
          background-size: 110% 110%;
          background-position: center;
          border: 2px solid transparent;
          &:after {
            border: 3px solid ${({ theme }) => theme.material};
          }
        `}
`;
let EventIMG = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
let EventTitle = styled.span`
  width: 5.25rem;
  font-size: 0.8rem;
  line-height: 1rem;
  text-align: center;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
let FeedFooter = styled.footer`
  ${createMaterialStyles("top")}

  padding: 0.5rem;
  border-top-color: ${({ theme }) => theme.borderLight};
  &:before {
    border-top-color: ${({ theme }) => theme.borderLightest};
  }
  padding-bottom: 1rem;
  display: flex;
  flex-wrap: no-wrap;
  ${Well}:first-child {
    width: 100%;
    margin-right: 2px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  ${Well}:last-child {
    flex-shrink: 0;
    min-width: 4.75rem;
  }
`;
