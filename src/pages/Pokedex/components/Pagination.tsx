import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { ValueKeys } from '@/utils';
import { Filter } from '../Pokedex';

type Props = {
  currentPage: number;
  totalPages: number;
  updateNumberState: (
    key: ValueKeys<Filter, number>[keyof Filter],
    fn: (val: number) => number
  ) => void;
};

const pagingButtonLength = window.screen.width < 768 ? 1 : 5;

export function Pagination({ currentPage, totalPages, updateNumberState }: Props) {
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => updateNumberState('page', (n) => Math.max(1, n - 1))}
            className={clsx(
              'ml-0 flex h-8 items-center justify-center',
              'rounded-l-lg border border-gray-300',
              'bg-white px-3 leading-tight text-gray-500',
              'hover:bg-gray-100 hover:text-gray-700',
              currentPage === 1 && 'cursor-not-allowed'
            )}
          >
            前一頁
          </button>
        </li>
        {currentPage > pagingButtonLength && (
          <>
            <li>
              <button
                onClick={() => updateNumberState('page', () => 1)}
                className={clsx(
                  'ml-0 flex h-8 items-center justify-center',
                  'border border-gray-300',
                  'bg-white px-3 leading-tight text-gray-500',
                  'hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                1
              </button>
            </li>
            <li
              className={clsx(
                'ml-0 flex h-8 items-center justify-center',
                'border border-gray-300',
                'bg-white px-3 leading-tight text-gray-500'
              )}
            >
              ...
            </li>
          </>
        )}
        {new Array(totalPages)
          .fill(0)
          .map((_, i) => i + 1)
          .filter((n) => {
            return Math.abs(n - currentPage) < pagingButtonLength;
          })
          .map((n) => (
            <li key={n}>
              <button
                onClick={() => updateNumberState('page', () => n)}
                className={clsx(
                  'ml-0 flex h-8 items-center justify-center',
                  'border border-gray-300',
                  'px-3 leading-tight',
                  'hover:bg-gray-100 hover:text-gray-700',
                  n === currentPage ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-500'
                )}
              >
                {n}
              </button>
            </li>
          ))}
        {totalPages - currentPage >= pagingButtonLength && (
          <>
            <li
              className={clsx(
                'ml-0 flex h-8 items-center justify-center',
                'border border-gray-300',
                'bg-white px-3 leading-tight text-gray-500'
              )}
            >
              ...
            </li>
            <li>
              <button
                onClick={() => updateNumberState('page', () => totalPages)}
                className={clsx(
                  'ml-0 flex h-8 items-center justify-center',
                  'border border-gray-300',
                  'bg-white px-3 leading-tight text-gray-500',
                  'hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            onClick={() => {
              updateNumberState('page', (n) => {
                return Math.min(totalPages, n + 1);
              });
            }}
            className={clsx(
              'ml-0 flex h-8 items-center justify-center',
              'rounded-r-lg border border-gray-300',
              'bg-white px-3 leading-tight text-gray-500',
              'hover:bg-gray-100 hover:text-gray-700',
              currentPage === totalPages && 'cursor-not-allowed'
            )}
          >
            後一頁
          </button>
        </li>
      </ul>
    </nav>
  );
}

export function PaginationMobile({
  currentPage,
  totalPages,
  updateNumberState,
  length,
}: Props & { length: number }) {
  return (
    <>
      <button onClick={() => updateNumberState('page', (n) => Math.max(1, n - 1))}>
        <Icon.ArrowBack className={clsx(currentPage === 1 ? 'fill-gray-400' : 'fill-white')} />
      </button>
      <p>
        第{currentPage}頁，共{totalPages}頁 ｜ {length}種符合
      </p>
      <button onClick={() => updateNumberState('page', (n) => Math.min(totalPages, n + 1))}>
        <Icon.ArrowForward
          className={clsx(currentPage === totalPages ? 'fill-gray-400' : 'fill-white')}
        />
      </button>
    </>
  );
}
