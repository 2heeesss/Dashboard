/* eslint-disable @typescript-eslint/no-unused-vars */
import FetchData from './report.type';

const USER_EVENT_CNT_IDX = 1;
const TOTAL_EVENT_CNT_IDX = 2;

class Report {
  connectionType: string;

  data: FetchData;

  rowData: string[];

  label: string;

  constructor(connectionType: string, data: FetchData) {
    this.connectionType = connectionType;
    this.data = data;
    this.rowData = this.data.data.rows;
    this.label = this.data.data.headers[0].label;
  }

  sortRowData() {
    if (this.label === 'Daily') {
      return this.rowData.sort(
        (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
      );
    }
    if (this.label === 'abx:ref_host') {
      return this.rowData.sort((a, b) => +b[1] - +a[1]);
    }
  }

  getDataLabel() {
    const idx =
      this.connectionType === 'user' ? USER_EVENT_CNT_IDX : TOTAL_EVENT_CNT_IDX;

    return this.data.data.headers[idx].label;
  }

  getTotalEventCnt() {
    const idx =
      this.connectionType === 'user' ? USER_EVENT_CNT_IDX : TOTAL_EVENT_CNT_IDX;

    return this.rowData
      .map((row) => +row[idx])
      .reduce((acc, cur) => acc + cur, 0);
  }

  getDiffPrevDayCnt() {
    this.sortRowData();

    const idx =
      this.connectionType === 'user' ? USER_EVENT_CNT_IDX : TOTAL_EVENT_CNT_IDX;
    const lastIdx = this.rowData.length - 1;

    return +this.rowData[lastIdx][idx] - +this.rowData[lastIdx - 1][idx];
  }

  getChartData() {
    this.sortRowData();

    if (this.label === 'Daily') {
      return this.rowData.map((val) => {
        return {
          time: val[0],
          'Total Event Count': +val[1],
          'Unique Event Count': +val[2],
        };
      });
    }
    if (this.label === 'abx:ref_host') {
      const topData = this.rowData
        .filter((_, idx) => idx < 4)
        .map((val) => {
          return {
            name: val[0],
            value: +val[1],
          };
        });

      const etcCnt = this.rowData
        .filter((_, idx) => idx >= 4)
        .map((val) => +val[1])
        .reduce((acc, cur) => acc + cur, 0);

      return [...topData, { name: 'etc', value: etcCnt }];
    }
  }
}

export default Report;
