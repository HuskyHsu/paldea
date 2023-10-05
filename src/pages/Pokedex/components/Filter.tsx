import { ChangeEvent } from 'react';

import { Icon } from '@/newComponents';

type Props = {
  checked: boolean;
  toggleState: (bool: boolean) => void;
};

export function FilterButton({ checked, toggleState }: Props) {
  return (
    <>
      <input
        type="checkbox"
        name={'filter'}
        id={'filter'}
        className="hidden"
        checked={checked}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          toggleState(event.target.checked);
        }}
      />
      <label htmlFor={'filter'} className="flex cursor-pointer flex-col items-center">
        <Icon.Filter className="h-6 w-6" />
      </label>
    </>
  );
}
