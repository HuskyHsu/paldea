import { FilterTypeButton, Hr, Icon, SearchBar } from '@/components';
import { TypeShow } from '@/models';

interface Prop {
  types: TypeShow;
  targetType: Function;
}

export function Header({ types, targetType }: Prop) {
  return (
    <div className="flex flex-col items-center gap-y-4 px-4 pt-6">
      <SearchBar
        title="招式清單"
        icon={<Icon.Book className="fill-current h-5 w-5" />}
        iconColor="bg-custom-green"
        placeholder={'搜尋名稱'}
        onChange={() => null}
      />
      <Hr />
      <FilterTypeButton types={types} targetType={targetType} />
    </div>
  );
}
