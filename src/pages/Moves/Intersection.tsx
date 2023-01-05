import { PokemonBadge } from '@/components';
import { BasePokemon, Move } from '@/models';
import { useFilterStore } from '@/store';
import { useMultApi } from '@/utils';

interface Props {
  moves: String[];
}

const init = {
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
};

function useData(names: String[]) {
  return useMultApi<Move>({
    queryKey: `move`,
    paths: names.map((name) => `/data/relation/moves/${name}.json`),
    initialData: init,
  });
}

function addtoSet(acc: Record<string, Set<string>>, link: string, move: Move) {
  if (acc[link] === undefined) {
    acc[link] = new Set();
  }
  acc[link].add(move.nameZh);
  return acc;
}

export function Intersection({ moves }: Props) {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const queries = useData(moves);
  if (queries.some((query) => query.isLoading)) {
    return <span>Loading</span>;
  }

  if (queries.some((query) => query.isError)) {
    return <span>Error</span>;
  }

  const summary = queries
    .map((query) => query.data || init)
    .reduce((acc, move) => {
      move.levelingUps.forEach(({ link }) => addtoSet(acc, link, move));
      move.technicalMachine?.pokemon.forEach((link) => addtoSet(acc, link, move));
      move.eggPokemons.forEach((link) => addtoSet(acc, link, move));

      return acc;
    }, {} as Record<string, Set<string>>);

  const intersectionList = new Set(
    Object.entries(summary)
      .filter(([_, set]) => set.size === moves.length)
      .map(([link]) => link)
  );

  return (
    <>
      <h6 className="text-sm font-bold text-gray-700">
        {`${intersectionList.size === 0 ? '無' : ''}`}
        同時擁有
        {` ${moves.join(', ')} `}
        的寶可夢
      </h6>
      <h6 className="text-xs text-gray-500">(最多查詢四種招式)</h6>
      <div className="mt-2 flex flex-wrap gap-y-2">
        {pokemonList
          .filter((pm) => intersectionList.has(pm.link))
          .map((pm, i) => (
            <PokemonBadge
              pm={pm}
              getText={(pm: BasePokemon) => pm.nameZh}
              key={pm.link + String(i)}
            />
          ))}
      </div>
      <hr className="my-3 h-px border-0 bg-gray-200" />
    </>
  );
}
