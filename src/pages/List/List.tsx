import { useEffect, useState } from 'react';

import { Card, Hr } from '@/components';
import { useFilterStore } from '@/store';
import { Header } from './Header';

const PAGE_COUNT = 20;

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const [displayCount, setDisplayCount] = useState(PAGE_COUNT);

  const updateDisplayCount = () => {
    setDisplayCount((prev) => prev + PAGE_COUNT);
  };

  useEffect(() => {
    setDisplayCount(PAGE_COUNT);
  }, [pokemonList]);

  const otherPmList = pokemonList.filter((pm) => pm.paldeaId === '---').filter((pm) => pm.display);

  return (
    <>
      <Header />
      <div className="grid grid-cols-list-mobile justify-around gap-4 px-4 pt-4 pb-8 md:grid-cols-list">
        {pokemonList
          .filter((pm) => pm.paldeaId !== '---')
          .filter((pm) => pm.display)
          .filter((_, i) => i < displayCount)
          .map((pm, i) => {
            const key = pm.link + String(i);
            return (
              <Card
                pokemon={pm}
                maxIndex={displayCount}
                index={i}
                updateDisplayCount={updateDisplayCount}
                key={key}
              />
            );
          })}
      </div>
      {otherPmList.length > 0 && (
        <div className={'p-4'}>
          <Hr />
        </div>
      )}
      {otherPmList.length > 0 && (
        <div className="grid grid-cols-list-mobile justify-around gap-4 px-4 pb-8 md:grid-cols-list">
          {otherPmList.map((pm, i) => {
            const key = pm.link + String(i);
            return (
              <Card
                pokemon={pm}
                maxIndex={9999}
                index={i}
                updateDisplayCount={updateDisplayCount}
                key={key}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default List;
