import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

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

import { Header, Base, InfoCard, Hero, Statistic } from './components';
import { columns, Table } from './MoveTable';
import { Hr, Icon, PokemonBadge, useTable, Weakness } from '@/components';
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

const getEvolution = (pokemonList: BasePokemon[], source: string) => {
  interface evolutionChain {
    pm: BasePokemon;
    evolutions?: {
      pm: BasePokemon;
      condition: string;
      evolutions?: { pm: BasePokemon; condition: string }[];
    }[];
  }

  const basePm = pokemonList.find((pm) => pm.link === source) as BasePokemon;
  const chain = { pm: basePm } as evolutionChain;

  if (basePm.evolutions === undefined) {
    return chain;
  }

  basePm.evolutions.forEach((evolution) => {
    const targetPm = pokemonList.find((pm) => pm.link === evolution.link) as BasePokemon;

    if (chain.evolutions === undefined) {
      chain.evolutions = [];
    }

    const subChain = {
      pm: targetPm,
      condition: evolution.condition,
    } as {
      pm: BasePokemon;
      condition: string;
      evolutions?: { pm: BasePokemon; condition: string }[];
    };

    if (targetPm.evolutions !== undefined) {
      subChain.evolutions = targetPm.evolutions.map((evolution) => {
        return {
          pm: pokemonList.find((pm) => pm.link === evolution.link) as BasePokemon,
          condition: evolution.condition,
        };
      });
    }

    chain.evolutions.push(subChain);
  });

  return chain;
};

function Moves() {
  let { link = '906' } = useParams();
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const targetPmIndex = pokemonList.findIndex((pm) => pm.link === link);
  const pokemon = pokemonList[targetPmIndex];
  const evolutionChain = getEvolution(pokemonList, pokemon.source);

  useEffect(() => {
    document.title = `Pokédex ${pokemon.nameZh}`;
  }, [pokemon]);

  const [terasType, setTerasType] = useState<string | null>(null);
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
  const isMobile = window.screen.width < 768;

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
        {evolutionChain.evolutions !== undefined && (
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
              <div className="mx-auto flex items-center gap-4 text-gray-100 [writing-mode:vertical-lr] md:flex-row md:justify-around md:[writing-mode:horizontal-tb]">
                <PokemonBadge
                  pm={evolutionChain.pm}
                  size="text-sm"
                  direction={isMobile ? 'v' : 'h'}
                />
                <div className="flex flex-col gap-2 [writing-mode:vertical-lr] md:gap-1 md:[writing-mode:horizontal-tb]">
                  {evolutionChain.evolutions?.map((evolution) => (
                    <span
                      className="whitespace-nowrap text-sm leading-6"
                      key={evolution.pm.link}
                    >{`▪ ${evolution.condition} ➜`}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-2 [writing-mode:vertical-lr] md:gap-1 md:[writing-mode:horizontal-tb]">
                  {evolutionChain.evolutions?.map((evolution) => (
                    <PokemonBadge
                      pm={evolution.pm}
                      key={evolution.pm.link}
                      size="text-sm"
                      direction={isMobile ? 'v' : 'h'}
                    />
                  ))}
                </div>
                {evolutionChain.evolutions?.every((e) => e.evolutions) && (
                  <div className="flex flex-col gap-1">
                    {evolutionChain.evolutions?.map((evolution) =>
                      evolution.evolutions?.map((evolution) => (
                        <span
                          className="whitespace-nowrap text-sm leading-6"
                          key={evolution.pm.link}
                        >{`▪ ${evolution.condition} ➜`}</span>
                      ))
                    )}
                  </div>
                )}
                {evolutionChain.evolutions?.every((e) => e.evolutions) && (
                  <div className="flex flex-row gap-1 md:flex-col">
                    {evolutionChain.evolutions?.map((evolution) =>
                      evolution.evolutions?.map((evolution) => (
                        <PokemonBadge
                          pm={evolution.pm}
                          key={evolution.pm.link}
                          size="text-sm"
                          direction={isMobile ? 'v' : 'h'}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </InfoCard>
        )}
        <InfoCard>
          <div
            className={clsx(
              'rounded-lg p-4',
              evolutionChain.evolutions !== undefined ? 'bg-gradient-to-t' : 'bg-gradient-to-b',
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
