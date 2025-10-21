import React from 'react';
import DatePicker from 'react-datepicker2';
import './PersianDatePicker.css';

const PersianDatePicker = ({ value, onChange, placeholder }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      timePicker={false}
      isGregorian={false}
      placeholder={placeholder || "1402/10/25"}
      className="persian-date-input"
      inputFormat="YYYY/MM/DD"
    />
  );
};

export default PersianDatePicker;