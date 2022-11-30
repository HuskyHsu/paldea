import clsx from 'clsx';

import {
  BasePokemon,
  NameSuffix,
  VersionType,
  TypeMap,
  TypeShow,
} from '../models';
import { useFilterStore } from '../store';
import { Icon } from '.';

interface Props {
  pokemon: BasePokemon;
}

interface HeaderProps {
  paldeaId: string;
  pid: string;
  name: string;
  altForm: string;
}

interface BodyProps {
  pokemon: BasePokemon;
  paldeaId: string;
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

function Header({ paldeaId, pid, name, altForm }: HeaderProps) {
  return (
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
        alt={name}
        loading="lazy"
      />
    </header>
  );
}

function Body({ pokemon, paldeaId }: BodyProps) {
  return (
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
          {pokemon.nameZh}{' '}
          {pokemon.altForm && (
            <span className="text-xs font-thin">({pokemon.altForm})</span>
          )}
        </p>
        <div className="flex justify-center md:justify-between">
          <div className="flex gap-x-2 justify-center md:justify-start">
            {pokemon.types.map((type) => (
              <Icon.Type type={type} key={type} />
            ))}
          </div>
          <div
            className={clsx(
              'gap-y-2',
              (pokemon.altForm === null || pokemon.altForm.length < 4) &&
                '-mt-6',
              'hidden md:flex md:flex-col'
            )}
          >
            {pokemon.abilities.map((ability) => (
              <span
                className="bg-blue-100 text-blue-800 text-xs text-center font-semibold px-1.5 py-0.5 rounded"
                key={ability}
              >
                {ability}
              </span>
            ))}
            {pokemon.hiddenAbility && (
              <span className="bg-gray-100 text-gray-800 text-xs text-center font-semibold px-1.5 py-0.5 rounded">
                {pokemon.hiddenAbility}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ pokemon }: Props) {
  const version = pokemon.version
    ? VersionType[pokemon.version as keyof typeof VersionType]
    : '';

  return (
    <div
      className={clsx(
        'w-full flex justify-center',
        'py-1 rounded-b-xl',
        'text-white text-sm',
        pokemon.version === 'Scarlet' ? 'bg-scarlet' : 'bg-violet'
      )}
    >
      <p className="flex items-center w-full justify-center md:justify-start md:pl-4">
        {pokemon.version === 'Scarlet' ? (
          <Icon.Version.Scarlet className="w-4 mr-1" />
        ) : (
          <Icon.Version.Violet className="w-4 mr-1" />
        )}
        <span className="hidden md:block">版本</span>
        限定
        {'('}
        {version}
        {')'}
      </p>
    </div>
  );
}

export function Card({ pokemon }: Props) {
  const pid = pokemon.nationalId.toString().padStart(3, '0');
  const paldeaId = pokemon.paldeaId.toString().padStart(3, '0');
  const altForm = pokemon.altForm
    ? '-' + NameSuffix[pokemon.altForm as keyof typeof NameSuffix]
    : '';

  const types = useFilterStore((state) => state.types);
  const display = isDisplay(pokemon, types);

  return (
    <div
      className={clsx('w-[calc(100%/3-12px)] md:max-w-[180px] -mt-2 md:-mt-6', {
        hidden: !display,
      })}
    >
      <Header
        paldeaId={paldeaId}
        pid={pid}
        name={pokemon.nameZh}
        altForm={altForm}
      />
      <Body pokemon={pokemon} paldeaId={paldeaId} />

      {pokemon.version && <Footer pokemon={pokemon} />}
    </div>
  );
}
