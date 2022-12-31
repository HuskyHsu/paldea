import { BasePokemon, BgClass, BgFromClass, BgToClass, LevelMap, Move } from '@/models';
import { useFilterStore } from '@/store';
import { useApi } from '@/utils';
import clsx from 'clsx';

interface Porp {
  name: string;
}

function PokemonBadge({ pm, getText }: { pm: BasePokemon; getText: Function }) {
  return (
    <span
      className={clsx(
        'mr-2 whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-semibold text-white',
        'bg-gradient-to-r',
        BgFromClass[pm.types[0] as keyof typeof BgClass],
        BgToClass[pm.types[pm.types.length - 1] as keyof typeof BgClass]
      )}
    >
      {getText(pm)}
    </span>
  );
}

export function PokemonList({ name }: Porp) {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const { isLoading, isError, data, error } = useApi<Move>({
    queryKey: `move:${name}`,
    path: `/data/relation/moves/${name}.json`,
    initialData: {
      nameZh: '拍擊',
      type: 'Normal',
      category: 'Physical',
      power: 40,
      accuracy: 100,
      PP: 35,
      description: '使用長長的尾巴或手等拍打對手進行攻擊。',
      eggPokemons: [],
      levelingUps: [],
      technicalMachine: null,
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <>
      <p className="text-lg">說明</p>
      {data.description}
      {data.levelingUps.length > 0 && (
        <>
          <h2 className="text-lg">升等學習</h2>
          <div className="flex flex-wrap gap-y-2">
            {pokemonList
              .filter((pm) => data.levelingUps.find(({ link }) => pm.link === link))
              .map((pm) => {
                const levelingUps = data.levelingUps.find(({ link }) => pm.link === link);
                let level = levelingUps?.level ?? 0;

                return (
                  <PokemonBadge
                    pm={pm}
                    getText={(pm: BasePokemon) =>
                      `${pm.nameZh}: ${level > 0 ? 'Lv' + level : LevelMap[level]}`
                    }
                  />
                );
              })}
          </div>
        </>
      )}
      {data.technicalMachine && (
        <>
          <h2 className="text-lg">招式機</h2>
          <p>編號：{data.technicalMachine.pid}</p>
          <p>聯盟點數：{data.technicalMachine.leaguePoint}</p>
          <p>材料：{data.technicalMachine.material}</p>
          <div className="flex flex-wrap gap-y-2">
            {pokemonList
              .filter((pm) => data.technicalMachine?.pokemon.includes(pm.link))
              .map((pm) => (
                <PokemonBadge pm={pm} getText={(pm: BasePokemon) => pm.nameZh} />
              ))}
          </div>
        </>
      )}
      {data.eggPokemons.length > 0 && (
        <>
          <h2 className="text-lg">蛋招式</h2>
          <div className="flex flex-wrap gap-y-2">
            {pokemonList
              .filter((pm) => data.eggPokemons.find((link) => pm.link === link))
              .map((pm) => (
                <PokemonBadge pm={pm} getText={(pm: BasePokemon) => pm.nameZh} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
