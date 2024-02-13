import React from "react";
import { generateDate, months } from "../../utils/calendar";
import { GrFormNext, GrFormPrevious, GrNext, GrPrevious } from "react-icons/gr";
import cn from "../../utils/cn";

const GcPicker = ({
  minDateIn,
  maxDateIn,
  selectedDate,
  toggleCalendarType,
  today,
  setToday,
  days,
  disableFuture,
  disabled,
  handleDateChange,
  setLabel,
  isFutureDate,
}) => {
  return (
    <>
      <div className="calendarContainerEt">
        <div className="topActions">
          <span>
            <button
              onClick={(e) => toggleCalendarType(e)}
              className="buttonBackgroundEn buttonStyle"
            />
            {months[today.month()]}, {today.year()}
          </span>

          <div className="monthButtons">
            <GrPrevious
              onClick={() => setToday(today.year(today.year() - 1))}
              className="monthButton"
            />
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
            <GrNext
              onClick={() => setToday(today.year(today.year() + 1))}
              className="monthButton"
            />
          </div>
        </div>
        <div className="gridSevenEt w-fullEt">
          {days.map((day, index) => {
            return (
              <span key={index} className="rowHeight dayOfWeek centerGrid">
                {day}
              </span>
            );
          })}
        </div>

        <div className=" gridSevenEt w-fullEt">
          {generateDate(today.month(), today.year()).map(
            ({ date, isCurrentMonth, today }, index) => {
              const disableFutureDate = disableFuture && isFutureDate(date);

              const isSelectedDate =
                selectedDate &&
                new Date(selectedDate).getTime() === new Date(date).getTime();
              return (
                <span
                  onClick={() => {
                    if (isCurrentMonth) {
                      if (
                        !disabled &&
                        !disableFutureDate &&
                        (!minDateIn || minDateIn <= date) &&
                        (!maxDateIn || maxDateIn >= date)
                      ) {
                        handleDateChange(date);
                        setLabel(date.toDate().toDateString());
                      }
                    }
                  }}
                  key={index}
                  className="rowHeight dayText rowHeight centerGrid borderTop"
                >
                  <span
                    className={cn(
                      isCurrentMonth ? "" : "grayText",
                      minDateIn && minDateIn >= date ? "grayText" : "",
                      maxDateIn && maxDateIn <= date ? "grayText" : "",
                      disabled ? "grayText" : "",
                      disableFutureDate ? "grayText" : "",
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
  );
};

export default GcPicker;
