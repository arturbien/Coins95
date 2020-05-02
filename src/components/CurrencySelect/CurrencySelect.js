import React from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/actions/user";
import { Select } from "react95";

const CurrencySelect = ({ selectedCurrency, setCurrency }) => {
  const currencies = ["USD", "EUR", "PLN", "JPY"].map(currency => ({
    value: currency,
    label: currency
  }));
  return (
    <Select
      style={{ flexShrink: 0 }}
      width={85}
      onChange={(e) => setCurrency(e.target.value)}
      value={selectedCurrency}
      options={currencies}
    />
  );
};
const mapStateToProps = state => ({
  selectedCurrency: state.user.currency
});
const mapDispatchToProps = dispatch => ({
  setCurrency: currency => dispatch(setCurrency(currency))
});
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
