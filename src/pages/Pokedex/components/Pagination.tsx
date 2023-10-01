import clsx from 'clsx';

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const pagingButtonLength = window.screen.width < 768 ? 1 : 3;

export function Pagination({ currentPage, totalPages, setCurrentPage }: Props) {
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => setCurrentPage((pre) => Math.max(1, pre - 1))}
            className={clsx(
              'ml-0 flex h-8 items-center justify-center',
              'rounded-l-lg border border-gray-300',
              'bg-white px-3 leading-tight text-gray-500',
              'hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            前一頁
          </button>
        </li>
        {currentPage > pagingButtonLength && (
          <>
            <li>
              <button
                onClick={() => setCurrentPage(1)}
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
                onClick={() => setCurrentPage(n)}
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
                onClick={() => setCurrentPage(totalPages)}
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
            onClick={() => setCurrentPage((pre) => Math.min(totalPages, pre + 1))}
            className={clsx(
              'ml-0 flex h-8 items-center justify-center',
              'rounded-r-lg border border-gray-300',
              'bg-white px-3 leading-tight text-gray-500',
              'hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            後一頁
          </button>
        </li>
      </ul>
    </nav>
  );
}
