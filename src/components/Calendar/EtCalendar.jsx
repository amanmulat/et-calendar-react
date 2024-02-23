import dayjs from "dayjs";
import { toEthiopian } from "ethiopian-date";
import React, { useEffect, useRef, useState } from "react";
import ElementPopper from "react-element-popper";
import "../../style/index.css";

import EtPicker from "./EtPicker.jsx";
import GcPicker from "./GcPicker.jsx";
import Input from "./Input.jsx";

export const EtCalendar = ({
  value,
  onChange,
  calendarType,
  minDate,
  maxDate,
  name,
  disabled = false,
  disableFuture = false,
  fullWidth,
  borderRadius,
  placeholder = false,
  lang,
  label = "Date",
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

  const currentDate = dayjs();
  const etCurrentDate = toEthiopian(
    currentDate.year(),
    currentDate.month() + 1,
    currentDate.date()
  );

  const [today, setToday] = useState(currentDate);
  const [etToday, setEtToday] = useState(etCurrentDate);
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(value);

  const isFutureDate = (date) =>
    new Date(date).getTime() > new Date().setHours(0, 0, 0, 0);

  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (newDate) => {
    if (maxDateIn && newDate > dayjs(maxDateIn)) {
      newDate = dayjs(maxDateIn);
    } else if (minDateIn && newDate < dayjs(minDateIn)) {
      newDate = dayjs(minDateIn);
    }

    if (calendarTypeInt === true) {
      const ethiopianDay = toEthiopian(
        newDate.year(),
        newDate.month() + 1,
        newDate.date()
      );
      setEtToday(ethiopianDay);
      setDate({
        day: ethiopianDay[2] < 10 ? `0${ethiopianDay[2]}` : ethiopianDay[2],
        month: ethiopianDay[1] < 10 ? `0${ethiopianDay[1]}` : ethiopianDay[1],
        year: ethiopianDay[0] < 10 ? `0${ethiopianDay[0]}` : ethiopianDay[0],
      });
    } else {
      setDate({
        day: newDate.date() < 10 ? `0${newDate.date()}` : newDate.date(),
        month:
          newDate.month() + 1 < 10
            ? `0${newDate.month() + 1}`
            : newDate.month() + 1,
        year: newDate.year(),
      });
      setToday(newDate);
    }

    setSelectedDate(newDate);

    setShowCalendar(false);
    if (onChange) {
      onChange(newDate);
    }
  };

  const toggleCalendarType = (e) => {
    if (calendarTypeInt && selectedDate) {
      setDate({
        day:
          selectedDate.date() < 10
            ? `0${selectedDate.date()}`
            : selectedDate.date(),
        month:
          selectedDate.month() + 1 < 10
            ? `0${selectedDate.month() + 1}`
            : selectedDate.month() + 1,
        year: selectedDate.year(),
      });
    } else if (!calendarTypeInt && selectedDate) {
      const ethiopianDay = toEthiopian(
        selectedDate.year(),
        selectedDate.month() + 1,
        selectedDate.date()
      );
      setDate({
        day: ethiopianDay[2] < 10 ? `0${ethiopianDay[2]}` : ethiopianDay[2],
        month: ethiopianDay[1] < 10 ? `0${ethiopianDay[1]}` : ethiopianDay[1],
        year: ethiopianDay[0] < 10 ? `0${ethiopianDay[0]}` : ethiopianDay[0],
      });
    }
    e.stopPropagation();
    setShowCalendar(true);
    if (selectedDate) {
      setToday(selectedDate);
      const etSelected = toEthiopian(
        selectedDate.year(),
        selectedDate.month() + 1,
        selectedDate.date()
      );
      setEtToday(etSelected);
    } else {
      setToday(currentDate);
      setEtToday(etCurrentDate);
    }

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

  // Handlers for input changes

  return (
    <>
      <div className="allContainer ">
        <ElementPopper
          ref={calendarRef}
          zIndex={1000}
          element={
            <Input
              fullWidth={fullWidth}
              borderRadius={borderRadius}
              inputRef={inputRef}
              handleInputClick={handleInputClick}
              placeholder={placeholder}
              name={name}
              lang={lang}
              label={label}
              date={date}
              setDate={setDate}
              handleDateChange={handleDateChange}
              calendarTypeInt={calendarTypeInt}
              showCalendar={showCalendar}
            />
          }
          popper={
            <div>
              {" "}
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
                      isFutureDate={isFutureDate}
                      etCurrentDate={etCurrentDate}
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
                      isFutureDate={isFutureDate}
                      currentDate={currentDate}
                    />
                  )}
                </div>
              </div>
            </div>
          }
          active={showCalendar}
          position="bottom-start"
        />
      </div>
    </>
  );
};
