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
    <header className="relative flex h-[200px] items-center justify-center md:h-[280px]">
      <div className="z-10 h-auto max-h-[180px] w-auto max-w-[180px] md:max-h-[240px] md:max-w-[240px]">
        <Icon.Game.PmHome pm={pm} className={clsx('transition-all duration-500')} />
      </div>
      <div className="z-10 h-auto max-h-[180px] w-auto max-w-[180px] md:max-h-[240px] md:max-w-[240px]">
        <Icon.Game.PmHome pm={pm} className={clsx('transition-all duration-500')} shiny={true} />
      </div>

      {/* bg banner */}
      <div
        className={clsx(
          'absolute -inset-x-4 bottom-0 z-0 h-full',
          'md:rounded-t-xl',
          'bg-gradient-to-b',
          BgFromType[pm.types[0] as keyof typeof BgFromType],
          BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
        )}
      />
    </header>
  );
}

export function HeaderName({ pm }: Props) {
  const shareData = {
    title: `${pm.nameZh}`,
    text: `${pm.nameZh}圖鑑\n`,
    url: document.location.href,
  };

  const share = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <h2 className="-mb-2 flex items-end gap-x-2 whitespace-nowrap text-2xl">
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
      {'share' in navigator && (
        <button className="ml-2 text-base font-bold text-blue-800 underline" onClick={share}>
          share
        </button>
      )}
    </h2>
  );
}

export function QuickLink({ pokemonList: originalList, link }: QuickLinkProps) {
  const range = 2;

  const cacheObj = getJsonCache(localStorageKey);
  const filter = getFilter(cacheObj);

  let pokemonList = filterPokemonList(originalList, filter, true);
  let linkIndex = pokemonList.findIndex((pm) => pm.link === link);

  if (linkIndex < 0) {
    filter.pokedex = 'national';
    pokemonList = filterPokemonList(originalList, filter, true);
    linkIndex = pokemonList.findIndex((pm) => pm.link === link);
  }

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
    <div className="mt-2 -mb-4 flex items-center justify-around gap-2">
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
