import clsx from 'clsx';
import { Evolve, FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

const Condition = ({ condition, className = '' }: { condition: string; className?: string }) => {
  return <span className={clsx('text-center text-sm', className)}>{condition} ⇨</span>;
};

export function Evolution({ pm }: Props) {
  // 1-1
  // 1-1-1
  // 1-2-2
  // 1-8
  // 1-2
  // 1-1-2

  const cols = pm.evolves?.find((evolve) => evolve.evolves) ? 'grid-cols-5' : 'grid-cols-3';
  const rows =
    pm.evolves && pm.evolves?.length > 1
      ? pm.evolves?.length === 8
        ? 'row-[span_8_/_span_8]'
        : 'row-span-2'
      : 'row-span-1';

  let keyId = 0;

  const evolutionPath = pm.evolves?.reduce((acc, evolution, i) => {
    let rowElement = [] as JSX.Element[];

    let secRows = 'row-span-1';
    if ((evolution.evolves?.length || 0) > 1) {
      secRows = 'row-span-2';
    }

    const rowsClass =
      rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : 'row-span-1';

    if (i === 0) {
      console.log(evolution);
      rowElement.push(
        <span
          className={clsx(
            'text-xs',
            rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : rows
          )}
          key={keyId}
        >
          {evolution.fromNameZh}
        </span>
      );
    }

    rowElement = rowElement.concat([
      <Condition condition={evolution.condition} className={rowsClass} key={keyId + 1} />,
      <span className={clsx('text-xs', rowsClass)} key={keyId + 2}>
        {evolution.toNameZh}
      </span>,
    ]);

    acc = acc.concat(rowElement.slice(0));
    keyId += 3;
    if (evolution.evolves) {
      evolution.evolves.forEach((evolution_) => {
        acc = acc.concat([
          <Condition condition={evolution_.condition} key={keyId} />,
          <span className={clsx('text-xs')} key={keyId + 1}>
            {evolution_.toNameZh}
          </span>,
        ]);
        keyId += 2;
      });
    }

    return acc;
  }, [] as JSX.Element[]);

  return (
    <div className={clsx('grid items-center justify-center gap-y-4 text-center', cols)}>
      {evolutionPath}
    </div>
  );
}
