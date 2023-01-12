import { AttackRange } from '@/components';

type Props = {
  types: string[];
};

export function UnionType({ types }: Props) {
  return (
    <div className="text-gray-500">
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="text-lg font-bold">勾選招式打點</h6>
      <AttackRange types={types} />
    </div>
  );
}
