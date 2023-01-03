import { useEffect, useState } from 'react';

interface Column {
  header: string;
  value: Function;
  meta?: string;
}

export interface TableReturn<T> {
  tableData: (T & { expanded: boolean })[];
  getHeader: () => string[];
  getColumnMeta: () => (string | undefined)[];
  getRowItems: (row: T) => JSX.Element[];
  toggleExpanded: (i: number) => void;
}

function getCanExpandedData<T>(data: T[]) {
  return data.map((row) => {
    return {
      expanded: false,
      ...row,
    };
  });
}

function useTable<T>(data: T[], columns: Column[]): TableReturn<T> {
  const [tableData, setTableData] = useState(getCanExpandedData<T>(data));

  useEffect(() => {
    setTableData(getCanExpandedData<T>(data));
  }, [data]);

  const toggleExpanded = (i: number) => {
    const newData = [...tableData];
    newData[i].expanded = !newData[i].expanded;
    setTableData(newData);
  };

  return {
    tableData: tableData,
    getHeader: () => columns.map((col) => col.header),
    getColumnMeta: () => columns.map((col) => col.meta),
    getRowItems: (row: T) => columns.map((col) => col.value(row)),
    toggleExpanded,
  };
}

export { useTable };
