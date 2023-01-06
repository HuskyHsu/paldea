import { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BasePokemon } from '@/models';
import { Footer } from './Footer';
import { Body } from './Body';
import { Header } from './Header';
import { useIntersectionObserver } from './Hooks';

export type CardProps = {
  pokemon: BasePokemon;
};

export const Card = memo(
  ({
    pokemon,
    maxIndex,
    index,
    updateDisplayCount,
  }: CardProps & { maxIndex: number; index: number; updateDisplayCount: Function }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const isVisible = !!entry?.isIntersecting;

    useEffect(() => {
      if (isVisible && maxIndex === index + 1) {
        updateDisplayCount();
      }
    }, [isVisible, index, maxIndex, updateDisplayCount]);

    return (
      <div
        className={clsx('-mt-2 w-full md:-mt-6 md:max-w-[180px]', {
          hidden: !pokemon.display,
        })}
        ref={ref}
      >
        <div className="w-full">
          <Header
            paldeaId={pokemon.paldeaId !== '---' ? pokemon.paldeaId : pokemon.nationalId}
            name={pokemon.nameZh}
            link={pokemon.link}
          />
          <Body pokemon={pokemon} />

          {pokemon.version && <Footer pokemon={pokemon} />}
        </div>
      </div>
    );
  }
);
