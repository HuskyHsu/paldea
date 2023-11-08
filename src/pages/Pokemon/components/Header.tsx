import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { BgFromType, BgToType, FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

export function Header({ pm }: Props) {
  return (
    <header className="relative flex h-[180px] justify-around px-4 md:h-[273px]">
      <Icon.Game.PmHome pm={pm} className="z-10 h-[90%]" />
      <Icon.Game.PmHome pm={pm} className="z-10 h-[90%]" shiny={true} />

      {/* bg banner */}
      <div
        className={clsx(
          'absolute -inset-x-4 bottom-0 z-0 h-full',
          'md:inset-x-0 md:-mx-4 md:rounded-t-xl',
          'bg-gradient-to-b',
          BgFromType[pm.types[0] as keyof typeof BgFromType],
          BgToType[(pm.types.length > 1 ? pm.types[1] : pm.types[0]) as keyof typeof BgToType]
        )}
      />
    </header>
  );
}

export function HeaderName({ pm }: Props) {
  return (
    <h2 className="-my-2 flex items-end gap-x-2 whitespace-nowrap text-2xl">
      #{pm.pid.toString().padStart(4, '0')} {pm.nameZh}
      {pm.altForm && <span className="text-sm">({pm.altForm})</span>}
      <a
        href={`https://wiki.52poke.com/zh-hant/${pm.nameZh}`}
        target="_blank"
        rel="noreferrer"
        className="ml-2 text-base font-bold text-blue-800 underline"
      >
        wiki
      </a>
      {pm.hisui && (
        <a
          href={`https://huskyhsu.github.io/arceus/#/${pm.hisui.toString().padStart(3, '0')}${
            pm.altForm === '洗翠' ? 'H' : ''
          }`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-base font-bold text-blue-800 underline"
        >
          洗翠圖鑑
        </a>
      )}
    </h2>
  );
}
