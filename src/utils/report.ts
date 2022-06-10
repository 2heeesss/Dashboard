import FetchData from './report.type';
import { Data } from '../components/modules/TableWidget';

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
    if (this.label === 'Country (IP)') {
      const countriesMap = this.rowData.reduce((acc, cur) => {
        const eventCnt = parseInt(cur[3], 10);

        if (acc.has(cur[0])) {
          acc.set(cur[0], acc.get(cur[0]) + eventCnt);
        } else {
          acc.set(cur[0], eventCnt);
        }
        return acc;
      }, new Map());

      const arr: Data[] = [];
      countriesMap.forEach((val: number, key: string) => {
        arr.push({ country: key, countryCnt: val });
      });
      arr.sort((a, b) => b.countryCnt - a.countryCnt);

      Array.from(countriesMap.keys()).forEach((country, countryIdx) => {
        const regions2 = this.rowData.reduce((acc, cur) => {
          const eventCnt = parseInt(cur[3], 10);
          if (cur[0] === country) {
            if (acc.has(cur[1])) {
              acc.set(cur[1], acc.get(cur[1]) + eventCnt);
            } else {
              acc.set(cur[1], eventCnt);
            }
          }
          return acc;
        }, new Map());

        const regionArr: { region: any; cnt: any }[] = [];
        regions2.forEach((val, key) => {
          regionArr.push({ region: key, regionCnt: val });
        });
        regionArr.sort((a, b) => b.regionCnt - a.regionCnt);

        arr[countryIdx] = { ...arr[countryIdx], children: regionArr };
      });

      arr.forEach((country, countryIdx) => {
        country.children.forEach(
          (region: { region: string }, regionIdx: number) => {
            const cities2 = this.rowData.reduce((acc, cur) => {
              const eventCnt = parseInt(cur[3], 10);

              if (cur[0] === country.country && cur[1] === region.region) {
                if (acc.has(cur[2])) {
                  acc.set(cur[2], acc.get(cur[1]) + eventCnt);
                } else {
                  acc.set(cur[2], eventCnt);
                }
              }
              return acc;
            }, new Map());

            const cityArr: { city: any; cnt: any }[] = [];
            cities2.forEach((val, key) => {
              cityArr.push({ city: key, cityCnt: val });
            });
            cityArr.sort((a, b) => b.cityCnt - a.cityCnt);

            arr[countryIdx].children[regionIdx] = {
              ...arr[countryIdx].children[regionIdx],
              children: cityArr,
            };
          }
        );
      });

      return arr;
    }
  }
}

export default Report;
