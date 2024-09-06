import type React from 'react';
import { useState } from 'react';

import {
  DAYS_OF_WEEK,
  generateHeatMapGrid,
  getColorForContributions,
} from '../utils/common';

import Cell from './ui/Cell';
import DayLabel from './ui/DayLabel';
import DayLabels from './ui/DayLabels';
import GridHeapMap from './ui/GridHeapMap';
import HeatMap from './ui/HeatMap';
import WeekRow from './ui/WeekRow';

const ContributionHeatmap: React.FC = () => {
  const heatMapData = generateHeatMapGrid();
  const [data, setData] = useState(heatMapData);

  return (
    <HeatMap>
      <DayLabels>
        {DAYS_OF_WEEK.map((day) => (
          <DayLabel key={day}>{day}</DayLabel>
        ))}
      </DayLabels>
      <GridHeapMap>
        {data.map((week, weekIndex) => (
          <WeekRow key={`week-${weekIndex + 1}`}>
            {week.map((day, dayIndex) => (
              <Cell
                key={`day-${dayIndex + 1}`}
                color={
                  day === null
                    ? 'transparent'
                    : getColorForContributions(day.contributions)
                }
                display={'block'}
              />
            ))}
          </WeekRow>
        ))}
      </GridHeapMap>
    </HeatMap>
  );
};

export default ContributionHeatmap;
