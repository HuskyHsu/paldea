import { Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Accuracy, allOff, allOn, BaseMove, categoryAllOff, categoryAllOn } from '@/models';
import {
  FilterCategoryButton,
  FilterTypeButton,
  Icon,
  MoveInfo,
  TableReturn,
  TableTools,
} from '@/components';
import { Intersection } from './Intersection';
import { useIntersectionObserver } from '@/components/Card/Hooks';

const columns = [
  {
    header: '挑選',
    value: (row: BaseMove & TableTools, toggleSelected: Function) => (
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
    header: '招式名稱',
    value: (row: BaseMove) => <span className="whitespace-nowrap">{row.nameZh}</span>,
    meta: 'w-3/12',
  },
  {
    header: '屬性',
    value: (row: BaseMove) => <Icon.Type type={row.type} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '分類',
    value: (row: BaseMove) => <Icon.Type type={row.category} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '威力',
    value: (row: BaseMove) =>
      row.power <= 0 ? Accuracy[row.power.toString() as keyof typeof Accuracy] : row.power,
    meta: 'w-2/12',
  },
  {
    header: '命中',
    value: (row: BaseMove) =>
      row.accuracy <= 0 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-2/12',
  },
  {
    header: 'PP',
    value: (row: BaseMove) => row.PP,
    meta: 'w-2/12',
  },
];

const PAGE_COUNT = 20;

function Header({
  getHeader,
  getColumnMeta,
}: Pick<TableReturn<BaseMove>, 'getHeader' | 'getColumnMeta'>) {
  return (
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
  );
}

function Row({
  row,
  maxIndex,
  index,
  updateDisplayCount,
  toggleExpanded,
  getRowItems,
  getHeader,
}: {
  row: BaseMove & TableTools;
  maxIndex: number;
  index: number;
  updateDisplayCount: Function;
} & Pick<TableReturn<BaseMove>, 'toggleExpanded' | 'getRowItems' | 'getHeader'>) {
  const ref = useRef<HTMLTableRowElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && maxIndex === index + 1) {
      updateDisplayCount();
    }
  }, [isVisible, index, maxIndex, updateDisplayCount]);

  return (
    <Fragment key={row._pid}>
      <tr
        className={clsx('cursor-pointer border-b bg-white hover:bg-gray-50', {
          'bg-gray-100': row.selected,
        })}
        onClick={() => toggleExpanded(row)}
        ref={ref}
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
}

function Table({
  tableData,
  getHeader,
  getColumnMeta,
  getRowItems,
  toggleExpanded,
  keyword,
}: TableReturn<BaseMove> & { keyword: string }) {
  const [types, setTypes] = useState(allOn);
  const [categoryType, setCategoryType] = useState(categoryAllOn);
  const [displayCount, setDisplayCount] = useState(PAGE_COUNT);

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

  const updateDisplayCount = () => {
    setDisplayCount((prev) => prev + PAGE_COUNT);
  };

  useEffect(() => {
    setDisplayCount(PAGE_COUNT);
  }, [tableData, types, categoryType]);

  const selectedMoves = tableData.filter((row) => row.selected);
  const displayList = tableData
    .filter(
      (row) =>
        row.selected ||
        (row.nameZh.includes(keyword) && categoryType[row.category] && types[row.type])
    )
    .sort((a, b) => Number(b.selected) - Number(a.selected))
    .filter((_, i) => i < displayCount);

  return (
    <>
      <div className="px-4">
        {selectedMoves.length >= 2 && selectedMoves.length <= 4 && (
          <Intersection moves={selectedMoves.map((row) => row.nameZh)} />
        )}
      </div>
      <div className="mb-4 flex justify-center px-4">
        <FilterTypeButton types={types} targetType={targetType} />
      </div>
      <div className="mb-4 flex justify-center">
        <FilterCategoryButton categories={categoryType} targetCategory={targetCategory} />
      </div>
      <table className="w-full rounded-lg text-left text-sm text-gray-500 shadow-md">
        <Header getHeader={getHeader} getColumnMeta={getColumnMeta} />
        <tbody>
          {displayList.map((row, i) => {
            return (
              <Row
                key={row.nameZh}
                row={row}
                maxIndex={displayCount}
                index={i}
                updateDisplayCount={updateDisplayCount}
                toggleExpanded={toggleExpanded}
                getRowItems={getRowItems}
                getHeader={getHeader}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export { columns, Table };
