import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { BgFromType, BgToType, FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

export function Header({ pm }: Props) {
  return (
    <header>
      <div className="relative flex justify-center">
        <div className="z-10 w-32">
          <Icon.Game.PmIcon pm={pm} />
        </div>

        {/* bg banner */}
        <div
          className={clsx(
            'absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0',
            'md:rounded-2xl',
            'bg-gradient-to-b',
            BgFromType[pm.types[0] as keyof typeof BgFromType],
            BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
          )}
        />
      </div>
    </header>
  );
}
