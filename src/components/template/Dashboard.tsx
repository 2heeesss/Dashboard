import React from 'react';
import GridLayout from 'react-grid-layout';

import styled from 'styled-components';
import SummaryWidget from '../modules/SummaryWidget';

const WidgetContainer = styled.div`
  background-color: white;
  &:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  }
`;

function Dashboard() {
  const layout = [
    { i: 'connectionUser', x: 0, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
    { i: 'connectionCnt', x: 5, y: 0, w: 5, h: 5, minH: 4, minW: 3 },
  ];
  return (
    <div>
      <GridLayout layout={layout} cols={12} rowHeight={30} width={1200}>
        <WidgetContainer key="connectionUser">
          <SummaryWidget connectionType="user" />
        </WidgetContainer>

        <WidgetContainer key="connectionCnt">
          <SummaryWidget connectionType="access" />
        </WidgetContainer>
      </GridLayout>
    </div>
  );
}

export default Dashboard;
