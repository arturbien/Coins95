import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { fetchEvents, setEventSeen } from "../../store/actions/events";

import { createMaterialStyles } from "../../utils";

import EventDetails from "./EventDetails";

import Well from "../../components/Well/Well";
import { Bar } from "react95";

export class Events extends React.Component {
  static propTypes = {};

  state = {
    openedEventIndex: null
  };
  componentDidMount() {
    const { events, fetchEvents } = this.props;

    if (!events) {
      fetchEvents();
    }
  }
  setOpenedEvent = index => {
    const { events, setEventSeen } = this.props;
    if (index === null) {
      this.setState({ openedEventIndex: null });
    } else if (index >= 0 && index < events.length) {
      const { id, seen } = events[index];
      if (!seen) {
        setEventSeen(id);
      }
      this.setState({ openedEventIndex: index });
    }
  };

  render() {
    const { events } = this.props;
    const { openedEventIndex } = this.state;

    let eventsList;
    if (events) {
      eventsList = events.map((e, i) => (
        <li key={e.id}>
          <Event onClick={() => this.setOpenedEvent(i)}>
            <EventImageWrapper seen={e.seen}>
              <EventIMG src={e.screenshot} />
            </EventImageWrapper>
            <EventTitle>{e.city}</EventTitle>
          </Event>
        </li>
      ));
    }
    return (
      <div style={{ overflow: "hidden", height: "100%" }}>
        <EventListWrapper>
          <EventList>
            <PullBars>
              <SBar />
              <SBar />
            </PullBars>
            {eventsList && eventsList}
          </EventList>
        </EventListWrapper>
        <FeedFooter>
          <Well>{events && `Next event: ${events[0].title}`} </Well>
          <Well>{events && `${events.length} event(s)`} </Well>
        </FeedFooter>
        {openedEventIndex !== null && (
          <EventDetails
            setOpenedEvent={this.setOpenedEvent}
            events={events}
            openedEventIndex={openedEventIndex}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  setEventSeen: eventID => dispatch(setEventSeen(eventID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

let EventListWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0.5rem 0;
  overflow-x: scroll;
  flex-wrap: nowrap;
  background: ${({ theme }) => theme.material};
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
let FeedFooter = styled.section`
  ${createMaterialStyles("top")}

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
  }
`;
