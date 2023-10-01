import { useSearchParams } from 'react-router-dom';

import { Pokemon } from '@/types/Pokemon';
import { Hr, Loading } from '@/newComponents/';
import { usePokemonList } from './api';
import { Card, SearchBar } from './components';

type Filter = {
  keyword: string;
  types: Set<string>;
};

function Pokedex() {
  const { data, isLoading } = usePokemonList();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    types: new Set(searchParams.get('types')?.split(',')),
  };

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
    <>
      <header className="flex justify-end py-3">
        <div className="flex w-full items-center gap-x-3 md:w-3/5 lg:w-1/3">
          <SearchBar
            value={filter.keyword}
            onChange={(event) => {
              const { value } = event.target;

              setSearchParams((prev) => {
                prev.set('keyword', value);
                return prev;
              });
            }}
          />
        </div>
      </header>
      <Hr />
      <div className="grid grid-cols-list-mobile justify-around gap-4 pt-4 pb-8 md:grid-cols-list">
        {data
          .slice(0, 100)
          .filter(FilterFn)
          .map((pm) => (
            <Card pokemon={pm} key={pm.link} />
          ))}
      </div>
    </>
  );
}

export default Pokedex;
