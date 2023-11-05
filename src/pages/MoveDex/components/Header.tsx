import clsx from 'clsx';
import { SearchBar } from '@/newComponents/common';
import { Icon } from '@/newComponents';
import { ValueKeys } from '@/utils';
import { Filter } from '../MoveDex';

type Props = {
  filter: Filter;
  updateState: (key: ValueKeys<Filter, string>[keyof Filter]) => (val: string) => void;
};

export function Header({ filter, updateState }: Props) {
  return (
    <header>
      <div className="flex flex-col justify-between gap-x-2 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div className={clsx('rounded-xl p-2', 'bg-custom-blue', 'hidden md:block')}>
            <Icon.Book className="h-5 w-5 fill-current" />
          </div>
          <h2 className="text-xl">招式清單</h2>
        </div>
        <div className="flex w-full items-center gap-x-3 md:w-96">
          <SearchBar
            placeholder={'搜尋 名稱(中/英/日), 介紹'}
            value={filter.keyword}
            onChange={updateState('keyword')}
          />
        </div>
      </div>
    </header>
  );
}
