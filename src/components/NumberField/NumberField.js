import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./NumberField.css";

import TextField from "../TextField/TextField";

class NumberField extends Component {
  state = {
    value: parseInt(this.props.value) || 0
  };

  add = value => {
    const newValue = this.state.value + value;
    this.props.onChange(newValue);
    this.setState({ value: newValue });
  };

  handleChange = e => {
    const newValue = parseInt(e.target.value);
    this.props.onChange(newValue);
    this.setState({ value: newValue });
  };

  render() {
    const { disabled, className, width } = this.props;
    const { value } = this.state;
    const baseClass = "NumberField";
    const rootClass = cx(baseClass, className, {
      [`${baseClass}__disabled`]: disabled
    });

    return (
      <div className={rootClass} style={{ width: width ? width : "auto" }}>
        <TextField
          width={"100%"}
          value={value}
          onChange={disabled ? undefined : this.handleChange}
          readOnly={disabled}
          type="number"
        />
        <div className={`${baseClass}-buttons`}>
          <button onClick={() => this.add(1)} className={`${baseClass}-button`}>
            <span
              className={`${baseClass}-button__icon ${baseClass}-button__icon--up`}
            />
          </button>

          <button
            onClick={() => this.add(-1)}
            className={`${baseClass}-button`}
          >
            <span className={`${baseClass}-button__icon`} />
          </button>
        </div>
      </div>
    );
  }
}

NumberField.defaultProps = {
  value: 0,
  disabled: false,
  width: null
};
NumberField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  className: PropTypes.string
};
export default NumberField;
