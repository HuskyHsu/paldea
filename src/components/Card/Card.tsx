import { memo } from 'react';
import clsx from 'clsx';
import { BasePokemon } from '@/models';
import { Footer } from './Footer';
import { Body } from './Body';
import { Header } from './Header';

export interface CardProps {
  pokemon: BasePokemon;
}

export const Card = memo(({ pokemon }: CardProps) => {
  return (
    <div
      className={clsx('-mt-2 w-[calc(100%/3-12px)] md:-mt-6 md:max-w-[180px]', {
        hidden: !pokemon.display,
      })}
    >
      <Header paldeaId={pokemon.paldeaId} name={pokemon.nameZh} link={pokemon.link} />
      <Body pokemon={pokemon} />

      {pokemon.version && <Footer pokemon={pokemon} />}
    </div>
  );
});
