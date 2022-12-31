import clsx from 'clsx';
import { BasePokemon, BgClass, BgFromClass, BgToClass } from '@/models';

export function PokemonBadge({ pm, getText }: { pm: BasePokemon; getText: Function }) {
  return (
    <span
      className={clsx(
        'mr-2 whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-semibold text-white',
        'bg-gradient-to-r',
        BgFromClass[pm.types[0] as keyof typeof BgClass],
        BgToClass[pm.types[pm.types.length - 1] as keyof typeof BgClass]
      )}
    >
      {getText(pm)}
    </span>
  );
}
