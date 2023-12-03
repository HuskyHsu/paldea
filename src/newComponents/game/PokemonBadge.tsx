import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { SubPokemon, BgFromType, BgToType } from '@/types/Pokemon';
import { Icon } from '..';

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
      to={`/pokedex/${pm.nameZh}${pm.altForm ? '-' + pm.altForm : ''}`}
    >
      {pm.nameZh}
      {pm.altForm && `-${pm.altForm}`}
      {text && `: ${text}`}
    </Link>
  );
}

type SubCardProps = { pm: SubPokemon; className?: string };

export function SubCard({ pm, className = '' }: SubCardProps) {
  return (
    <div className={clsx(className, 'h-24 w-24 md:h-28 md:w-28', 'relative -mt-6')}>
      <span
        className={clsx(
          'absolute',
          'rounded-full',
          'inset-x-0 h-5 md:h-7',
          'bg-gradient-to-r',
          'top-2/3 -translate-y-2/3',
          BgFromType[pm.types[0] as keyof typeof BgFromType],
          BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
        )}
      />
      <span className={clsx('absolute', 'inset-x-0', 'top-1/3 -translate-y-1/2')}>
        <Icon.Game.PmIcon pm={pm} />
      </span>
      <span
        className={clsx(
          'absolute',
          'inset-x-0',
          '-bottom-1',
          'whitespace-nowrap text-center text-xs md:text-base'
        )}
      >
        {pm.nameZh}
        {pm.altForm ? <span className="text-xs">({pm.altForm})</span> : ''}
      </span>
      <Link
        className={'stretchedLink'}
        to={`/pokedex/${pm.nameZh}${pm.altForm ? '-' + pm.altForm : ''}`}
      />
    </div>
  );
}
