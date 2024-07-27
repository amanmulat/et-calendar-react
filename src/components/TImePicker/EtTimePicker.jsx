import React, { useEffect, useState } from "react";
import TimeInput from "./TimeInput.jsx";
import "../../style/index.css";

export const EtTimePicker = ({
  value = "20:00",
  onChange,
  minTime = "21:00",
  maxTime = "23:00",
  calendarType = true,
  disabled = false,
  error = false,
}) => {
  const parseTime = (time) => {
    if (!time) return { hour: "", minute: "" };
    const [hour, minute] = time.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return { hour: "", minute: "" };
    return { hour, minute };
  };

  const getProperTimeBasedOnLimit = (time) => {
    if (!time) return null;
    const { hour, minute } = parseTime(time);
    let adjustedHour = hour;

    if (minTime) {
      const { hour: minHour, minute: minMinute } = parseTime(minTime);
      const minTotalMinutes = minHour * 60 + minMinute;
      const currentTotalMinutes = adjustedHour * 60 + minute;
      if (currentTotalMinutes < minTotalMinutes) {
        return minTime;
      }
    }

    if (maxTime) {
      const { hour: maxHour, minute: maxMinute } = parseTime(maxTime);
      const maxTotalMinutes = maxHour * 60 + maxMinute;
      const currentTotalMinutes = adjustedHour * 60 + minute;
      if (currentTotalMinutes > maxTotalMinutes) {
        return maxTime;
      }
    }

    return time;
  };

  const [valueInt, setValueInt] = useState(value);

  useEffect(() => {
    const properTime = getProperTimeBasedOnLimit(value);
    setValueInt(properTime);
  }, [minTime, maxTime, value]);

  const constructTime = (hour, minute) => {
    const h = hour.toString().padStart(2, "0");
    const m = minute.toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const onTimeChange = (time) => {
    console.log("time", time);
    if (!time) return;
    const { hour, minute } = time;
    const timeStr = constructTime(hour, minute);
    if (onChange) {
      onChange(timeStr);
    }
  };
  return (
    <div>
      <TimeInput
        onTimeChange={onTimeChange}
        calendarType={calendarType}
        min={minTime}
        max={maxTime}
        value={valueInt}
        disabled={disabled}
        error={error}
      />
    </div>
  );
};
