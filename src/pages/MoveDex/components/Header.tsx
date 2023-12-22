import clsx from 'clsx';
import { Buttons, SearchBar, SubTitleSlide } from '@/newComponents/common';
import { Icon } from '@/newComponents';
import { ValueKeys } from '@/utils';
import { Filter } from '../MoveDex';
import { TYPE_MAP } from '@/types/Pokemon';

type Props = {
  filter: Filter;
  updateState: (key: ValueKeys<Filter, string>[keyof Filter]) => (val: string) => void;
};

export function Header({ filter, updateState }: Props) {
  const typeUpdate = updateState('type');
  const categoryUpdate = updateState('category');
  const TMUpdate = updateState('TM');

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
      <div className="flex flex-col gap-2">
        <SubTitleSlide title="屬性" />
        <div className="flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2">
          {TYPE_MAP.map((type) => (
            <button onClick={() => typeUpdate(type)} key={type}>
              <Icon.Game.Type
                type={type}
                className={clsx(
                  'h-8 w-8',
                  filter.type !== '' && filter.type !== type && 'opacity-30'
                )}
              />
            </button>
          ))}
        </div>
        <SubTitleSlide title="分類" />
        <Buttons
          list={[
            { name: '物理', val: '物理' },
            { name: '特殊', val: '特殊' },
            { name: '變化', val: '變化' },
          ]}
          currVal={filter.category}
          updateState={(val) => categoryUpdate(val)}
        />
        <SubTitleSlide title="招式學習機" />
        <Buttons
          list={[
            { name: '全部', val: '' },
            { name: '僅招式機', val: '僅招式機' },
          ]}
          currVal={filter.TM}
          updateState={(val) => TMUpdate(val)}
        />
      </div>
    </header>
  );
}
