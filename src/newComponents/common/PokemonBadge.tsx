import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { SubPokemon, BgFromType, BgToType } from '@/types/Pokemon';

type Props = {
  pm: SubPokemon;
  size?: string;
  text?: string;
};

export function PokemonBadge({ pm, size = 'text-xs', text }: Props) {
  return (
    <Link
      className={clsx(
        'whitespace-nowrap rounded text-center align-middle font-semibold text-white',
        size,
        'px-2.5 py-0.5',
        'bg-gradient-to-r',
        BgFromType[pm.types[0] as keyof typeof BgFromType],
        BgToType[pm.types[pm.types.length - 1] as keyof typeof BgToType]
      )}
      to={`/pokedex/${pm.link}`}
    >
      {pm.nameZh}
      {text}
    </Link>
  );
}
