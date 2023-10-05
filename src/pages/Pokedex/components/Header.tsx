import { SubTitleSlide } from '@/newComponents';

import { Filter, ValueKeys, BoolKeys } from '../Pokedex';
import { SearchBar, FilterButton, Buttons } from '.';

type Props = {
  filter: Filter;
  updateState: (key: ValueKeys<Filter, string>[keyof Filter]) => (val: string) => void;
  toggleState: (key: BoolKeys<Filter>[keyof Filter]) => (bool: boolean) => void;
};

export function Header({ filter, updateState, toggleState }: Props) {
  return (
    <header>
      <div className="flex justify-end gap-x-2">
        <div className="flex w-full items-center gap-x-3 md:w-64">
          <SearchBar value={filter.keyword} onChange={updateState('keyword')} />
          <div className="relative">
            <FilterButton
              checked={filter.displayFilter}
              toggleState={toggleState('displayFilter')}
            />
          </div>
        </div>
      </div>
      <div>
        <SubTitleSlide title="圖鑑分類" />
        <Buttons
          list={[
            { name: '帕底亞圖鑑', val: 'paldea' },
            { name: '北上圖鑑', val: 'kitakami' },
            { name: '全國圖鑑', val: '' },
          ]}
          currVal={filter.pokedex}
          updateState={updateState('pokedex')}
        />
      </div>
    </header>
  );
}
