import dayjs from "dayjs";
import { toEthiopian, toGregorian } from "ethiopian-date";

export const checkLeapYear = (year) => {
  if (year % 4 === 3) {
    return 6;
  }
  return 5;
};

const dayOfWeek = (y, m, d) => {
  const date = toGregorian(y, m, d);
  const day = dayjs()
    .year(date[0])
    .month(date[1] - 1)
    .date(date[2])
    .day();
  return day;
};

const monthLength = (m, y, prev, next) => {
  if (prev) {
    if (m === 1) {
      return checkLeapYear(y - 1);
    }
    return 30;
  }
  if (next) {
    if (m === 12) {
      return checkLeapYear(y);
    }
    return 30;
  }
  if (m === 13) {
    return checkLeapYear(y);
  }
  return 30;
};

export const nextMonth = (year, month, day) => {
  if (month === 13) {
    return [year + 1, 1, day];
  }
  return [year, month + 1, day];
};

export const nextYear = (year, month, day) => {
  return [year + 1, month, day];
};

export const prevMonth = (year, month, day) => {
  if (month === 1) {
    return [year - 1, 13, 1];
  }
  return [year, month - 1, day];
};

export const prevYear = (year, month, day) => {
  return [year - 1, month, day];
};

export const generateEthiopianDate = (
  month = toEthiopian(dayjs().year(), dayjs().month() + 1, dayjs().date())[1],
  year = toEthiopian(dayjs().year(), dayjs().month() + 1, dayjs().date())[2]
) => {
  const arrayOfDateEthiopian = [];
  const prevMonthDays = monthLength(month, year, true, false);

  //   prefix
  for (
    let i = prevMonthDays - dayOfWeek(year, month, 1) + 1;
    i <= prevMonthDays;
    i++
  ) {
    arrayOfDateEthiopian.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  //   current
  for (let i = 1; i <= monthLength(month, year, false, false); i++) {
    arrayOfDateEthiopian.push({
      day: i,
      isCurrentMonth: true,
      today: dayjs().isSame(
        dayjs()
          .year(toGregorian(year, month, i)[0])
          .month(toGregorian(year, month, i)[1] - 1)
          .date(toGregorian(year, month, i)[2]),
        "day"
      ),
      date: dayjs()
        .year(toGregorian(year, month, i)[0])
        .month(toGregorian(year, month, i)[1] - 1)
        .date(toGregorian(year, month, i)[2])
        .startOf("day"),
    });
  }

  //   suffix
  const remainingEt = 42 - arrayOfDateEthiopian.length;
  for (
    let i = monthLength(month, year, false, false) + 1;
    i <= monthLength(month, year, false, false) + remainingEt;
    i++
  ) {
    if (
      i - monthLength(month, year, false, false) <=
      monthLength(month, year, false, true)
    ) {
      arrayOfDateEthiopian.push({
        day: i - monthLength(month, year, false, false),
        isCurrentMonth: false,
      });
    } else {
      arrayOfDateEthiopian.push({
        day:
          i -
          (monthLength(month, year, false, false) +
            monthLength(month, year, false, true)),
        isCurrentMonth: false,
      });
    }
  }
  return arrayOfDateEthiopian;
};

export const etMonths = [
  "መስከረም",
  "ጥቅምት",
  "ኅዳር",
  "ታህሳስ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዝያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜ",
];

export const etMonthsEnglish = [
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yekatit",
  "Megabit",
  "Miazia",
  "Genbot",
  "Sene",
  "Hamle",
  "Nehase",
  "Pagume",
];
export const etDays = ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"];
export const etDaysEnglish = [
  "Ehud",
  "Segno",
  "Maksegno",
  "Rebue",
  "Hamus",
  "Arb",
  "Kidame",
];

export const englishDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const etLabel = (date, lang) => {
  const month = date.month();
  const dayOfWeek = date.day();
  const year = date.year();
  const day = date.date();
  const etDate = toEthiopian(year, month + 1, day);
  if (lang === "am") {
    return `${etDays[dayOfWeek]} ${etMonths[etDate[1] - 1]} ${etDate[2]} ${
      etDate[0]
    } `;
  }
  return `${etDaysEnglish[dayOfWeek]} ${etMonthsEnglish[etDate[1] - 1]} ${
    etDate[2]
  } ${etDate[0]} `;
};
