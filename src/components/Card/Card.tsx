import { memo } from 'react';
import clsx from 'clsx';
import { BasePokemon, NameSuffix } from '@/models';
import { Footer } from './Footer';
import { Body } from './Body';
import { Header } from './Header';

export interface CardProps {
  pokemon: BasePokemon;
}

export const Card = memo(({ pokemon }: CardProps) => {
  const pid = pokemon.nationalId.toString().padStart(3, '0');
  const paldeaId = pokemon.paldeaId.toString().padStart(3, '0');
  const altForm = pokemon.altForm
    ? '-' + NameSuffix[pokemon.altForm as keyof typeof NameSuffix]
    : '';

  return (
    <div
      className={clsx('-mt-2 w-[calc(100%/3-12px)] md:-mt-6 md:max-w-[180px]', {
        hidden: !pokemon.display,
      })}
    >
      <Header paldeaId={paldeaId} pid={pid} name={pokemon.nameZh} altForm={altForm} />
      <Body pokemon={pokemon} paldeaId={paldeaId} />

      {pokemon.version && <Footer pokemon={pokemon} />}
    </div>
  );
});
