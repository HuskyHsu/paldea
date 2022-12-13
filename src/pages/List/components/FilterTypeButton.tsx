import clsx from 'clsx';

import { useFilterActions, useFilterStore } from '@/store';
import { TYPE_MAP } from '@/models';
import { Icon } from '@/components';

export function FilterTypeButton() {
  const types = useFilterStore((state) => state.types);
  const { targetType } = useFilterActions();

  return (
    <>
      {TYPE_MAP.map((type) => (
        <div key={type} className="group relative h-8 justify-self-center">
          <Icon.Type
            type={type}
            className={clsx('h-8 w-8', {
              'opacity-30': !types[type],
            })}
            button={true}
            onClick={() => targetType(type)}
          />
        </div>
      ))}
    </>
  );
}
