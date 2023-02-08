import clsx from 'clsx';

import { Icon } from '@/components';
import { useFilterActions, useFilterStore } from '@/store';

export function SearchBar() {
  const { updateKeyword } = useFilterActions();
  const keyword = useFilterStore((state) => state.keyword);

  return (
    <>
      <div className="flex w-full items-start gap-2 md:items-center">
        <div className={clsx('rounded-xl p-2', 'bg-custom-red', 'hidden md:block')}>
          <Icon.Books className="fill-current h-5 w-5" />
        </div>
        <h2 className="text-2xl">圖鑑清單</h2>
      </div>
      <div className="group w-full md:w-full">
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
            value={keyword}
            onChange={(e) => updateKeyword(e.target.value)}
          />
        </div>
        <div className="relative hidden group-focus:block">
          <div className="absolute top-1 left-10 z-10 w-32 divide-y divide-gray-100 rounded-lg bg-gray-50 shadow">
            <ul className="rounded-lg py-2 text-sm text-gray-900">
              <li className="group relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  版本限定
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 top-0 z-10 hidden w-32 translate-x-full divide-y divide-gray-100 rounded-lg bg-gray-50 shadow group-hover:block">
                  <ul className="py-2 text-sm text-gray-900">
                    <li className="block px-4 py-2 hover:bg-gray-100">朱</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">紫</li>
                  </ul>
                </div>
              </li>
              <li className="group relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  太晶團體戰
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute top-0 z-10 hidden w-32 translate-x-full divide-y divide-gray-100 rounded-lg bg-gray-50 shadow group-hover:block">
                  <ul className="py-2 text-sm text-gray-900">
                    <li className="block px-4 py-2 hover:bg-gray-100">一星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">二星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">三星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">四星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">五星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">六星</li>
                    <li className="block px-4 py-2 hover:bg-gray-100">七星</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
