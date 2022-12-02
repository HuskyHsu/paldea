import clsx from 'clsx';
import { Card, Icon } from '@/components';
import { TYPE_MAP } from '@/models';
import { useFilterActions, useFilterStore } from '@/store';

function List() {
  const pokemonList = useFilterStore((state) => state.pokemonList);
  const types = useFilterStore((state) => state.types);
  const { targetType } = useFilterActions();

  return (
    <div className="rounded-xl bg-orange-50">
      <form className="px-4 pt-6">
        <ul className="flex flex-col items-center gap-y-8">
          <li className="flex w-full flex-wrap items-center justify-center gap-4 md:w-5/6">
            {TYPE_MAP.map((type) => (
              <div key={type} className="group relative h-8">
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
          </li>
        </ul>
      </form>
      <div className="flex flex-wrap justify-around gap-4 p-4">
        {pokemonList.map((pm) => (
          <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
        ))}
      </div>
    </div>
  );
}

export default List;
