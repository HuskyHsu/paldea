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

function PmIcon({ pm }: { pm: Pokemon | SubPokemon }) {
  return (
    <img
      className={clsx('pointer-events-none w-auto')}
      src={`${process.env.PUBLIC_URL}/image/home_pick/${pm.link}.png`}
      alt={pm.nameZh}
      loading="lazy"
    />
  );
}

export { Type, MoveCategory, PmIcon };
