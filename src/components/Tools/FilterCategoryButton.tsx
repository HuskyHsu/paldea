import clsx from 'clsx';

import { Icon } from '@/components';
import { CategoryShow, CategoryType, CATGEORY_MAP } from '@/models';

type Props = {
  categories: CategoryShow;
  targetCategory: Function;
};

export function FilterCategoryButton({ categories, targetCategory }: Props) {
  return (
    <div className={clsx('flex justify-evenly', 'w-full gap-4 md:w-5/6')}>
      {CATGEORY_MAP.map((category) => (
        <button
          key={category}
          className={clsx(
            'flex w-auto items-center px-4 py-0',
            'whitespace-nowrap rounded-md bg-gray-200 text-gray-600',
            { 'opacity-30': !categories[category] }
          )}
          onClick={() => targetCategory(category)}
        >
          <Icon.Type type={category} className={clsx('h-6 w-6')} />
          <span className="text-sm">{CategoryType[category as keyof typeof CategoryType]}</span>
        </button>
      ))}
    </div>
  );
}
