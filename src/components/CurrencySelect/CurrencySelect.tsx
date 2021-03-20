import React from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/actions/user";
import { AppState, AppDispatch } from "../../store";

import { Select } from "react95";
import { currencies, Currency } from "../../store/reducers/user";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const CurrencySelect = ({ selectedCurrency, setCurrency }: Props) => {
  // TODO: options type should be a union type of Option
  const options = currencies.map((currency) => ({
    value: currency,
    label: currency,
  }));

  const handleChange = (
    e: React.FormEvent,
    newOption: typeof options[number]
  ) => {
    setCurrency(newOption.value);
  };

  return (
    <Select
      style={{ flexShrink: 0 }}
      width={85}
      onChange={handleChange}
      value={selectedCurrency}
      options={options}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedCurrency: state.user.currency,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setCurrency: (currency: Currency) => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
