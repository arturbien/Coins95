import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Select.css";

import SelectItem from "./SelectItem/SelectItem";

export class Select extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    width: PropTypes.number,
    noShadow: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
  };
  static defaultProps = {
    style: {},
    noShadow: false
  };

  state = {
    items: this.props.items || [],
    open: false,
    selectedItem: 0
  };

  toggle = () => this.setState(prevState => ({ open: !prevState.open }));
  handleSelect = index => {
    this.props.onSelect(this.state.items[index].value);
    this.setState({ selectedItem: index, open: false });
  };

  render() {
    const { noShadow, className, width, otherProps } = this.props;
    const { items, selectedItem, open } = this.state;
    const baseClass = "Select";

    const rootClass = cx(baseClass, className, {
      [`${baseClass}--noShadow`]: noShadow
    });
    return (
      <div
        className={`${baseClass}-wrapper`}
        style={{ width: width ? width : "auto" }}
      >
        <button onClick={this.toggle} className={`${baseClass}-header`}>
          {items.length ? items[selectedItem].title : ""}
          <span className={`${baseClass}-button`}>
            <span className={`${baseClass}-button__icon`} />
          </span>
        </button>
        {open && (
          <ul className={rootClass} {...otherProps}>
            {items.map((item, i) => (
              <SelectItem key={i} onClick={() => this.handleSelect(i)}>
                {item.title}
              </SelectItem>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
Select.defaultProps = {
  noShadow: false
};
export default Select;
