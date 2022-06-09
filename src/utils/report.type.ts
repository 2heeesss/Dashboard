interface HeaderProperty {
  description: string;
  idx: number;
  key: string;
  label: string;
  property_type: string;
  value_type: string;
}

interface DataProperty {
  headers: HeaderProperty[];
  rows: string[];
}

interface FetchData {
  data: DataProperty;
  last_compile_time: string;
  message: string;
  result: boolean;
  version: string;
}

export default FetchData;
