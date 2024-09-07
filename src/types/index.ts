export type HeatDayData = {
  contributions: number;
  week: number,
  dayOfWeek: number
};

export type RestApiResponse = {
  days: number[];
  total: number;
  week: number;
};
