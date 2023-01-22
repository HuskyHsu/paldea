import { PokemonBadge } from '@/components';
import { BasePokemon, LevelMap, Move } from '@/models';

type MoveProps = {
  pokemonList: BasePokemon[];
  move: Move;
  evolution: boolean;
};

export function LevelingUps({ pokemonList, move, evolution }: MoveProps) {
  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">升等學習</h6>
      <div className="flex flex-wrap gap-2">
        {pokemonList
          .filter((pm) => move.levelingUps.find(({ link }) => pm.link === link))
          .filter((pm) => {
            if (!evolution) {
              return true;
            }
            if (pm.evolutions === undefined) {
              return true;
            }
            return !pm.evolutions.some((evolution) =>
              move.levelingUps.find(({ link }) => evolution.link === link)
            );
          })
          .map((pm, i) => {
            const levelingUps = move.levelingUps.find(({ link }) => pm.link === link);
            let level = levelingUps?.level ?? 0;

            return (
              <PokemonBadge
                pm={pm}
                getText={() => `${level > 0 ? 'Lv' + level : LevelMap[level]}`}
                key={pm.link + String(i)}
              />
            );
          })}
      </div>
    </>
  );
}
