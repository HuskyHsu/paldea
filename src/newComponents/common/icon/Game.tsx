import { TypeEnum } from '@/types/Pokemon';

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

export { Type };
