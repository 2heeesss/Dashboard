import React from 'react';
import GridLayout from 'react-grid-layout';

function Dashboard() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {/* 여러 위젯들 들어갈 위치 */}
      </GridLayout>
    </div>
  );
}

export default Dashboard;
