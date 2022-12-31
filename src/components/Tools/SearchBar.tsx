import clsx from 'clsx';

import { Icon } from '@/components';

interface Prop {
  title: string;
  icon: JSX.Element;
  iconColor: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
}

export function SearchBar({ title, icon, iconColor, placeholder, onChange }: Prop) {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-between md:flex-row',
        'gap-4 px-4'
      )}
    >
      <div className="flex w-full items-start gap-2 md:items-center">
        <div className={clsx('rounded-xl p-2', iconColor, 'hidden md:block')}>{icon}</div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="w-full md:w-96">
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
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
