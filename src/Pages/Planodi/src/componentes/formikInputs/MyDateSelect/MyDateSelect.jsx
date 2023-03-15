import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

export default function MyDateSelect({
  placeholder,
  disabled = false,
  name,
  label,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div style={{ margin: "0 0.5rem" }}>
      {label ? <p className="formik-text-input">{label}</p> : null}
      <TextField
        id={field.name}
        placeholder={placeholder}
        helperText={errorText}
        error={!!errorText}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        type="date"
        disabled={disabled}
        variant="outlined"
        size="medium"
        style={{ width: "100%" }}
      />
    </div>
  );
}

MyDateSelect.defaultProps = {
  disabled: false,
  helperText: "",
};
