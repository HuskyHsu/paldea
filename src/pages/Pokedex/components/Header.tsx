import clsx from 'clsx';

import { Icon, SubTitleSlide } from '@/newComponents';
import { TypeEnum } from '@/types/Pokemon';

import { Filter, ValueKeys } from '../Pokedex';
import { SearchBar, Buttons } from '.';

type Props = {
  filter: Filter;
  updateState: (key: ValueKeys<Filter, string>[keyof Filter]) => (val: string) => void;
  updateSetState: (key: ValueKeys<Filter, Set<string>>[keyof Filter]) => (val: string) => void;
  //   toggleState: (key: BoolKeys<Filter>[keyof Filter]) => (bool: boolean) => void;
};

export function Header({ filter, updateState, updateSetState }: Props) {
  const typeUpdate = updateSetState('types');

  return (
    <header>
      <div className="flex justify-end gap-x-2">
        <div className="flex w-full items-center gap-x-3 md:w-64">
          <SearchBar value={filter.keyword} onChange={updateState('keyword')} />
          {/* <div className="relative">
            <FilterButton
              checked={filter.displayFilter}
              toggleState={toggleState('displayFilter')}
            />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SubTitleSlide title="圖鑑分類" />
        <Buttons
          list={[
            { name: '帕底亞圖鑑', val: 'paldea' },
            { name: '北上圖鑑', val: 'kitakami' },
            { name: '全國圖鑑', val: 'national' },
          ]}
          currVal={filter.pokedex}
          updateState={updateState('pokedex')}
        />
        <SubTitleSlide title="屬性" />
        <div className="flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2">
          {Object.keys(TypeEnum).map((type) => (
            <button onClick={() => typeUpdate(type)} key={type}>
              <Icon.Game.Type
                type={type}
                className={clsx(
                  'h-8 w-8',
                  filter.types.size > 0 && !filter.types.has(type) && 'opacity-30'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
