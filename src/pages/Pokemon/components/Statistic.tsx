import { useState } from 'react';
import clsx from 'clsx';

import { RadarChart } from './RadarChart';
import { FillType, FullPokemon, BasePoint } from '@/types/Pokemon';
import { SubTitleSlide } from '@/newComponents/common';

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

function updateBase(prev: BasePoint, key: string, value: number): BasePoint {
  if (Number.isNaN(value)) {
    value = 0;
  }

  if (value < 0) {
    value = 0;
  }

  if (value > 252) {
    value = 252;
  }

  const preTotal = prev.Hp + prev.Atk + prev.Def + prev.SpA + prev.SpD + prev.Spe;

  if (preTotal - prev[key as keyof typeof prev] + value > 510) {
    value = 510 - preTotal + prev[key as keyof typeof prev];
  }

  const newBase = {
    ...prev,
    [key as keyof typeof prev]: value,
  };

  return {
    ...newBase,
    Total: newBase.Hp + newBase.Atk + newBase.Def + newBase.SpA + newBase.SpD + newBase.Spe,
  };
}

function updateIndividual(prev: BasePoint, key: string, value: number): BasePoint {
  if (Number.isNaN(value)) {
    value = 0;
  }

  if (value < 0) {
    value = 0;
  }

  if (value > 31) {
    value = 31;
  }

  const newBase = {
    ...prev,
    [key as keyof typeof prev]: value,
  };

  return newBase;
}

function updateNature(prev: BasePoint, key: string, value: number): BasePoint {
  for (let curKey in prev) {
    if (curKey === key) {
      prev[curKey as keyof typeof prev] = prev[curKey as keyof typeof prev] === value ? 0 : value;
    } else {
      if (value > 0 && prev[curKey as keyof typeof prev] > 0) {
        prev[curKey as keyof typeof prev] = 0;
      } else if (value < 0 && prev[curKey as keyof typeof prev] < 0) {
        prev[curKey as keyof typeof prev] = 0;
      }
    }
  }

  return { ...prev };
}

export function Statistic({ pokemon }: Props) {
  const [lv, setLv] = useState(100);
  const [customBase, setCustomBase] = useState<BasePoint>({
    Hp: 0,
    Atk: 0,
    Def: 0,
    SpA: 0,
    SpD: 0,
    Spe: 0,
    Total: 0,
  });

  const [customIndividual, setcustomIndividual] = useState<BasePoint>({
    Hp: 31,
    Atk: 31,
    Def: 31,
    SpA: 31,
    SpD: 31,
    Spe: 31,
    Total: 0,
  });

  const [nature, setNature] = useState<BasePoint>({
    Hp: 0,
    Atk: 0,
    Def: 0,
    SpA: 0,
    SpD: 0,
    Spe: 0,
    Total: 0,
  });

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
      <div className="grid grid-cols-12 gap-3 text-gray-600">
        <div className="col-span-full flex-col justify-center md:col-span-5 md:flex md:justify-start">
          <SubTitleSlide title="個體值" />
          <div className="mx-auto w-10/12 md:w-full">
            <RadarChart
              stats={pokemon.baseStats}
              EVs={pokemon.EVs}
              color={FillType[pokemon.types[0] as keyof typeof FillType]}
            />
          </div>
        </div>
        <div className="col-span-12 space-y-3 md:col-span-7">
          <SubTitleSlide title="能力值" />
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
              <tr className={clsx('border-b text-center', 'bg-custom-gold/30')}>
                <td className="py-1">自訂</td>
                {['Hp', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'].map((key, i) => {
                  return (
                    <td className="py-1" key={key}>
                      {calStatistic(
                        pokemon.baseStats[i],
                        customIndividual[key as keyof typeof customIndividual],
                        customBase[key as keyof typeof customBase],
                        lv,
                        i === 0,
                        nature[key as keyof typeof nature] === 0
                          ? undefined
                          : nature[key as keyof typeof nature] > 0
                          ? 'up'
                          : 'down'
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div>
            <label className="block font-medium">自訂分配</label>
            <table className="w-full table-fixed text-center text-sm">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr className="bg-custom-gold/50 text-gray-100">
                  <th scope="col" className="whitespace-nowrap py-1">
                    {}
                  </th>
                  {['Hp', '攻擊', '防禦', '特攻', '特防', '速度'].map((type) => (
                    <th scope="col" className="whitespace-nowrap py-1" key={type}>
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={clsx('border-b text-center')}>
                  <td className="">個體值</td>
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td>
                    {
                      ['Hp', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'].filter((key) => {
                        return customIndividual[key as keyof typeof customIndividual] === 31;
                      }).length
                    }
                    v
                  </td>
                  {['Hp', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'].map((key) => {
                    return (
                      <td key={key}>
                        <input
                          className={clsx(
                            'block w-full rounded border border-gray-300',
                            'bg-gray-50 px-2.5 py-0.5 text-sm text-gray-900',
                            'text-center'
                          )}
                          value={customIndividual[key as keyof typeof customIndividual] ?? ''}
                          onChange={(e) => {
                            setcustomIndividual((prev) => {
                              return updateIndividual(prev, key, Number(e.target.value));
                            });
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td className="">努力值</td>
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td>{customBase.Total}</td>
                  {['Hp', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'].map((key) => {
                    return (
                      <td key={key}>
                        <input
                          className={clsx(
                            'block w-full rounded border border-gray-300',
                            'bg-gray-50 px-2.5 py-0.5 text-sm text-gray-900',
                            'text-center'
                          )}
                          value={customBase[key as keyof typeof customBase] ?? ''}
                          onChange={(e) => {
                            setCustomBase((prev) => {
                              return updateBase(prev, key, Number(e.target.value));
                            });
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td className="">性格⇧</td>
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td />
                  <td />
                  {['Atk', 'Def', 'SpA', 'SpD', 'Spe'].map((key) => {
                    const value = nature[key as keyof typeof nature] > 0 ? '+' : '';
                    return (
                      <td key={key}>
                        <input
                          type="checkbox"
                          className={clsx(
                            'block w-full rounded border border-gray-300',
                            'bg-gray-50 py-3 focus:ring-0',
                            'text-custom-gold/80',
                            'text-center text-sm'
                          )}
                          checked={value === '+'}
                          onChange={(e) => {
                            setNature((prev) => {
                              return updateNature(prev, key, 1);
                            });
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td className="">性格⇩</td>
                </tr>
                <tr className={clsx('border-b text-center')}>
                  <td />
                  <td />
                  {['Atk', 'Def', 'SpA', 'SpD', 'Spe'].map((key) => {
                    const value = nature[key as keyof typeof nature] < 0 ? '-' : '';
                    return (
                      <td key={key}>
                        <input
                          type="checkbox"
                          className={clsx(
                            'block w-full rounded border border-gray-300',
                            'bg-gray-50 py-3 focus:ring-0',
                            'text-custom-gold/80',
                            'text-center text-sm'
                          )}
                          checked={value === '-'}
                          onChange={(e) => {
                            setNature((prev) => {
                              return updateNature(prev, key, -1);
                            });
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
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
