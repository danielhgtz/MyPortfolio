import React from "react";
import { useField } from "formik";
import { Select } from "@material-ui/core";

export default function MySelect({
  name,
  children,
  disabled = false,
  label = null,
  placeholder = "Selecciona",
  style = {},
  styleInput = {},
  customHandleChange = null,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div style={{ margin: "0 0.5rem", ...style }}>
      {label ? <p className="formik-text-input">{label}</p> : null}
      <Select
        variant="outlined"
        id={name}
        native
        error={!!errorText}
        value={field.value}
        onChange={(e) => {
          field.onChange(e);
          if (customHandleChange) {
            customHandleChange(e);
          }
        }}
        onBlur={field.onBlur}
        disabled={disabled}
        style={{ width: "100%", ...styleInput }}
      >
        <option value="-1" disabled>
          {placeholder}
        </option>
        {children}
      </Select>
    </div>
  );
}
