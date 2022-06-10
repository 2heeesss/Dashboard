import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import styled from 'styled-components';
import Text from '../atoms/Text';

type Column = { Header: string; accessor: string };

interface CityData {
  city: string;
  cityCnt: number;
}

interface RegionData {
  region: string;
  regionCnt: number;
  children: CityData[];
}

export interface Data {
  country: string;
  countryCnt: number;
  children: RegionData[];
}

const TableContainer = styled.div`
  overflow: scroll;
  flex: auto;
  width: 100%;
  height: 80%;
  padding: 15px;
`;

function TableWidget({ columns, data }: { columns: Column[]; data: Data[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <TableContainer>
      <Text color="steelblue" weight="500">
        Top Referral
      </Text>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default TableWidget;
