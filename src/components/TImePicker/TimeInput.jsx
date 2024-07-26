import React, { useState, useEffect, useRef } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { BsSunriseFill } from "react-icons/bs";
import { RiMoonClearFill } from "react-icons/ri";

const TimeInput = ({
  calendarType = true,
  onTimeChange,
  min,
  max,
  value,
  disabled,
  error,
}) => {
  const parseTime = (time) => {
    if (!time) return { hour: "", minute: "" };
    const [hour, minute] = time.split(":").map(Number);
    console.log({ hour, minute });
    if (isNaN(hour) || isNaN(minute)) return { hour: "", minute: "" };
    return { hour, minute };
  };

  const { hour: valueHour, minute: valueMinute } = parseTime(value);
  const [hours, setHours] = useState(valueHour);
  console.log({ ddd: valueHour, hours });
  const [minutes, setMinutes] = useState(valueMinute);
  const [period, setPeriod] = useState("AM");
  const minuteInputRef = useRef(null);

  const handleInputFocus = (e) => {
    e.target.select();
  };

  useEffect(() => {
    if (hours >= 2 && minuteInputRef.current) {
      minuteInputRef.current.focus();
    }
  }, [hours]);

  const isTimeWithinRange = (hour, minute, period) => {
    let adjustedHour = hour;
    if (calendarType) {
      if (period === "AM") {
        adjustedHour = (hour % 12) + 6;
      } else {
        adjustedHour = (hour % 12) + 18;
      }
    } else {
      if (period === "PM" && hour !== 12) {
        adjustedHour += 12;
      }
      if (period === "AM" && hour === 12) {
        adjustedHour = 0;
      }
    }

    if (min) {
      const { hour: minHour, minute: minMinute } = parseTime(min);
      const minTotalMinutes = minHour * 60 + minMinute;
      const currentTotalMinutes = adjustedHour * 60 + minute;
      if (currentTotalMinutes < minTotalMinutes) return false;
    }

    if (max) {
      const { hour: maxHour, minute: maxMinute } = parseTime(max);
      const maxTotalMinutes = maxHour * 60 + maxMinute;
      const currentTotalMinutes = adjustedHour * 60 + minute;
      if (currentTotalMinutes > maxTotalMinutes) return false;
    }

    return true;
  };

  const handleHourChange = (increment) => {
    if (disabled) return;
    setHours((prevHours) => {
      if (prevHours === "") {
        let newHours = increment > 0 ? 1 : 12;
        if (increment > 0 && min) {
          const { hour: minHour, minute: minMinute } = parseTime(min);
          if (isTimeWithinRange(minHour, minMinute, period)) {
            newHours = calendarType
              ? (minHour - 6) % 12 || 12
              : minHour % 12 || 12;
            setPeriod(minHour >= 12 ? "PM" : "AM");
            setMinutes(minMinute);
          }
        } else if (increment < 0 && max) {
          const { hour: maxHour, minute: maxMinute } = parseTime(max);
          if (isTimeWithinRange(maxHour, maxMinute, period)) {
            newHours = calendarType
              ? (maxHour - 18) % 12 || 12
              : maxHour % 12 || 12;
            setPeriod(maxHour >= 12 ? "PM" : "AM");
            setMinutes(maxMinute);
          }
        }
        return newHours;
      }

      let newHours = Number(prevHours) + increment;
      if (newHours > 12) {
        newHours = 1;
      } else if (newHours < 1) {
        newHours = 12;
      }

      if (isTimeWithinRange(newHours, Number(minutes), period)) {
        return newHours;
      }
      return prevHours;
    });
  };

  const handleMinuteChange = (increment) => {
    if (disabled) return;
    setMinutes((prevMinutes) => {
      if (prevMinutes === "") prevMinutes = 0;
      let newMinutes = Number(prevMinutes) + increment;
      let newHours = Number(hours);

      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours = (newHours % 12) + 1;
      } else if (newMinutes < 0) {
        newMinutes = 59;
        newHours = newHours - 1 < 1 ? 12 : newHours - 1;
      }

      if (isTimeWithinRange(newHours, newMinutes, period)) {
        setMinutes(newMinutes);
        setHours(newHours);
        return newMinutes;
      }
      return prevMinutes;
    });
  };

  const handleHourInputChange = (e) => {
    if (disabled) return;
    const value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
    if (value === "" || (Number(value) >= 1 && Number(value) <= 12)) {
      const newHours = Number(value);
      if (isTimeWithinRange(newHours, Number(minutes), period)) {
        setHours(value);
      }
    }
  };

  const handleMinuteInputChange = (e) => {
    if (disabled) return;
    const value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
    if (value === "" || (Number(value) >= 0 && Number(value) < 60)) {
      const newMinutes = Number(value);
      if (isTimeWithinRange(Number(hours), newMinutes, period)) {
        setMinutes(value);
      }
    }
  };

  const togglePeriod = () => {
    if (disabled) return;
    const newPeriod = period === "AM" ? "PM" : "AM";
    if (isTimeWithinRange(Number(hours), Number(minutes), newPeriod)) {
      setPeriod(newPeriod);
    }
  };

  const get24HourFormat = () => {
    let hour = Number(hours);
    if (calendarType) {
      // Ethiopian time
      if (period === "AM") {
        hour = (hour % 12) + 6;
      } else {
        hour = (hour % 12) + 18;
      }
    } else {
      // Gregorian time
      if (period === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period === "AM" && hour === 12) {
        hour = 0;
      }
    }
    return { hour: hour % 24, minute: Number(minutes) };
  };

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(get24HourFormat());
    }
  }, [hours, minutes, period]);

  useEffect(() => {
    const adjustTimeForCalendarType = () => {
      let hour = Number(hours);
      let newPeriod = period;
      if (!calendarType && hour !== 0) {
        // Adjust to Ethiopian time
        if (hour > 6 && hour < 12 && period === "AM") {
          hour = (hour % 12) - 6;
          newPeriod = "PM";
        } else if (hour > 6 && hour < 12 && period === "PM") {
          hour = (hour % 12) - 6;
          newPeriod = "AM";
        } else if (hour >= 1 && hour < 6 && period === "AM") {
          hour = (hour % 12) + 6;
          newPeriod = "AM";
        } else if (hour >= 1 && hour < 6 && period === "PM") {
          hour = (hour % 12) + 6;
          newPeriod = "PM";
        } else if (hour === 12 && period === "AM") {
          hour = 6;
          newPeriod = "AM";
        } else if (hour === 12 && period === "PM") {
          hour = 6;
          newPeriod = "PM";
        } else if (hour === 6 && period === "AM") {
          hour = 12;
          newPeriod = "PM";
        } else if (hour === 6 && period === "PM") {
          hour = 12;
          newPeriod = "AM";
        }
      } else if (calendarType && hour !== 0) {
        // Adjust to Gregorian time
        if (hour > 6 && hour < 12 && period === "AM") {
          newPeriod = "AM";
          hour = hour - 6;
        } else if (hour >= 1 && hour < 6 && period === "PM") {
          newPeriod = "AM";
          hour = hour + 6;
        } else if (hour >= 1 && hour < 6 && period === "AM") {
          newPeriod = "PM";
          hour = hour + 6;
        } else if (hour > 6 && hour < 12 && period === "PM") {
          newPeriod = "PM";
          hour = hour - 6;
        } else if (hour === 6 && period === "AM") {
          newPeriod = "AM";
          hour = 12;
        } else if (hour === 6 && period === "PM") {
          newPeriod = "PM";
          hour = 12;
        } else if (hour === 12 && period === "AM") {
          newPeriod = "PM";
          hour = 6;
        } else if (hour === 12 && period === "PM") {
          newPeriod = "AM";
          hour = 6;
        }

        if (hour <= 0) {
          hour += 12;
        }
      }
      setHours(hour);
      setPeriod(newPeriod);
    };

    adjustTimeForCalendarType();
  }, [calendarType]);

  const getTextColor = () => {
    if (disabled) return "#CCCCCC";
    if (error) return "#ED4337";
    return "#555";
  };
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "15px",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${error ? "#ED4337" : "#ccc"}`,
        width: "fit-content",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        paddingTop: "0.1rem",
        paddingBottom: "0.1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            style={{
              padding: "4px",
              backgroundColor: "white",
              fontSize: "15px",
              color: disabled ? "#CCCCCC" : "#555",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleHourChange(1)}
          >
            +
          </button>
          <input
            type="text"
            className="no-focus-border"
            value={hours ? hours.toString().padStart(2, "0") : ""}
            onFocus={handleInputFocus}
            placeholder="--"
            onChange={handleHourInputChange}
            style={{
              width: "2rem",
              textAlign: "center",
              border: "none",
              color: getTextColor(),
              fontSize: "20px",
              appearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <button
            style={{
              padding: "4px",
              backgroundColor: "white",
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
              color: disabled ? "#CCCCCC" : "#555",
            }}
            onClick={() => handleHourChange(-1)}
          >
            -
          </button>
        </div>
        <span
          style={{
            marginBottom: "0.4rem",
          }}
        >
          :
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            style={{
              padding: "4px",
              backgroundColor: "white",
              fontSize: "15px",
              border: "none",
              cursor: "pointer",
              color: disabled ? "#CCCCCC" : "#555",
            }}
            onClick={() => handleMinuteChange(1)}
          >
            +
          </button>
          <input
            ref={minuteInputRef}
            type="text"
            className="no-focus-border"
            value={
              minutes === 0 || minutes
                ? minutes.toString().padStart(2, "0")
                : ""
            }
            placeholder="--"
            onFocus={handleInputFocus}
            onChange={handleMinuteInputChange}
            style={{
              width: "2rem",
              textAlign: "center",
              border: "none",
              fontSize: "20px",
              color: getTextColor(),
              appearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <button
            style={{
              padding: "4px",
              backgroundColor: "white",
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
              color: disabled ? "#CCCCCC" : "#555",
            }}
            onClick={() => handleMinuteChange(-1)}
          >
            -
          </button>
        </div>
      </div>
      <div>
        <button
          style={{
            padding: "4px",
            backgroundColor: "white",
            fontSize: `${calendarType ? "30px" : "25px"}`,
            marginLeft: "5px",
            border: "none",
            cursor: "pointer",
            color: disabled ? "#888888" : "#555",
          }}
          onClick={togglePeriod}
        >
          {calendarType ? (
            <>
              {" "}
              {period === "AM" ? (
                <>
                  {hours === 12 ? (
                    <BsSunriseFill
                      style={{
                        color: disabled ? "#CCCCCC" : "#fdb813",
                      }}
                    />
                  ) : (
                    <MdSunny
                      style={{
                        color: disabled ? "#CCCCCC" : "#fdb813",
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {hours === 12 ? (
                    <RiMoonClearFill
                      style={{
                        color: disabled ? "#CCCCCC" : "#1b2f52",
                      }}
                    />
                  ) : (
                    <FaMoon
                      style={{
                        color: disabled ? "#CCCCCC" : "#1b2f52",
                      }}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <> {period === "AM" ? "AM" : "PM"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
