import { useState } from 'react';
import clsx from 'clsx';

import { SubTitleSlide } from '@/newComponents/common';
import { Weakness } from '@/newComponents/game';
import { Icon } from '@/newComponents';
import { FullPokemon, TYPE_MAP } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

export function TypeWeakness({ pm }: Props) {
  const [terasType, setTerasType] = useState<string | null>(null);

  return (
    <>
      <SubTitleSlide title="原始屬性" />
      <div className="flex gap-4">
        {pm.types.map((type) => (
          <Icon.Game.Type type={type} className={clsx('h-8 w-8')} key={type} />
        ))}
      </div>
      <SubTitleSlide title="太晶屬性" />
      <div className="flex flex-wrap gap-4">
        {TYPE_MAP.map((type) => (
          <button
            onClick={() => {
              setTerasType((prev) => {
                if (prev === type) {
                  return null;
                }
                return type;
              });
            }}
            key={type}
          >
            <Icon.Game.Type
              type={type}
              className={clsx('h-8 w-8', type === terasType ? '' : 'opacity-30')}
            />
          </button>
        ))}
      </div>
      <SubTitleSlide title="防守時弱點" />
      {<Weakness types={pm.types} terasType={terasType} />}
    </>
  );
}
