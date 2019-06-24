import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchEvents } from "../../store/actions/events";

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
  setOpenedEvent = index => this.setState({ openedEventIndex: index });

  render() {
    const { events } = this.props;
    const { openedEventIndex } = this.state;
    console.log("⚡", openedEventIndex, events && events[openedEventIndex]);
    let eventsList;
    if (events) {
      eventsList = events.map((event, i) => (
        <li key={event.id}>
          <Event onClick={() => this.setOpenedEvent(i)}>
            <EventImageWrapper>
              <EventIMG src={event.screenshot} />
            </EventImageWrapper>
            <EventTitle>{event.city}</EventTitle>
          </Event>
        </li>
      ));
    }
    return (
      <div>
        <EventList>
          <li>
            <SBar />
          </li>
          {eventsList && eventsList}
        </EventList>
        <FeedFooter>
          <Well>{events && `Next event: ${events[0].title}`} </Well>
          <Well>{events && `${events.length} event(s)`} </Well>
        </FeedFooter>
        {openedEventIndex !== null && (
          <EventDetails
            events={events}
            initialIndex={openedEventIndex}
            onClose={() => this.setOpenedEvent(null)}
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
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

let SBar = styled(Bar)`
  position: relative;
  height: 4rem;
  margin-top: 12px;
  margin-left: 0.75rem;
  margin-right: 1rem;
`;
let EventList = styled.ul`
  display: flex;
  align-items: flex-start;
  padding: 0.5rem 0;
  overflow-x: scroll;
  flex-wrap: nowrap;
  background: ${({ theme }) => theme.material};
  -webkit-overflow-scrolling: touch;
`;
let Event = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
let EventImageWrapper = styled.div`
  position: relative;
  height: 4rem;
  width: 4rem;
  margin-bottom: 0.25rem;
  border-radius: 50%;
  overflow: hidden;
  background: red;

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
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.material};
  }
`;
let EventIMG = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
let EventTitle = styled.span`
  width: 5.5rem;
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
  }
  ${Well}:last-child {
    flex-shrink: 0;
  }
`;
