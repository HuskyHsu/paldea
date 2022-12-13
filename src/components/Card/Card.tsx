import { memo } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { BasePokemon } from '@/models';
import { Footer } from './Footer';
import { Body } from './Body';
import { Header } from './Header';

export interface CardProps {
  pokemon: BasePokemon;
}

export const Card = memo(({ pokemon }: CardProps) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/${pokemon.link}`, { state: { pokemon } });
  }

  return (
    <div
      className={clsx('-mt-2 w-[calc(100%/3-12px)] md:-mt-6 md:max-w-[180px]', {
        hidden: !pokemon.display,
      })}
    >
      <button onClick={handleClick}>
        <Header paldeaId={pokemon.paldeaId} name={pokemon.nameZh} link={pokemon.link} />
        <Body pokemon={pokemon} />

        {pokemon.version && <Footer pokemon={pokemon} />}
      </button>
    </div>
  );
});
