import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { BgFromType, BgToType, FullPokemon, SubPokemon } from '@/types/Pokemon';
import { Icon } from '@/newComponents';

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

const SubCard = ({ pm, className = '' }: { pm: SubPokemon; className?: string }) => {
  return (
    <div className={clsx(className, 'h-24 w-24 md:h-28 md:w-28', 'relative -mt-6')}>
      <span
        className={clsx(
          'absolute',
          'rounded-full',
          'inset-x-0 h-5 md:h-7',
          'bg-gradient-to-r',
          'top-2/3 -translate-y-2/3',
          BgFromType[pm.types[0] as keyof typeof BgFromType],
          BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
        )}
      />
      <span className={clsx('absolute', 'inset-x-0', 'top-1/3 -translate-y-1/2')}>
        <Icon.Game.PmIcon pm={pm} />
      </span>
      <span className={clsx('absolute', 'inset-x-0', '-bottom-1', 'text-xs md:text-base')}>
        {pm.nameZh}
        {pm.altForm ? <span className="text-xs">({pm.altForm})</span> : ''}
      </span>
      <Link
        className={'stretchedLink'}
        to={`/pokedex/${pm.nameZh}${pm.altForm ? '-' + pm.altForm : ''}`}
      />
    </div>
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

  // const isMobile = window.screen.width < 768;
  // mobile case:
  // if cols >= 3 => transpose grid

  const cols = pm.evolves?.to.find((evolve) => evolve.to) ? 'grid-cols-5' : 'grid-cols-3';
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
      <Condition condition={evolution.condition} className={rowsClass} key={keyId + 1} />,
      <SubCard key={keyId + 2} pm={evolution} className={clsx('text-xs', rowsClass)} />,
    ]);

    acc = acc.concat(rowElement.slice(0));
    keyId += 3;
    if (evolution.to) {
      evolution.to.forEach((evolution_) => {
        acc = acc.concat([
          <Condition condition={evolution_.condition} key={keyId} />,
          <SubCard key={keyId + 1} pm={evolution_} className={clsx('text-xs')} />,
        ]);
        keyId += 2;
      });
    }

    return acc;
  }, [] as JSX.Element[]);

  return (
    <div
      className={clsx(
        'grid items-center justify-center gap-y-8 text-center',
        'justify-items-center',
        cols
      )}
    >
      {evolutionPath}
    </div>
  );
}
