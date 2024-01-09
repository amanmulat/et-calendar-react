import dayjs from "dayjs";
import { toEthiopian, toGregorian } from "ethiopian-date";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  const arrayOfDate = [];

  //   Gregorian
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const tempDate = firstDateOfMonth.date(i);
    const etDate = toEthiopian(
      tempDate.year(),
      tempDate.month() + 1,
      tempDate.date()
    );

    arrayOfDate.push({
      day: "",
      date: firstDateOfMonth.day(i),
      isCurrentMonth: false,
      etDate: toEthiopian(
        tempDate.year(),
        tempDate.month() + 1,
        tempDate.date()
      ),
    });
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const tempDate = firstDateOfMonth.date(i);
    arrayOfDate.push({
      day: "",
      date: firstDateOfMonth.date(i),
      isCurrentMonth: true,
      today: dayjs().isSame(firstDateOfMonth.date(i), "day"),
      etDate: toEthiopian(
        tempDate.year(),
        tempDate.month() + 1,
        tempDate.date()
      ),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    const tempDate = firstDateOfMonth.date(i);
    arrayOfDate.push({
      day: "",
      date: lastDateOfMonth.date(i).startOf("day"),
      firstDateOfMonth: firstDateOfMonth.date(i),
      isCurrentMonth: false,
    });
  }
  return arrayOfDate;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
];
