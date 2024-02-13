import React, { useEffect, useRef, useState } from "react";
import "../../style/index.css";
import dayjs from "dayjs";
import { FiCalendar } from "react-icons/fi";
import { toEthiopian } from "ethiopian-date";
import ElementPopper from "react-element-popper";

import GcPicker from "./GcPicker.jsx";
import EtPicker from "./EtPicker.jsx";

export const EtCalendar = ({
  value,
  onChange,
  calendarType,
  minDate,
  name,
  maxDate,
  disabled = false,
  disableFuture = false,
  fullWidth,
  borderRadius,
  placeholder = false,
  lang,
}) => {
  let minDateIn = null;
  let maxDateIn = null;
  if (minDate) {
    minDateIn = new Date(minDate).setHours(0, 0, 0, 0);
  }
  if (maxDate) {
    maxDateIn = new Date(maxDate).setHours(0, 0, 0, 0);
  }

  const [calendarTypeInt, setCalendarTypeInt] = useState(
    calendarType === undefined || calendarType === null ? true : calendarType
  );
  useEffect(() => {
    setCalendarTypeInt(
      calendarType === undefined || calendarType === null ? true : calendarType
    );
  }, [calendarType]);

  const [label, setLabel] = useState("");
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(value);
  const currentDate = dayjs();
  const etCurrentDate = toEthiopian(
    currentDate.year(),
    currentDate.month() + 1,
    currentDate.date()
  );
  const isFutureDate = (date) =>
    new Date(date).getTime() > new Date().setHours(0, 0, 0, 0);

  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setShowCalendar(false);
    if (onChange) {
      onChange(newDate);
    }
  };

  const [today, setToday] = useState(currentDate);
  const [etToday, setEtToday] = useState(etCurrentDate);

  const toggleCalendarType = (e) => {
    e.stopPropagation();
    setShowCalendar(true);
    setToday(currentDate);
    setEtToday(etCurrentDate);
    setCalendarTypeInt(!calendarTypeInt);
  };

  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating
    setShowCalendar((prev) => !prev); // Toggle the visibility
  };
  // Attach and detach the listener
  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="allContainer ">
        <ElementPopper
          ref={calendarRef}
          zIndex={1000}
          element={
            <div
              className="datePickerContainerEt"
              style={{
                width: fullWidth ? "100%" : "inherit",
                borderRadius: borderRadius
                  ? `${borderRadius}`
                  : "1px solid #ccc",
              }}
              ref={inputRef}
            >
              <input
                type="text"
                onClick={handleInputClick}
                placeholder={
                  placeholder
                    ? placeholder
                    : lang === "am"
                    ? "ቀን ይምረጡ"
                    : "Select Date"
                }
                readOnly
                name={name}
                value={label ? label : ""}
                className="dateInputStyle"
              />
              <FiCalendar className="calendarIcon" />
            </div>
          }
          popper={
            showCalendar && (
              <div>
                <div className="Cal">
                  {calendarTypeInt === true && (
                    <EtPicker
                      minDateIn={minDateIn}
                      maxDateIn={maxDateIn}
                      selectedDate={selectedDate}
                      toggleCalendarType={toggleCalendarType}
                      handleDateChange={handleDateChange}
                      disabled={disabled}
                      disableFuture={disableFuture}
                      lang={lang}
                      etToday={etToday}
                      setEtToday={setEtToday}
                      days={days}
                      setLabel={setLabel}
                      isFutureDate={isFutureDate}
                    />
                  )}
                  {calendarTypeInt === false && (
                    <GcPicker
                      minDateIn={minDateIn}
                      maxDateIn={maxDateIn}
                      selectedDate={selectedDate}
                      toggleCalendarType={toggleCalendarType}
                      handleDateChange={handleDateChange}
                      disabled={disabled}
                      disableFuture={disableFuture}
                      lang={lang ? lang : false}
                      today={today}
                      setToday={setToday}
                      days={days}
                      setLabel={setLabel}
                      isFutureDate={isFutureDate}
                    />
                  )}
                </div>
              </div>
            )
          }
          // active={showCalendar}
          position="bottom-start"
          fixMainPosition={true}
          fixRelativePosition={true}
        />
      </div>
    </>
  );
};
