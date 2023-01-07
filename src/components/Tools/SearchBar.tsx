import { useState } from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';

import { Icon, PageHeader } from '@/components';

type Props = {
  title: string;
  icon: JSX.Element;
  iconColor: string;
  placeholder: string;
  value: string;
  onChange: Function;
};

export function SearchBar({ title, icon, iconColor, placeholder, value, onChange }: Props) {
  const [input, setInput] = useState(value);

  const onDelayedChange = debounce((val: string) => onChange(val), 400);

  const handleChange = (val: string) => {
    setInput(val);
    onDelayedChange(val);
  };

  return (
    <PageHeader title={title} icon={icon} iconColor={iconColor}>
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
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </PageHeader>
  );
}
