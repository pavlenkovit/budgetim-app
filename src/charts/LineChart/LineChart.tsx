import React, { FC } from 'react';

import { DataItemLineChart } from './types';
import { ChartProvider } from './chartContext/chartContext';
import { Grid } from './Grid';
import { SvgChart } from './SvgChart';

export interface LineChartProps {
  categories: string[];
  height: number;
  width: number;
  data: DataItemLineChart[];
}

export const LineChart: FC<LineChartProps> = props => {
  return (
    <ChartProvider {...props}>
      <SvgChart>
        <Grid />
      </SvgChart>
    </ChartProvider>
  );
};
