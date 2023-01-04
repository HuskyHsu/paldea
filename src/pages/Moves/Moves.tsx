import { useMemo, useState } from 'react';

import { useApi } from '@/utils';
import { useTable } from '@/components';
import { BaseMove } from '@/models';

import { Header } from './Header';
import { columns, Table } from './Table';

function Moves() {
  const { isLoading, isError, data, error } = useApi<BaseMove[]>({
    queryKey: 'moves',
    path: '/data/relation/moves.json',
    initialData: [],
  });

  const [keyword, setKeyword] = useState('');
  const tableDataMemo = useMemo(() => {
    return data;
  }, [data]);

  const table = useTable<BaseMove>(tableDataMemo, columns);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>{`Error ${error}`}</span>;
  }

  return (
    <>
      <Header keyword={keyword} updateKeyword={setKeyword} />
      <div className="mt-4 flex justify-center">
        <div className="w-full md:mb-4 md:w-5/6">
          <Table {...table} keyword={keyword} />
        </div>
      </div>
    </>
  );
}

export default Moves;
