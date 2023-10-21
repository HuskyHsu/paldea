import { Link, useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { usePokemonInfo } from './api';
import { Icon, SubTitleSlide, TitleSlide } from '@/newComponents';
import { BgFromType, BgToType, BgType, FullPokemon } from '@/types/Pokemon';

type ContentProps = { pm: FullPokemon };

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

type Render = {
  title: string;
  Content: ({ pm }: ContentProps) => JSX.Element;
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
              'flex items-center gap-1 rounded-xl pl-2 pr-3 text-sm',
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
          <span
            key={ability}
            className={clsx(
              'py-px',
              'h-7 w-full md:w-2/5',
              'border-2 border-solid border-secondary',
              'rounded-full bg-secondary/30 text-center text-sm text-black',
              'whitespace-nowrap'
            )}
          >
            {ability}
          </span>
        ))}
      </span>
    ),
  },
  {
    title: '隱藏特性',
    Content: ({ pm }: ContentProps) => (
      <span className="flex flex-wrap justify-center gap-2 md:justify-start">
        <span
          className={clsx(
            'py-px',
            'h-7 w-full md:w-2/5',
            'border-2 border-solid border-scarlet',
            'rounded-full bg-scarlet/30 text-center text-sm text-black',
            'whitespace-nowrap'
          )}
        >
          {pm.hiddenAbility}
        </span>
      </span>
    ),
  },

  {
    title: '蛋群',
    Content: ({ pm }: ContentProps) => (
      <span className="flex gap-2">
        {pm.eggGroups.map((egg) => (
          <span
            key={egg}
            className={clsx(
              'py-px',
              'h-7 w-1/2 md:w-2/5',
              'border-2 border-solid border-secondary',
              'rounded-full bg-secondary/30 text-center text-sm text-black',
              'whitespace-nowrap'
            )}
          >
            {egg}
          </span>
        ))}
      </span>
    ),
  },
];

function PokemonInfo() {
  let { link = '906' } = useParams();
  const { data: pm, status } = usePokemonInfo(link);
  const navigate = useNavigate();

  if (status !== 'success') {
    return <></>;
  }

  return (
    <div className="-mt-4 flex flex-col gap-2">
      <header>
        <div className="relative flex justify-center">
          <div className="z-10 w-32">
            <Icon.Game.PmIcon pm={pm} />
          </div>

          {/* bg banner */}
          <div
            className={clsx(
              'absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0',
              'md:rounded-2xl',
              'bg-gradient-to-b',
              BgFromType[pm.types[0] as keyof typeof BgFromType],
              BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
            )}
          />
        </div>
      </header>
      <h2 className="text-2xl">
        #{pm.pid.toString().padStart(4, '0')} {pm.nameZh}
        {pm.altForm && <span className="text-sm">({pm.altForm})</span>}
        <a
          href={`https://wiki.52poke.com/zh-hant/${pm.nameZh}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-lg font-bold text-blue-800 underline"
        >
          wiki
        </a>
      </h2>
      <TitleSlide title="基本資訊" />
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

      <SubTitleSlide title="進化" />
      <details open>
        <summary>進化</summary>
        <pre>{JSON.stringify(pm.evolves, null, 2)}</pre>
      </details>

      <SubTitleSlide title="招式" />
      <details>
        <summary>招式</summary>
        <pre>{JSON.stringify(pm.moves, null, 2)}</pre>
      </details>

      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
}

export default PokemonInfo;
