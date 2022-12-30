import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useApi } from '@/utils';
import { Icon } from '@/components';
import { Accuracy, BaseMove, CategoryType } from '@/models';
import { Fragment } from 'react';
import { PokemonList } from './PokemonList';

const columnHelper = createColumnHelper<BaseMove>();

const columns = [
  columnHelper.accessor('nameZh', {
    header: '招式名稱',
  }),
  columnHelper.accessor('type', {
    header: '屬性',
    cell: (info) => <Icon.Type type={info.getValue()} className="h-6 w-6" />,
  }),
  columnHelper.accessor('category', {
    header: '分類',
    cell: (info) => CategoryType[info.getValue() as keyof typeof CategoryType],
  }),
  columnHelper.accessor('power', {
    header: '威力',
    cell: (info) =>
      info.getValue() < 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
  }),
  columnHelper.accessor('accuracy', {
    header: '命中',
    cell: (info) =>
      info.getValue() < 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
  }),
  columnHelper.accessor('PP', {
    header: 'PP',
  }),
];

function Moves() {
  const { isLoading, isError, data, error } = useApi<BaseMove[]>({
    queryKey: 'moves',
    path: '/data/relation/moves.json',
    initialData: [],
  });

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <div className="flex justify-center">
      <table className="w-full max-w-4xl rounded-lg text-left text-sm text-gray-500 shadow-md">
        <thead className="sticky top-0 bg-gray-200 text-xs uppercase text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-2 md:px-6">
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
            <Fragment key={row.id}>
              <tr
                className="border-b bg-white hover:bg-gray-50"
                key={row.id}
                onClick={row.getToggleExpandedHandler()}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="cursor-pointer py-3 px-2 md:px-6" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr className="border-b bg-gray-100">
                  <td colSpan={row.getVisibleCells().length} className="py-3 px-2 md:px-6">
                    <PokemonList name={row.original.nameZh} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Moves;
