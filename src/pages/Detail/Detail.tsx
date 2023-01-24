import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Hr, Icon, useLiffContext, useTable, Weakness } from '@/components';
import { useFilterStore } from '@/store';
import {
  BaseMove,
  BasePokemon,
  BgClass,
  BgFromClass,
  BgToClass,
  LevelMap,
  LevelUpMove,
  PMMove,
  RaidMove,
  TMMove,
  TYPE_MAP,
} from '@/models';

import { Header, Base, InfoCard, Hero, Statistic, Evolution } from './components';
import { columns, Table } from './MoveTable';
import { usePokemonInfo } from './api';

type MoveProps = {
  levelingUps: (LevelUpMove & { selected?: boolean })[];
  technicalMachines: (TMMove & { selected?: boolean })[];
  eggMoves: (BaseMove & { selected?: boolean })[];
  raidMoves?: RaidMove[];
};

function mergeMove(data: MoveProps): PMMove[] {
  const list = [
    data.levelingUps.map((move) => {
      const { level, ...rest } = move;
      return {
        source: `${level > 0 ? 'Lv' + level : LevelMap[level]}`,
        ...rest,
      };
    }),
    data.technicalMachines.map((move) => {
      const { pid, ...rest } = move;
      return {
        source: `TM${pid.toString().padStart(3, '0')}`,
        ...rest,
      };
    }),
    data.eggMoves.map((move) => {
      return {
        source: '遺傳',
        ...move,
      };
    }),
  ].flat();

  if (data.raidMoves === undefined) {
    return list;
  }

  data.raidMoves.forEach(({ level, moves, addMoves }) => {
    moves.forEach((move) => {
      const matchMove = list.find((item) => item.nameZh === move.nameZh);
      if (matchMove && move.nameZh !== '電網') {
        matchMove.selected = level >= 6;
      } else {
        list.push({
          source: `${level}*太晶`,
          selected: level >= 6,
          ...move,
        });
      }
    });
    if (level < 6) {
      return;
    }
    addMoves.forEach((move) => {
      const matchMove = list.find((item) => item.nameZh === move.nameZh);
      if (matchMove) {
        matchMove.selected = level >= 6;
      } else {
        list.push({
          source: `${level}*太晶(增)`,
          selected: level >= 6,
          ...move,
        });
      }
    });
  });

  return list;
}

const getSubList = (pokemonList: BasePokemon[], range: number, link: string) => {
  const listIndex = pokemonList.findIndex((pm) => pm.link === link);
  const listRange = [
    listIndex - range < 0 ? 0 : listIndex - range,
    listIndex + range + 1 > pokemonList.length ? pokemonList.length : listIndex + range + 1,
  ];
  let subList = pokemonList.slice(...listRange);
  if (subList.length < range * 2 + 1) {
    if (listRange[0] === 0) {
      subList = pokemonList
        .slice(pokemonList.length - range * 2 - 1 + subList.length, pokemonList.length)
        .concat(subList);
    } else if (listRange[1] === pokemonList.length) {
      subList = subList.concat(pokemonList.slice(0, range * 2 + 1 - subList.length));
    }
  }
  return subList;
};

const genFlex = ({
  code,
  pm,
  terasType,
  moves,
}: {
  code: string;
  pm: BasePokemon;
  terasType: string;
  moves: BaseMove[];
}) => {
  return {
    type: 'bubble',
    size: 'mega',
    hero: {
      type: 'image',
      url: `https://huskyhsu.github.io/paldea/image/icon/${pm.link}.png`,
      size: 'full',
      aspectMode: 'fit',
      aspectRatio: '10:8',
      backgroundColor: '#EA708A99',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: pm.nameZh,
          weight: 'bold',
          size: 'xl',
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'text',
              text: '6星',
              size: 'sm',
              color: '#999999',
              margin: 'md',
              flex: 0,
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '太晶',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 3,
                },
                {
                  type: 'image',
                  url: `https://huskyhsu.github.io/paldea/image/type/${terasType}.svg`,
                  size: '26px',
                  flex: 4,
                  align: 'start',
                },
              ],
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '邀請碼',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 3,
                },
                {
                  type: 'text',
                  text: code,
                  wrap: true,
                  color: '#666666',
                  size: 'lg',
                  flex: 4,
                },
              ],
            },
          ],
        },
        {
          type: 'separator',
          margin: 'md',
        },
        {
          type: 'text',
          text: '招式',
          color: '#aaaaaa',
          size: 'lg',
          margin: 'md',
        },
        ...moves.map((move) => {
          return {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: move.nameZh,
                flex: 3,
              },
              {
                type: 'image',
                url: `https://huskyhsu.github.io/paldea/image/type/${move.type}.svg`,
                size: '20px',
                flex: 1,
              },
              {
                type: 'image',
                url: `https://huskyhsu.github.io/paldea/image/type/${move.category}.svg`,
                size: '20px',
                flex: 1,
              },
              {
                type: 'text',
                text: move.power.toString(),
                align: 'center',
                flex: 1,
              },
              {
                type: 'text',
                text: move.accuracy.toString(),
                align: 'center',
                flex: 1,
              },
            ],
          };
        }),
      ],
    },
  };
};

function Moves() {
  let { link = '906' } = useParams();
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const targetPmIndex = pokemonList.findIndex((pm) => pm.link === link);
  const pokemon = pokemonList[targetPmIndex];
  const basePm = pokemonList.find((pm) => pm.link === pokemon.source) as BasePokemon;

  const { status, login, logout, share } = useLiffContext();

  useEffect(() => {
    document.title = `Pokédex ${pokemon.nameZh}`;
  }, [pokemon]);

  const [terasType, setTerasType] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const targetTerasType = (type: string) => {
    if (type === terasType) {
      setTerasType(null);
    } else {
      setTerasType(type);
    }
  };

  const { data } = usePokemonInfo(link);

  const tableDataMemo = useMemo(() => {
    return mergeMove(data);
  }, [data]);

  const table = useTable<PMMove>(tableDataMemo, columns);

  if (pokemon === undefined) {
    return <span>not found No. {link} pokemon</span>;
  }

  const quickListPm = getSubList(pokemonList, 1, link);

  return (
    <>
      <Header quickListPm={quickListPm} />
      <div className="space-y-8 px-6 pb-6">
        <InfoCard>
          <div
            className={clsx(
              'grid grid-cols-1 gap-4 md:grid-cols-12',
              'rounded-lg',
              'bg-gradient-to-b',
              BgFromClass[pokemon.types[0] as keyof typeof BgClass],
              BgToClass[pokemon.types[pokemon.types.length - 1] as keyof typeof BgClass]
            )}
          >
            <Hero pokemon={pokemon} />
            <div
              className={clsx(
                'col-span-1 bg-black/20 px-4 pb-2 md:col-span-5 md:py-4',
                'md:rounded-l-none md:rounded-r-lg',
                'rounded-t-none rounded-b-lg'
              )}
            >
              <Base pokemon={pokemon} />
            </div>
          </div>
        </InfoCard>
        <InfoCard>
          <div
            className={clsx(
              'rounded-lg p-4',
              'bg-gradient-to-t',
              BgFromClass[pokemon.types[0] as keyof typeof BgClass],
              BgToClass[pokemon.types[pokemon.types.length - 1] as keyof typeof BgClass]
            )}
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100">能力值</h5>
            <Statistic pokemon={pokemon} />
          </div>
        </InfoCard>
        {basePm.evolutions !== undefined && (
          <InfoCard>
            <div
              className={clsx(
                'rounded-lg p-4',
                'bg-gradient-to-b',
                BgFromClass[pokemon.types[0] as keyof typeof BgClass],
                BgToClass[pokemon.types[pokemon.types.length - 1] as keyof typeof BgClass]
              )}
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100">進化途徑</h5>
              <Evolution pokemonList={pokemonList} source={pokemon.source} />
            </div>
          </InfoCard>
        )}
        <InfoCard>
          <div
            className={clsx(
              'rounded-lg p-4',
              basePm.evolutions !== undefined ? 'bg-gradient-to-t' : 'bg-gradient-to-b',
              BgFromClass[pokemon.types[0] as keyof typeof BgClass],
              BgToClass[pokemon.types[pokemon.types.length - 1] as keyof typeof BgClass]
            )}
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100">屬性相剋</h5>
            {<Weakness types={pokemon.types} terasType={terasType} />}
            <h5 className="my-2 font-bold tracking-tight text-gray-100">切換太晶屬性</h5>
            <div className="grid grid-cols-6 gap-4 md:grid-cols-9">
              {TYPE_MAP.map((type) => (
                <div key={type} className="group relative h-8 justify-self-center">
                  <Icon.Type
                    type={type}
                    className={clsx('h-8 w-8', {
                      'opacity-30': terasType !== type,
                    })}
                    button={true}
                    onClick={() => targetTerasType(type)}
                  />
                </div>
              ))}
            </div>
            <div>
              {status.isLoggedIn && (
                <>
                  <div className="relative z-0 mt-8 w-44">
                    <input
                      type="text"
                      id="floating_standard"
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent py-2.5 px-0 text-sm text-gray-100 focus:border-blue-800 focus:outline-none focus:ring-0"
                      placeholder=" "
                      value={code ?? ''}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                    />
                    <label
                      htmlFor="floating_standard"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-800"
                    >
                      太晶團體戰邀請代碼：
                    </label>
                  </div>
                  <button
                    className="mr-2 mb-2 mt-2 rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                    onClick={() => {
                      share([
                        {
                          type: 'flex',
                          altText: pokemon.nameZh,
                          contents: JSON.parse(
                            JSON.stringify(
                              genFlex({
                                code: code || '123ABC',
                                pm: pokemon,
                                terasType: terasType || 'Normal',
                                moves: table.tableData.filter((row) => row.selected),
                              })
                            )
                          ),
                        },
                      ]);
                    }}
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="mr-2 mb-2 mt-2 rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                    onClick={logout}
                  >
                    登出
                  </button>
                </>
              )}

              {!status.isLoggedIn && (
                <button
                  type="button"
                  className="mr-2 mb-2 mt-8 rounded-lg bg-custom-green px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={login}
                >
                  登入Line快速分享
                </button>
              )}
            </div>
          </div>
        </InfoCard>
      </div>
      <div className="px-4 pb-4">
        <Hr />
      </div>
      <div className="flex justify-center">
        <div className="flex w-full flex-col gap-4 md:mb-4 md:w-5/6">
          <Table {...table} raidMoves={data.raidMoves || []} />
        </div>
      </div>
    </>
  );
}

export default Moves;
