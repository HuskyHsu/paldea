import { useFilterStore } from '@/store';
import { useMove } from './api';
import { EggPokemons } from './EggPokemons';
import { LevelingUps } from './LevelingUps';
import { TechnicalMachine } from './TechnicalMachine';
import { Effective } from './Effective';
import { Raids } from './Raids';
import { useState } from 'react';

type Props = {
  name: string;
};

export function MoveInfo({ name }: Props) {
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const { data } = useMove(name);
  const [evolution, setEvolution] = useState(true);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <span className="inline text-lg font-bold">說明</span>
          <a
            href={`https://wiki.52poke.com/zh-hant/${data.nameZh}（招式）`}
            target="_blank"
            rel="noreferrer"
            className="inline text-lg font-bold text-blue-800 underline"
          >
            wiki
          </a>
        </div>
        <div className="flex items-center">
          <input
            id={name}
            type="checkbox"
            checked={evolution}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800 focus:ring-1 focus:ring-blue-800"
            onChange={() => setEvolution(!evolution)}
          />
          <label htmlFor={name} className="ml-2">
            僅顯示進化型
          </label>
        </div>
      </div>

      <p>{data.description}</p>
      <Effective move={data} />
      {data.levelingUps.length > 0 && (
        <LevelingUps pokemonList={pokemonList} move={data} evolution={evolution} />
      )}
      {data.technicalMachine && (
        <TechnicalMachine pokemonList={pokemonList} move={data} evolution={evolution} />
      )}
      {data.eggPokemons.length > 0 && (
        <EggPokemons pokemonList={pokemonList} move={data} evolution={evolution} />
      )}
      {data.raids && <Raids pokemonList={pokemonList} move={data} />}
    </>
  );
}
