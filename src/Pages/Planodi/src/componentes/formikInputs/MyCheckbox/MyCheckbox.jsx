import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

export default function MyCheckbox({
  disabled,
  name,
  style,
  customHandleChange,
  medium,
  children,
  id,
  isValid,
}) {
  const [field] = useField(name);
  return (
    <div style={{ margin: "0.5rem 0.5rem", display: "flex", ...style }}>
      <div style={{ height: "100%" }}>
        <Checkbox
          name={name}
          checked={field.value}
          onChange={(e) => {
            field.onChange(e);
            if (customHandleChange) {
              customHandleChange(e);
            }
          }}
          inputProps={{ "aria-label": "primary checkbox" }}
          size={medium ? "medium" : "small"}
          disabled={disabled}
          style={isValid ? { color: "#8c50ff" } : { color: "#f13837" }}
          id={name}
        />
      </div>
      <div style={{ marginTop: "0.5rem" }}>{children}</div>
    </div>
  );
}

MyCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  style: PropTypes.shape({}),
  customHandleChange: PropTypes.func,
};

MyCheckbox.defaultProps = {
  disabled: false,
  isValid: false,
  medium: true,
  customHandleChange: null,
  style: {},
  children: "",
};
