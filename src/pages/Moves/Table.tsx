import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Icon } from '@/components';
import { Accuracy, BaseMove } from '@/models';

const columnHelper = createColumnHelper<BaseMove>();

const columns = [
  columnHelper.accessor('nameZh', {
    header: '招式名稱',
    cell: (info) => <span className="whitespace-nowrap">{info.getValue()}</span>,
    meta: 'w-4/12',
  }),
  columnHelper.accessor('type', {
    header: '屬性',
    cell: (info) => <Icon.Type type={info.getValue()} className="h-6 w-full" />,
    meta: 'w-1/12',
  }),
  columnHelper.accessor('category', {
    header: '分類',
    cell: (info) => <Icon.Type type={info.getValue()} className="h-6 w-full" />,
    meta: 'w-1/12',
  }),
  columnHelper.accessor('power', {
    header: '威力',
    cell: (info) =>
      info.getValue() <= 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
    meta: 'w-2/12',
  }),
  columnHelper.accessor('accuracy', {
    header: '命中',
    cell: (info) =>
      info.getValue() <= 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
    meta: 'w-2/12',
  }),
  columnHelper.accessor('PP', {
    header: 'PP',
    meta: 'w-2/12',
  }),
];

function useMoveTable(data: BaseMove[]) {
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return table;
}

export { useMoveTable };
