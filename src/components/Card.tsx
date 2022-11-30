import clsx from 'clsx';

import {
  BasePokemon,
  NameSuffix,
  VersionType,
  TypeMap,
  TypeShow,
} from '../models';
import { VersionIcon } from './icon';
import { useFilterStore } from '../store';
import { TypeIcon } from './TypeIcon';

interface Props {
  pokemon: BasePokemon;
}

function isDisplay(pm: BasePokemon, types: TypeShow) {
  let display = true;

  if (Object.values(TypeMap).some((type) => !types[type])) {
    display = pm.types.find((type) => types[type]) !== undefined;
  }
  if (!display) {
    return display;
  }

  return display;
}

export function Card({ pokemon }: Props) {
  const pid = pokemon.nationalId.toString().padStart(3, '0');
  const paldeaId = pokemon.paldeaId.toString().padStart(3, '0');
  const altForm = pokemon.altForm
    ? '-' + NameSuffix[pokemon.altForm as keyof typeof NameSuffix]
    : '';
  const version = pokemon.version
    ? VersionType[pokemon.version as keyof typeof VersionType]
    : '';

  const types = useFilterStore((state) => state.types);
  const display = isDisplay(pokemon, types);

  return (
    <div
      className={clsx('w-[calc(100%/3-12px)] md:max-w-[180px] -mt-2 md:-mt-6', {
        hidden: !display,
      })}
    >
      <header
        className={clsx(
          'flex flex-col-reverse items-center justify-center',
          'md:flex-row md:items-end md:justify-between',
          '-mb-8 px-3 md:px-4'
        )}
      >
        <span className="hidden md:block leading-none">#{paldeaId}</span>
        <img
          className="min-h-[83px] md:min-h-[148x]"
          src={`${process.env.PUBLIC_URL}/image/icon/${pid}${altForm}.png`}
          alt={pokemon.nameZh}
          loading="lazy"
        />
      </header>

      <div
        className={clsx(
          'rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.1)] bg-white',
          'px-3 pt-10 md:px-4 text-center md:text-start',
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
            {pokemon.altForm && <sub>({pokemon.altForm})</sub>}
          </p>
          <div className="flex gap-x-2 justify-center md:justify-start">
            {pokemon.types.map((type) => (
              <TypeIcon type={type} key={type} />
            ))}
          </div>
        </div>
      </div>

      {pokemon.version && (
        <div
          className={clsx(
            'w-full flex justify-center',
            'py-1 rounded-b-xl',
            'text-white text-sm',
            pokemon.version === 'Scarlet' ? 'bg-scarlet' : 'bg-violet'
          )}
        >
          <p className="flex items-center w-full justify-center">
            {pokemon.version === 'Scarlet' ? (
              <VersionIcon.Scarlet className="w-4 mr-1" />
            ) : (
              <VersionIcon.Violet className="w-4 mr-1" />
            )}
            <span className="hidden md:block">版本</span>
            限定
            {'('}
            {version}
            {')'}
          </p>
        </div>
      )}
    </div>
  );
}
