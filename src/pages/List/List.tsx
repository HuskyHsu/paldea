import { useState } from 'react';
import clsx from 'clsx';

import { Card } from '@/components';
import { useFilterStore } from '@/store';
import { Header } from './Header';
import { Hr } from './components';

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const [displayCount, setDisplayCount] = useState(20);

  const updateDisplayCount = () => {
    setDisplayCount((prev) => prev + 20);
  };

  const otherPmList = pokemonList.filter((pm) => pm.paldeaId === '---').filter((pm) => pm.display);

  return (
    <div className="min-h-full rounded-xl bg-custom-lightgrey drop-shadow-xl">
      <Header />
      <div className="grid grid-cols-list-mobile justify-around gap-4 p-4 md:grid-cols-list">
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
      <div
        className={clsx('p-4', {
          hidden: otherPmList.length === 0,
        })}
      >
        <Hr />
      </div>
      <div className="grid grid-cols-list-mobile justify-around gap-4 px-4 pb-4 md:grid-cols-list">
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
    </div>
  );
}

export default List;
