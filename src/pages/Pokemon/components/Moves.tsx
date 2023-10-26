import { Icon } from '@/newComponents';
import { FullPokemon, PMMove } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

const columns = [
  {
    header: '來源',
    value: (row: PMMove) => row.level,
    meta: 'w-2/12',
  },
  {
    header: '招式名稱',
    value: (row: PMMove) => <span className="whitespace-nowrap">{row.nameZh}</span>,
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
    value: (row: PMMove) => row.power,
    meta: 'w-2/12',
  },
  {
    header: '命中',
    value: (row: PMMove) => row.accuracy,
    meta: 'w-2/12',
  },
  {
    header: 'PP',
    value: (row: PMMove) => row.PP,
    meta: 'w-1/12',
  },
];

export function Moves({ pm }: Props) {
  return (
    <div>
      <ul>
        {pm.moves.levelingUps.map((move) => {
          return (
            <li className="flex" key={move.pid}>
              {columns.map((col) => (
                <span className={col.meta} key={col.header}>
                  {col.value(move)}
                </span>
              ))}
            </li>
          );
        })}
        {pm.moves.eggMoves.map((move) => {
          return (
            <li className="flex" key={move.pid}>
              {columns.map((col) => (
                <span className={col.meta} key={col.header}>
                  {col.value(move)}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
