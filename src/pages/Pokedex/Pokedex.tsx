import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Pokemon } from '@/types/Pokemon';
import { Hr, Loading } from '@/newComponents/';
import { usePokemonList } from './api';
import { Card, Pagination, PaginationMobile, SearchBar } from './components';

export type Filter = {
  keyword: string;
  types: Set<string>;
  pokedex: string;
};

const itemsPerPage = 30;

function Pokedex() {
  const params = document.location.href.split('?');
  const searchParams = useMemo(() => {
    return new URLSearchParams(params.length > 1 ? params[1] : '');
  }, [params]);

  const [filter, setFilter] = useState<Filter>({
    keyword: searchParams.get('keyword') || '',
    types: new Set<string>(),
    pokedex: searchParams.get('pokedex') || 'kitakami',
  });

  let { data, isLoading } = usePokemonList();
  data = data.filter(filterFn).filter(filterPokedex).sort(orderBy);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (filter.keyword !== '') {
      searchParams.set('keyword', filter.keyword);
      setCurrentPage(1);
    } else {
      searchParams.delete('keyword');
    }

    window.location.href = document.location.href.split('?')[0] + '?' + searchParams.toString();
  }, [filter.keyword, searchParams]);

  useEffect(() => {
    if (filter.pokedex !== '') {
      searchParams.set('pokedex', filter.pokedex);
    } else {
      searchParams.delete('pokedex');
    }

    window.location.href = document.location.href.split('?')[0] + '?' + searchParams.toString();
  }, [filter.pokedex, searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  function filterFn(pm: Pokemon) {
    let display = true;

    if (filter.keyword !== '') {
      display = display && pm.nameZh.includes(filter.keyword);
    }

    return display;
  }

  function filterPokedex(pm: Pokemon) {
    return filter.pokedex === '' || pm[filter.pokedex as 'kitakami' | 'paldea'];
  }

  function orderBy(a: Pokemon, b: Pokemon) {
    if (filter.pokedex === '') {
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

  // filter: 屬性, 特性, 圖鑑()
  // order: 圖鑑 > 全國, 帕底亞, 北上

  return (
    <div className="mb-4 flex flex-col gap-y-4">
      <header className="flex justify-end gap-x-2">
        <div className="flex w-full items-center gap-x-3 md:w-64">
          <SearchBar
            value={filter.keyword}
            onChange={(value) => {
              setFilter((prev) => ({
                ...prev,
                keyword: value,
              }));
            }}
          />
        </div>
        <button
          className="whitespace-nowrap"
          onClick={() => {
            setFilter((prev) => ({
              ...prev,
              pokedex: 'paldea',
            }));
          }}
        >
          帕底亞
        </button>
        <button
          className="whitespace-nowrap"
          onClick={() => {
            setFilter((prev) => ({
              ...prev,
              pokedex: 'kitakami',
            }));
          }}
        >
          北上
        </button>
        <button
          className="whitespace-nowrap"
          onClick={() => {
            setFilter((prev) => ({
              ...prev,
              pokedex: '',
            }));
          }}
        >
          全國
        </button>
      </header>
      <Hr />
      <div className="grid grid-cols-list-mobile justify-around gap-4 py-8 md:grid-cols-list">
        {currentData.map((pm) => (
          <Card pokemon={pm} key={pm.link} filter={filter} />
        ))}
      </div>
      <footer className="hidden justify-end md:flex">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </footer>
      <footer
        className={clsx(
          'fixed bottom-0 left-0 right-0 flex h-12 items-center justify-between',
          'bg-primary/60 px-4 text-white md:hidden'
        )}
      >
        <PaginationMobile
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          length={data.length}
        />
      </footer>
    </div>
  );
}

export default Pokedex;
