import clsx from 'clsx';
import { Fragment } from 'react';

import { Icon, MovePokemonList, TableReturn } from '@/components';
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
    meta: 'w-2/12',
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
    meta: 'w-2/12',
  },
  {
    header: '命中',
    value: (row: PMMove) =>
      row.accuracy <= 0 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-2/12',
  },
  {
    header: 'PP',
    value: (row: PMMove) => row.PP,
    meta: 'w-2/12',
  },
];

function Table({
  tableData,
  getHeader,
  getColumnMeta,
  getRowItems,
  toggleExpanded,
}: TableReturn<PMMove>) {
  return (
    <table className="w-full rounded-lg text-left text-sm text-gray-500 shadow-md">
      <thead className="sticky top-0 bg-custom-gold/50 text-xs uppercase text-gray-100 md:-top-4">
        <tr>
          {getHeader().map((th, i) => (
            <th
              key={i}
              className={clsx('whitespace-nowrap py-3 px-2 text-center', getColumnMeta()[i])}
            >
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i) => (
          <Fragment key={i}>
            <tr
              className="cursor-pointer border-b bg-white hover:bg-gray-50"
              onClick={() => toggleExpanded(i)}
            >
              {getRowItems(row).map((val, j) => (
                <td className="whitespace-nowrap py-3 px-2 text-center" key={j}>
                  {val}
                </td>
              ))}
            </tr>
            {row.expanded && (
              <tr className="border-b bg-gray-100">
                <td colSpan={getHeader().length} className="p-4 md:px-8">
                  <MovePokemonList name={row.nameZh} />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export { columns, Table };
