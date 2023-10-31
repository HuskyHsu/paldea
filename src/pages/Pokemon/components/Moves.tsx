import { useState } from 'react';
import clsx from 'clsx';

import { Accuracy, FullMove, FullPokemon, LevelMap, PMMove } from '@/types/Pokemon';
import { Icon, PokemonBadge } from '@/newComponents';
import { api } from '@/utils';

type Props = {
  pm: FullPokemon;
};

const columns = [
  //   {
  //     header: '挑選',
  //     value: (row: PMMove) => (
  //       <input
  //         type="checkbox"
  //         checked={false}
  //         onChange={(e) => {}}
  //         className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
  //       />
  //     ),
  //     meta: 'w-1/12',
  //   },
  {
    header: '來源',
    value: (row: PMMove) => {
      if ('TMPid' in row) {
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

      return `${row.pm.nameZh}${row.pm.altForm ? '(' + row.pm.altForm + ')' : ''}-${level}`;
    },
    meta: 'w-2/12',
  },
  {
    header: '招式名稱',
    value: (row: PMMove) => (
      <a
        href={`https://wiki.52poke.com/zh-hant/${row.nameZh}（招式）`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-800 underline"
      >
        {row.nameZh}
      </a>
    ),
    meta: 'w-2/12',
  },
  {
    header: '屬性',
    value: (row: PMMove) => <Icon.Game.Type type={row.type} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '分類',
    value: (row: PMMove) => <Icon.Game.MoveCategory type={row.category} className="h-6 w-full" />,
    meta: 'w-1/12',
  },
  {
    header: '威力',
    value: (row: PMMove) =>
      row.power < 1 ? Accuracy[row.power.toString() as keyof typeof Accuracy] : row.power,
    meta: 'w-2/12',
  },
  {
    header: '命中',
    value: (row: PMMove) =>
      row.accuracy < 1 ? Accuracy[row.accuracy.toString() as keyof typeof Accuracy] : row.accuracy,
    meta: 'w-2/12',
  },
  {
    header: 'PP',
    value: (row: PMMove) => row.PP,
    meta: 'w-1/12',
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
    .concat(pm.moves.TMs as PMMove[]);

  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());
  const [moveMap, setMoveMap] = useState<Record<string, FullMove>>({});
  const [onlyEvolve, setOnlyEvolve] = useState<boolean>(true);

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

  return (
    <div className="-mx-4 md:mx-0">
      <ul className="text-sm">
        <li className={clsx('sticky top-0 flex bg-custom-gold/50', 'py-1 text-gray-100 md:-top-4')}>
          {columns.map((col) => (
            <span
              className={clsx('whitespace-nowrap py-1 px-2 text-center', col.meta)}
              key={col.header}
            >
              {col.header}
            </span>
          ))}
        </li>
        {allMoves
          .map((move) => {
            const key = `${move.pid}-${'level' in move ? move.level : move.TMPid}`;
            const lilist = [
              <li
                className="flex cursor-pointer border-b-[1px] py-1"
                key={key}
                onClick={() => {
                  handleClick(key, move.nameZh);
                }}
              >
                {columns.map((col) => (
                  <span
                    className={clsx(
                      'whitespace-nowrap py-1 px-2 text-center leading-6',
                      'flex justify-center',
                      col.meta
                    )}
                    key={col.header}
                  >
                    {col.value(move)}
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
