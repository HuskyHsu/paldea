import { Hr, Icon, PageHeader, PokemonBadge } from '@/components';
import { BasePokemon } from '@/models';

type Props = {
  quickListPm: BasePokemon[];
};

export function Header({ quickListPm }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-4 px-4 pt-6">
      <PageHeader
        title="圖鑑資料"
        icon={<Icon.Books className="fill-current h-5 w-5" />}
        iconColor="bg-custom-red"
      >
        <div className="flex justify-between gap-x-4">
          {quickListPm.map((pm, i) => {
            if (i === (quickListPm.length - 1) / 2) {
              return (
                <span className="hidden whitespace-nowrap py-0.5 text-xs md:inline" key={pm.link}>
                  {pm.nameZh}
                </span>
              );
            }
            return <PokemonBadge pm={pm} key={pm.link} />;
          })}
        </div>
      </PageHeader>
      <Hr />
    </div>
  );
}
