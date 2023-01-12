import clsx from 'clsx';
import { Fragment, useState } from 'react';

import {
  FilterCategoryButton,
  FilterTypeButton,
  Icon,
  MoveInfo,
  TableReturn,
  TableTools,
} from '@/components';
import { Accuracy, allOff, allOn, PMMove, categoryAllOn, categoryAllOff, BaseMove } from '@/models';
import { RaidMoves, UnionType } from './components';

const columns = [
  {
    header: '挑選',
    value: (row: PMMove & TableTools, toggleSelected: Function) => (
      <div>
        <input
          type="checkbox"
          checked={row.selected}
          onChange={(e) => toggleSelected(row, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
        />
      </div>
    ),
    meta: 'w-1/12',
  },
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
    meta: 'w-1/12',
  },
];

function Table({
  tableData,
  getHeader,
  getColumnMeta,
  getRowItems,
  toggleExpanded,
  raidMoves,
}: TableReturn<PMMove> & { raidMoves: BaseMove[] }) {
  const [types, setTypes] = useState(allOn);
  const [categoryType, setCategoryType] = useState(categoryAllOn);

  const targetType = function (type: string) {
    const onTypes = Object.entries(types).filter(([_, val]) => Boolean(val));
    if (onTypes.length === 1 && onTypes[0][0] === type) {
      setTypes(allOn);
    } else {
      setTypes({ ...allOff, [type]: true });
    }
  };

  const targetCategory = function (category: string) {
    const onCategoryTypes = Object.entries(categoryType).filter(([_, val]) => Boolean(val));

    if (onCategoryTypes.length === 1 && onCategoryTypes[0][0] === category) {
      setCategoryType(categoryAllOn);
    } else {
      setCategoryType({
        ...categoryAllOff,
        [category]: true,
      });
    }
  };

  const typeSet = tableData.reduce((acc, cur) => {
    acc.add(cur.type);
    return acc;
  }, new Set<string>());

  const UnionMoves = tableData.filter((move) => move.selected && move.category !== 'Status');

  return (
    <>
      <div className="flex justify-center px-4">
        <FilterTypeButton types={types} targetType={targetType} set={typeSet} />
      </div>
      <div className="flex justify-center">
        <FilterCategoryButton categories={categoryType} targetCategory={targetCategory} />
      </div>
      <div className="space-y-2 px-4 md:px-0">
        {UnionMoves.length > 0 && (
          <UnionType types={Array.from(new Set(UnionMoves.map((move) => move.type)))} />
        )}
        {raidMoves.length > 0 && <RaidMoves raidMoves={raidMoves} />}
      </div>
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
          {tableData
            .filter((row) => row.selected || (categoryType[row.category] && types[row.type]))
            .sort((a, b) => Number(b.selected) - Number(a.selected))
            .map((row) => {
              return (
                <Fragment key={row._pid}>
                  <tr
                    className={clsx('cursor-pointer border-b bg-white hover:bg-gray-50', {
                      'bg-gray-100': row.selected,
                    })}
                    onClick={() => toggleExpanded(row)}
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
                        <MoveInfo name={row.nameZh} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export { columns, Table };
