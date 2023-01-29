import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BasePokemon, BgClass, BgFromClass, BgToClass } from '@/models';

type Props = { pm: BasePokemon; getText?: Function; size?: string; hiddenName?: boolean };

export function PokemonBadge({ pm, getText, size = 'text-xs', hiddenName = false }: Props) {
  return (
    <Link
      className={clsx(
        'whitespace-nowrap rounded text-center align-middle font-semibold text-white',
        size,
        'px-2.5 py-0.5',
        'bg-gradient-to-r',
        BgFromClass[pm.types[0] as keyof typeof BgClass],
        BgToClass[pm.types[pm.types.length - 1] as keyof typeof BgClass]
      )}
      to={`/pm/${pm.link}`}
    >
      {!hiddenName && pm.nameZh}
      {!hiddenName && pm.altForm && '-'}
      {pm.altForm && pm.altForm}
      {hiddenName && pm.altForm === null && '一般'}
      {getText && `: ${getText(pm)}`}
    </Link>
  );
}
