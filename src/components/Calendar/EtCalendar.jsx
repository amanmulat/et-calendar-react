import React, { useEffect, useRef, useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import "../../style/index.css";
import cn from "../../utils/cn";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  etLabel,
  etMonthsEnglish,
  generateEthiopianDate,
  nextMonth,
  prevMonth,
} from "../../utils/EthiopianCalendar";
import { FiCalendar } from "react-icons/fi";
import { toEthiopian } from "ethiopian-date";

export const EtCalendar = ({ value, onChange, calendarType }) => {
  const [calendarTypeInt, setCalendarTypeInt] = useState(
    calendarType === undefined || calendarType === null ? true : calendarType
  );
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

  const toggleCalendarType = () => {
    setShowCalendar(true);
    setToday(currentDate);
    setEtToday(etCurrentDate);
    setCalendarTypeInt(!calendarTypeInt);
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating
    setShowCalendar((prev) => !prev); // Toggle the visibility
  };
  // Attach and detach the listener
  useEffect(() => {
    let isMounted = true; // Flag to track mount status

    const handleClickOutside = (event) => {
      if (
        showCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      isMounted = false; // Update flag when component unmounts
    };
  }, [showCalendar]);

  return (
    <>
      <div className="allContainer ">
        <div className="datePickerContainer" ref={inputRef}>
          <input
            type="text"
            onClick={handleInputClick}
            placeholder="Select a date"
            readOnly
            value={label ? label : ""}
            className="dateInputStyle"
          />
          <FiCalendar className="calendarIcon" />
        </div>
        {showCalendar && (
          <div ref={calendarRef} className="Cal">
            {calendarTypeInt === true && (
              <>
                <div className="calendarContainer">
                  <div className="topActions">
                    <span>
                      <button
                        onClick={toggleCalendarType}
                        className="buttonStyle buttonBackgroundEt"
                      />
                      {etMonthsEnglish[etToday[1] - 1]}, {etToday[0]}{" "}
                    </span>
                    <div className="monthButtons">
                      <GrFormPrevious
                        onClick={() =>
                          setEtToday(
                            prevMonth(etToday[0], etToday[1], etToday[2])
                          )
                        }
                        className="monthButton"
                      />
                      <span
                        onClick={() => setEtToday(etCurrentDate)}
                        className="todayButton"
                      >
                        Today
                      </span>
                      <GrFormNext
                        onClick={() =>
                          setEtToday(
                            nextMonth(etToday[0], etToday[1], etToday[2])
                          )
                        }
                        className="monthButton"
                      />
                    </div>
                  </div>
                  <div className="gridSeven w-full">
                    {days.map((day, index) => {
                      return (
                        <span
                          key={index}
                          className="rowHeight dayOfWeek centerGrid"
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>
                  <div className=" gridSeven w-full">
                    {generateEthiopianDate(etToday[1], etToday[0]).map(
                      ({ day, isCurrentMonth, today, date }, index) => {
                        const isSelectedDate =
                          selectedDate &&
                          new Date(selectedDate).getTime() ===
                            new Date(date).getTime();

                        return (
                          <span
                            key={index}
                            onClick={() => {
                              if (isCurrentMonth) {
                                setLabel(etLabel(date));
                                handleDateChange(date);
                              }
                            }}
                            className=" rowHeight dayText rowHeight centerGrid borderTop"
                          >
                            <span
                              className={cn(
                                isCurrentMonth ? "" : "grayText",
                                today ? "backgroundBlue " : "",
                                "dateWidthAndHeight centerGrid",
                                isCurrentMonth ? "currentMonth" : "",
                                isSelectedDate ? "selectedDate" : ""
                              )}
                            >
                              {day}
                            </span>
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
            {calendarTypeInt === false && (
              <>
                <div className="calendarContainer">
                  <div className="topActions">
                    <span>
                      <button
                        onClick={toggleCalendarType}
                        className="buttonBackgroundEn buttonStyle"
                      />
                      {months[today.month()]}, {today.year()}
                    </span>

                    <div className="monthButtons">
                      <GrFormPrevious
                        onClick={() => setToday(today.month(today.month() - 1))}
                        className="monthButton"
                      />
                      <span
                        onClick={() => setToday(currentDate)}
                        className="todayButton"
                      >
                        Today
                      </span>
                      <GrFormNext
                        onClick={() => setToday(today.month(today.month() + 1))}
                        className="monthButton"
                      />
                    </div>
                  </div>
                  <div className="gridSeven w-full">
                    {days.map((day, index) => {
                      return (
                        <span
                          key={index}
                          className="rowHeight dayOfWeek centerGrid"
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>

                  <div className=" gridSeven w-full">
                    {generateDate(today.month(), today.year()).map(
                      ({ date, isCurrentMonth, today }, index) => {
                        const isSelectedDate =
                          selectedDate &&
                          new Date(selectedDate).getTime() ===
                            new Date(date).getTime();
                        return (
                          <span
                            onClick={() => {
                              if (isCurrentMonth) {
                                handleDateChange(date);
                                setLabel(date.toDate().toDateString());
                              }
                            }}
                            key={index}
                            className="rowHeight dayText rowHeight centerGrid borderTop"
                          >
                            <span
                              className={cn(
                                isCurrentMonth ? "" : "grayText",
                                today ? "backgroundBlue " : "",
                                "dateWidthAndHeight centerGrid",
                                isCurrentMonth ? "currentMonth" : "",
                                isSelectedDate ? "selectedDate" : ""
                              )}
                            >
                              {date.date()}
                            </span>
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
