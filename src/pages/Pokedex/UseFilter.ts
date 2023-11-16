import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BoolKeys, ValueKeys } from '@/utils';
import { Filter, Display } from './Pokedex';
import { PokedexFrom } from '@/types/Pokemon';

const localStorageKey = 'pokeDexPage';

function getCache() {
  const cacheStr = localStorage.getItem(localStorageKey);
  let cacheObj = {};
  if (cacheStr !== null) {
    cacheObj = JSON.parse(cacheStr);
  }

  return cacheObj;
}

function getCacheValue(obj: Record<string, string>, key: string): any | null {
  if (key in obj) {
    return obj[key];
  }
  return null;
}

function FindVal(searchParams: URLSearchParams, cacheObj: Record<string, string>, key: string) {
  return searchParams.get(key) || getCacheValue(cacheObj, key);
}

export function UseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  let cacheObj = getCache();

  const filter: Filter = {
    keyword: FindVal(searchParams, cacheObj, 'keyword') || '',
    pokedex: (FindVal(searchParams, cacheObj, 'pokedex') || 'paldea') as
      | PokedexFrom
      | 'home'
      | 'national',
    page: Number(FindVal(searchParams, cacheObj, 'page') || 1),
    types: new Set((FindVal(searchParams, cacheObj, 'types') || '').split('-').filter(Boolean)),
    ability: FindVal(searchParams, cacheObj, 'ability') || '',
    EV: FindVal(searchParams, cacheObj, 'EV') || '',
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
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          if (prev.has(key) && prev.get(key) === val) {
            prev.delete(key);
          } else {
            prev.set(key, val);
          }
          prev.delete('page');
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
        } else {
          prev.set(key, [...vals].join('-'));
        }

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
