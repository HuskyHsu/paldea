import { PokemonBadge } from '@/components';
import { BasePokemon, Move } from '@/models';

type MoveProps = {
  pokemonList: BasePokemon[];
  move: Move;
  evolution: boolean;
};

export function TechnicalMachine({ pokemonList, move, evolution }: MoveProps) {
  if (move.technicalMachine === null) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">招式機</h6>
      <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1">
        <li>編號：#{move.technicalMachine.pid.toString().padStart(3, '0')}</li>
        <li>聯盟點數：{move.technicalMachine.leaguePoint}</li>
        <li>材料：{move.technicalMachine.material}</li>
      </ul>
      <div className="mt-2 flex flex-wrap gap-2">
        {pokemonList
          .filter((pm) => move.technicalMachine?.pokemon.includes(pm.link))
          .filter((pm) => {
            if (!evolution) {
              return true;
            }
            if (pm.evolutions === undefined) {
              return true;
            }
            return !pm.evolutions.some((evolution) =>
              move.technicalMachine?.pokemon.includes(evolution.link)
            );
          })
          .map((pm, i) => (
            <PokemonBadge pm={pm} key={pm.link + String(i)} />
          ))}
      </div>
    </>
  );
}
