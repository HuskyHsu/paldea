import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { EVIndex, EVName, Pokemon } from '@/types/Pokemon';

import { Display, Filter } from '../Pokedex';

type Props = {
  pokemon: Pokemon;
  filter: Filter;
  display: Display;
};

const Abilities = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      {pokemon.abilities.map((ability) => (
        <span
          key={ability}
          className="rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800"
        >
          {ability}
        </span>
      ))}
      {pokemon.hiddenAbility && (
        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          {[pokemon.hiddenAbility]}
        </span>
      )}
    </>
  );
};

const EVs = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => ({
          key: EVName[EVIndex[String(i) as keyof typeof EVIndex] as unknown as keyof typeof EVName],
          val: pokemon.EVs[i],
        }))
        .filter((item) => item.val > 0)
        .map((item) => `${item.key}: ${item.val}`)
        .map((t) => (
          <span
            key={t}
            className="rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800"
          >
            {t}
          </span>
        ))}
    </>
  );
};

export function Card({ pokemon, filter, display }: Props) {
  const pid = ['kitakami', 'paldea'].includes(filter.pokedex)
    ? (pokemon[filter.pokedex as 'kitakami' | 'paldea'] || 0).toString().padStart(3, '0')
    : pokemon.pid.toString().padStart(4, '0');

  const link = pokemon.link;

  return (
    <div
      className={clsx(
        'mt-8 p-4 pt-2 md:mt-20',
        'flex flex-col gap-y-2',
        'rounded-xl bg-white',
        'shadow-list-items hover:shadow-list-items--hover',
        'hover:translate-x-[-0.2rem] hover:translate-y-[-0.2rem]'
      )}
    >
      <header className={'relative h-6 md:h-auto'}>
        <span className="hidden whitespace-nowrap md:block">#{pid}</span>
        <img
          className={clsx('pointer-events-none w-auto', 'absolute bottom-0 md:-right-8')}
          src={`${process.env.PUBLIC_URL}/image/icons/${link}.png`}
          alt={pokemon.nameZh}
          loading="lazy"
        />
      </header>
      <hr className="border-0 border-t-[1px] border-[#A29834]" />
      <div className="flex h-full flex-col justify-between gap-y-2">
        <div className={clsx('grid grid-cols-1 md:grid-cols-2')}>
          <div className="flex flex-col items-center gap-y-1 md:items-start">
            <p className="text-center md:text-start">
              <span className="block whitespace-nowrap md:hidden">#{pid}</span>
              {pokemon.nameZh}
              {pokemon.altForm && (
                <span className="block text-xs font-thin">({pokemon.altForm})</span>
              )}
            </p>
            <div className="flex gap-x-1">
              {pokemon.types.map((type) => (
                <Icon.Game.Type type={type} key={type} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-y-2">
              <Abilities pokemon={pokemon} />
            </div>
          </div>
        </div>
        <div className={clsx(display.EVs || display.ability ? 'block' : 'hidden')}>
          {display.ability && (
            <p className="mt-2 flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start">
              <Abilities pokemon={pokemon} />
            </p>
          )}
          {display.EVs && (
            <p className="mt-2 flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start">
              <EVs pokemon={pokemon} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
