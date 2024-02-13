import React from "react";
import {
  etLabel,
  etMonths,
  etMonthsEnglish,
  generateEthiopianDate,
  nextMonth,
  nextYear,
  prevMonth,
  prevYear,
} from "../../utils/EthiopianCalendar";
import { GrFormNext, GrFormPrevious, GrNext, GrPrevious } from "react-icons/gr";
import Lang from "../Lang.jsx";
import cn from "../../utils/cn";

const EtPicker = ({
  minDateIn,
  maxDateIn,
  selectedDate,
  toggleCalendarType,
  etToday,
  setEtToday,
  days,
  disableFuture,
  disabled,
  handleDateChange,
  setLabel,
  lang,
  isFutureDate,
}) => {
  const etDays = ["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"];
  return (
    <>
      <div className="calendarContainerEt">
        <div className="topActions">
          <span>
            <button
              onClick={(e) => toggleCalendarType(e)}
              className="buttonStyle buttonBackgroundEt"
            />
            {lang === "am" ? (
              <>
                {etMonths[etToday[1] - 1]}, {etToday[0]}
              </>
            ) : (
              <>
                {etMonthsEnglish[etToday[1] - 1]}, {etToday[0]}
              </>
            )}
          </span>
          <div className="monthButtons">
            <GrPrevious
              onClick={() =>
                setEtToday(prevYear(etToday[0], etToday[1], etToday[2]))
              }
              className="monthButton"
            />
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
              <Lang selectedLang={lang} am="ዛሬ" en="Today" />
            </span>
            <GrFormNext
              onClick={() =>
                setEtToday(nextMonth(etToday[0], etToday[1], etToday[2]))
              }
              className="monthButton"
            />
            <GrNext
              onClick={() =>
                setEtToday(nextYear(etToday[0], etToday[1], etToday[2]))
              }
              className="monthButton"
            />
          </div>
        </div>
        <div className="gridSevenEt w-fullEt">
          {lang === "am"
            ? etDays.map((day, index) => {
                return (
                  <span key={index} className="rowHeight dayOfWeek centerGrid">
                    {day}
                  </span>
                );
              })
            : days.map((day, index) => {
                return (
                  <span key={index} className="rowHeight dayOfWeek centerGrid">
                    {day}
                  </span>
                );
              })}
        </div>
        <div className=" gridSevenEt w-fullEt">
          {generateEthiopianDate(etToday[1], etToday[0]).map(
            ({ day, isCurrentMonth, today, date }, index) => {
              const disableFutureDate = disableFuture && isFutureDate(date);
              const isSelectedDate =
                selectedDate &&
                new Date(selectedDate).getTime() === new Date(date).getTime();

              return (
                <span
                  key={index}
                  onClick={() => {
                    if (isCurrentMonth) {
                      if (
                        !disabled &&
                        !disableFutureDate &&
                        (!minDateIn || minDateIn <= date) &&
                        (!maxDateIn || maxDateIn >= date)
                      ) {
                        setLabel(etLabel(date, lang));
                        handleDateChange(date);
                      }
                    }
                  }}
                  className=" rowHeight dayText rowHeight centerGrid borderTop"
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
                    {day}
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

export default EtPicker;
