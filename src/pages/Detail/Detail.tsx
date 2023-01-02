import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useFilterStore } from '@/store';
import { useApi } from '@/utils';
import {
  BaseMove,
  BgClass,
  BgFromClass,
  BgToClass,
  LevelMap,
  LevelUpMove,
  PMMove,
  TMMove,
} from '@/models';
// import { PokemonList } from '@/components';

import { Header, Base, InfoCard, Hero, Statistic } from './components';
import { useMoveTable } from './MoveTable';

function Moves() {
  let { link } = useParams();
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const pokemon = pokemonList.find((pm) => pm.link === link);

  const { isError, data, error } = useApi({
    queryKey: `pm:${link}`,
    path: `/data/pokemon/${link}.json`,
    initialData: {
      eggMoves: [] as BaseMove[],
      levelingUps: [] as LevelUpMove[],
      technicalMachines: [] as TMMove[],
    },
  });

  const mergeMove: PMMove[] = [
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
        source: `TM${pid}`,
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

  const table = useMoveTable(mergeMove);

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  if (pokemon === undefined) {
    return <span>undefined</span>;
  }

  return (
    <>
      <Header />
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
      </div>
      <table className="w-full rounded-lg text-left text-sm text-gray-500 shadow-md">
        <thead className="sticky top-0 bg-custom-gold/50 text-xs uppercase text-gray-100">
          <tr>
            {table.getHeader().map((th, i) => (
              <th key={i} className={clsx('whitespace-nowrap py-3 px-2 text-center')}>
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.tableData.map((row, i) => (
            <tr className="cursor-pointer border-b bg-white hover:bg-gray-50" key={i}>
              {table.getRow(row).map((val, j) => (
                <td className="whitespace-nowrap py-3 px-2 text-center" key={j}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Moves;
