import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchEvents } from "../../store/actions/events";

import { createMaterialStyles } from "../../utils";

import Well from "../../components/Well/Well";
import { Bar } from "react95";

export class Events extends React.Component {
  static propTypes = {};

  componentDidMount() {
    const { events, fetchEvents } = this.props;

    if (!events) {
      fetchEvents();
    }
  }
  render() {
    const { events } = this.props;
    let eventsList;
    if (events) {
      eventsList = events.map(event => (
        <li>
          <Event>
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
            <Bar
              style={{
                height: "80px",
                marginLeft: "0.5rem",
                marginRight: "1rem"
              }}
            />
          </li>
          {eventsList && eventsList}
        </EventList>
        <FeedFooter>
          <Well>{events && `${events.length} upcoming events found`} </Well>
          <Well>25 news found</Well>
        </FeedFooter>
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

let EventList = styled.ul`
  display: flex;
  align-items: flex-start;
  padding: 0.75rem 0;
  overflow-x: scroll;
  flex-wrap: no-wrap;
  background: ${({ theme }) => theme.material};
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
