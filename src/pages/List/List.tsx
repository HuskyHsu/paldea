import clsx from 'clsx';

import { Card, Icon } from '../../components';
import { TypeMap } from '../../models';
import { useFilterStore } from '../../store';

function List() {
  const { pokemonList, types, targetType } = useFilterStore();

  return (
    <div className='rounded-xl bg-orange-50'>
      <form className='pt-6 px-4'>
        <ul className='flex flex-col items-center gap-y-8'>
          <li className='w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4'>
            {Object.keys(TypeMap).map((type) => (
              <div key={type} className='group relative h-8'>
                <Icon.Type
                  type={type}
                  className={clsx('w-8 h-8', {
                    'opacity-30': !types[type],
                  })}
                  button={true}
                  clickFn={() => targetType(type)}
                />
              </div>
            ))}
          </li>
        </ul>
      </form>
      <div className='flex flex-wrap justify-around gap-4 p-4'>
        {pokemonList.map((pm) => (
          <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
        ))}
      </div>
    </div>
  );
}

export default List;
