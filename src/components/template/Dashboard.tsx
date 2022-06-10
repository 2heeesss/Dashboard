import React, { useMemo } from 'react';
import GridLayout from 'react-grid-layout';

import styled from 'styled-components';
import SummaryWidget from '../modules/SummaryWidget';
import SerialChartWidget from '../modules/SerialChartWidget';
import PieChartWidget from '../modules/PieChartWidget';
import TableWidget from '../modules/TableWidget';
import useFetch from '../../hooks/useFetch';
import Report from '../../utils/report';
import { COUNTRY_API } from '../../utils/config';

const WidgetContainer = styled.div`
  background-color: white;
  &:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  }
  display: flex;
`;

function Dashboard() {
  const layout = [
    { i: 'connectionUser', x: 0, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
    { i: 'connectionCnt', x: 5, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
    { i: 'serial', x: 10, y: 5, w: 6, h: 10, minH: 4, minW: 6 },
    { i: 'pie', x: 0, y: 5, w: 6, h: 10, minH: 9, minW: 4 },
    { i: 'table', x: 0, y: 5, w: 6, h: 10, minH: 9, minW: 4 },
  ];
  const columns = useMemo(
    () => [
      {
        Header: 'GroupBy',
        accessor: 'country',
      },
      {
        Header: 'Metrics',
        accessor: 'countryCnt',
      },
    ],

    []
  );

  const { data, loading } = useFetch(COUNTRY_API);
  let tableData;
  if (data && !loading) {
    const myReport = new Report('Unique Event Count', data);
    tableData = myReport.getChartData();
  }

  return (
    <div>
      <GridLayout layout={layout} cols={12} rowHeight={30} width={1200}>
        <WidgetContainer key="connectionUser">
          <SummaryWidget connectionType="user" />
        </WidgetContainer>

        <WidgetContainer key="connectionCnt">
          <SummaryWidget connectionType="access" />
        </WidgetContainer>

        <WidgetContainer key="serial">
          <SerialChartWidget />
        </WidgetContainer>
        <WidgetContainer key="pie">
          <PieChartWidget />
        </WidgetContainer>
        <WidgetContainer key="table">
          {tableData && <TableWidget columns={columns} data={tableData} />}
        </WidgetContainer>
      </GridLayout>
    </div>
  );
}

export default Dashboard;
