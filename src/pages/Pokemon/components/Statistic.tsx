import { useState } from 'react';
import clsx from 'clsx';

import { RadarChart } from './RadarChart';
import { FillType, FullPokemon } from '@/types/Pokemon';
import { TitleSlide } from '@/newComponents';

type Props = {
  pokemon: FullPokemon;
};

function calStatistic(
  species: number,
  individual: number,
  base: number,
  lv: number,
  isHp = false,
  nature?: string
) {
  if (isHp) {
    return Math.floor((Math.floor(species * 2 + individual + base / 4) * lv) / 100 + 10 + lv);
  }
  const value = (Math.floor(species * 2 + individual + base / 4) * lv) / 100 + 5;
  if (nature === undefined) {
    return Math.floor(value);
  }
  return nature === 'up' ? Math.floor(value * 1.1) : Math.floor(value * 0.9);
}

export function Statistic({ pokemon }: Props) {
  const [lv, setLv] = useState(75);
  const [targetSpe, setTargetSpe] = useState(
    calStatistic(pokemon.baseStats[5], 31, 0, lv, false, undefined)
  );

  const speEv = Array(253)
    .fill(0)
    .map((_, i) => i)
    .map((ev) => {
      return calStatistic(pokemon.baseStats[5], 31, ev, lv, false, undefined);
    })
    .findIndex((val) => val > targetSpe);

  const cases = [
    { name: '最高', individual: 31, base: 252, nature: 'up' },
    { name: '標準', individual: 31, base: 252, nature: undefined },
    { name: '上升', individual: 31, base: 0, nature: 'up' },
    { name: '初始', individual: 31, base: 0, nature: undefined },
    { name: '下降', individual: 31, base: 0, nature: 'down' },
    { name: '最低', individual: 0, base: 0, nature: 'down' },
  ];

  return (
    <>
      <TitleSlide title="能力值" />
      <div className="grid grid-cols-12 gap-3 text-gray-600">
        <div className="col-span-full flex justify-center md:col-span-5">
          <div className="w-10/12 md:w-full">
            <RadarChart
              stats={pokemon.baseStats}
              EVs={pokemon.EVs}
              color={FillType[pokemon.types[0] as keyof typeof FillType]}
            />
          </div>
        </div>
        <div className="col-span-12 space-y-3 md:col-span-7">
          <label className="block font-medium">Lv： {lv}</label>
          <input
            type="range"
            value={lv}
            min="1"
            max="100"
            step="1"
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            onChange={(e) => setLv(parseInt(e.target.value))}
          />
          <table className="w-full table-fixed text-center text-sm">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr className="bg-custom-gold/50 text-gray-100">
                <th scope="col" className="whitespace-nowrap py-1">
                  情境
                </th>
                {['Hp', '攻擊', '防禦', '特攻', '特防', '速度'].map((type) => (
                  <th scope="col" className="whitespace-nowrap py-1" key={type}>
                    {type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr
                  className={clsx(
                    'border-b text-center',
                    c.name === '初始' ? 'bg-gray-200' : 'hover:bg-gray-100 hover:text-gray-900'
                  )}
                  key={c.name}
                >
                  <td className="py-1">{c.name}</td>
                  {pokemon.baseStats.map((stat, i) => (
                    <td className="py-1" key={i}>
                      {calStatistic(stat, c.individual, c.base, lv, i === 0, c.nature)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <input
            type="range"
            value={targetSpe}
            min={calStatistic(pokemon.baseStats[5], 31, 0, lv, false, undefined) - 1}
            max={calStatistic(pokemon.baseStats[5], 31, 252, lv, false, undefined) - 1}
            step="1"
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            onChange={(e) => setTargetSpe(parseInt(e.target.value))}
          />
          <p>
            若對手的速度{targetSpe} ，需要{speEv}點速度努力值才能先攻
            <span className="block text-sm">(同等級下，我方個體值滿，且無性格影響下)</span>
          </p>
        </div>
        <ul className="col-span-12 text-center text-sm text-gray-500 md:text-start">
          <li className="px-2">最高：個體值最大、努力值滿、性格⇧</li>
          <li className="px-2">標準：個體值最大、努力值滿、性格－</li>
          <li className="px-2">上升：個體值最大、無努力值、性格⇧</li>
          <li>
            <span className="bg-gray-200 px-2 text-gray-600">
              初始：個體值最大、無努力值、性格－
            </span>
          </li>
          <li className="px-2">下降：個體值最大、無努力值、性格⇩</li>
          <li className="px-2">最低：個體值最低、無努力值、性格⇩</li>
        </ul>
      </div>
    </>
  );
}
