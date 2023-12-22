import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import { Hr } from '@/newComponents/common';
import { MoveDetail } from '@/newComponents/game';
import { Icon } from '@/newComponents';
import { Accuracy, FullMove } from '@/types/Pokemon';
import { ValueKeys, api } from '@/utils';

import { Header, Intersection } from './components';
import { MoveType, useMoveListInfo } from './api';

export type Filter = {
  keyword: string;
  type: string;
  category: string;
  page: number;
  TM: string;
};

type colValue = {
  row: MoveType;
  fn?: () => void;
  checked?: boolean;
};

const columns = [
  {
    header: '挑選',
    value: ({ fn = () => {}, checked = false }: colValue) => (
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        onClick={(e) => {
          e.stopPropagation();
          fn();
        }}
        className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
    ),
    meta: 'w-[10%] md:w-[6%]',
  },
  {
    header: '招式名稱',
    value: ({ row }: colValue) => (
      <a
        href={`https://wiki.52poke.com/zh-hant/${row.nameZh}（招式）`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-800 underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.nameZh}
      </a>
    ),
    meta: 'w-[20%] md:w-[10%]',
  },
  {
    header: '招式機',
    value: ({ row }: colValue) =>
      row.TMPid !== null ? `${row.TMPid.toString().padStart(3, '0')}` : '',
    meta: 'w-[12%] md:w-[8%]',
  },
  {
    header: '屬性',
    value: ({ row }: colValue) => <Icon.Game.Type type={row.type} className="h-6 w-full" />,
    meta: 'w-[12%] md:w-[8%]',
  },
  {
    header: '分類',
    value: ({ row }: colValue) => (
      <Icon.Game.MoveCategory type={row.category} className="h-6 w-full" />
    ),
    meta: 'w-[12%] md:w-[8%]',
  },
  {
    header: '威力',
    value: ({ row }: colValue) =>
      row.power < 1 ? Accuracy[row.power.toString() as keyof typeof Accuracy] : row.power,
    meta: 'w-[11%] md:w-[8%]',
  },
  {
    header: '命中',
    value: ({ row }: colValue) =>
      row.accuracy < 1 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-[11%] md:w-[8%]',
  },
  {
    header: 'PP',
    value: ({ row }: colValue) => row.PP,
    meta: 'w-[11%] md:w-[8%]',
  },
  {
    header: '說明',
    value: ({ row }: colValue) => <span className="whitespace-normal">{row.description}</span>,
    meta: 'hidden md:block md:w-[36%]',
  },
];

function MoveDex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedPanels, setExpandedPanels] = useState<Set<number>>(new Set());
  const [pick, setPick] = useState<Set<number>>(new Set());
  const [moveMap, setMoveMap] = useState<Record<number, FullMove>>({});
  const [onlyEvolve, setOnlyEvolve] = useState<boolean>(true);

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    page: Number(searchParams.get('page') || 1),
    TM: searchParams.get('TM') || '',
  };

  const { data: allMoves } = useMoveListInfo();

  useEffect(() => {
    document.title = `Move Pokédex`;
  }, []);

  const updateState = (key: ValueKeys<Filter, string>[keyof Filter]) => {
    return (val: string) => {
      if (val === '') {
        setSearchParams((prev) => {
          prev.delete(key);
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          if (prev.has(key) && prev.get(key) === val) {
            prev.delete(key);
          } else {
            prev.set(key, val);
          }
          prev.delete('page');
          return prev;
        });
      }
    };
  };

  const updateMoveMap = async (key: number, nameZh: string) => {
    if (moveMap[key] !== undefined) {
      return;
    }

    const moveData = await api<FullMove>(`/data/move/${nameZh}.json`);
    setMoveMap((prev) => {
      prev[key] = moveData;
      return prev;
    });
  };

  const handleClick = async (panelKey: number, nameZh: string) => {
    const updatedPanels = new Set(expandedPanels);
    if (updatedPanels.has(panelKey)) {
      updatedPanels.delete(panelKey);
    } else {
      updatedPanels.add(panelKey);

      await updateMoveMap(panelKey, nameZh);
    }

    setExpandedPanels(updatedPanels);
  };

  return (
    <div className="mb-4 flex flex-col gap-y-4">
      <Header filter={filter} updateState={updateState} />
      <Hr />
      {pick.size >= 2 && pick.size <= 4 && (
        <Intersection fullMoves={[...pick].map((pid) => moveMap[pid])} />
      )}

      <div className="-mx-4 flex flex-col gap-4 md:mx-0">
        <ul className="text-sm">
          <li
            className={clsx(
              'sticky top-0 flex bg-custom-gold/50',
              'py-1 px-2 text-gray-100 md:-top-4 md:px-0'
            )}
          >
            {columns.map((col) => (
              <span
                className={clsx('whitespace-nowrap py-1 text-center', col.meta)}
                key={col.header}
              >
                {col.header}
              </span>
            ))}
          </li>
          {allMoves
            .filter((move) => {
              let display = true;

              if (pick.has(move.pid)) {
                return display;
              }

              if (filter.keyword !== '') {
                display =
                  display &&
                  (move.nameZh.includes(filter.keyword) ||
                    move.description.includes(filter.keyword) ||
                    move.nameEn.includes(filter.keyword) ||
                    move.nameJp.includes(filter.keyword));
              }

              if (filter.type !== '') {
                display = display && filter.type === move.type;
              }

              if (filter.category !== '') {
                display = display && filter.category === move.category;
              }

              if (filter.TM === '僅招式機') {
                display = display && move.TMPid !== null;
              }

              return display;
            })
            .sort((a, b) => {
              if (filter.TM === '僅招式機') {
                return (a.TMPid || 0) - (b.TMPid || 0);
              }

              return 1;
            })
            .sort((a, b) => {
              if (pick.has(a.pid) && pick.has(b.pid)) {
                return 0;
              } else if (pick.has(a.pid)) {
                return -1;
              } else if (pick.has(b.pid)) {
                return 1;
              }
              return 0;
            })
            .map((move) => {
              const lilist = [
                <li
                  className={clsx(
                    'flex cursor-pointer border-b-[1px] py-1 px-2 md:px-0',
                    'hover:bg-gray-50',
                    'items-center',
                    pick.has(move.pid) && 'bg-gray-100'
                  )}
                  key={move.pid}
                  onClick={() => {
                    handleClick(move.pid, move.nameZh);
                  }}
                >
                  {columns.map((col) => (
                    <span
                      className={clsx(
                        'whitespace-nowrap py-1 text-center leading-6',
                        'flex justify-center',
                        col.meta
                      )}
                      key={col.header}
                    >
                      {col.value({
                        row: move,
                        checked: pick.has(move.pid),
                        fn: async () => {
                          await updateMoveMap(move.pid, move.nameZh);

                          setPick((prev) => {
                            if (prev.has(move.pid)) {
                              prev.delete(move.pid);
                            } else {
                              prev.add(move.pid);
                            }
                            return new Set([...prev]);
                          });
                        },
                      })}
                    </span>
                  ))}
                </li>,
              ];

              if (expandedPanels.has(move.pid)) {
                lilist.push(
                  <li
                    className={clsx('flex border-b-[1px] p-4', 'bg-slate-50')}
                    key={`${move.pid}-d`}
                  >
                    <MoveDetail
                      move={moveMap[move.pid as keyof typeof moveMap]}
                      onlyEvolve={onlyEvolve}
                      setOnlyEvolve={setOnlyEvolve}
                    />
                  </li>
                );
              }

              return lilist;
            })
            .flat()}
        </ul>
      </div>
    </div>
  );
}

export default MoveDex;
