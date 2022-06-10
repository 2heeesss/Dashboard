import React, { useMemo, useState } from 'react';
import GridLayout from 'react-grid-layout';

import styled from 'styled-components';
import SummaryWidget from '../modules/SummaryWidget';
import SerialChartWidget from '../modules/SerialChartWidget';
import PieChartWidget from '../modules/PieChartWidget';
import TableWidget from '../modules/TableWidget';
import useFetch from '../../hooks/useFetch';
import Report from '../../utils/report';
import { COUNTRY_API } from '../../utils/config';
import Button from '../atoms/Button';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minH: number;
  minW: number;
}

const WidgetContainer = styled.div`
  background-color: white;
  &:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  }
  display: flex;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px;
`;

const GridContainer = styled.div`
  background-color: gainsboro;
  width: 1200px;
`;

function Dashboard() {
  const [layout, setLayout] = useState([
    { i: 'connectionUser', x: 0, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
    { i: 'connectionCnt', x: 5, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
    { i: 'serial', x: 0, y: 5, w: 10, h: 8, minH: 4, minW: 6 },
    { i: 'pie', x: 0, y: 13, w: 5, h: 9, minH: 9, minW: 4 },
    { i: 'table', x: 5, y: 13, w: 5, h: 9, minH: 9, minW: 4 },
  ]);

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
    tableData = myReport.getTableData();
  }

  const getLayout = () => {
    const savedLayouts = localStorage.getItem('grid-layout');
    return savedLayouts ? JSON.parse(savedLayouts) : layout;
  };

  const storeLayoutHandler = () => {
    localStorage.setItem('grid-layout', JSON.stringify(layout));
  };

  const removeLayout = () => {
    localStorage.removeItem('grid-layout');
  };

  const onLayoutChangeHandler = (currentLayout: Layout[]) => {
    setLayout(currentLayout);
  };

  return (
    <div>
      <ButtonContainer>
        <Button borderRadius="30" clickHandler={removeLayout}>
          편집 취소
        </Button>
        <Button
          borderRadius="30"
          backgroundColor="steelblue"
          margin="20px"
          clickHandler={storeLayoutHandler}
        >
          편집 완료
        </Button>
      </ButtonContainer>
      <GridContainer>
        <GridLayout
          layout={getLayout()}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={onLayoutChangeHandler}
        >
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
      </GridContainer>
    </div>
  );
}

export default Dashboard;
