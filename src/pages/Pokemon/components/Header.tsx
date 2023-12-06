import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { SubCard } from '@/newComponents/game';
import { BgFromType, BgToType, FullPokemon, Pokemon } from '@/types/Pokemon';
import { filterPokemonList, getFilter, getJsonCache } from '@/store';

type Props = {
  pm: FullPokemon;
};

type QuickLinkProps = {
  pokemonList: Pokemon[];
  link: string;
};

const localStorageKey = 'pokeDexPage';

export function Header({ pm }: Props) {
  return (
    <header className="relative flex h-[180px] items-center justify-around px-4 md:h-[273px]">
      <Icon.Game.PmHome pm={pm} className="z-10 h-[80%]" />
      <Icon.Game.PmHome pm={pm} className="z-10 h-[80%]" shiny={true} />

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
    </header>
  );
}

export function HeaderName({ pm }: Props) {
  return (
    <h2 className="-my-2 flex items-end gap-x-2 whitespace-nowrap text-2xl">
      #{pm.pid.toString().padStart(4, '0')} {pm.nameZh}
      {pm.altForm && <span className="text-sm">({pm.altForm})</span>}
      <a
        href={`https://wiki.52poke.com/zh-hant/${pm.nameZh}`}
        target="_blank"
        rel="noreferrer"
        className="ml-2 text-base font-bold text-blue-800 underline"
      >
        wiki
      </a>
      {pm.hisui && (
        <a
          href={`https://huskyhsu.github.io/arceus/#/${pm.hisui.toString().padStart(3, '0')}${
            pm.altForm === '洗翠' ? 'H' : ''
          }`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-base font-bold text-blue-800 underline"
        >
          洗翠圖鑑
        </a>
      )}
    </h2>
  );
}

export function QuickLink({ pokemonList, link }: QuickLinkProps) {
  const range = 2;

  const cacheObj = getJsonCache(localStorageKey);
  const filter = getFilter(cacheObj);
  pokemonList = filterPokemonList(pokemonList, filter, true);

  const linkIndex = pokemonList.findIndex((pm) => pm.link === link);

  let quickLink =
    linkIndex < range
      ? pokemonList.slice(linkIndex - range).concat(pokemonList.slice(0, linkIndex))
      : pokemonList.slice(linkIndex - range, linkIndex);
  quickLink.push(...pokemonList.slice(linkIndex, linkIndex + range + 1));
  if (linkIndex > pokemonList.length - range - 1) {
    quickLink.push(...pokemonList.slice(0, range - pokemonList.length + linkIndex + 1));
  }

  const prePm = quickLink[range - 1];
  const preName = `${prePm.nameZh}${prePm.altForm ? '-' + prePm.altForm : ''}`;

  const nextPm = quickLink[range + 1];
  const nextName = `${nextPm.nameZh}${nextPm.altForm ? '-' + nextPm.altForm : ''}`;

  return (
    <div className="mt-4 -mb-4 flex items-center justify-around gap-2">
      <Link to={`/pokedex/${preName}`}>
        <Icon.ArrowBack />
      </Link>
      {quickLink.map((pm, i) => (
        <SubCard
          pm={pm}
          className={clsx(
            'scale-75',
            pm.link === link && 'text-custom-gold',
            [0, 4].includes(i) && 'hidden md:block'
          )}
          key={pm.link}
        />
      ))}
      <Link to={`/pokedex/${nextName}`}>
        <Icon.ArrowForward />
      </Link>
    </div>
  );
}
