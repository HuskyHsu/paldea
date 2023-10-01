import { useEffect, useMemo, useState } from 'react';

import { Pokemon } from '@/types/Pokemon';
import { Hr, Loading } from '@/newComponents/';
import { usePokemonList } from './api';
import { Card, Pagination, SearchBar } from './components';

type Filter = {
  keyword: string;
  types: Set<string>;
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
  });

  let { data, isLoading } = usePokemonList();
  data = data.filter(FilterFn);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  data = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (filter.keyword !== '') {
      searchParams.set('keyword', filter.keyword);
    } else {
      searchParams.delete('keyword');
    }

    window.location.href = document.location.href.split('?')[0] + '?' + searchParams.toString();
  }, [filter.keyword, searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  function FilterFn(pm: Pokemon) {
    let display = true;

    if (filter.keyword !== '') {
      display = display && pm.nameZh.includes(filter.keyword);
    }

    return display;
  }
  // filter: 屬性, 特性, 圖鑑()
  // order: 圖鑑 > 全國, 帕底亞, 北上

  return (
    <div className="flex flex-col gap-y-4">
      <header className="flex justify-end">
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
      </header>
      <Hr />
      <div className="grid grid-cols-list-mobile justify-around gap-4 py-8 md:grid-cols-list">
        {data.map((pm) => (
          <Card pokemon={pm} key={pm.link} />
        ))}
      </div>
      <footer className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </footer>
    </div>
  );
}

export default Pokedex;
