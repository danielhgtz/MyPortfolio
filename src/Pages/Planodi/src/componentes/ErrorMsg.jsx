import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./ErrorMsg.css";
import PropTypes from "prop-types";

export default function ErrorMsg({ setError, errorMsg, style }) {
  return (
    <div className="wrapper-err-msg-comp" style={{ ...style }}>
      <p style={{ margin: "0" }}>
        <span className="err-msg-comp-exc">!</span>
        {errorMsg}
      </p>
      <IconButton
        aria-label="close"
        onClick={() => {
          setError(false);
        }}
        style={{
          color: "#f5574b",
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

ErrorMsg.propTypes = {
  setError: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

ErrorMsg.defaultProps = {
  style: {},
};
