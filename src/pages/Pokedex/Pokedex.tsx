import clsx from 'clsx';

import { EVIndex, PokedexFrom, PokedexList, Pokemon } from '@/types/Pokemon';
import { Hr, Loading } from '@/newComponents';
import { usePokemonListContext } from '@/newComponents/contexts';
import { Card, Pagination, PaginationMobile, Header } from './components';
import { UseFilter } from './UseFilter';

export type Filter = {
  keyword: string;
  pokedex: PokedexFrom | 'home' | 'national';
  page: number;
  types: Set<string>;
  ability: string;
  EV: string;
};

export type Display = {
  advancedFilter: boolean;
  ability: boolean;
  EVs: boolean;
};

const itemsPerPage = 30;

function Pokedex() {
  const { filter, updateState, updateNumberState, updateSetState, display, toggleDisplay } =
    UseFilter();

  let { pokemonList: data } = usePokemonListContext();

  if (data.length === 0) {
    return <Loading />;
  }

  const abilities = [
    ...new Set(
      data
        .map((pm) => pm.abilities.concat([pm.hiddenAbility || '']))
        .flat()
        .filter(Boolean)
    ),
  ].sort();

  data = data.filter(filterFn).filter(filterPokedex).sort(orderBy);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (filter.page - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  function filterFn(pm: Pokemon) {
    let display = true;

    if (filter.keyword !== '') {
      const checkList = [pm.nameZh, pm.nameEn.toLowerCase(), pm.nameJp, pm.altForm || ''];
      const keyword = filter.keyword.toLowerCase();
      display = display && checkList.some((val) => val.includes(keyword));
    }

    if (display && filter.types.size > 0) {
      if (filter.types.size === 1) {
        display = display && pm.types.some((type) => filter.types.has(type));
      } else if (filter.types.size === 2 && pm.types.length === 2) {
        display = display && pm.types.every((type) => filter.types.has(type));
      } else {
        display = false;
      }
    }

    if (display && filter.ability !== '' && abilities.includes(filter.ability)) {
      const checkList = [...pm.abilities, pm.hiddenAbility];
      display = display && checkList.some((ability) => ability === filter.ability);
    }

    if (display && filter.EV !== '') {
      const index = EVIndex[filter.EV as keyof typeof EVIndex];
      display = display && pm.EVs.every((ev, i) => (i === index ? ev > 0 : ev === 0));
    }

    return display;
  }

  function filterPokedex(pm: Pokemon) {
    if (PokedexList.includes(filter.pokedex)) {
      return pm[filter.pokedex as PokedexFrom];
    } else if (filter.pokedex === 'home') {
      return pm.kitakami === null && pm.paldea === null;
    } else {
      return true;
    }
  }

  function orderBy(a: Pokemon, b: Pokemon) {
    if (PokedexList.includes(filter.pokedex)) {
      if ((a[filter.pokedex as PokedexFrom] || 0) - (b[filter.pokedex as PokedexFrom] || 0) !== 0) {
        return (a[filter.pokedex as PokedexFrom] || 0) - (b[filter.pokedex as PokedexFrom] || 0);
      } else {
        return a.link.localeCompare(b.link);
      }
    } else {
      if (a.pid - b.pid !== 0) {
        return a.pid - b.pid;
      } else {
        return a.link.localeCompare(b.link);
      }
    }
  }

  return (
    <div className="mb-4 flex flex-col gap-y-4">
      新版圖鑑清單施工中。。。
      <Header
        filter={filter}
        abilities={abilities}
        updateState={updateState}
        updateSetState={updateSetState}
        display={display}
        toggleDisplay={toggleDisplay}
      />
      <Hr />
      <p className={clsx(data.length > 0 && 'hidden')}>查無符合項目，請調整搜尋項目。</p>
      {data.length > 0 && (
        <div className="grid grid-cols-list-mobile justify-around gap-4 pt-4 pb-8 md:grid-cols-list">
          {currentData.map((pm) => (
            <Card pokemon={pm} key={pm.link} filter={filter} display={display} />
          ))}
        </div>
      )}
      <footer className="hidden justify-end md:flex">
        <Pagination
          currentPage={filter.page}
          totalPages={totalPages}
          updateNumberState={updateNumberState}
        />
      </footer>
      <footer
        className={clsx(
          'fixed bottom-0 left-0 right-0 flex h-12 items-center justify-between',
          'bg-primary/60 px-4 text-white md:hidden'
        )}
      >
        <PaginationMobile
          currentPage={filter.page}
          totalPages={totalPages}
          updateNumberState={updateNumberState}
          length={data.length}
        />
      </footer>
    </div>
  );
}

export default Pokedex;
