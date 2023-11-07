import { usePokemonListContext } from '@/newComponents/contexts';
import { PokemonBadge } from '@/newComponents/game';
import { FullMove, Move } from '@/types/Pokemon';

type Props = {
  fullMoves: FullMove[];
};

function addtoSet(acc: Record<string, Set<string>>, link: string, move: Move) {
  if (acc[link] === undefined) {
    acc[link] = new Set();
  }
  acc[link].add(move.nameZh);
  return acc;
}

export function Intersection({ fullMoves }: Props) {
  const { pokemonList } = usePokemonListContext();

  const summary = fullMoves.reduce((acc, move) => {
    move.levelingUps.forEach(({ link }) => addtoSet(acc, link, move));
    move.egg.forEach(({ link }) => addtoSet(acc, link, move));
    move.TM?.pm.forEach(({ link }) => addtoSet(acc, link, move));

    return acc;
  }, {} as Record<string, Set<string>>);

  const intersectionList = new Set(
    Object.entries(summary)
      .filter(([_, set]) => set.size === fullMoves.length)
      .map(([link]) => link)
  );

  return (
    <>
      <h6 className="text-sm font-bold text-gray-700">
        同時擁有
        {` ${fullMoves.map((move) => move.nameZh).join(', ')} `}
        的寶可夢
      </h6>
      <h6 className="text-xs text-gray-500">(最多查詢四種招式)</h6>
      <div className="mt-2 flex flex-wrap gap-2">
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
