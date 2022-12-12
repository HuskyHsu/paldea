import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { EggMoveTable } from './EggTable';
import { LevelUpMoveTable } from './LevelUpTable';
import { TMMoveTable } from './MTTable';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Detail />
    </QueryClientProvider>
  );
}

function Detail() {
  let { link = '001' } = useParams();

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
      {data.levelingUps.length > 0 && <LevelUpMoveTable data={data.levelingUps} />}
      {data.technicalMachines.length > 0 && <TMMoveTable data={data.technicalMachines} />}
      {data.eggMoves.length > 0 && <EggMoveTable data={data.eggMoves} />}
    </div>
  );
}

export default App;
