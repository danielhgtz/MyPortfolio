import React from "react";
import { useField } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function MyLongText({
  placeholder,
  name,
  label = null,
  rows = 4,
  disabled = false,
  style,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const estilosForm = {
    ...style,
  };
  return (
    <FormControl style={estilosForm} className="widthForInputs">
      {label ? (
        <Typography variant="subtitle1" style={{ fontSize: "18px" }}>
          {label}
        </Typography>
      ) : null}
      <TextField
        id={field.name}
        placeholder={placeholder}
        helperText={errorText}
        error={!!errorText}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disabled}
        variant="outlined"
        multiline
        rows={rows}
      />
    </FormControl>
  );
}

MyLongText.defaultProps = {
  disabled: false,
  style: {},
  rows: 4,
  label: null,
};
