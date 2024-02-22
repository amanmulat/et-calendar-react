import React, { useEffect, useRef, useState } from "react";
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
import { toEthiopian } from "ethiopian-date";

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
  lang,
  isFutureDate,
  etCurrentDate,
}) => {
  const etDays = ["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"];
  const [showYear, setShowYear] = useState(false);
  const yearsContainerRef = useRef(null);
  const currentYearRef = useRef(null);

  useEffect(() => {
    if (yearsContainerRef.current && currentYearRef.current) {
      const yearItemOffsetTop = currentYearRef.current.offsetTop;
      const yearItemHeight = currentYearRef.current.offsetHeight;
      const containerHeight = yearsContainerRef.current.offsetHeight;
      yearsContainerRef.current.scrollTop =
        yearItemOffsetTop - containerHeight / 2 + yearItemHeight / 2;
    }
  }, [showYear]);
  return (
    <>
      <div className="calendarContainerEt">
        <div className="topActions">
          <span>
            <button
              onClick={(e) => toggleCalendarType(e)}
              className="buttonStyle buttonBackgroundEt"
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowYear(!showYear)}
            >
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
          </span>
          {!showYear && (
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
          )}
        </div>
        {!showYear ? (
          <div className="etHeight">
            <div className="gridSevenEt w-fullEt ">
              {lang === "am"
                ? etDays.map((day, index) => {
                    return (
                      <span
                        key={index}
                        className="rowHeight dayOfWeek centerGrid"
                      >
                        {day}
                      </span>
                    );
                  })
                : days.map((day, index) => {
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
            <div className=" gridSevenEt w-fullEt etHeight">
              {generateEthiopianDate(etToday[1], etToday[0]).map(
                ({ day, isCurrentMonth, today, date }, index) => {
                  const disableFutureDate = disableFuture && isFutureDate(date);
                  const isSelectedDate =
                    selectedDate &&
                    new Date(selectedDate).getTime() ===
                      new Date(date).getTime();

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
        ) : (
          <div
            className="yearsGridContainer"
            ref={yearsContainerRef}
            style={{
              overflowY: "auto",
              maxHeight: "260px",
            }}
          >
            <div
              className="yearsGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
              }}
            >
              {Array.from({ length: 2100 - 1900 }, (_, i) => 1900 + i).map(
                (year) => {
                  const isCurrentYear = etToday[0] === year;

                  if (minDateIn) {
                    const etMin = toEthiopian(
                      new Date(minDateIn).getFullYear(),
                      new Date(minDateIn).getMonth() + 1,
                      new Date(minDateIn).getDate()
                    );
                    if (etMin[0] > year) {
                      return;
                    }
                  }
                  if (maxDateIn) {
                    const etMax = toEthiopian(
                      new Date(maxDateIn).getFullYear(),
                      new Date(maxDateIn).getMonth() + 1,
                      new Date(maxDateIn).getDate()
                    );
                    if (etMax[0] < year) {
                      return;
                    }
                  }

                  return (
                    <div
                      key={year}
                      ref={isCurrentYear ? currentYearRef : null}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowYear(false);
                        setEtToday([year, etToday[1], etToday[2]]);
                      }}
                      className={cn(
                        "yearItem",
                        isCurrentYear ? "backgroundBlue" : ""
                      )}
                      style={{
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {year}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EtPicker;
