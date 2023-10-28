import { useState } from 'react';
import clsx from 'clsx';

import { Accuracy, FullPokemon, LevelMap, PMMove } from '@/types/Pokemon';
import { Icon } from '@/newComponents';

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
    value: (row: PMMove) =>
      'level' in row
        ? row.level < 1
          ? LevelMap[row.level.toString() as keyof typeof LevelMap]
          : `Lv${row.level.toString().padStart(2, '0')}`
        : `TM${row.TMPid.toString().padStart(3, '0')}`,
    meta: 'w-2/12',
  },
  {
    header: '招式名稱',
    value: (row: PMMove) => (
      <a
        href={`https://wiki.52poke.com/zh-hant/${row.nameZh}（招式）`}
        target="_blank"
        rel="noreferrer"
        className="whitespace-nowrap font-bold text-blue-800 underline"
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

export function Moves({ pm }: Props) {
  const allMoves: PMMove[] = (pm.moves.levelingUps as PMMove[])
    .concat(pm.moves.eggMoves as PMMove[])
    .concat(pm.moves.TMs as PMMove[]);

  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());

  const handleClick = (panelKey: string) => {
    const updatedPanels = new Set(expandedPanels);
    if (updatedPanels.has(panelKey)) {
      updatedPanels.delete(panelKey);
    } else {
      updatedPanels.add(panelKey);
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
                  handleClick(key);
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
                <li className={clsx('flex border-b-[1px] p-4')} key={`${key}-d`}>
                  {move.description}
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
