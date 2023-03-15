import React from "react";
import { useField } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const voidFunction = () => {};

export default function MyCelInput({
  name,
  style,
  customHandleChange,
  customHandleBlur,
  onFocus = voidFunction,
  disabled = false,
  placeholder = "Ingresa tu celular",
  label = "Celular",
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div style={{ margin: "0.5rem 0.5rem", ...style }}>
      <FormControl fullWidth variant="outlined" error={!!errorText}>
        <InputLabel htmlFor="cel-input">{label}</InputLabel>
        <OutlinedInput
          id="cel-input"
          value={field.value}
          onBlur={(e) => {
            field.onBlur(e);
            if (customHandleBlur) {
              customHandleBlur(e);
            }
          }}
          onChange={(e) => {
            field.onChange(e);
            if (customHandleChange) {
              customHandleChange(e);
            }
          }}
          onFocus={onFocus}
          startAdornment={
            <InputAdornment position="start">+52 </InputAdornment>
          }
          labelWidth={60}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          aria-describedby="cel-input-text"
        />
        <FormHelperText id="cel-input-text">{errorText}</FormHelperText>
      </FormControl>
    </div>
  );
}

MyCelInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  customHandleChange: PropTypes.func,
  onfocus: PropTypes.func,
  customHandleBlur: PropTypes.func,
};

MyCelInput.defaultProps = {
  placeholder: "Ingresa tu celular",
  label: "Celular",
  disabled: false,
  customHandleChange: null,
  customHandleBlur: null,
};
