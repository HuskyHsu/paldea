import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { SubTitleSlide, TitleSlide, Toggle } from '@/newComponents/common';
import { EVName, TypeEnum } from '@/types/Pokemon';
import { BoolKeys, ValueKeys } from '@/utils';

import { Buttons, SearchBar } from '.';
import { Display, Filter } from '../Pokedex';

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
  const showChildUpdate = updateState('onlyEvolution');

  const hasFilter = [filter.ability, filter.EV, filter.region].filter(Boolean).length > 0;

  const filterList = [
    { value: filter.ability, name: '特性', key: 'ability' },
    { value: EVName[filter.EV as keyof typeof EVName] || '', name: '努力值', key: 'EV' },
    { value: filter.region, name: '區域', key: 'region' },
  ];

  const share = async () => {
    const shareData = {
      title: `${filter.pokedex} pokedex`,
      text: `${document.title}\n`,
      url: document.location.href,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <div className="flex flex-col justify-between gap-x-2 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div className={clsx('rounded-xl p-2', 'bg-custom-red', 'hidden md:block')}>
            <Icon.Books className="h-5 w-5 fill-current" />
          </div>
          <h2 className="flex items-center gap-x-1 text-xl">
            圖鑑清單
            {'share' in navigator && <Icon.Share className="h-6 w-6" onClick={share} />}
          </h2>
        </div>
        <div className="flex w-full items-center gap-x-3 md:w-96">
          <SearchBar
            value={filter.keyword}
            onChange={updateState('keyword')}
            display={display}
            toggleDisplay={toggleDisplay}
            hasFilter={hasFilter}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SubTitleSlide title="圖鑑來源" />
        <Buttons
          list={[
            { name: '全國', val: 'national' },
            { name: '帕底亞', val: 'paldea' },
            { name: '北上', val: 'kitakami' },
            { name: '藍莓', val: 'blueberry' },
            { name: '洗翠', val: 'hisui' },
            { name: '伽勒爾', val: 'galar' },
            { name: '鎧島', val: 'armor' },
            { name: '王冠雪原', val: 'crown' },
            { name: 'HOME / 活動 / 點心', val: 'home' },
          ]}
          currVal={filter.pokedex}
          updateState={updateState('pokedex')}
        />
        <div className="flex gap-x-2">
          <Toggle
            text="顯示其餘圖鑑編號"
            checked={display.pid}
            handleChange={toggleDisplay('pid')}
          />
          <Toggle
            text="僅顯示進化型"
            checked={filter.onlyEvolution === 'yes'}
            handleChange={(bool) => showChildUpdate(bool ? 'yes' : '')}
          />
        </div>
        <SubTitleSlide title="屬性" />
        <div className="flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pl-2">
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
        <SubTitleSlide title="標籤(複選，交集)" />
        <Buttons
          list={[
            { name: '傳說與幻獸', val: '傳說與幻獸' },
            { name: '悖謬寶可夢', val: '悖謬寶可夢' },
            { name: '准傳說的寶可夢', val: '准傳說的寶可夢' },
            { name: '朱版限定', val: '朱版限定' },
            { name: '紫版限定', val: '紫版限定' },
          ]}
          currVal={filter.tags}
          updateState={updateSetState('tags')}
        />
      </div>
      <div className={clsx('mt-4 flex-col gap-2', display.advancedFilter ? 'flex' : 'hidden')}>
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
        <span className="text-sm">(篩選單獨只有這此項的清單)</span>
        <div>
          <Toggle
            text="顯示努力值"
            checked={display.EVs}
            handleChange={toggleDisplay('EVs')}
          />
        </div>
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
        <SubTitleSlide title="地區" />
        <Buttons
          list={[
            { name: '關都', val: '關都' },
            { name: '城都', val: '城都' },
            { name: '豐緣', val: '豐緣' },
            { name: '神奧', val: '神奧' },
            { name: '合眾', val: '合眾' },
            { name: '卡洛斯', val: '卡洛斯' },
            { name: '阿羅拉', val: '阿羅拉' },
            { name: '伽勒爾', val: '伽勒爾' },
            { name: '洗翠', val: '洗翠' },
            { name: '帕底亞', val: '帕底亞' },
          ]}
          currVal={filter.region}
          updateState={updateState('region')}
        />
      </div>
      <div
        className={clsx(
          'flex-col gap-2',
          display.advancedFilter === false && hasFilter ? 'flex' : 'hidden'
        )}
      >
        <SubTitleSlide title="進階篩選項目：" />
        <div className="flex flex-wrap gap-4">
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
