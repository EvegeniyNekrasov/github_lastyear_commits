import type React from 'react';
import { useEffect, useState } from 'react';

import {
  DAYS_OF_WEEK,
  generateHeatMapGrid,
  getColorForContributions,
  getWeekNumberFromTimestamp,
} from '../utils/common';

import type { HeatDayData, RestApiResponse } from '../types';
import Cell from './ui/Cell';
import DayLabel from './ui/DayLabel';
import DayLabels from './ui/DayLabels';
import GridHeapMap from './ui/GridHeapMap';
import HeatMap from './ui/HeatMap';
import WeekRow from './ui/WeekRow';

interface ContributionHeatMapProps {
  data: RestApiResponse[] | null;
}

const ContributionHeatmap: React.FC<ContributionHeatMapProps> = ({ data }) => {
  const heatMapData = generateHeatMapGrid(); // generate initial data to fill the heatmap
  const [initialData, setInitialData] = useState<HeatDayData[][]>(heatMapData);
 
  useEffect(() => {
    if (data) {
      // TODO: refactor this ugly logic
      setInitialData((prevData) => {
        const newData = [...prevData];

        for (const dataItem of data) {
          const weekNumberFromData = getWeekNumberFromTimestamp(dataItem.week);

          for (const newDataItem of newData) {
            for (const item of newDataItem) {
              if (item !== null) {
                if (item.week === weekNumberFromData) {
                  item.contributions = dataItem.days[item.dayOfWeek];
                }
              }
            }
          }
        }
        return newData;
      });
    }
  }, [data]);

  return (
    <HeatMap>
      <DayLabels>
        {DAYS_OF_WEEK.map((day) => (
          <DayLabel key={day}>{day}</DayLabel>
        ))}
      </DayLabels>
      <GridHeapMap>
        {initialData.map((week, weekIndex) => (
          <WeekRow key={`week-${weekIndex + 1}`}>
            {week.map((day, dayIndex) => (
              <Cell
                key={`day-${dayIndex + 1}`}
                color={
                  day === null
                    ? 'transparent'
                    : getColorForContributions(day.contributions)
                }
                noPopOver={day !== null}
                display={'block'}
                contributions={day ? day.contributions : null}
                date={day !== null ? day.date : new Date()}
              />
            ))}
          </WeekRow>
        ))}
      </GridHeapMap>
    </HeatMap>
  );
};

export default ContributionHeatmap;
