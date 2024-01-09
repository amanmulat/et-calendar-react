import React, { useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import "../../style/index.css";
import cn from "../../utils/cn";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  etMonthsEnglish,
  generateEthiopianDate,
  nextMonth,
  prevMonth,
} from "../../utils/EthiopianCalendar";
import { toEthiopian } from "ethiopian-date";

export const Requirements = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDate = dayjs();
  const etCurrentDate = toEthiopian(
    currentDate.year(),
    currentDate.month() + 1,
    currentDate.date()
  );
  const [today, setToday] = useState(currentDate);
  const [etToday, setEtToday] = useState(etCurrentDate);
  return (
    <>
      <div className="calendarContainer">
        <div className="topActions">
          <span>
            {months[today.month()]}, {today.year()}
          </span>
          <span>
            {etMonthsEnglish[etToday[1] - 1]}, {etToday[0]}
          </span>
          <div className="monthButtons">
            <GrFormPrevious
              onClick={() =>
                setEtToday(prevMonth(etToday[0], etToday[1], etToday[2]))
              }
              className="monthButton"
            />
            <span
              onClick={() => setEtToday(etCurrentDate)}
              className="todayButton"
            >
              Today Et
            </span>
            <GrFormNext
              onClick={() =>
                setEtToday(nextMonth(etToday[0], etToday[1], etToday[2]))
              }
              className="monthButton"
            />
          </div>
          <div className="monthButtons">
            <GrFormPrevious
              onClick={() => setToday(today.month(today.month() - 1))}
              className="monthButton"
            />
            <span onClick={() => setToday(currentDate)} className="todayButton">
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
              <span key={index} className="rowHeight dayOfWeek centerGrid">
                {day}
              </span>
            );
          })}
        </div>
        <div className=" gridSeven w-full">
          {generateEthiopianDate(etToday[1], etToday[0]).map(
            ({ day, isCurrentMonth, today }, index) => {
              return (
                <span
                  key={index}
                  className=" rowHeight dayText rowHeight centerGrid borderTop"
                >
                  <span
                    className={cn(
                      isCurrentMonth ? "" : "grayText",
                      today ? "backgroundBlue " : "",
                      "dateWidthAndHeight centerGrid"
                    )}
                  >
                    {day}
                  </span>
                </span>
              );
            }
          )}
        </div>
        <div style={{ marginTop: "60px" }} className=" gridSeven w-full">
          {generateDate(today.month(), today.year()).map(
            ({ date, isCurrentMonth, today, etDate }, index) => {
              return (
                <span
                  key={index}
                  className="rowHeight dayText rowHeight centerGrid borderTop"
                >
                  <span
                    className={cn(
                      isCurrentMonth ? "" : "grayText",
                      today ? "backgroundBlue " : "",
                      "dateWidthAndHeight centerGrid"
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
  );
};
