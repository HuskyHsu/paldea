import { PokemonBadge } from '@/components';
import { BasePokemon, Move } from '@/models';

type MoveProps = {
  pokemonList: BasePokemon[];
  move: Move;
};

export function Raids({ pokemonList, move }: MoveProps) {
  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">太晶團體戰</h6>
      <div className="flex flex-wrap gap-2">
        {pokemonList
          .filter((pm) => (move.raids || []).find(({ link }) => pm.link === link))
          .map((pm, i) => {
            const levelingUps = move.raids?.find(({ link }) => pm.link === link);
            let level = levelingUps?.level ?? 0;

            return <PokemonBadge pm={pm} getText={() => `${level}星`} key={pm.link + String(i)} />;
          })}
      </div>
    </>
  );
}
