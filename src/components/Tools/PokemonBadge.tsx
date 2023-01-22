import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BasePokemon, BgClass, BgFromClass, BgToClass } from '@/models';

type Props = { pm: BasePokemon; getText?: Function; size?: string; direction?: 'h' | 'v' };

export function PokemonBadge({ pm, getText, size = 'text-xs', direction = 'h' }: Props) {
  return (
    <Link
      className={clsx(
        'whitespace-nowrap rounded font-semibold text-white',
        size,
        direction === 'h' ? 'px-2.5 py-0.5' : 'px-0.5 py-0.5',
        'bg-gradient-to-r',
        BgFromClass[pm.types[0] as keyof typeof BgClass],
        BgToClass[pm.types[pm.types.length - 1] as keyof typeof BgClass]
      )}
      to={`/${pm.link}`}
    >
      {pm.nameZh}
      {pm.altForm && `-${pm.altForm}`}
      {getText && `: ${getText(pm)}`}
    </Link>
  );
}
