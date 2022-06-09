import React from 'react';

interface CustomLabelProp {
  cx: number;
  cy: number;
  midAngle: number;
  fill: string;
  outerRadius: number;
  name: string;
}

const RADIAN = Math.PI / 180;

function CustomPieChartLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  name,
}: CustomLabelProp) {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 6}
        textAnchor={textAnchor}
      >
        {name}
      </text>
    </g>
  );
}

export default CustomPieChartLabel;
