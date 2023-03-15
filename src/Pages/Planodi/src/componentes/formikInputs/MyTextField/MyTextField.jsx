import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import './MyTextField.css';

const voidFunction = () => {};

export default function MyTextField({
  placeholder,
  label,
  disabled,
  name,
  type,
  medium,
  style,
  onFocus = voidFunction,
  customHandleChange,
  customHandleBlur,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div style={{ margin: '0.5rem 0.5rem', ...style }}>
      {label ? <p className="formik-text-input">{label}</p> : null}
      <TextField
        placeholder={placeholder}
        helperText={errorText}
        error={!!errorText}
        variant="outlined"
        disabled={disabled}
        label={placeholder}
        style={disabled ? { width: '100%', opacity: '0.3' } : { width: '100%' }}
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
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
        onFocus={onFocus}
        value={field.value}
        type={type}
        name={name}
        size={medium ? 'medium' : 'small'}
        autoComplete="off"
      />
    </div>
  );
}

MyTextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  medium: PropTypes.bool,
  style: PropTypes.shape({}),
  customHandleChange: PropTypes.func,
  onfocus: PropTypes.func,
  customHandleBlur: PropTypes.func,
};

MyTextField.defaultProps = {
  placeholder: '',
  label: null,
  disabled: false,
  type: 'input',
  medium: true,
  customHandleChange: null,
  customHandleBlur: null,
  style: {},
};
