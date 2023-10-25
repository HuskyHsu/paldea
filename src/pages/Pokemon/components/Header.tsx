import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { BgFromType, BgToType, FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

export function Header({ pm }: Props) {
  return (
    <header className="h-40">
      <div className="relative flex h-full justify-center">
        <div className="z-10 w-32">
          <Icon.Game.PmIcon pm={pm} />
        </div>

        {/* bg banner */}
        <div
          className={clsx(
            'absolute -inset-x-4 bottom-0 z-0 h-full',
            'md:inset-x-0 md:-mx-4 md:rounded-t-xl',
            'bg-gradient-to-b',
            BgFromType[pm.types[0] as keyof typeof BgFromType],
            BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
          )}
        />
      </div>
    </header>
  );
}
