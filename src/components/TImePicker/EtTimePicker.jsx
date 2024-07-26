import React, { useState } from "react";
import TimeInput from "./TimeInput.jsx";
import "../../style/index.css";

export const EtTimePicker = ({
  value = "01:45",
  onChange,
  minTime,
  maxTime,
  disabled = false,
  error = true,
}) => {
  const [calendarType, setCalendarType] = useState(true);

  const onTimeChange = (time) => {
    if (onChange) {
      onChange(time);
    }
  };

  return (
    <div>
      <TimeInput
        onTimeChange={onTimeChange}
        calendarType={calendarType}
        min={minTime}
        max={maxTime}
        value={value}
        disabled={disabled}
        error={error}
      />
      <button onClick={() => setCalendarType(!calendarType)}>
        {calendarType ? "Et" : "Gc"}
      </button>
    </div>
  );
};
