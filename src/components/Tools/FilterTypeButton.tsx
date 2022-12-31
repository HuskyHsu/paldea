import clsx from 'clsx';

import { TypeShow, TYPE_MAP } from '@/models';
import { Icon } from '@/components';

interface Prop {
  types: TypeShow;
  targetType: Function;
}

export function FilterTypeButton({ types, targetType }: Prop) {
  return (
    <div
      className={clsx('grid w-full gap-4 md:w-5/6', 'grid-cols-6 md:grid-cols-9 xl:grid-cols-18')}
    >
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
    </div>
  );
}
