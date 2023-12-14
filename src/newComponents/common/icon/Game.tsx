import clsx from 'clsx';
import { MoveCategoryEnum, Pokemon, SubPokemon, TypeEnum } from '@/types/Pokemon';

function MoveCategory({ type, className = 'w-5 h-5' }: { type: string; className?: string }) {
  const typeName = MoveCategoryEnum[type as keyof typeof MoveCategoryEnum];

  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/type/${typeName}.svg`}
      alt={type}
      className={className}
    />
  );
}

function Type({ type, className = 'w-5 h-5' }: { type: string; className?: string }) {
  const typeName = TypeEnum[type as keyof typeof TypeEnum];

  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/type/${typeName}.svg`}
      alt={type}
      className={className}
    />
  );
}

function PmIcon({ pm, className = '' }: { pm: Pokemon | SubPokemon; className?: string }) {
  return (
    <img
      className={clsx('pointer-events-none w-auto', className)}
      src={`${process.env.PUBLIC_URL}/image/pmIcon/${pm.link}.png`}
      alt={pm.nameZh}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = `${process.env.PUBLIC_URL}/image/pmIcon/0.png`;
      }}
    />
  );
}

function PmHome({
  pm,
  shiny = false,
  className = '',
}: {
  pm: Pokemon | SubPokemon;
  shiny?: boolean;
  className?: string;
}) {
  const imageUrl = `${process.env.PUBLIC_URL}/image/home/${pm.link}${shiny ? '-s' : ''}.png`;

  return (
    <img
      className={clsx('pointer-events-none h-auto w-auto', className)}
      src={imageUrl}
      alt={pm.nameZh}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = `${process.env.PUBLIC_URL}/image/home/0.png`;
      }}
    />
  );
}

export { Type, MoveCategory, PmIcon, PmHome };
