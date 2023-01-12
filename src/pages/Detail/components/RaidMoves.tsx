import clsx from 'clsx';
import { BaseMove, BgClass, BgFromClass, BgToClass } from '@/models';

type Porps = { raidMoves: BaseMove[] };

export function RaidMoves({ raidMoves }: Porps) {
  return (
    <div className="-mb-2 text-sm text-gray-500">
      <p>預設勾選六星太晶團體戰使用招式</p>
      {raidMoves.length > 4 && (
        <p>
          {raidMoves.slice(4).map((move) => (
            <span
              className={clsx(
                'mr-2 whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-semibold text-white',
                'bg-gradient-to-r',
                BgFromClass[move.type as keyof typeof BgClass],
                BgToClass[move.type as keyof typeof BgClass]
              )}
              key={move.nameZh}
            >
              {move.nameZh}
            </span>
          ))}
          為開盾後額外使用
        </p>
      )}
    </div>
  );
}
