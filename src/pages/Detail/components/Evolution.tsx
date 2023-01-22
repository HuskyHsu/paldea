import { PokemonBadge } from '@/components';
import { BasePokemon } from '@/models';
import clsx from 'clsx';

type Props = {
  pokemonList: BasePokemon[];
  source: string;
};

type BaseEvolution = { pm: BasePokemon; condition: string; evolutions?: BaseEvolution[] };

interface evolutionChain {
  pm: BasePokemon;
  evolutions?: BaseEvolution[];
}

const getEvolution = (pokemonList: BasePokemon[], source: string) => {
  const basePm = pokemonList.find((pm) => pm.link === source) as BasePokemon;
  const chain = { pm: basePm } as evolutionChain;

  if (basePm.evolutions === undefined) {
    return chain;
  }

  basePm.evolutions.forEach((evolution) => {
    const targetPm = pokemonList.find((pm) => pm.link === evolution.link) as BasePokemon;

    if (chain.evolutions === undefined) {
      chain.evolutions = [];
    }

    const subChain = {
      pm: targetPm,
      condition: evolution.condition,
    } as {
      pm: BasePokemon;
      condition: string;
      evolutions?: { pm: BasePokemon; condition: string }[];
    };

    if (targetPm.evolutions !== undefined) {
      subChain.evolutions = targetPm.evolutions.map((evolution) => {
        return {
          pm: pokemonList.find((pm) => pm.link === evolution.link) as BasePokemon,
          condition: evolution.condition,
        };
      });
    }

    chain.evolutions.push(subChain);
  });

  return chain;
};

const Condition = ({ condition, className = '' }: BaseEvolution & { className?: string }) => {
  return (
    <span className={clsx('text-center text-sm text-gray-100', className)}>{condition} ⇨</span>
  );
};

export function Evolution({ pokemonList, source }: Props) {
  const evolutionChain = getEvolution(pokemonList, source);

  // 1-1
  // 1-1-1
  // 1-2-2
  // 1-8
  // 1-2
  // 1-1-2

  const cols = evolutionChain.evolutions?.find((evolution) => evolution.evolutions)
    ? 'grid-cols-5'
    : 'grid-cols-3';

  let rows =
    evolutionChain.evolutions && evolutionChain.evolutions?.length > 1
      ? evolutionChain.evolutions?.length === 8
        ? 'row-[span_8_/_span_8]'
        : 'row-span-2'
      : 'row-span-1';

  let keyId = 0;

  const evolutionPath = evolutionChain.evolutions?.reduce((acc, evolution, i) => {
    let rowElement = [] as JSX.Element[];

    let secRows = 'row-span-1';
    if ((evolution.evolutions?.length || 0) > 1) {
      secRows = 'row-span-2';
    }

    const rowsClass =
      rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : 'row-span-1';

    if (i === 0) {
      rowElement.push(
        <PokemonBadge
          pm={evolutionChain.pm}
          size={clsx(
            'text-xs',
            rows === 'row-span-1' && secRows === 'row-span-2' ? 'row-span-2' : rows
          )}
          key={keyId}
        />
      );
    }

    rowElement = rowElement.concat([
      <Condition {...evolution} className={rowsClass} key={keyId + 1} />,
      <PokemonBadge pm={evolution.pm} size={clsx('text-xs', rowsClass)} key={keyId + 2} />,
    ]);

    acc = acc.concat(rowElement.slice(0));
    keyId += 3;
    if (evolution.evolutions) {
      evolution.evolutions.forEach((evolution_) => {
        acc = acc.concat([
          <Condition {...evolution_} key={keyId} />,
          <PokemonBadge pm={evolution_.pm} key={keyId + 1} />,
        ]);
        keyId += 2;
      });
    }

    return acc;
  }, [] as JSX.Element[]);

  return (
    <div className={clsx('grid items-center justify-center gap-y-4', cols)}>{evolutionPath}</div>
  );
}
