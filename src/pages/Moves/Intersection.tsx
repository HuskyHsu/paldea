import { useQueries } from '@tanstack/react-query';

import { PokemonBadge } from '@/components';
import { Move, MOVE_INIT } from '@/models';
import { useFilterStore } from '@/store';
import { api } from '@/utils';

type Props = {
  moves: String[];
};

function useData(paths: String[]) {
  const results = useQueries({
    queries: paths.map((path) => {
      return {
        queryKey: [`move:${path}`],
        queryFn: () => api<Move>(`/data/relation/moves/${path}.json`),
      };
    }),
  });

  return results.map((result) => result.data || MOVE_INIT);
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
  const moveInfoList = useData(moves);

  const summary = moveInfoList.reduce((acc, move) => {
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
            <PokemonBadge pm={pm} key={pm.link + String(i)} />
          ))}
      </div>
      <hr className="my-3 h-px border-0 bg-gray-200" />
    </>
  );
}
