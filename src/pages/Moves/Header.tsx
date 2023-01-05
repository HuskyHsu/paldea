import { Hr, Icon, SearchBar } from '@/components';

interface Prop {
  keyword: string;
  updateKeyword: Function;
}

export function Header({ keyword, updateKeyword }: Prop) {
  return (
    <div className="mb-4 flex flex-col items-center gap-y-4 px-4 pt-6">
      <SearchBar
        title="招式清單"
        icon={<Icon.Book className="fill-current h-5 w-5" />}
        iconColor="bg-custom-green"
        placeholder={'搜尋名稱'}
        value={keyword}
        onChange={updateKeyword}
      />
      <Hr />
    </div>
  );
}
