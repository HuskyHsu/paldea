import { CategoryMap, TypeMap } from '@/models';

interface TypeIconInterface {
  type: string;
  className?: string;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Type = ({
  type,
  className = 'w-5 h-5',
  button = false,
  onClick = () => {},
}: TypeIconInterface) => {
  const link =
    TypeMap[type as keyof typeof TypeMap] || CategoryMap[type as keyof typeof CategoryMap];

  if (button) {
    return (
      <button type="button" onClick={onClick}>
        <img
          src={`${process.env.PUBLIC_URL}/image/type/${link}.svg`}
          alt={type}
          className={className}
        />
      </button>
    );
  }
  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/type/${link}.svg`}
      alt={type}
      className={className}
    />
  );
};
