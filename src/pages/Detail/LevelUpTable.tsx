import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { LevelUpMove } from '@/models';

const columnHelper = createColumnHelper<LevelUpMove>();

const columns = [
  columnHelper.accessor('level', {
    header: 'Lv',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('nameZh', {
    header: 'name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('type', {
    header: 'type',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: 'category',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('power', {
    header: 'power',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('accuracy', {
    header: 'accuracy',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('PP', {
    header: 'PP',
    footer: (info) => info.column.id,
  }),
];

interface LevelUpMoveTableProps {
  data: LevelUpMove[];
}

export function LevelUpMoveTable({ data }: LevelUpMoveTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900">
        升等招式
      </caption>
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th scope="col" className="py-3 px-6" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-b bg-white" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="py-3 px-6" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
