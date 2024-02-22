import React, { useState, useEffect, useRef } from "react";

const CustomDatePicker = ({ value, onDateChange }) => {
  const inputRef = useRef(null);
  const [date, setDate] = useState({ day: "DD", month: "MM", year: "YYYY" });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Assuming the value is in the format "YYYY-MM-DD"
    if (value) {
      const [year, month, day] = value.split("-");
      setDate({ day, month, year });
      setInputValue(`${day}/${month}/${year}`);
    } else {
      setInputValue("DD/MM/YYYY");
    }
  }, [value]);

  const handleDateInputChange = (e) => {
    let { value } = e.target;
    let [day, month, year] = value
      .split("/")
      .map((part) => part.replace(/D|Y|M/g, ""));

    console.log(day, month, year);

    // Add leading zero if day or month is a single digit and move to next part
    if (day.length === 1 && parseInt(day) > 3) {
      day = `0${day}`;
      // Move to month part
    } else if (day.length === 2) {
      if (parseInt(day) > 31) {
        day = "31";
      }
      // Potentially move to month part
    }

    // Add leading zero if month is a single digit and move to next part
    if (month.length === 1 && parseInt(month) > 1) {
      month = `0${month}`;
      // Move to year part
    } else if (month.length === 2) {
      if (parseInt(month) > 13) {
        month = "13";
      }
      // Potentially move to year part
    }

    // Ensure year is a four-digit number
    if (year.length > 4) {
      year = year.slice(0, 4);
    }

    // Construct the new input value
    const newInputValue = [
      day.padEnd(2, "D"),
      month.padEnd(2, "M"),
      year.padEnd(4, "Y"),
    ].join("/");

    // Update state
    setInputValue(newInputValue);
    setDate({ day, month, year });

    // Trigger the change handler to lift the state up
    onDateChange && onDateChange({ day, month, year });
  };

  const handleFocus = (e) => {
    const cursorPosition = e.target.selectionStart;
    const parts = inputValue.split("/");
    const dayEnd = parts[0].length;
    const monthEnd = dayEnd + 1 + parts[1].length;

    if (cursorPosition <= dayEnd) {
      inputRef.current.setSelectionRange(0, dayEnd);
    } else if (cursorPosition <= monthEnd) {
      inputRef.current.setSelectionRange(dayEnd + 1, monthEnd);
    } else {
      inputRef.current.setSelectionRange(monthEnd + 1, inputValue.length);
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault(); // Prevent non-numeric characters
      return;
    }

    const cursorPosition = inputRef.current.selectionStart;
    const dateParts = inputRef.current.value.split("/");
    const [day, month, year] = dateParts.map((part) =>
      part.replace(/D|Y|M/g, "")
    );

    // Logic to handle cursor position and character validation goes here
    // This will include checking the length of the day, month, and year parts
    // and setting the cursor position accordingly.
  };

  return (
    <input
      ref={inputRef}
      value={inputValue}
      onChange={handleDateInputChange}
      onFocus={handleFocus}
      onClick={handleFocus} // Handle click to focus on the parts
      placeholder="DD/MM/YYYY"
      onKeyDown={handleKeyPress}
      // Additional styling here
    />
  );
};

export default CustomDatePicker;
