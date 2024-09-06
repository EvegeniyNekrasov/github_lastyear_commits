import {
  DAYS,
  LEAP_YEAR_DAYS,
  NORMAL_YEAR_DAYS,
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
 * Generates a grid representing the heatmap data for contributions throughout the year.
 *
 * The grid consists of an array of arrays where each sub-array represents a week and each
 * element within that array represents a day. The function calculates the start of the year
 * and fills the grid with `null` initially. It then iterates over the weeks and days, assigning
 * contribution data for each day, including a predefined number of contributions for specific days.
 *
 * - The heatmap grid size is based on the constants `DAYS` (days per week) and `WEEKS` (weeks in a year).
 * - The first day of the year is determined to align the grid with the correct starting day.
 *
 * @function generateHeatMapGrid
 * @returns {Array<Array<HeatDayData | null>>} - A 2D array where each element is an object containing the day's contribution data or `null` if no data is available.
 *
 * @typedef {Object} HeatDayData
 * @property {number} day - The day of the week (0-6, Sunday to Saturday).
 * @property {number} contributions - The number of contributions for the day.
 */
export function generateHeatMapGrid() {
  const heatMapData = [];

  for (let i = 0; i < DAYS; i++) {
    heatMapData.push(new Array(WEEKS).fill(null));
  }

  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  let dayOfWeek = startOfYear.getDay();

  let currentDay = 0;

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      if (week === 0 && day === 0 && day < dayOfWeek) {
        continue;
      }

      if (currentDay >= currentYearDays()) {
        break;
      }

      const dayData: HeatDayData = {
        day: dayOfWeek,
        contributions: day === 5 ? 40 : 0,
      };

      heatMapData[day][week] = dayData;
      dayOfWeek++;
      currentDay++;
    }
  }

  return heatMapData;
}

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
