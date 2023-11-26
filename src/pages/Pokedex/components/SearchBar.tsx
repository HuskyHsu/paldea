import clsx from 'clsx';

import { Indicator } from '@/newComponents/common';
import { Icon } from '@/newComponents';
import { BoolKeys } from '@/utils';

import { FilterButton } from '.';
import { Display } from '../Pokedex';

type Props = {
  value: string;
  onChange: (val: string) => void;

  display: Display;
  toggleDisplay: (key: BoolKeys<Display>[keyof Display]) => (bool: boolean) => void;

  hasFilter: Boolean;
};

export function SearchBar({ value, onChange, display, toggleDisplay, hasFilter }: Props) {
  return (
    <>
      <div className="relative my-2 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon.Search className="h-5 w-5" />
        </div>
        <input
          type="search"
          className={clsx(
            'block w-full rounded-full border border-gray-300',
            'bg-gray-50 p-2 pl-10 text-sm text-gray-900',
            'search'
          )}
          placeholder="搜尋 名稱(中/英/日), 樣子"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FilterButton
            checked={display.advancedFilter}
            toggleState={toggleDisplay('advancedFilter')}
          />
          {hasFilter && (
            <div className="relative -top-3 right-6">
              <Indicator />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
