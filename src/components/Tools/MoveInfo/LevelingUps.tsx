import { PokemonBadge } from '@/components';
import { BasePokemon, LevelMap, Move } from '@/models';

type MoveProps = {
  pokemonList: BasePokemon[];
  move: Move;
};

export function LevelingUps({ pokemonList, move }: MoveProps) {
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
                getText={() => `${level > 0 ? 'Lv' + level : LevelMap[level]}`}
                key={pm.link + String(i)}
              />
            );
          })}
      </div>
    </>
  );
}
