import clsx from 'clsx';

import { FullPokemon } from '@/types/Pokemon';
import { SubCard } from '@/newComponents/game';

type Props = {
  pm: FullPokemon;
};

const rowSpanMap = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  8: 'row-[span_8_/_span_8]',
};

const Condition = ({ condition, className = '' }: { condition: string; className?: string }) => {
  return (
    <span className={clsx('relative flex h-full w-full items-center text-right', className)}>
      <span
        className={clsx(
          'absolute',
          'inset-x-0',
          'top-1/2 -translate-y-1/3',
          'text-sm',
          'flex justify-center text-center',
          'text-[12px] md:text-base'
        )}
      >
        {condition} ⇨
      </span>
    </span>
  );
};

export function Evolution({ pm }: Props) {
  // 1-1-1
  // 1-1-2
  // 1-2-2
  // 1-1
  // 1-2
  // 1-3
  // 1-8

  // 1-3-1
  //  ↱O
  // O-O
  // ↳-O-O

  // const isMobile = window.screen.width < 768;
  // mobile case:
  // if cols >= 3 => transpose grid

  const isThree = pm.evolves?.to.find((evolve) => evolve.to);
  const cols = isThree ? 'grid-cols-3 md:grid-cols-5' : 'grid-cols-3';
  const rows = rowSpanMap[(pm.evolves?.to.length || 1) as keyof typeof rowSpanMap];

  let keyId = 0;

  const evolutionPath = pm.evolves?.to.reduce((acc, evolution, i) => {
    let rowElement = [] as JSX.Element[];

    const secRows = rowSpanMap[(evolution.to?.length || 1) as keyof typeof rowSpanMap];

    const rowsClass =
      rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : 'row-span-1';

    if (i === 0 && pm.evolves) {
      rowElement.push(
        <SubCard
          key={keyId}
          pm={pm.evolves.from}
          className={clsx(
            'text-xs',
            rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : rows
          )}
        />
      );
    }

    rowElement = rowElement.concat([
      <Condition key={keyId + 1} condition={evolution.condition} className={rowsClass} />,
      <SubCard key={keyId + 2} pm={evolution} className={clsx('text-xs', rowsClass)} />,
    ]);

    acc = acc.concat(rowElement.slice(0));
    keyId += 3;
    if (evolution.to) {
      evolution.to.forEach((evolution_) => {
        acc = acc.concat([
          <Condition
            key={keyId}
            condition={evolution_.condition}
            className={clsx('hidden md:block')}
          />,
          <SubCard key={keyId + 1} pm={evolution_} className={clsx('hidden text-xs md:block')} />,
        ]);
        keyId += 2;
      });
    } else if (isThree) {
      acc = acc.concat([
        <span key={keyId + 12345} className={clsx('hidden text-xs md:block')} />,
        <span key={keyId + 123456} className={clsx('hidden text-xs md:block')} />,
      ]);
    }

    return acc;
  }, [] as JSX.Element[]);

  let hasHr = false;
  pm.evolves?.to.forEach((evolution) => {
    if (evolution.to) {
      if (hasHr === false) {
        evolutionPath?.push(<hr className="col-span-3 w-full md:hidden" key={999} />);
        hasHr = true;
      }

      evolution.to.forEach((evolution_, i, list) => {
        evolutionPath?.push(
          <SubCard
            key={keyId}
            pm={evolution}
            className={clsx(
              'text-xs md:hidden',
              list.length > 1 ? (i === 0 ? 'row-span-2' : 'hidden') : ''
            )}
          />,
          <Condition key={keyId + 1} condition={evolution_.condition} className="md:hidden" />,
          <SubCard key={keyId + 2} pm={evolution_} className={clsx('text-xs md:hidden')} />
        );
        keyId += 3;
      });
    }
  });

  return (
    <div
      className={clsx(
        'grid items-center justify-center gap-y-8 text-center',
        'mt-4 justify-items-center',
        cols
      )}
    >
      {evolutionPath}
    </div>
  );
}
