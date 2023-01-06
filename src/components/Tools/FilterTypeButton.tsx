import clsx from 'clsx';

import { TypeShow, TYPE_MAP } from '@/models';
import { Icon } from '@/components';

type Props = {
  types: TypeShow;
  targetType: Function;
  set?: Set<string>;
};

export function FilterTypeButton({ types, targetType, set }: Props) {
  const typesetting =
    set === undefined
      ? 'grid grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
      : 'flex justify-around flex-wrap';

  return (
    <div className={clsx(typesetting, 'w-full gap-4 md:w-5/6')}>
      {TYPE_MAP.filter((type) => (set !== undefined ? set.has(type) : true)).map((type) => (
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
