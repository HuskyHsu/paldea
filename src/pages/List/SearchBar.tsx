import clsx from 'clsx';

import { Icon } from '@/components';
import { useFilterActions } from '@/store';

export function SearchBar() {
  const { updateKeyword } = useFilterActions();
  return (
    <>
      <div className="flex w-full items-start gap-2 md:items-center">
        <div className={clsx('rounded-xl p-2', 'bg-custom-red', 'hidden md:block')}>
          <Icon.Books className="fill-current h-5 w-5" />
        </div>
        <h2 className="text-2xl">圖鑑清單</h2>
      </div>
      <div className="w-full md:w-72">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon.Search className="h-5 w-5" />
          </div>
          <input
            type="search"
            className={clsx(
              'block w-full rounded-lg border border-gray-300',
              'bg-gray-50 p-2 pl-10 text-sm text-gray-900'
            )}
            placeholder="搜尋編號/名稱"
            onChange={(e) => updateKeyword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
