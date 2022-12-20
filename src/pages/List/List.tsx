import { useState } from 'react';

import { Card } from '@/components';
import { useFilterStore } from '@/store';
import { Header } from './Header';

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  const [displayCount, setDisplayCount] = useState(20);

  const updateDisplayCount = () => {
    setDisplayCount((prev) => prev + 20);
  };

  return (
    <div className="min-h-full rounded-xl bg-custom-lightgrey drop-shadow-xl">
      <Header />
      <div className="flex flex-wrap justify-around gap-4 p-4">
        {pokemonList
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
    </div>
  );
}

export default List;
