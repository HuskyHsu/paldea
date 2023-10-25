import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { SubTitleSlide } from '@/newComponents';
import { usePokemonListContext } from '@/newComponents/contexts';
import { usePokemonInfo } from './api';
import { BaseInfo, Evolution, Header, Statistic } from './components';
import { useState } from 'react';

function TabButtom({
  title,
  selectTab,
  setTab,
}: {
  title: string;
  selectTab: string;
  setTab: (title: string) => void;
}) {
  return (
    <li className="mr-2">
      <button
        className={clsx(
          'inline-block rounded-t-lg border-b-2 p-4',
          selectTab === title
            ? 'border-custom-gold text-custom-gold'
            : 'border-transparent hover:border-gray-300 hover:text-gray-600'
        )}
        onClick={() => setTab(title)}
      >
        {title}
      </button>
    </li>
  );
}

function PokemonInfo() {
  const navigate = useNavigate();
  const { nameId = '噴火龍' } = useParams();
  const [name, altForm] = nameId.split('-');
  const { pokemonList } = usePokemonListContext();
  const [tab, setTab] = useState('基本資訊');

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
    <div className="flex w-full justify-center">
      <div className="-mt-4 flex w-full max-w-3xl flex-col gap-4">
        <Header pm={pm} />
        <h2 className="-my-2 text-2xl">
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

        <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
          <ul className="-mb-px flex flex-wrap">
            <TabButtom title="基本資訊" selectTab={tab} setTab={setTab} />
            <TabButtom title="進化途徑" selectTab={tab} setTab={setTab} />
            <TabButtom title="招式清單" selectTab={tab} setTab={setTab} />
          </ul>
        </div>

        {tab === '基本資訊' && (
          <>
            <BaseInfo pm={pm} />
            <Statistic pokemon={pm} />
          </>
        )}

        {tab === '進化途徑' && (
          <>
            {pm.evolves !== undefined && (
              <>
                <SubTitleSlide title="進化途徑" />
                <Evolution pm={pm} />
              </>
            )}
          </>
        )}

        {tab === '招式清單' && (
          <>
            <SubTitleSlide title="招式清單" />
            <details>
              <summary>招式</summary>
              <pre>{JSON.stringify(pm.moves, null, 2)}</pre>
            </details>
          </>
        )}

        <button onClick={() => navigate(-1)}>back</button>
      </div>
    </div>
  );
}

export default PokemonInfo;
