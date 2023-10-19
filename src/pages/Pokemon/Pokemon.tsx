import { Link, useParams } from 'react-router-dom';
import { usePokemonInfo } from './api';

function PokemonInfo() {
  let { link = '906' } = useParams();

  const { data } = usePokemonInfo(link);
  return (
    <>
      <details>
        <summary>招式</summary>
        <pre>{JSON.stringify(data.moves, null, 2)}</pre>
      </details>
      <details open>
        <summary>進化</summary>
        <pre>{JSON.stringify(data.evolves, null, 2)}</pre>
      </details>

      <Link to={`/pokedex`}>back</Link>
    </>
  );
}

export default PokemonInfo;
