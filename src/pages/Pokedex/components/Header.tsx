import clsx from 'clsx';

import { Icon, Indicator, SubTitleSlide, TitleSlide, Toggle } from '@/newComponents';
import { EVName, TypeEnum } from '@/types/Pokemon';
import { BoolKeys, ValueKeys } from '@/utils';

import { Filter, Display } from '../Pokedex';
import { SearchBar, Buttons, FilterButton } from '.';

type Props = {
  filter: Filter;
  abilities: string[];
  updateState: (key: ValueKeys<Filter, string>[keyof Filter]) => (val: string) => void;
  updateSetState: (key: ValueKeys<Filter, Set<string>>[keyof Filter]) => (val: string) => void;

  display: Display;
  toggleDisplay: (key: BoolKeys<Display>[keyof Display]) => (bool: boolean) => void;
};

export function Header({
  filter,
  abilities,
  updateState,
  updateSetState,
  display,
  toggleDisplay,
}: Props) {
  const typeUpdate = updateSetState('types');
  const abilityUpdate = updateState('ability');

  const hasFilter = [filter.ability, filter.EV].filter(Boolean).length > 0;

  const filterList = [
    { value: filter.ability, name: '特性', key: 'ability' },
    { value: EVName[filter.EV as keyof typeof EVName] || '', name: '努力值', key: 'EV' },
  ];

  return (
    <header>
      <div className="flex justify-end gap-x-2">
        <div className="flex w-full items-center gap-x-3 md:w-64">
          <SearchBar value={filter.keyword} onChange={updateState('keyword')} />
          <div className="relative">
            <FilterButton
              checked={display.advancedFilter}
              toggleState={toggleDisplay('advancedFilter')}
            />
            {hasFilter && <Indicator />}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SubTitleSlide title="圖鑑分類" />
        <Buttons
          list={[
            { name: '帕底亞', val: 'paldea' },
            { name: '北上', val: 'kitakami' },
            { name: '洗翠', val: 'hisui' },
            { name: '全國', val: 'national' },
            { name: 'HOME入境 or 活動', val: 'home' },
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
      <div className={clsx('flex-col gap-2', display.advancedFilter ? 'flex' : 'hidden')}>
        <TitleSlide title="進階搜尋" />
        <SubTitleSlide title="特性" />
        <div className="block md:hidden">
          <Toggle
            text="顯示特性"
            checked={display.ability}
            handleChange={toggleDisplay('ability')}
          />
        </div>
        <div className="relative mb-2 w-60">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon.Search className="h-5 w-5" />
          </div>
          <input
            type="search"
            className={clsx(
              'block w-full rounded-lg border border-gray-300',
              'bg-gray-50 p-2 pl-10 text-sm text-gray-900'
            )}
            placeholder="搜尋特性"
            value={filter.ability}
            onChange={(e) => {
              abilityUpdate(e.target.value);
            }}
          />
        </div>
        <Buttons
          list={abilities
            .filter((ability) => {
              return ability.split('').some((char) => filter.ability.includes(char));
            })
            .map((ability) => ({ name: ability, val: ability }))}
          currVal={filter.ability}
          updateState={abilityUpdate}
        />
        <SubTitleSlide title="努力值" />
        <Toggle text="顯示努力值" checked={display.EVs} handleChange={toggleDisplay('EVs')} />
        <span className="text-sm">(篩選單獨只有這此項的清單)</span>
        <Buttons
          list={[
            { name: 'HP', val: 'HP' },
            { name: '攻擊', val: 'Atk' },
            { name: '防禦', val: 'Def' },
            { name: '特攻', val: 'SpA' },
            { name: '特防', val: 'SpD' },
            { name: '速度', val: 'Spe' },
          ]}
          currVal={filter.EV}
          updateState={updateState('EV')}
        />
      </div>
      <div
        className={clsx(
          'flex-col gap-2',
          display.advancedFilter === false && hasFilter ? 'flex' : 'hidden'
        )}
      >
        <SubTitleSlide title="進階篩選項目：" />
        <div className="flex gap-4">
          {filterList
            .filter(({ value }) => value !== '')
            .map(({ value, name, key }) => (
              <span
                key={key}
                className={clsx(
                  'flex items-center gap-x-2',
                  'rounded-xl bg-amber-100 px-2 py-1 shadow-list-items'
                )}
              >
                {name}：{value}
                <Icon.Close
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    updateState(key as Parameters<typeof updateState>[0])('');
                  }}
                />
              </span>
            ))}
        </div>
      </div>
    </header>
  );
}
