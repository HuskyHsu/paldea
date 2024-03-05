import clsx from 'clsx';

import { Hr, Loading } from '@/newComponents/common';
import { usePokemonListContext } from '@/newComponents/contexts';
import { filterPokemonList } from '@/store';
import { PokedexFrom } from '@/types/Pokemon';
import { useEffect } from 'react';
import { UseFilter } from './UseFilter';
import { Card, Header, Pagination, PaginationMobile } from './components';

export type Filter = {
  keyword: string;
  pokedex: PokedexFrom | 'home' | 'national';
  page: number;
  types: Set<string>;
  ability: string;
  EV: string;
  region: string;
  tags: Set<string>;
  onlyEvolution: string;
};

export type Display = {
  advancedFilter: boolean;
  ability: boolean;
  EVs: boolean;
  pid: boolean;
};

const itemsPerPage = 30;

function Pokedex() {
  const { filter, updateState, updateNumberState, updateSetState, display, toggleDisplay } =
    UseFilter();

  let { pokemonList: data } = usePokemonListContext();

  useEffect(() => {
    document.title = `${filter.pokedex} Pokédex`;
  }, [filter.pokedex]);

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

  data = filterPokemonList(data, filter);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (filter.page - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mb-4 flex flex-col gap-y-4">
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
