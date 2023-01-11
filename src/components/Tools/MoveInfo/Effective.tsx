import { SuperEffective } from '@/components';
import { BaseMove } from '@/models';

type Porps = {
  move: BaseMove;
};

export function Effective({ move }: Porps) {
  return (
    <>
      {move.category !== 'Status' && (
        <>
          <hr className="my-3 h-px border-0 bg-gray-200" />
          <h6 className="text-lg font-bold">效果絕佳</h6>
          <div className="flex flex-wrap gap-x-2">{<SuperEffective type={move.type} />}</div>
        </>
      )}
    </>
  );
}
