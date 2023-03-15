import "./DatePicker.css";

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReactDatePicker from "react-date-picker";
import CalendarIcon from "@material-ui/icons/Event";
import ClearIcon from "@material-ui/icons/Clear";

const DatePicker = ({ clear, error, ...props }) => {
  const weekdays = "DLMMJVS".split("");

  return (
    <div className={`date-picker-wrapper ${error ? "error" : null}`}>
      <ReactDatePicker
        formatShortWeekday={(_, date) => weekdays[date.getDay()]}
        formatMonth={(_, date) => moment(date).format("MMM")}
        minDate={new Date()}
        formatMonthYear={(_, date) => moment(date).format("MMMM, YYYY")}
        calendarType="US"
        clearIcon={clear ? <ClearIcon /> : null}
        calendarIcon={<CalendarIcon />}
        {...props}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  "data-testid": "",
  format: "dd/MM/yyyy",
  dayPlaceholder: "dd",
  monthPlaceholder: "mm",
  yearPlaceholder: "yy",
  maxDetail: "month",
  minDetail: "year",
  value: null,
  clear: false,
  error: false,
};

DatePicker.propTypes = {
  "data-testid": PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.objectOf(Date),
    PropTypes.arrayOf(Date),
  ]),
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string,
  clear: PropTypes.bool,
  error: PropTypes.bool,
  dayPlaceholder: PropTypes.string,
  monthPlaceholder: PropTypes.string,
  yearPlaceholder: PropTypes.string,
  maxDetail: PropTypes.string,
  minDetail: PropTypes.string,
};

export default DatePicker;
