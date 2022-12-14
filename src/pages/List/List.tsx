import { Card } from '@/components';
import { useFilterStore } from '@/store';
import { Header } from './Header';

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);

  return (
    <div className="min-h-full rounded-xl bg-custom-lightgrey drop-shadow-xl">
      <Header />
      <div className="flex flex-wrap justify-around gap-4 p-4">
        {pokemonList.map((pm, i) => (
          <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm + String(i)} />
        ))}
      </div>
    </div>
  );
}

export default List;
