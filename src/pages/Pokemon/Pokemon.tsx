import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { SubTitleSlide } from '@/newComponents/common';
import { usePokemonListContext } from '@/newComponents/contexts';
import { usePokemonInfo } from './api';
import {
  BaseInfo,
  Evolution,
  Header,
  HeaderName,
  Moves,
  Statistic,
  TypeWeakness,
} from './components';

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
          'inline-block rounded-t-lg border-b-2 p-2 md:p-4',
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
  const localStorageKey = 'pokemonPage';

  const navigate = useNavigate();
  const { nameId = '噴火龍' } = useParams();
  const [name, altForm] = nameId.split('-');
  const { pokemonList } = usePokemonListContext();
  const tabList = ['基本資訊', '屬性與能力值', '招式清單'];
  const [tab, setTab] = useState(() => {
    const savedData = localStorage.getItem(localStorageKey) || tabList[0];
    return savedData;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, tab);
  }, [tab]);

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
        <HeaderName pm={pm} />

        <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
          <ul className="-mb-px flex flex-wrap">
            {tabList.map((tabName) => {
              return <TabButtom title={tabName} selectTab={tab} setTab={setTab} key={tabName} />;
            })}
          </ul>
        </div>

        {tab === '基本資訊' && (
          <>
            <BaseInfo pm={pm} />
            {pm.evolves !== undefined && (
              <>
                <SubTitleSlide title="進化途徑" />
                <Evolution pm={pm} />
              </>
            )}
          </>
        )}

        {tab === tabList[1] && (
          <>
            <Statistic pokemon={pm} />
            <TypeWeakness pm={pm} />
          </>
        )}

        {tab === '招式清單' && <Moves pm={pm} />}

        <button onClick={() => navigate(-1)}>back</button>
      </div>
    </div>
  );
}

export default PokemonInfo;
