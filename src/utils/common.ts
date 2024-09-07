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
 * @returns A `HeatDayData` object representing a day in the heat map grid.
 *
 * The `HeatDayData` object includes:
 * - `contributions`: Initialized to 0, representing the number of contributions for the day.
 * - `week`: The week number for the day.
 * - `dayOfWeek`: Calculated by mapping `dayNumberOfYear` to the corresponding day of the week.
 *   The result is in the range [0, 6], where 0 represents Sunday and 6 represents Saturday.
 */
const createHearDayData = (
  dayNumberOfYear: number,
  week: number,
): HeatDayData => {
  return {
    contributions: 0,
    week,
    dayOfWeek: (dayNumberOfYear + 6) % 7, // Mapping dayNumberOfYear to day of week (0: Sunady, 6: Saturday)
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
 * 1. Initializes a 2D array (`heatMapData`) with null values.
 * 2. Determines the starting day of the year and iterates through weeks and days.
 * 3. For each valid day, a `HeatDayData` object is created and inserted into the grid.
 * 4. The `dayOfWeek` is incremented cyclically from 0 (Sunday) to 6 (Saturday).
 * 5. Stops populating the grid once the number of days exceeds the total days in the year.
 *
 * @returns A 2D array (`HeatDayData[][]`) representing the heat map grid for the year.
 *
 * Each element in the grid is a `HeatDayData` object, or `null` if no data is assigned.
 *
 * Note:
 * - The grid dimensions are based on constants `DAYS` (number of days in the year) and `WEEKS` (number of weeks in the year).
 * - `createHeatDayData` is used to initialize each day's data in the grid.
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

      heatMapData[day][week] = createHearDayData(dayOfWeek, week + 1);
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
