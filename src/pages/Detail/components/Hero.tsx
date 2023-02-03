import { useState } from 'react';
import clsx from 'clsx';
import { BasePokemon } from '@/models';
import { Icon } from '@/components';

type Props = {
  pokemon: BasePokemon;
};

type ButtonProps = {
  children: JSX.Element;
  status: boolean;
  onClick: Function;
};

function Button({ children, status, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-full p-2',
        'absolute -translate-y-1/2',
        'top-32 left-4',
        'md:left-4 md:top-1/2',
        status ? 'bg-gray-600' : 'bg-gray-200'
      )}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export function Hero({ pokemon }: Props) {
  const [displayShiny, setDisplayShiny] = useState(false);

  return (
    <>
      <div
        className={clsx(
          'h-36 w-full self-end justify-self-center rounded-lg md:h-60 md:w-60',
          'col-span-1 md:col-span-7',
          'relative flex justify-center',
          'm-4'
        )}
      >
        <img
          className="absolute right-12 box-content h-full w-auto md:right-0"
          src={`${process.env.PUBLIC_URL}/image/pm/${pokemon.link}${displayShiny ? '-s' : ''}.png`}
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
          <a
            href={`https://wiki.52poke.com/zh-hant/${pokemon.nameZh}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-[3px]"
          >
            <span className="pl-4">{pokemon.nameZh}</span>
          </a>
        </p>
      </div>
      <Button onClick={() => setDisplayShiny((display) => !display)} status={displayShiny}>
        <Icon.Shiny className={clsx('h-6 w-6', displayShiny ? 'fill-gray-200' : 'fill-gray-600')} />
      </Button>
    </>
  );
}
