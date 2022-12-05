import clsx from 'clsx';
import { Card } from '@/components';
import { useFilterStore } from '@/store';
import { SearchBar } from './SearchBar';
import { FilterTypeButton } from './FilterTypeButton';
import { Hr } from './Hr';

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="rounded-xl bg-orange-50">
      <form className="px-4 pt-6" onSubmit={handleSubmit}>
        <ul className="flex flex-col items-center gap-y-4">
          <li
            className={clsx(
              'flex w-full flex-col items-center justify-between md:flex-row',
              'gap-4 px-4'
            )}
          >
            <SearchBar />
          </li>
          <li className="relative w-full">
            <Hr />
          </li>
          <li
            className={clsx(
              'grid w-full gap-4 md:w-5/6',
              'grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
            )}
          >
            <FilterTypeButton />
          </li>
        </ul>
      </form>
      <div className="flex flex-wrap justify-around gap-4 p-4">
        {pokemonList.map((pm) => (
          <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
        ))}
      </div>
    </div>
  );
}

export default List;
