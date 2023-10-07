import clsx from 'clsx';

type Props = {
  list: { name: string; val: string }[];
  currVal: string;
  updateState: (val: string) => void;
};

export function Buttons({ list, currVal, updateState }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {list.map((item) => {
        return (
          <button
            key={item.name}
            className={clsx(
              'rounded-xl px-2 py-1',
              'whitespace-nowrap shadow-list-items',
              currVal === item.val ? 'bg-secondary' : 'bg-secondary/40'
            )}
            onClick={() => {
              updateState(item.val);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
