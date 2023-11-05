import { useSearchParams } from 'react-router-dom';
import { Hr } from '@/newComponents/common';
import { Header } from './components';
import { ValueKeys } from '@/utils';

export type Filter = {
  keyword: string;
  type: string;
  category: string;
  page: number;
};

function MoveDex() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: Filter = {
    keyword: searchParams.get('keyword') || '',
    type: searchParams.get('types') || '',
    category: searchParams.get('category') || '',
    page: Number(searchParams.get('page') || 1),
  };

  console.log(filter.keyword);

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

  return (
    <div className="mb-4 flex flex-col gap-y-4">
      <Header filter={filter} updateState={updateState} />
      <Hr />
      新的招式清單施工ing
    </div>
  );
}

export default MoveDex;
