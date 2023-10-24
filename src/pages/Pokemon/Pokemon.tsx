import { useParams, useNavigate } from 'react-router-dom';

import { SubTitleSlide } from '@/newComponents';
import { usePokemonListContext } from '@/newComponents/contexts';
import { usePokemonInfo } from './api';
import { BaseInfo, Evolution, Header, Statistic } from './components';

function PokemonInfo() {
  const navigate = useNavigate();
  const { nameId = '噴火龍' } = useParams();
  const [name, altForm] = nameId.split('-');
  const { pokemonList } = usePokemonListContext();

  let { link } = pokemonList.find(
    (pm) => pm.nameZh === name && (altForm !== undefined ? pm.altForm === altForm : true)
  ) || { link: undefined };

  if (link === undefined) {
    ({ link } = pokemonList.find((pm) => pm.link === nameId) || { link: undefined });
  }

  if (link === undefined) {
    link = '4';
  }

  const { data: pm, status } = usePokemonInfo(link);

  if (pokemonList.length === 0 || status !== 'success') {
    return <></>;
  }

  return (
    <div className="flex justify-center">
      <div className="-mt-4 flex max-w-3xl flex-col gap-4">
        <Header pm={pm} />
        <h2 className="text-2xl">
          #{pm.pid.toString().padStart(4, '0')} {pm.nameZh}
          {pm.altForm && <span className="text-sm">({pm.altForm})</span>}
          <a
            href={`https://wiki.52poke.com/zh-hant/${pm.nameZh}`}
            target="_blank"
            rel="noreferrer"
            className="ml-2 font-bold text-blue-800 underline"
          >
            wiki
          </a>
        </h2>
        <BaseInfo pm={pm} />

        <Statistic pokemon={pm} />

        {pm.evolves !== undefined && (
          <>
            <SubTitleSlide title="進化" />
            <Evolution pm={pm} />
          </>
        )}

        <SubTitleSlide title="招式" />
        <details>
          <summary>招式</summary>
          <pre>{JSON.stringify(pm.moves, null, 2)}</pre>
        </details>

        <button onClick={() => navigate(-1)}>back</button>
      </div>
    </div>
  );
}

export default PokemonInfo;
