import clsx from 'clsx';
import { BasePokemon } from '@/models';
import { useFilterActions } from '@/store';
import { Icon } from '..';

interface BodyProps {
  pokemon: BasePokemon;
  paldeaId: string;
}

export function Body({ pokemon, paldeaId }: BodyProps) {
  const { updateKeyword } = useFilterActions();

  return (
    <div
      className={clsx(
        'rounded-xl bg-white shadow-[0_5px_25px_rgba(0,0,0,0.1)]',
        'px-3 pt-10 text-center md:px-4 md:text-start',
        pokemon.version && 'rounded-b-none'
      )}
    >
      <div
        className={clsx(
          'border-0 border-t-[1px] border-[#A29834]',
          'flex flex-col gap-y-1 pt-2 pb-4'
        )}
      >
        <p className="md:hidden">#{paldeaId}</p>
        <p>
          {pokemon.nameZh}
          {pokemon.altForm && <span className="block text-xs font-thin">({pokemon.altForm})</span>}
        </p>
        <div className="flex justify-center md:justify-between">
          <div className="flex justify-center gap-x-2 md:justify-start">
            {pokemon.types.map((type) => (
              <Icon.Type type={type} key={type} />
            ))}
          </div>
          <div
            className={clsx(
              'gap-y-2',
              pokemon.altForm === null ? '-mt-6' : '-mt-10',
              'hidden md:flex md:flex-col'
            )}
          >
            {pokemon.abilities.map((ability) => (
              <button
                className="rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800"
                key={ability}
                onClick={() => updateKeyword(ability)}
              >
                {ability}
              </button>
            ))}
            {pokemon.hiddenAbility && (
              <button
                className="rounded bg-gray-100 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800"
                onClick={() => updateKeyword(pokemon.hiddenAbility as string)}
              >
                {pokemon.hiddenAbility}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
