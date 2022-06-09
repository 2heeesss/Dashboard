import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import styled from 'styled-components';
import Text from '../atoms/Text';
import Report from '../../utils/report';
import useFetch from '../../hooks/useFetch';
import { REFERER_API } from '../../utils/config';
import CustomPieChartLabel from './CustomPieChartLabel';

const ChartContainer = styled.div`
  flex: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const COLORS = [
  'cadetblue',
  'lightseagreen',
  'mediumaquamarine',
  'palevioletred',
  'hotpink',
];

const renderBlackLegend = (value: string) => {
  return <span style={{ color: 'black' }}>{value}</span>;
};

function PieChartWidget() {
  const { data, loading } = useFetch(REFERER_API);
  let chartData;
  if (!loading && data) {
    const myReport = new Report('Unique Event Count', data);
    chartData = myReport.getChartData();
  }

  return (
    <ChartContainer>
      <Text color="steelblue" weight="500">
        Top Referral
      </Text>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Legend formatter={renderBlackLegend} />
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={chartData}
            outerRadius={80}
            label={(svgProp) => CustomPieChartLabel(svgProp)}
          >
            {chartData?.map((name: any, index: number) => (
              <Cell fill={COLORS[index % COLORS.length]} key={name} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default PieChartWidget;
