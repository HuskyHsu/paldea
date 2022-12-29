import { useApi } from '@/utils';

interface MoveProps {
  nameZh: string;
  nameJp: string;
  nameEn: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
  PP: number;
  description: string;
}

function Moves() {
  const { isLoading, isError, data, error } = useApi<MoveProps[]>({
    queryKey: 'moves',
    path: '/data/relation/moves.json',
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <>
      {data.map((row) => (
        <p key={row.nameZh}>{row.nameZh}</p>
      ))}
    </>
  );
}

export default Moves;
