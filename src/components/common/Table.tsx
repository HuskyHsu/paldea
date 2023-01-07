import { useEffect, useState } from 'react';

interface Column {
  header: string;
  value: Function;
  meta?: string;
}

export interface TableTools {
  _pid: number;
  expanded: boolean;
  selected: boolean;
}

export interface TableReturn<T> {
  tableData: (T & TableTools)[];
  getHeader: () => string[];
  getColumnMeta: () => (string | undefined)[];
  getRowItems: (row: T & TableTools) => JSX.Element[];
  toggleExpanded: (row: T & TableTools) => void;
}

function getTableData<T>(data: T[]) {
  return data.map((row, i) => {
    return {
      _pid: i,
      expanded: false,
      selected: false,
      ...row,
    };
  });
}

function useTable<T>(data: T[], columns: Column[]): TableReturn<T> {
  const [tableData, setTableData] = useState(getTableData<T>(data));

  useEffect(() => {
    setTableData(getTableData<T>(data));
  }, [data]);

  const toggleExpanded = (row: T & TableTools) => {
    const newData = [...tableData];
    const currentRow = newData.find((r) => r._pid === row._pid);
    if (currentRow) {
      currentRow.expanded = !currentRow.expanded;
    }
    setTableData(newData);
  };

  const toggleSelected = (row: T & TableTools, checked: boolean) => {
    const newData = [...tableData];
    const currentRow = newData.find((r) => r._pid === row._pid);
    if (currentRow) {
      currentRow.selected = checked;
    }
    setTableData(newData);
  };

  return {
    tableData: tableData,
    getHeader: () => columns.map((col) => col.header),
    getColumnMeta: () => columns.map((col) => col.meta),
    getRowItems: (row: T) => columns.map((col) => col.value(row, toggleSelected)),
    toggleExpanded,
  };
}

export { useTable };
