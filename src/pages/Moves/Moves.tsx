import { Fragment, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useApi } from '@/utils';
import { Icon, PokemonList } from '@/components';
import { Accuracy, allOff, allOn, BaseMove, CategoryType } from '@/models';

import { Header } from './Header';
import clsx from 'clsx';

const columnHelper = createColumnHelper<BaseMove>();

const columns = [
  columnHelper.accessor('nameZh', {
    header: '招式名稱',
    cell: (info) => <span className="whitespace-nowrap">{info.getValue()}</span>,
    meta: 'w-3/12',
  }),
  columnHelper.accessor('type', {
    header: '屬性',
    cell: (info) => <Icon.Type type={info.getValue()} className="h-6 w-full" />,
    meta: 'w-1/12',
  }),
  columnHelper.accessor('category', {
    header: '分類',
    cell: (info) => CategoryType[info.getValue() as keyof typeof CategoryType],
    meta: 'w-2/12',
  }),
  columnHelper.accessor('power', {
    header: '威力',
    cell: (info) =>
      info.getValue() < 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
    meta: 'w-2/12',
  }),
  columnHelper.accessor('accuracy', {
    header: '命中',
    cell: (info) =>
      info.getValue() < 0
        ? Accuracy[info.getValue().toString() as keyof typeof Accuracy]
        : info.getValue(),
    meta: 'w-2/12',
  }),
  columnHelper.accessor('PP', {
    header: 'PP',
    meta: 'w-2/12',
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

  const [types, setTypes] = useState(allOn);
  const [keyword, setKeyword] = useState('');

  const targetType = function (type: string) {
    const onTypes = Object.entries(types).filter(([_, val]) => Boolean(val));
    if (onTypes.length === 1 && onTypes[0][0] === type) {
      setTypes(allOn);
    } else {
      setTypes({ ...allOff, [type]: true });
    }
  };

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <>
      <Header types={types} targetType={targetType} keyword={keyword} updateKeyword={setKeyword} />
      <div className="flex justify-center px-0 pt-4 pb-0 md:px-4 md:pb-4">
        <table className="w-full rounded-lg text-left text-sm text-gray-500 shadow-md md:w-5/6">
          <thead className="sticky top-0 bg-custom-gold/50 text-xs uppercase text-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      'whitespace-nowrap py-3 px-2 text-center',
                      header.column.columnDef.meta
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.filter((row) => {
                let display = true;
                if (keyword !== '') {
                  display = (row.getValue('nameZh') as string).includes(keyword);
                }
                return display && types[row.getValue('type') as string];
              })
              .map((row) => (
                <Fragment key={row.id}>
                  <tr
                    className="cursor-pointer border-b bg-white hover:bg-gray-50"
                    key={row.id}
                    onClick={row.getToggleExpandedHandler()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="whitespace-nowrap py-3 px-2 text-center" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr className="border-b bg-gray-100">
                      <td colSpan={row.getVisibleCells().length} className="p-4 md:px-8">
                        <PokemonList name={row.original.nameZh} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Moves;
