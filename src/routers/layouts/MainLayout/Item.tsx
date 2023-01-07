import clsx from 'clsx';

type Props = {
  text: string;
  color: string;
  children: JSX.Element;
  selected?: boolean;
  onClick?: () => void;
};

export function Item({ text, color, children, onClick, selected = false }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        'flex flex-col items-center gap-2 md:flex-row',
        'w-30 h-full p-2 md:w-full md:rounded-xl',
        selected && 'bg-secondary text-black'
      )}
      onClick={onClick}
    >
      <div className={clsx('rounded-xl p-2', color)}>{children}</div>
      <span className="hidden md:block">{text}</span>
    </button>
  );
}
