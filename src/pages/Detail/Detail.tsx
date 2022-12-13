import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Stats } from '@/models';
import { Icon } from '@/components';
import { EggMoveTable } from './EggTable';
import { LevelUpMoveTable } from './LevelUpTable';
import { TMMoveTable } from './MTTable';
import { useFilterStore } from '@/store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Detail />
    </QueryClientProvider>
  );
}

function Detail() {
  let { link } = useParams();
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const pokemon = pokemonList.find((pm) => pm.link === link) ?? pokemonList[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [link],
    queryFn: () =>
      fetch(`${process.env.PUBLIC_URL}/data/pokemon/${link}.json`).then((res) => res.json()),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <div className="md:p-2">
      <p>{pokemon.nameZh}</p>
      <p>
        <span>{pokemon.nameEn}</span> <span>{pokemon.nameJp}</span>
      </p>
      <p className="flex space-x-2">
        {pokemon.types.map((type) => (
          <Icon.Type type={type} key={type} />
        ))}
      </p>

      <p>特性: {pokemon.abilities}</p>
      <p>隱藏特性: {pokemon.hiddenAbility}</p>

      <ul className="flex space-x-2">
        {(Object.keys(Stats) as (keyof typeof Stats)[])
          .filter((key) => isNaN(Number(key)))
          .map((key) => (
            <li key={key}>{`${key}: ${pokemon.stats[Stats[key]]}`}</li>
          ))}
      </ul>

      {data.levelingUps.length > 0 && <LevelUpMoveTable data={data.levelingUps} />}
      {data.technicalMachines.length > 0 && <TMMoveTable data={data.technicalMachines} />}
      {data.eggMoves.length > 0 && <EggMoveTable data={data.eggMoves} />}
    </div>
  );
}

export default App;
