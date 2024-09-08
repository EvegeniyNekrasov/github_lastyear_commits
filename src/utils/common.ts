import {
  DAYS,
  LEAP_YEAR_DAYS,
  NORMAL_YEAR_DAYS,
  ONE_DAY,
  WEEKS,
  gh_colors,
} from '../constants';
import type { HeatDayData } from '../types';

/**
 * Array of strings of the days of the week
 * It will return days in users system language
 */
export const DAYS_OF_WEEK = daysForLocale(
  Intl.DateTimeFormat().resolvedOptions().locale || 'en-EN',
);

type WeekDay = 'long' | 'short' | 'narrow';

function daysForLocale(
  localeName: string,
  weekday: WeekDay = 'short',
): string[] {
  const format = new Intl.DateTimeFormat(localeName, { weekday });
  const thisYear = new Date().getFullYear();
  return [...Array(7).keys()].map((day) =>
    format.format(new Date(Date.UTC(thisYear, 5, 2 + day))),
  );
}

/**
 * Determines if a given year is a leap year.
 *
 * A leap year is divisible by 4, but not divisible by 100 unless it is also divisible by 400.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} - Returns `true` if the year is a leap year, otherwise `false`.
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Returns the number of days in the current year.
 *
 * This function checks if the current year is a leap year by calling the `isLeapYear` function.
 * If it's a leap year, it returns the number of days in a leap year, otherwise, it returns the
 * number of days in a normal year.
 *
 * @returns {number} - The number of days in the current year (366 for leap years, 365 otherwise).
 */
const currentYearDays = (): number => {
  const actualYear = new Date().getFullYear();
  return isLeapYear(actualYear) ? LEAP_YEAR_DAYS : NORMAL_YEAR_DAYS;
};

/**
 * Creates a `HeatDayData` object for a specific day in the year and week.
 *
 * @param dayNumberOfYear - The day number of the year, where 0 represents January 1st.
 * @param week - The week number of the year, starting from 1.
 * @param date - The Date object representing the actual date of the current day.
 * @returns A `HeatDayData` object representing a day in the heat map grid.
 *
 * The `HeatDayData` object includes:
 * - `contributions`: Initialized to 0, representing the number of contributions for the day.
 * - `week`: The week number for the day.
 * - `dayOfWeek`: Calculated by mapping `dayNumberOfYear` to the corresponding day of the week.
 *   The result is in the range [0, 6], where 0 represents Sunday and 6 represents Saturday.
 * - `date`: The actual date corresponding to the day.
 */
const createHearDayData = (
  dayNumberOfYear: number,
  week: number,
  date: Date,
): HeatDayData => {
  return {
    contributions: 0,
    week,
    dayOfWeek: (dayNumberOfYear + 6) % 7, // Mapping dayNumberOfYear to day of week (0: Sunady, 6: Saturday)
    date,
  };
};

/**
 * Generates a 2D grid representing the heat map for the entire year.
 *
 * The grid is structured as a matrix where each row represents a day of the year
 * and each column represents a week of the year. The grid is populated with `HeatDayData`
 * objects, which are created for each day and week.
 *
 * The function performs the following steps:
 * 1. Initializes a 2D array (`heatMapData`) where each day of the year is a row and each week is a column.
 * 2. Determines the starting day of the year by creating a `Date` object for January 1st.
 * 3. Iterates through the grid, creating and populating `HeatDayData` for each valid day.
 * 4. Stops when the total number of days matches the number of days in the year.
 *
 * @returns A 2D array (`HeatDayData[][]`) representing the heat map grid for the year.
 *
 * Each element in the grid is a `HeatDayData` object representing the day's data, or `null` if not assigned.
 *
 * Notes:
 * - `DAYS` is the number of days in the year.
 * - `WEEKS` is the number of weeks in the year.
 * - The `createHeatDayData` function is used to create the data for each day in the grid.
 */
export const generateHeatMapGrid = () => {
  const heatMapData: HeatDayData[][] = Array.from({ length: DAYS }, () =>
    Array(WEEKS).fill(null),
  );

  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  let dayOfWeek = startOfYear.getDay();
  let currentDay = 0;

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      if (week === 0 && day < dayOfWeek) {
        continue;
      }

      if (currentDay >= currentYearDays()) {
        return heatMapData;
      }

      const date = new Date(startOfYear);
      date.setDate(startOfYear.getDate() + currentDay);

      heatMapData[day][week] = createHearDayData(dayOfWeek, week + 1, date);
      dayOfWeek = (dayOfWeek + 1) % 7;

      currentDay++;
    }
  }

  return heatMapData;
};

/**
 * Defines the contribution ranges and their corresponding colors for a contribution heatmap.
 *
 * Each object in the `contributionRanges` array specifies an upper limit (`limit`) for contributions
 * and the corresponding color that should be used in the heatmap. The `limit` value defines the upper
 * boundary for the number of contributions, and the associated color is applied based on this range.
 *
 * Color ranges:
 * - 0 contributions => lightest color.
 * - 1-10 contributions => slightly darker color.
 * - 11-20 contributions => medium color.
 * - 21-30 contributions => dark color.
 * - More than 30 contributions => darkest color.
 *
 * @constant
 * @type {Array<{limit: number, gh_colors: string}>}
 */
const contributionRanges = [
  { limit: 0, color: gh_colors[0] },
  { limit: 10, color: gh_colors[1] },
  { limit: 20, color: gh_colors[2] },
  { limit: 30, color: gh_colors[3] },
  { limit: Number.POSITIVE_INFINITY, color: gh_colors[4] },
];

/**
 * Returns the appropiate color based on the number of contributions
 *
 * This function search throuch predefined contribution ranges to define the correponding
 * color based on the number of contributions. If no range is found
 * it defaults to the lighest color.
 *
 * @param contributions - The number of contributions made.
 * @returns - The color corresponding to the contributions range.
 */
export const getColorForContributions = (contributions: number): string => {
  return (
    contributionRanges.find((range) => contributions <= range.limit)?.color ||
    gh_colors[0]
  );
};

/**
 * Calculates the week number of the year from a Unix timestamp.
 *
 * The function converts a Unix timestamp (which is in seconds) into a JavaScript `Date` object,
 * and then determines the week number of the year for that date. The week number is calculated
 * by finding the number of days since the start of the year and dividing by 7.
 *
 * @param timestamp - The Unix timestamp representing the date, in seconds.
 * @returns The week number of the year, starting from 1 for the first week.
 *
 * The function performs the following steps:
 * 1. Converts the Unix timestamp (in seconds) to milliseconds and creates a `Date` object.
 * 2. Creates a reference `Date` object set to January 1st of the same year at midnight.
 * 3. Calculates the number of days between the given date and the reference date.
 * 4. Computes the week number by dividing the number of days by 7 and rounding up.
 *
 * Note:
 * - The Unix timestamp is multiplied by 1000 to convert from seconds to milliseconds.
 * - The constant `ONE_DAY` should be defined as the number of milliseconds in a day (e.g., `24 * 60 * 60 * 1000`).
 * - Week numbers start from 1. The first week of the year is week 1.
 */
export const getWeekNumberFromTimestamp = (timestamp: number): number => {
  const date = new Date(timestamp * 1000);

  const dateCopy = new Date(date.getTime());

  dateCopy.setMonth(0, 1);
  dateCopy.setHours(0, 0, 0, 0);

  const days = Math.floor((date.getTime() - dateCopy.getTime()) / ONE_DAY);
  const weekNumber = Math.ceil((days + 1) / 7);

  return weekNumber;
};

/**
 * Formats a given `Date` object as a string with an ordinal suffix appended to the day.
 *
 * The format returned is in the form: `Month Day{ordinal}.`, where the month is the full name
 * and the day is followed by its appropriate ordinal suffix (e.g., 1st, 2nd, 3rd, 4th, etc.).
 *
 * Ordinal suffix rules:
 * - Days 1, 21, 31 get the suffix "st"
 * - Days 2, 22 get the suffix "nd"
 * - Days 3, 23 get the suffix "rd"
 * - All other days get the suffix "th"
 * - Special case: Days 11, 12, 13 get the suffix "th" due to the unique rule for those numbers.
 *
 * @param date - A `Date` object representing the date to be formatted.
 * @returns A string representing the formatted date, including the ordinal suffix for the day.
 *
 * Example:
 * ```
 * const date = new Date(2024, 6, 21); // July 21st, 2024
 * const formattedDate = formatDateWithOrdinal(date);
 * console.log(formattedDate); // "July 21st."
 * ```
 */
export const formatDateWithOrdinal = (date: Date): string => {
  const day = date.getDate();

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11-13
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date,
  );
  return `${month} ${day}${getOrdinalSuffix(day)}.`;
};
