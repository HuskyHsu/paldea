import { Hr, Icon, PageHeader } from '@/components';

export function Header() {
  return (
    <div className="flex flex-col items-center gap-y-4 px-4 pt-6">
      <PageHeader
        title="圖鑑資料"
        icon={<Icon.Books className="fill-current h-5 w-5" />}
        iconColor="bg-custom-red"
      />
      <Hr />
    </div>
  );
}
