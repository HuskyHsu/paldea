import { useMemo } from 'react';
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
} from '@/models';

import { Header, Base, InfoCard, Hero, Statistic } from './components';
import { columns, Table } from './MoveTable';
import { Hr, useTable, Weakness } from '@/components';
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

  if (data.raidMoves !== undefined) {
    data.raidMoves.forEach(({ level, moves, addMoves }) => {
      moves.forEach((move) => {
        const matchMove = list.find((item) => item.nameZh === move.nameZh);
        if (matchMove) {
          matchMove.selected = level >= 6;
        } else {
          list.push({
            source: `${level}*太晶`,
            selected: true,
            ...move,
          });
        }
      });
      addMoves.forEach((move) => {
        const matchMove = list.find((item) => item.nameZh === move.nameZh);
        if (matchMove) {
          matchMove.selected = level >= 6;
        } else {
          list.push({
            source: `${level}*太晶(盾)`,
            selected: true,
            ...move,
          });
        }
      });
    });
  }

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
        <InfoCard>
          <div
            className={clsx(
              'rounded-lg p-4',
              'bg-gradient-to-b',
              BgFromClass[pokemon.types[0] as keyof typeof BgClass],
              BgToClass[pokemon.types[pokemon.types.length - 1] as keyof typeof BgClass]
            )}
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100">屬性相剋</h5>
            {<Weakness types={pokemon.types} />}
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
