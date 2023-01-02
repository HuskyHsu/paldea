import { Icon } from '@/components';
import { Accuracy, PMMove } from '@/models';

const columns = [
  {
    header: '來源',
    value: (row: PMMove) => row.source,
    meta: 'w-2/12',
  },
  {
    header: '招式名稱',
    value: (row: PMMove) => <span className="whitespace-nowrap">{row.nameZh}</span>,
    meta: 'w-1/12',
  },
  {
    header: '屬性',
    value: (row: PMMove) => <Icon.Type type={row.type} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '分類',
    value: (row: PMMove) => <Icon.Type type={row.category} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '威力',
    value: (row: PMMove) =>
      row.power <= 0 ? Accuracy[row.power.toString() as keyof typeof Accuracy] : row.power,
    meta: 'w-1/12',
  },
  {
    header: '命中',
    value: (row: PMMove) =>
      row.accuracy <= 0 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-1/12',
  },
  {
    header: 'PP',
    value: (row: PMMove) => row.PP,
    meta: 'w-1/12',
  },
];

function useMoveTable(data: PMMove[]) {
  return {
    tableData: data,
    getHeader: () => columns.map((col) => col.header),
    getRow: (row: PMMove) => columns.map((col) => col.value(row)),
  };
}

export { useMoveTable };
