const YaxisFormat = (number: number) => {
  if (number > 1000000000) {
    return `${(number / 1000000000).toString()}B`;
  }
  if (number > 1000000) {
    return `${(number / 1000000).toString()}M`;
  }
  if (number > 1000) {
    return `${(number / 1000).toString()}K`;
  }
  return number.toString();
};

const XaxisFormatYear = (date: string) => {
  const year = date.slice(0, 4);

  return year;
};
const XaxisFormatMonthDay = (date: string) => {
  const monthDay = date.slice(5);

  return monthDay;
};

export { YaxisFormat, XaxisFormatYear, XaxisFormatMonthDay };
