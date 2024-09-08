export type HeatDayData = {
  contributions: number;
  week: number,
  dayOfWeek: number,
  date: Date
};

export type RestApiResponse = {
  days: number[];
  total: number;
  week: number;
};
