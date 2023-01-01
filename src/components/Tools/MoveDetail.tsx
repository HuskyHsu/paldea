import { Loading, PokemonBadge } from '@/components';
import { BasePokemon, LevelMap, Move } from '@/models';
import { useFilterStore } from '@/store';
import { useApi } from '@/utils';

interface Prop {
  name: string;
}

interface MoveProp {
  pokemonList: BasePokemon[];
  move: Move;
}

function LevelingUps({ pokemonList, move }: MoveProp) {
  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">升等學習</h6>
      <div className="flex flex-wrap gap-y-2">
        {pokemonList
          .filter((pm) => move.levelingUps.find(({ link }) => pm.link === link))
          .map((pm, i) => {
            const levelingUps = move.levelingUps.find(({ link }) => pm.link === link);
            let level = levelingUps?.level ?? 0;

            return (
              <PokemonBadge
                pm={pm}
                getText={(pm: BasePokemon) =>
                  `${pm.nameZh}: ${level > 0 ? 'Lv' + level : LevelMap[level]}`
                }
                key={pm.link + String(i)}
              />
            );
          })}
      </div>
    </>
  );
}

function TechnicalMachine({ pokemonList, move }: MoveProp) {
  if (move.technicalMachine === null) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">招式機</h6>
      <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1">
        <li>編號：{move.technicalMachine.pid}</li>
        <li>聯盟點數：{move.technicalMachine.leaguePoint}</li>
        <li>材料：{move.technicalMachine.material}</li>
      </ul>
      <div className="mt-2 flex flex-wrap gap-y-2">
        {pokemonList
          .filter((pm) => move.technicalMachine?.pokemon.includes(pm.link))
          .map((pm, i) => (
            <PokemonBadge
              pm={pm}
              getText={(pm: BasePokemon) => pm.nameZh}
              key={pm.link + String(i)}
            />
          ))}
      </div>
    </>
  );
}

function EggPokemons({ pokemonList, move }: MoveProp) {
  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">蛋招式</h6>
      <div className="flex flex-wrap gap-y-2">
        {pokemonList
          .filter((pm) => move.eggPokemons.find((link) => pm.link === link))
          .map((pm, i) => (
            <PokemonBadge
              pm={pm}
              getText={(pm: BasePokemon) => pm.nameZh}
              key={pm.link + String(i)}
            />
          ))}
      </div>
    </>
  );
}

export function PokemonList({ name }: Prop) {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const { isLoading, isError, data, error } = useApi<Move>({
    queryKey: `move:${name}`,
    path: `/data/relation/moves/${name}.json`,
    initialData: {
      nameZh: '',
      type: 'Normal',
      category: '',
      power: 0,
      accuracy: 100,
      PP: 0,
      description: '',
      eggPokemons: [],
      levelingUps: [],
      technicalMachine: null,
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

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
      {data.levelingUps.length > 0 && <LevelingUps pokemonList={pokemonList} move={data} />}
      {data.technicalMachine && <TechnicalMachine pokemonList={pokemonList} move={data} />}
      {data.eggPokemons.length > 0 && <EggPokemons pokemonList={pokemonList} move={data} />}
    </>
  );
}
