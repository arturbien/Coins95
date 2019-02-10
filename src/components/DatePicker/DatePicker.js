import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./DatePicker.css";

import Window from "../Window/Window";
import WindowHeader from "../WindowHeader/WindowHeader";
import WindowContent from "../WindowContent/WindowContent";
import Frame from "../Frame/Frame";
import Select from "../Select/Select";
import NumberField from "../NumberField/NumberField";

class DatePicker extends Component {
  state = {
    month: 0,
    year: 1991
  };
  handleMonthSelect = month => this.setState({ month });
  handleYearSelect = year => this.setState({ year });
  render() {
    const { month, year } = this.state;

    const baseClass = "DatePicker";

    const months = [
      { value: 1, title: "January" },
      { value: 2, title: "February" },
      { value: 3, title: "March" },
      { value: 4, title: "April" },
      { value: 5, title: "May" },
      { value: 6, title: "June" },
      { value: 7, title: "July" },
      { value: 8, title: "August" },
      { value: 9, title: "September" },
      { value: 10, title: "October" },
      { value: 11, title: "November" },
      { value: 12, title: "December" }
    ];
    return (
      <div>
        <Window>
          <WindowHeader>Date/Time Properties</WindowHeader>
          <WindowContent>
            <Frame title="Date">
              <div className={`${baseClass}-toolbar`}>
                <Select
                  items={months}
                  onSelect={this.handleMonthSelect}
                  width={128}
                  className={`${baseClass}-toolbar__input`}
                />
                <NumberField
                  value={year}
                  onChange={this.handleYearSelect}
                  width={128}
                  className={`${baseClass}-toolbar__input`}
                />
              </div>
              <h1>swag</h1>
            </Frame>
          </WindowContent>
        </Window>
      </div>
    );
  }
}

export default DatePicker;
