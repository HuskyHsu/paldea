import clsx from 'clsx';
import { VersionType } from '@/models';
import { Icon } from '..';
import { CardProps } from './Card';
import { useFilterActions } from '@/store';

export function Footer({ pokemon }: CardProps) {
  const version = pokemon.version ? VersionType[pokemon.version as keyof typeof VersionType] : '';
  const { updateKeyword } = useFilterActions();

  return (
    <div
      className={clsx(
        'flex w-full justify-center',
        'rounded-b-xl py-1',
        'text-sm text-white',
        pokemon.version === 'Scarlet' ? 'bg-scarlet' : 'bg-violet'
      )}
      onClick={(event) => {
        event.stopPropagation();
        updateKeyword(version);
      }}
    >
      <p className="flex w-full items-center justify-center md:justify-start md:pl-4">
        {pokemon.version === 'Scarlet' ? (
          <Icon.Version.Scarlet className="mr-1 w-4" />
        ) : (
          <Icon.Version.Violet className="mr-1 w-4" />
        )}
        <span className="hidden md:block">版本</span>
        限定
        {`(${version})`}
      </p>
    </div>
  );
}
