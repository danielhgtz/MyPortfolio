import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default function MyMoneyInput({
  placeholder,
  disabled = false,
  helperText,
  name,
  style,
  label,
  type,
  isSizeMedium,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl
      style={{ margin: "0 0.5rem", ...style }}
      className="widthForInputs"
    >
      <Typography variant="subtitle1" style={{ fontSize: "18px" }}>
        {label || null}
      </Typography>
      <TextField
        name={name}
        id={field.name}
        placeholder={placeholder}
        helperText={helperText}
        error={!!errorText}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        style={{ width: "100%" }}
        type={type || "text"}
        disabled={disabled}
        variant="outlined"
        size={isSizeMedium ? "medium" : "small"}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      {errorText ? (
        <FormHelperText style={{ color: "#f44336" }}>
          {errorText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

MyMoneyInput.defaultProps = {
  disabled: false,
  style: {},
  type: "text",
  helperText: "",
  isSizeMedium: true,
  label: "",
};
