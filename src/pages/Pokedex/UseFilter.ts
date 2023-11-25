import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BoolKeys, ValueKeys } from '@/utils';
import { Filter, Display } from './Pokedex';
import { PokedexFrom } from '@/types/Pokemon';

const localStorageKey = 'pokeDexPage';

function getCache(): Record<string, string> {
  const cacheStr = localStorage.getItem(localStorageKey);
  let cacheObj = {};
  if (cacheStr !== null) {
    cacheObj = JSON.parse(cacheStr);
  }

  return cacheObj;
}

export function UseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  let cacheObj = getCache();
  useEffect(() => {
    for (const key of Object.keys(cacheObj)) {
      if (searchParams.get(key) === null) {
        setSearchParams((prev) => {
          prev.set(key, cacheObj[key as keyof typeof cacheObj]);
          return prev;
        });
      } else {
      }
    }
  }, [cacheObj, searchParams, setSearchParams]);

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    pokedex: (searchParams.get('pokedex') || 'paldea') as PokedexFrom | 'home' | 'national',
    page: Number(searchParams.get('page') || 1),
    types: new Set((searchParams.get('types') || '').split('-').filter(Boolean)),
    ability: searchParams.get('ability') || '',
    EV: searchParams.get('EV') || '',
  };

  const [display, setDisplay] = useState<Display>({
    advancedFilter: false,
    EVs: false,
    ability: false,
  });

  const updateState = (key: ValueKeys<Filter, string>[keyof Filter]) => {
    return (val: string) => {
      if (val === '') {
        setSearchParams((prev) => {
          prev.delete(key);
          delete cacheObj[key as keyof typeof cacheObj];

          localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          if (prev.has(key) && prev.get(key) === val) {
            prev.delete(key);
            delete cacheObj[key as keyof typeof cacheObj];
          } else {
            prev.set(key, val);
            cacheObj[key as keyof typeof cacheObj] = val;
          }
          prev.delete('page');
          delete cacheObj['page'];

          localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
          return prev;
        });
      }
    };
  };

  const updateSetState = (key: ValueKeys<Filter, Set<string>>[keyof Filter]) => {
    return (val: string) => {
      setSearchParams((prev) => {
        const vals = new Set((prev.get(key) || '').split('-').filter(Boolean));
        if (vals.has(val)) {
          vals.delete(val);
        } else {
          vals.add(val);
        }

        if (vals.size === 0) {
          prev.delete(key);
          delete cacheObj[key as keyof typeof cacheObj];
        } else {
          prev.set(key, [...vals].join('-'));
          cacheObj[key as keyof typeof cacheObj] = [...vals].join('-');
        }

        prev.delete('page');
        delete cacheObj['page'];

        localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
        return prev;
      });
    };
  };

  const updateNumberState = (
    key: ValueKeys<Filter, number>[keyof Filter],
    fn: (val: number) => number
  ) => {
    setSearchParams((prev) => {
      const val = prev.get(key) || '1';
      const newVal = fn(Number(val));
      prev.set(key, String(newVal));

      return prev;
    });
  };

  const toggleDisplay = (key: BoolKeys<Display>[keyof Display]) => {
    return (bool: boolean) => {
      setDisplay((prev) => {
        const newDisplay = {
          ...prev,
          [key]: bool,
        };
        return newDisplay;
      });
    };
  };

  useEffect(() => {
    const cacheObj: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      cacheObj[key] = val;
    });

    if (Object.keys(cacheObj).length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(cacheObj));
    }
  }, [searchParams]);

  return {
    filter,
    updateState,
    updateNumberState,
    updateSetState,

    display,
    toggleDisplay,
  };
}
