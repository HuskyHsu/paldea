import clsx from 'clsx';
import { RaidMove, BgClass, BgFromClass, BgToClass } from '@/models';

type Porps = { raidMoves: RaidMove[] };

export function RaidMoves({ raidMoves }: Porps) {
  return (
    <div className="text-sm text-gray-500">
      {raidMoves
        .filter(({ level }) => level >= 6)
        .map(({ addMoves, level }) => (
          <div key={level}>
            <p>預設勾選{level}星太晶怪配招</p>
            {addMoves.length > 0 && (
              <p>
                {addMoves.map((move) => (
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
                為團體戰額外使用招式，捕捉後未習得
              </p>
            )}
          </div>
        ))}
    </div>
  );
}
