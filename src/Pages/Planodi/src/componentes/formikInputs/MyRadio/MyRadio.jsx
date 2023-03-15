import React from "react";
import { useField } from "formik";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function MyRadio({
  name,
  children,
  style = {},
  customHandleChange = null,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div style={{ margin: "0 0.5rem", ...style }}>
      <RadioGroup
        row
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
      >
        {children}
      </RadioGroup>
    </div>
  );
}
