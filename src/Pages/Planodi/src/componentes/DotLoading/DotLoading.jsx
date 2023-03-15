import React from "react";

import "./DotLoading.css";
import PropTypes from "prop-types";

export default function DotLoading({ style }) {
  return (
    <div className="dot-loading-wrp" style={style}>
      <div className="dot-loading-wrp-1" />
      <div className="dot-loading-wrp-2" />
      <div className="dot-loading-wrp-3" />
    </div>
  );
}

DotLoading.propTypes = {
  style: PropTypes.shape({}),
};

DotLoading.defaultProps = {
  styles: {},
};
