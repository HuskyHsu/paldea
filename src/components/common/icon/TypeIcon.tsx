import { TypeMap } from '@/models';

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
  if (button) {
    return (
      <button type="button" onClick={onClick}>
        <img
          src={`${process.env.PUBLIC_URL}/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
          alt={type}
          className={className}
        />
      </button>
    );
  }
  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
      alt={type}
      className={className}
    />
  );
};
