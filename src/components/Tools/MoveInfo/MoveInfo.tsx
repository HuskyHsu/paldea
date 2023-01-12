import { useFilterStore } from '@/store';
import { useMove } from './api';
import { EggPokemons } from './EggPokemons';
import { LevelingUps } from './LevelingUps';
import { TechnicalMachine } from './TechnicalMachine';
import { Effective } from './Effective';
import { Raids } from './Raids';

type Props = {
  name: string;
};

export function MoveInfo({ name }: Props) {
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const { data } = useMove(name);

  return (
    <>
      <div className="space-x-2">
        <span className="inline text-lg font-bold">說明</span>
        <a
          href={`https://wiki.52poke.com/zh-hant/${data.nameZh}（招式）`}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-bold text-blue-800 underline"
        >
          wiki
        </a>
      </div>
      <p>{data.description}</p>
      <Effective move={data} />
      {data.levelingUps.length > 0 && <LevelingUps pokemonList={pokemonList} move={data} />}
      {data.technicalMachine && <TechnicalMachine pokemonList={pokemonList} move={data} />}
      {data.eggPokemons.length > 0 && <EggPokemons pokemonList={pokemonList} move={data} />}
      {data.raids && <Raids pokemonList={pokemonList} move={data} />}
    </>
  );
}
