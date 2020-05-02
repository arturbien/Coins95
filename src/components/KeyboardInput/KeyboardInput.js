import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { TextField } from "react95";
import Keyboard from "../Keyboard/Keyboard";

const keyboardRoot = document.getElementById("keyboard-root");

const KeyboardInput = ({ value: valueProp = '',onChange, onFocus, onBlur, ...otherProps }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef();
  const keyboardRef = useRef();

  // show keyboard when input is focused
  const handleFocus = (e) => {
    e.preventDefault();
    setShowKeyboard(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  // hiding keyboard on any click outside
  const outsideClickHandler = (e) => {

    if (
      (inputRef.current && !inputRef.current.contains(e.target)) &&
      (keyboardRef.current && !keyboardRef.current.contains(e.target))
    ) {
      setShowKeyboard(false);
      handleBlur({ target: inputRef.current})
    }
  };
  useEffect(() => {
    window.addEventListener("click", outsideClickHandler);
    return () => window.removeEventListener("click", outsideClickHandler);
  });

  const handleChange = e => {
      if (onChange) {
          onChange(e);
      }
  }
  const handleKeyboardInput = val => {
    const input = inputRef.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(input, val);
    const inputEvent = new Event('input', { bubbles: true});
    input.dispatchEvent(inputEvent);
  }
  return (
    <>
      <TextField
        value={valueProp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        // readonly to disable native keyboard
        readOnly
        ref={inputRef}
        {...otherProps}
      />
      { 
        ReactDOM.createPortal(
          <Keyboard open={showKeyboard} ref={keyboardRef} value={valueProp} setValue={handleKeyboardInput}/>,
          keyboardRoot
        )
        }
    </>
  );
};

export default KeyboardInput;
