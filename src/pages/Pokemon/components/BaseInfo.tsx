import clsx from 'clsx';

import { SubTitleSlide } from '@/newComponents/common';
import { Icon } from '@/newComponents';
import { BgType, FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

type ContentProps = { pm: FullPokemon };

type Render = {
  title: string;
  Content: ({ pm }: ContentProps) => JSX.Element;
};

const genderRatioMap = {
  0: [100, 0],
  31: [87.5, 12.5],
  63: [75, 25],
  127: [50, 50],
  191: [25, 75],
  225: [12.5, 87.5],
  254: [0, 100],
  255: [0, 0],
};

const renderData: Render[] = [
  {
    title: '英文名稱',
    Content: ({ pm }: ContentProps) => <>{pm.nameEn}</>,
  },
  {
    title: '日文名稱',
    Content: ({ pm }: ContentProps) => <>{pm.nameJp}</>,
  },
  {
    title: '屬性',
    Content: ({ pm }: ContentProps) => (
      <span className="flex gap-2 text-white">
        {pm.types.map((type) => (
          <span
            className={clsx(
              'flex items-center gap-1 whitespace-nowrap rounded-xl pl-2 pr-3 text-sm',
              BgType[type as keyof typeof BgType]
            )}
            key={type}
          >
            <Icon.Game.Type type={type} className="h-6 w-6" />
            {type}
          </span>
        ))}
      </span>
    ),
  },
  {
    title: '性別比例',
    Content: ({ pm }: ContentProps) => (
      <span className="flex gap-4 whitespace-nowrap">
        <span>♂：{genderRatioMap[pm.genderRatio as keyof typeof genderRatioMap][0]}%</span>
        <span>♀：{genderRatioMap[pm.genderRatio as keyof typeof genderRatioMap][1]}%</span>
      </span>
    ),
  },
  {
    title: '特性',
    Content: ({ pm }: ContentProps) => (
      <span className="flex flex-wrap justify-center gap-2 md:justify-start">
        {pm.abilities.map((ability) => (
          <a
            key={ability}
            href={`https://wiki.52poke.com/zh-hant/${ability}（特性）`}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-secondary',
              'rounded-full bg-secondary/30 text-center text-sm',
              'whitespace-nowrap leading-6',
              'text-blue-800 underline'
            )}
          >
            {ability}
          </a>
        ))}
      </span>
    ),
  },
  {
    title: '隱藏特性',
    Content: ({ pm }: ContentProps) => {
      if (pm.hiddenAbility === null) {
        return <></>;
      }
      return (
        <span className="flex flex-wrap justify-center gap-2 md:justify-start">
          <a
            href={`https://wiki.52poke.com/zh-hant/${pm.hiddenAbility}（特性）`}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-scarlet',
              'rounded-full bg-scarlet/30 text-center text-sm',
              'whitespace-nowrap leading-6',
              'text-blue-800 underline'
            )}
          >
            {pm.hiddenAbility}
          </a>
        </span>
      );
    },
  },
  {
    title: '蛋群',
    Content: ({ pm }: ContentProps) => (
      <span className="flex gap-2">
        {pm.eggGroups.map((egg) => (
          <span
            key={egg}
            className={clsx(
              'h-7 w-1/2 md:w-2/5',
              'border-2 border-solid border-secondary',
              'rounded-full bg-secondary/30 text-center text-sm text-black',
              'whitespace-nowrap leading-6'
            )}
          >
            {egg}
          </span>
        ))}
      </span>
    ),
  },
  {
    title: '地區圖鑑',
    Content: ({ pm }: ContentProps) => (
      <span className="flex flex-wrap gap-2">
        {pm.paldea && (
          <span
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-custom-gold',
              'rounded-full bg-custom-gold/30 text-center text-sm text-black',
              'whitespace-nowrap leading-6'
            )}
          >
            帕底亞#{pm.paldea.toString().padStart(3, '0')}
          </span>
        )}
        {pm.kitakami && (
          <span
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-custom-green',
              'rounded-full bg-custom-green/30 text-center text-sm text-black',
              'whitespace-nowrap leading-6'
            )}
          >
            北上#{pm.kitakami.toString().padStart(3, '0')}
          </span>
        )}
        {pm.blueberry && (
          <span
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-custom-blue',
              'rounded-full bg-custom-blue/30 text-center text-sm text-black',
              'whitespace-nowrap leading-6'
            )}
          >
            藍莓#{pm.blueberry.toString().padStart(3, '0')}
          </span>
        )}
        {pm.hisui && (
          <span
            className={clsx(
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-custom-orange',
              'rounded-full bg-custom-orange/30 text-center text-sm',
              'whitespace-nowrap leading-6',
              'text-blue-800 underline'
            )}
          >
            <a
              href={`https://huskyhsu.github.io/arceus/#/${pm.hisui.toString().padStart(3, '0')}${
                pm.altForm === '洗翠' ? 'H' : ''
              }`}
              target="_blank"
              rel="noreferrer"
            >
              洗翠#{pm.hisui.toString().padStart(3, '0')}
            </a>
          </span>
        )}
      </span>
    ),
  },
];

export function BaseInfo({ pm }: Props) {
  return (
    <>
      <SubTitleSlide title="基本資訊" />
      <ul className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6">
        {renderData.map((data, index) => (
          <li
            className={clsx('flex flex-col items-start', 'gap-1', 'md:flex-row md:text-left')}
            key={index}
          >
            <span
              className={clsx(
                'md:py-px',
                'pr-3 md:w-2/5 md:pr-0',
                'border-b-[1px] border-solid border-custom-gold md:border-2',
                'text-start text-sm text-black md:rounded-full md:text-center',
                'whitespace-nowrap'
              )}
            >
              {data.title}
            </span>
            <p className="w-full">
              <data.Content pm={pm} />
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
