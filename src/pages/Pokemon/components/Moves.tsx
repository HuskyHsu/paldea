import { useState } from 'react';
import clsx from 'clsx';

import { Accuracy, FullMove, FullPokemon, LevelMap, PMMove } from '@/types/Pokemon';
import { Buttons, SubTitleSlide } from '@/newComponents/common';
import { PokemonBadge } from '@/newComponents/game';
import { Icon } from '@/newComponents';
import { ValueKeys, api } from '@/utils';

type Props = {
  pm: FullPokemon;
};

type Filter = {
  types: Set<string>;
  category: Set<string>;
};

type colValue = {
  row: PMMove;
  fn?: () => void;
  checked?: boolean;
};

const columns = [
  {
    header: '挑選',
    value: ({ row, fn = () => {}, checked = false }: colValue) => (
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
    meta: 'w-[12.5%]',
  },
  {
    header: '來源',
    value: ({ row }: colValue) => {
      if ('TMPid' in row) {
        if ('pm' in row) {
          return `${row.pm.nameZh}${
            row.pm.altForm ? '(' + row.pm.altForm + ')' : ''
          }: TM${row.TMPid.toString().padStart(3, '0')}`;
        }
        return `TM${row.TMPid.toString().padStart(3, '0')}`;
      }

      if ('level' in row && !('pm' in row)) {
        return row.level < 1
          ? LevelMap[row.level.toString() as keyof typeof LevelMap]
          : `Lv${row.level.toString().padStart(2, '0')}`;
      }

      const level =
        row.level < 1
          ? LevelMap[row.level.toString() as keyof typeof LevelMap]
          : `Lv${row.level.toString().padStart(2, '0')}`;

      return `${row.pm.nameZh}${row.pm.altForm ? '(' + row.pm.altForm + ')' : ''}: ${level}`;
    },
    meta: 'w-[13.5%]',
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
    meta: 'w-[17%]',
  },
  {
    header: '屬性',
    value: ({ row }: colValue) => <Icon.Game.Type type={row.type} className="h-6 w-full" />,
    meta: 'w-[12%]',
  },
  {
    header: '分類',
    value: ({ row }: colValue) => (
      <Icon.Game.MoveCategory type={row.category} className="h-6 w-full" />
    ),
    meta: 'w-[12%]',
  },
  {
    header: '威力',
    value: ({ row }: colValue) =>
      row.power < 1 ? Accuracy[row.power.toString() as keyof typeof Accuracy] : row.power,
    meta: 'w-[11%]',
  },
  {
    header: '命中',
    value: ({ row }: colValue) =>
      row.accuracy < 1 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-[11%]',
  },
  {
    header: 'PP',
    value: ({ row }: colValue) => row.PP,
    meta: 'w-[11%]',
  },
];

function MoveDetail({
  move,
  onlyEvolve,
  setOnlyEvolve,
}: {
  move: FullMove;
  onlyEvolve: boolean;
  setOnlyEvolve: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex w-full flex-col text-gray-500">
      <h6 className="flex justify-between py-2 text-lg font-bold">
        <span>說明</span>
        <div className="flex items-center">
          <input
            id={'showChild'}
            type="checkbox"
            checked={onlyEvolve}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800 focus:ring-1 focus:ring-blue-800"
            onChange={(e) => setOnlyEvolve(e.target.checked)}
          />
          <label htmlFor={'showChild'} className="ml-2 text-sm">
            僅顯示進化型
          </label>
        </div>
      </h6>
      <p>{move.description}</p>
      {move.levelingUps.length > 0 && (
        <>
          <hr className="my-3 h-px border-0 bg-gray-200" />
          <h6 className="py-2 text-lg font-bold">升等 / 進化 / 回憶招式</h6>
          <div className="flex flex-wrap gap-2">
            {move.levelingUps
              .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
              .map((pm) => {
                let text = `Lv${pm.level}`;
                if (pm.level < 1) {
                  text = LevelMap[pm.level];
                }

                return <PokemonBadge pm={pm} key={pm.link} text={text} />;
              })}
          </div>
        </>
      )}
      {move.egg.length > 0 && (
        <>
          <hr className="my-3 h-px border-0 bg-gray-200" />
          <h6 className="py-2 text-lg font-bold">遺傳招式(模仿香草)</h6>
          <div className="flex flex-wrap gap-2">
            {move.egg
              .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
              .map((pm) => {
                return <PokemonBadge pm={pm} key={pm.link} />;
              })}
          </div>
        </>
      )}
      {move.TM && (
        <>
          <hr className="my-3 h-px border-0 bg-gray-200" />
          <h6 className="py-2 text-lg font-bold">招式機</h6>
          <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1 pb-2">
            <li>編號：#{move.TM.pid.toString().padStart(3, '0')}</li>
            <li>聯盟點數：{move.TM.leaguePoint}</li>
            <li>材料：{move.TM.materials.map((pm) => `${pm.part}x${pm.count}`).join('; ')}</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            {move.TM?.pm
              .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
              .map((pm) => {
                return <PokemonBadge pm={pm} key={pm.link} />;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export function Moves({ pm }: Props) {
  const allMoves: PMMove[] = (pm.moves.levelingUps as PMMove[])
    .concat(pm.moves.beforeEvolve as PMMove[])
    .concat(pm.moves.eggMoves as PMMove[])
    .concat(pm.moves.TMs as PMMove[])
    .concat(pm.moves.beforeEvolveTMs as PMMove[]);

  const allMoveType = [...new Set(allMoves.map((move) => move.type))];

  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());
  const [pick, setPick] = useState<Set<string>>(new Set());
  const [moveMap, setMoveMap] = useState<Record<string, FullMove>>({});
  const [onlyEvolve, setOnlyEvolve] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({ types: new Set(), category: new Set() });

  const handleClick = async (panelKey: string, nameZh: string) => {
    const updatedPanels = new Set(expandedPanels);
    if (updatedPanels.has(panelKey)) {
      updatedPanels.delete(panelKey);
    } else {
      updatedPanels.add(panelKey);

      if (moveMap[nameZh] === undefined) {
        const moveData = await api<FullMove>(`/data/move/${nameZh}.json`);
        setMoveMap((prev) => {
          prev[nameZh] = moveData;
          return prev;
        });
      }
    }

    setExpandedPanels(updatedPanels);
  };

  const updateSetState = (key: ValueKeys<Filter, Set<string>>[keyof Filter]) => {
    return (val: string) => {
      setFilter((prev) => {
        if (prev[key].has(val)) {
          prev[key].delete(val);
        } else {
          prev[key].add(val);
        }

        return {
          ...prev,
          [key]: prev[key],
        };
      });
    };
  };

  const typeUpdate = updateSetState('types');

  return (
    <div className="-mx-4 flex flex-col gap-4 md:mx-0">
      <div className="mx-4 flex flex-col md:mx-0">
        <SubTitleSlide title="屬性" />
        <div className="flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2">
          {allMoveType.map((type) => (
            <button onClick={() => typeUpdate(type)} key={type}>
              <Icon.Game.Type
                type={type}
                className={clsx(
                  'h-8 w-8',
                  filter.types.size > 0 && !filter.types.has(type) && 'opacity-30'
                )}
              />
            </button>
          ))}
        </div>
        <SubTitleSlide title="分類" />
        <Buttons
          list={[
            { name: '物理', val: '物理' },
            { name: '特殊', val: '特殊' },
            { name: '變化', val: '變化' },
          ]}
          currVal={filter.category.size === 1 ? [...filter.category][0] : ''}
          updateState={(val) => {
            setFilter((prev) => {
              if (prev.category.size === 0) {
                prev.category.add(val);
              } else {
                if (prev.category.has(val)) {
                  prev.category.delete(val);
                } else {
                  prev.category.clear();
                  prev.category.add(val);
                }
              }
              return {
                ...prev,
                category: prev.category,
              };
            });
          }}
        />
      </div>
      <ul className="text-sm">
        <li
          className={clsx(
            'sticky top-0 flex bg-custom-gold/50',
            'py-1 px-2 text-gray-100 md:-top-4 md:px-0'
          )}
        >
          {columns.map((col) => (
            <span className={clsx('whitespace-nowrap py-1 text-center', col.meta)} key={col.header}>
              {col.header}
            </span>
          ))}
        </li>

        {allMoves
          .filter((move) => {
            let display = true;

            if (filter.types.size > 0) {
              display = display && filter.types.has(move.type);
            }

            if (filter.category.size > 0) {
              display = display && filter.category.has(move.category);
            }

            return display;
          })
          .map((move) => {
            let key = `${move.pid}`;
            if ('level' in move) {
              key += `:${move.level}`;
            }
            if ('pm' in move) {
              key += `:${move.pm.link}`;
            }
            if ('TMPid' in move) {
              key += `:${move.TMPid}`;
            }

            return {
              move,
              key,
            };
          })
          .sort((a, b) => {
            if (pick.has(a.key) && pick.has(b.key)) {
              return 0;
            } else if (pick.has(a.key)) {
              return -1;
            } else if (pick.has(b.key)) {
              return 1;
            }
            return 0;
          })
          .map(({ move, key }) => {
            const lilist = [
              <li
                className="flex cursor-pointer border-b-[1px] py-1 px-2 md:px-0"
                key={key}
                onClick={() => {
                  handleClick(key, move.nameZh);
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
                      checked: pick.has(key),
                      fn: () => {
                        setPick((prev) => {
                          if (prev.has(key)) {
                            prev.delete(key);
                          } else {
                            prev.add(key);
                          }
                          return new Set([...prev]);
                        });
                      },
                    })}
                  </span>
                ))}
              </li>,
            ];

            if (expandedPanels.has(key)) {
              lilist.push(
                <li className={clsx('flex border-b-[1px] p-4', 'bg-slate-50')} key={`${key}-d`}>
                  <MoveDetail
                    move={moveMap[move.nameZh as keyof typeof moveMap]}
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
  );
}
