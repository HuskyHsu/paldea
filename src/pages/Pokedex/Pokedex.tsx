import clsx from 'clsx';

import { Pokemon } from '@/types/Pokemon';
import { Hr, Loading } from '@/newComponents';
import { usePokemonList } from './api';
import { Card, Pagination, PaginationMobile, Header } from './components';
import { UseFilter } from './UseFilter';

export type Filter = {
  keyword: string;
  pokedex: string;
  page: number;
  types: Set<string>;
  ability: string;
  // displayFilter: boolean;
};

export type BoolKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
};

export type ValueKeys<T, L> = {
  [K in keyof T]: T[K] extends L ? K : never;
};

const itemsPerPage = 30;

function Pokedex() {
  const { filter, updateState, updateNumberState, updateSetState } = UseFilter();

  let { data, isLoading } = usePokemonList();

  const abilities = [
    ...new Set(
      data
        .map((pm) => pm.abilities.concat([pm.hiddenAbility]))
        .flat()
        .filter(Boolean)
    ),
  ].sort();

  data = data.filter(filterFn).filter(filterPokedex).sort(orderBy);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (filter.page - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  function filterFn(pm: Pokemon) {
    let display = true;

    if (filter.keyword !== '') {
      display = display && pm.nameZh.includes(filter.keyword);
    }

    if (filter.types.size > 0) {
      if (filter.types.size === 1) {
        display = display && pm.types.some((type) => filter.types.has(type));
      } else if (filter.types.size === 2 && pm.types.length === 2) {
        display = display && pm.types.every((type) => filter.types.has(type));
      } else {
        display = false;
      }
    }

    if (filter.ability !== '' && abilities.includes(filter.ability)) {
      display =
        display &&
        [...pm.abilities, pm.hiddenAbility].some((ability) => ability === filter.ability);
    }

    return display;
  }

  function filterPokedex(pm: Pokemon) {
    return filter.pokedex === 'national' || pm[filter.pokedex as 'kitakami' | 'paldea'];
  }

  function orderBy(a: Pokemon, b: Pokemon) {
    if (filter.pokedex === 'national') {
      if (a.pid - b.pid !== 0) {
        return a.pid - b.pid;
      } else {
        return a.link.localeCompare(b.link);
      }
    } else {
      if (
        (a[filter.pokedex as 'kitakami' | 'paldea'] || 0) -
          (b[filter.pokedex as 'kitakami' | 'paldea'] || 0) !==
        0
      ) {
        return (
          (a[filter.pokedex as 'kitakami' | 'paldea'] || 0) -
          (b[filter.pokedex as 'kitakami' | 'paldea'] || 0)
        );
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
      />
      <Hr />
      <div className="grid grid-cols-list-mobile justify-around gap-4 pt-4 pb-8 md:grid-cols-list">
        {currentData.map((pm) => (
          <Card pokemon={pm} key={pm.link} filter={filter} />
        ))}
      </div>
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
