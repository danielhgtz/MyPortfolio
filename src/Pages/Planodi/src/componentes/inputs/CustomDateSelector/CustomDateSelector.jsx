import React from "react";

import "./CustomDateSelector.css";
import PropTypes from "prop-types";

/**
 * req params:
 * value
 * setValue
 * name
 * */

export default function CustomDateSelector({
  value,
  setValue,
  name,
  customHandleChange,
  handleFocus,
  min,
  className,
  disabled,
  style,
}) {
  return (
    <input
      className={`desiredDate ${className ? className : null}`}
      type="date"
      min={min}
      onChange={(e) => {
        setValue(e.target.value);
        if (customHandleChange) {
          customHandleChange(e);
        }
      }}
      value={value}
      name={name}
      disabled={disabled}
      style={{ ...style }}
      onFocus={handleFocus}
    />
  );
}

CustomDateSelector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  min: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  handleFocus: PropTypes.func,
  customHandleChange: PropTypes.func,
};

CustomDateSelector.defaultProps = {
  disabled: false,
  handleFocus: null,
  min: null,
  style: {},
  className: null,
  customHandleChange: null,
};
