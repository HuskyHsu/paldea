import { useEffect, useState } from 'react';

import { useTable } from '@/components';
import { BaseMove } from '@/models';

import { Header } from './Header';
import { columns, Table } from './Table';
import { useMoveList } from './api';

function Moves() {
  const { data } = useMoveList();
  const [keyword, setKeyword] = useState('');
  const table = useTable<BaseMove>(data, columns);

  useEffect(() => {
    document.title = `Pokédex Moves`;
  }, []);

  return (
    <>
      <Header keyword={keyword} updateKeyword={setKeyword} />
      <div className="flex justify-center">
        <div className="w-full md:mb-4 md:w-5/6">
          <Table {...table} keyword={keyword} />
        </div>
      </div>
    </>
  );
}

export default Moves;
