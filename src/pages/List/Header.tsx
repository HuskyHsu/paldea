import clsx from 'clsx';
import { FilterTypeButton, Hr, SearchBar } from './components';

export function Header() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
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
        <li className="w-full">
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
  );
}
