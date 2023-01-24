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
  TypeMap,
  TypeNameMap,
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

function Moves() {
  let { link = '906' } = useParams();
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const targetPmIndex = pokemonList.findIndex((pm) => pm.link === link);
  const pokemon = pokemonList[targetPmIndex];
  const basePm = pokemonList.find((pm) => pm.link === pokemon.source) as BasePokemon;

  const { status, login, logout, profile, share } = useLiffContext();

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
          </div>
        </InfoCard>
        <div>
          <div>
            {status.isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <button onClick={login}>Login</button>
            )}
          </div>
          <div>{profile.displayName}</div>
          {status.isLoggedIn && (
            <button
              onClick={() => {
                share([
                  {
                    type: 'text',
                    text: `${pokemon.nameZh}: ${
                      TypeNameMap[terasType as keyof typeof TypeMap]
                    }太晶 - ${'團戰邀請碼測試啦～～'}`,
                  },
                ]);
              }}
            >
              Share
            </button>
          )}
        </div>
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
