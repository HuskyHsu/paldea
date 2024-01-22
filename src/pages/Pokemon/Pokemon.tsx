import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { SubTitleSlide } from '@/newComponents/common';
import { usePokemonListContext } from '@/newComponents/contexts';
import { SubCard } from '@/newComponents/game';
import { defaultPokemon } from './api';
import {
  BaseInfo,
  Evolution,
  Header,
  HeaderName,
  Moves,
  QuickLink,
  Statistic,
  TabButtom,
  TypeWeakness,
} from './components';
import { FullPokemon } from '@/types/Pokemon';
import { api } from '@/utils';

const localStorageKey = 'pokemonPage';

function PokemonInfo() {
  const navigate = useNavigate();
  const { nameId = '' } = useParams();
  const [name, ...altFormList] = nameId.split('-');
  const altForm = altFormList.length > 0 ? altFormList.join('-') : undefined;
  const { pokemonList } = usePokemonListContext();

  const tabList = ['基本資訊', '屬性與能力值', '招式清單'];
  const [tab, setTab] = useState(() => {
    const savedData = localStorage.getItem(localStorageKey) || tabList[0];
    return savedData;
  });

  const [pm, setPm] = useState<FullPokemon>(defaultPokemon);

  let { link } = pokemonList.find(
    (pm) => pm.nameZh === name && (altForm !== undefined ? pm.altForm === altForm : true)
  ) || { link: undefined };

  if (link === undefined) {
    ({ link } = pokemonList.find((pm) => pm.link === nameId) || { link: undefined });
  }

  useEffect(() => {
    (async () => {
      if (link !== undefined) {
        const data = await api<FullPokemon>(`/data/pm/${link}.json`);
        setPm(data);
      }
    })();
  }, [link]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, tab);
  }, [tab]);

  useEffect(() => {
    document.title = `${nameId} Pokédex`;
  }, [nameId]);

  if (pokemonList.length === 0) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="-mx-4 -mt-4 w-full">
        <Header pm={pm} />
      </div>
      <div className="mt-4 flex w-full max-w-3xl flex-col gap-4">
        <HeaderName pm={pm} />
        <QuickLink pokemonList={pokemonList} link={link || '1'} />

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
            {pm.formChangin && (
              <>
                <SubTitleSlide title="型態變化" />
                <div className="mt-4 flex flex-wrap justify-around gap-4">
                  {pm.formChangin.map((subPm) => (
                    <SubCard pm={subPm} key={subPm.link} />
                  ))}
                </div>
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
