# EtCalendar - Ethiopian Calendar Component for React

EtCalendar is a React component that provides an easy-to-use Ethiopian calendar, with the option to toggle between the Ethiopian and Gregorian calendars. It's designed for seamless integration into your React projects, offering both flexibility and functionality.

## Features

- Toggle between Ethiopian and Gregorian calendars.
- Easy date selection with a simple click interface.
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
       // Optionally, you can also specify minDate, maxDate, and disabled here
    />
  );
};

export default MyComponent;
```

## Props

- `value` (Date): The currently selected date. This should be a Date object.
- `onChange` (Function): A callback function that is called when the selected date changes. It receives the new date as a parameter.
- `calendarType` (Boolean): Determines the type of calendar to display. `true` for the Ethiopian calendar, `false` for the Gregorian calendar.
- `minDate` (Date): The minimum date that can be selected. Dates before this will be disabled.
- `maxDate` (Date): The maximum date that can be selected. Dates after this will be disabled.
- `disabled` (Boolean): If set to `true`, disables the date selection.

## Connect with Me

Follow me on GitHub: [amanmulat](https://github.com/amanmulat "Github home")

LinkedIn: [Aman Mulat](https://www.linkedin.com/in/aman-mulat-7538ba1b9 "Linkedin home")

Let's build it together! If you have ideas or features you want to see implemented in EtCalendar, feel free to reach out or contribute to the project. Let's make this grow!
