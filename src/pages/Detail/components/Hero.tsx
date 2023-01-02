import clsx from 'clsx';
import { BasePokemon } from '@/models';

interface Prop {
  pokemon: BasePokemon;
}

export function Hero({ pokemon }: Prop) {
  return (
    <div
      className={clsx(
        'h-36 w-full self-center justify-self-center rounded-lg md:h-60 md:w-60',
        'col-span-1 md:col-span-7',
        'relative flex justify-center'
      )}
    >
      <img
        className="absolute right-12 box-content h-full w-auto md:right-0"
        src={`${process.env.PUBLIC_URL}/image/icon/${pokemon.link}.png`}
        alt={pokemon.nameZh}
      />
      <p
        className={clsx(
          'absolute left-0 top-4 rounded-r-lg py-1 px-4',
          'bg-black/60 text-white',
          'flex flex-col',
          'block md:hidden'
        )}
      >
        <span className="text-xs">No.{pokemon.paldeaId}</span>
        <span className="pl-4">{pokemon.nameZh}</span>
      </p>
    </div>
  );
}
