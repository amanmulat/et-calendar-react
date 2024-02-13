# EtCalendar - Ethiopian Calendar Component for React

![EtCalendar - Ethiopian Calendar Component for React](https://github.com/amanmulat/et-calendar-react/raw/main/src/assets/eg.png)

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

- `value` (Date): The currently selected date. Should be a Date object.

- `onChange` (Function): Callback function for when the selected date changes. Receives the new date as a parameter.

- `calendarType` (Boolean): Determines the type of calendar displayed. `true` for Ethiopian, `false` for Gregorian.

- `minDate` (Date): The earliest selectable date. Dates before this are disabled.

- `maxDate` (Date): The latest selectable date. Dates after this are disabled.

- `disabled` (Boolean): Disables date selection if set to `true`.

- `disableFuture` (Boolean): Disables selection of future dates if set to `true`.

- `fullWidth` (Boolean): Enables full-width styling for the component.

- `borderRadius` (String): Sets the border-radius for the component.

- `placeholder` (String/Boolean): Placeholder text for the date input. If `false`, no placeholder is shown.

- `lang` (String): Language setting for calendar labels (e.g., `"am"` for Amharic).

## Connect with Me

Follow me on GitHub: [amanmulat](https://github.com/amanmulat/et-calendar-react "Github home")

LinkedIn: [Aman Mulat](https://www.linkedin.com/in/aman-mulat-7538ba1b9 "Linkedin home")

Let's build it together! If you have ideas or features you want to see implemented in EtCalendar, feel free to reach out or contribute to the project. Let's make this grow!
