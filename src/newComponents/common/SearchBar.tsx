import clsx from 'clsx';

import { Icon } from '@/newComponents';

type Props = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  children?: JSX.Element;
};

export function SearchBar({ placeholder, value, onChange, children }: Props) {
  return (
    <>
      <div className="relative my-2 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon.Search className="h-5 w-5" />
        </div>
        <input
          type="search"
          className={clsx(
            'block w-full rounded-full border border-gray-300',
            'bg-gray-50 p-2 pl-10 text-sm text-gray-900'
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        {children && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{children}</div>
        )}
      </div>
    </>
  );
}
