import { PokemonBadge } from '@/components';
import { BasePokemon, Move } from '@/models';

type MoveProps = {
  pokemonList: BasePokemon[];
  move: Move;
};

export function EggPokemons({ pokemonList, move }: MoveProps) {
  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">蛋招式</h6>
      <div className="flex flex-wrap gap-y-2">
        {pokemonList
          .filter((pm) => move.eggPokemons.find((link) => pm.link === link))
          .map((pm, i) => (
            <PokemonBadge pm={pm} key={pm.link + String(i)} />
          ))}
      </div>
    </>
  );
}
