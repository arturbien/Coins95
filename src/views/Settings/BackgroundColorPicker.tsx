import throttle from "lodash.throttle";
import React from "react";
import { ColorInput } from "react95";

const metaThemeColor = document.querySelector<HTMLMetaElement>(
  'meta[name="theme-color"]'
);
const setMetaThemeColor = (color: string) => {
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", color);
  } else {
    console.warn(`meta[name="theme-color"] not found`);
  }
};

type Props = {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
};

const BackgroundColorPicker = ({
  value,
  onChange: onChangeProp,
  disabled,
}: Props) => {
  const onChange = React.useCallback(
    (color: string) => {
      setMetaThemeColor(color);
      onChangeProp(color);
    },
    [onChangeProp]
  );

  const throttledOnChange = React.useMemo(
    () => throttle(onChange, 100),
    [onChange]
  );

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      throttledOnChange(e.target.value);
    },
    [throttledOnChange]
  );

  return (
    <ColorInput
      value={value}
      onChange={handleOnChange}
      disabled={disabled}
      onFocus={() => setMetaThemeColor(value)}
      onBlur={() => setMetaThemeColor("#000000")}
    />
  );
};

export default BackgroundColorPicker;
