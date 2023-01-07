import clsx from 'clsx';
import { BasePokemon, BgClass, TypeMap, TypeNameMap } from '@/models';
import { Icon } from '@/components';

type Props = {
  pokemon: BasePokemon;
};

export function Base({ pokemon }: Props) {
  return (
    <dl className={clsx('max-w-md divide-gray-200 text-white', 'grid grid-cols-1', 'space-y-3')}>
      <div className={clsx('flex flex-col', 'hidden md:block')}>
        <dt className="md:text-md text-white">
          <span className="mr-2">No. {pokemon.paldeaId}</span>
          <a
            href={`https://wiki.52poke.com/zh-hant/${pokemon.nameZh}`}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-bold text-blue-800 underline"
          >
            wiki
          </a>
        </dt>
        <dd className="flex items-center justify-end gap-3 text-lg">
          <span>{pokemon.nameZh}</span>
          <div className="hidden md:block">
            <span className="block text-xs">{pokemon.nameJp}</span>
            <span className="block text-xs">{pokemon.nameEn}</span>
          </div>
        </dd>
      </div>
      <hr className="my-8 hidden h-px border-0 bg-gray-200 md:block" />
      <div className="flex flex-col">
        <dt className="md:text-md text-white">屬性</dt>
        <dd className="flex justify-end gap-3 text-lg">
          {pokemon.types.map((type) => (
            <li
              className={clsx(
                'flex h-6 items-center gap-2 rounded-full px-7 text-xs',
                BgClass[type as keyof typeof TypeMap],
                'relative',
                'whitespace-nowrap'
              )}
              key={type}
            >
              <Icon.Type
                type={type}
                key={type}
                className="absolute left-0.5 h-6 w-6 rounded-full"
              />
              <span className="px-2">{TypeNameMap[type as keyof typeof TypeMap]}</span>
            </li>
          ))}
        </dd>
      </div>
      <hr className="my-8 hidden h-px border-0 bg-gray-200 md:block" />
      <div className="flex flex-col">
        <dt className="md:text-md text-white">特性</dt>
        <dd className="flex flex-wrap justify-end gap-3">
          {pokemon.abilities.map((ability) => (
            <a
              href={`https://wiki.52poke.com/zh-hant/${ability}（特性）`}
              target="_blank"
              rel="noreferrer"
              className="text-md whitespace-nowrap rounded bg-blue-100 px-1.5 py-0 text-center text-blue-800"
              key={ability}
            >
              {ability}
            </a>
          ))}
          {pokemon.hiddenAbility && (
            <a
              href={`https://wiki.52poke.com/zh-hant/${pokemon.hiddenAbility}（特性）`}
              target="_blank"
              rel="noreferrer"
              className="text-md whitespace-nowrap rounded bg-gray-100 px-1.5 py-0 text-center text-gray-800"
            >
              {pokemon.hiddenAbility}
            </a>
          )}
        </dd>
      </div>
      <hr className="my-8 hidden h-px border-0 bg-gray-200 md:block" />
      <div className="flex flex-col">
        <dt className="md:text-md text-white">性別比例</dt>
        <dd className="text-md flex justify-end gap-6">
          {pokemon.gender.M + pokemon.gender.F === 0 && <span>無性別</span>}
          {pokemon.gender.M + pokemon.gender.F > 0 && (
            <>
              <span>♂：{(pokemon.gender.M / 8) * 100}%</span>
              <span>♀：{(pokemon.gender.F / 8) * 100}%</span>
            </>
          )}
        </dd>
      </div>
    </dl>
  );
}
