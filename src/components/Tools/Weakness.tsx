import clsx from 'clsx';

import { TYPE_MAP } from '@/models';
import { Icon } from '@/components';

import weaknessMap from '@/data/weakness_map.json';

type WeaknessMap = Record<string, Record<string, number>>;

type Props = {
  types: string[];
};

type RateProps = {
  targetRate: number;
} & Props;

function TypeRate({ targetRate, types }: RateProps) {
  const matchType = TYPE_MAP.map((type) => {
    return {
      type: type,
      rate: types.reduce((rate, pmType) => {
        return rate * (weaknessMap as WeaknessMap)[type][pmType];
      }, 1),
    };
  }).filter(({ rate }) => rate === targetRate);

  if (matchType.length === 0) {
    return <></>;
  }

  return (
    <div className="space-y-2 py-2">
      <h6 className="font-bold text-gray-100">{targetRate}倍</h6>
      <div className="flex flex-wrap gap-2">
        {matchType.map(({ type }) => (
          <Icon.Type type={type} className={clsx('h-8 w-8')} key={type} />
        ))}
      </div>
    </div>
  );
}

export function Weakness({ types }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 md:flex md:justify-around">
        {[4, 2, 0.5, 0.25, 0].map((rate) => (
          <TypeRate targetRate={rate} types={types} key={rate} />
        ))}
      </div>
    </>
  );
}
