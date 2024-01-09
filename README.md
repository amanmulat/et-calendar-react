# EtCalendar - Ethiopian Calendar Component for React

EtCalendar is a React component that provides an easy-to-use Ethiopian calendar, with the option to toggle between the Ethiopian and Gregorian calendars. It's designed for seamless integration into your React projects, offering both flexibility and functionality.

## Features

- Toggle between Ethiopian and Gregorian calendars.
- Easy date selection with a simple click interface.
- Customizable through CSS for a seamless integration with your design.
- Fully controlled component with external state management.

## Installation

To install the EtCalendar component, run the following command in your project directory:

```bash
npm install et-calendar-react

import React, { useState } from 'react';
import EtCalendar from 'et-calendar';

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <EtCalendar
      value={selectedDate}
      onChange={handleDateChange}
      calendarType={true} // true for Ethiopian, false for Gregorian
    />
  );
};

export default MyComponent;
```

## Props

value (Date): The currently selected date.
onChange (Function): Callback function that is called when a new date is selected. It receives the new date as a parameter.
calendarType (Boolean): Determines the type of calendar to display initially. true for Ethiopian, false for Gregorian.

## Connect with Me

GitHub: [amanmulat](https://github.com/amanmulat "Github home")
LinkedIn: [Aman Mulat](https://www.linkedin.com/in/aman-mulat-7538ba1b9 "Linkedin home")
