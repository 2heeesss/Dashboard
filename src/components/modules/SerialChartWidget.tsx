import React from 'react';
import {
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Legend,
  Brush,
  ComposedChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { DAILY_API } from '../../utils/config';
import Report from '../../utils/report';
import {
  XaxisFormatMonthDay,
  XaxisFormatYear,
  YaxisFormat,
} from '../../utils/axisFormat';
import Text from '../atoms/Text';

const ChartContainer = styled.div`
  flex: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

function SerialChartWidget() {
  const { data, loading } = useFetch(DAILY_API);
  let chartData;
  if (!loading && data) {
    const myReport = new Report('Unique Event Count', data);
    chartData = myReport.getChartData();
  }

  return (
    <ChartContainer
      onMouseDown={(event) => {
        const target = event.target as HTMLElement;
        const parentTarget = target.parentElement;
        const grandParentTarget = parentTarget?.parentElement;

        if (
          target.classList.contains('recharts-brush') ||
          parentTarget?.classList.contains('recharts-brush') ||
          grandParentTarget?.classList.contains('recharts-brush')
        ) {
          event.stopPropagation();
        }
      }}
    >
      <Text color="steelblue" weight="500">
        DAU
      </Text>
      {chartData && (
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart data={chartData} margin={{ top: 70 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={XaxisFormatMonthDay}
              minTickGap={140}
              style={{
                fontSize: '0.8rem',
              }}
            />
            <XAxis
              dataKey="time"
              height={1}
              tickFormatter={XaxisFormatYear}
              tickSize={-10}
              axisLine={false}
              tickLine={false}
              xAxisId="year"
              tickCount={100}
              minTickGap={150}
              style={{
                fontSize: '0.8rem',
              }}
            />
            <YAxis
              yAxisId="left"
              domain={['auto', 'auto']}
              tickFormatter={YaxisFormat}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Legend />
            <Brush
              dataKey="time"
              height={40}
              y={0}
              startIndex={60}
              stroke="steelblue"
            >
              <AreaChart>
                <Area
                  type="monotone"
                  dataKey="Total Event Count"
                  name="Total Event Count"
                  stroke="gainsboro"
                  fill="gainsboro"
                />
              </AreaChart>
            </Brush>

            <Line
              yAxisId="left"
              dataKey="Unique Event Count"
              stroke="lightseagreen"
            />
            {/* @ts-ignore */}
            <Bar
              yAxisId="right"
              dataKey="Total Event Count"
              stroke="lightseagreen"
              fill="lightseagreen"
              barSize={5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}

export default SerialChartWidget;
