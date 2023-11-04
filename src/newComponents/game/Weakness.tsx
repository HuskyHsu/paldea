import clsx from 'clsx';

import { TYPE_MAP } from '@/types/Pokemon';
import { Icon } from '@/newComponents';

import weaknessMap from '@/data/weakness_map_zh.json';

type WeaknessMap = Record<string, Record<string, number>>;

type Props = {
  types: string[];
  terasType?: string | null;
};

type RateProps = {
  targetRate: number;
} & Props;

type EffectiveProps = {
  type: string;
  targetRate: number;
  title: string;
};

export function getWeaknessType(types: string[]) {
  return TYPE_MAP.map((type) => {
    return {
      type: type,
      rate: types.reduce((rate, pmType) => {
        return rate * (weaknessMap as WeaknessMap)[type][pmType];
      }, 1),
    };
  });
}

export function getAttackRange(types: string[]) {
  return TYPE_MAP.map((type) => {
    return {
      type: type,
      rates: types
        .map((atkType) => (weaknessMap as WeaknessMap)[atkType][type])
        .filter((rate) => rate > 1),
    };
  }).filter(({ rates }) => rates.length > 0);
}

function TypeRate({ targetRate, types }: RateProps) {
  const matchType = getWeaknessType(types).filter(({ rate }) => rate === targetRate);

  if (matchType.length === 0) {
    return <></>;
  }

  return (
    <div className="space-y-2 py-2">
      <h6 className="font-bold text-gray-500">{targetRate}倍</h6>
      <div className="flex flex-wrap gap-2">
        {matchType.map(({ type }) => (
          <Icon.Game.Type type={type} className={clsx('h-8 w-8')} key={type} />
        ))}
      </div>
    </div>
  );
}

export function Weakness({ types, terasType = null }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 md:flex md:justify-around">
        {[4, 2, 0.5, 0.25, 0].map((rate) => (
          <TypeRate targetRate={rate} types={terasType != null ? [terasType] : types} key={rate} />
        ))}
      </div>
    </>
  );
}

export function MoveEffective({ title, type, targetRate }: EffectiveProps) {
  const showList = TYPE_MAP.map((targetType) => {
    return {
      type: targetType,
      rate: (weaknessMap as WeaknessMap)[type][targetType],
    };
  }).filter(({ rate }) => rate === targetRate);

  if (showList.length === 0) {
    return <></>;
  }

  return (
    <div>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="whitespace-nowrap text-lg font-bold">{title}</h6>
      <div className="flex flex-wrap gap-2">
        {TYPE_MAP.map((targetType) => {
          return {
            type: targetType,
            rate: (weaknessMap as WeaknessMap)[type][targetType],
          };
        })
          .filter(({ rate }) => rate === targetRate)
          .map(({ type }) => (
            <Icon.Game.Type type={type} className={clsx('h-6 w-6')} key={type} />
          ))}
      </div>
    </div>
  );
}

export function AttackRange({ types }: Props) {
  return (
    <div className="flex flex-wrap gap-x-2">
      {getAttackRange(types).map(({ type }) => (
        <Icon.Game.Type type={type} className={clsx('h-6 w-6')} key={type} />
      ))}
    </div>
  );
}
