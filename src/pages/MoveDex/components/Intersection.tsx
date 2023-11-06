import { FullMove } from '@/types/Pokemon';

type Props = {
  fullMoves: FullMove[];
};

export function Intersection({ fullMoves }: Props) {
  return (
    <>
      <h6 className="text-sm font-bold text-gray-700">
        同時擁有
        {` ${fullMoves.map((move) => move.nameZh).join(', ')} `}
        的寶可夢
      </h6>
      <h6 className="text-xs text-gray-500">(最多查詢四種招式)</h6>
      <div className="mt-2 flex flex-wrap gap-2">QQ</div>
      <hr className="my-3 h-px border-0 bg-gray-200" />
    </>
  );
}
