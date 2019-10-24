import React from "react";

import { Select } from "react95";

const CurrencySelect = ({ selectedCurrency, onChange }) => {
  const currencies = ["EUR", "USD", "PLN"].map(currency => ({
    value: currency,
    label: currency
  }));
  const selectedIndex = currencies.findIndex(
    currency => currency.value === selectedCurrency
  );
  return (
    <Select
      style={{ flexShrink: 0 }}
      width={85}
      onChange={value => onChange(value)}
      selectedIndex={selectedIndex}
      items={currencies}
    />
  );
};

export default CurrencySelect;
