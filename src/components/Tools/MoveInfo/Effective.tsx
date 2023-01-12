import { MoveEffective } from '@/components';
import { BaseMove } from '@/models';

type Porps = {
  move: BaseMove;
};

export function Effective({ move }: Porps) {
  if (move.category === 'Status') {
    return <></>;
  }

  return (
    <div className="flex gap-4">
      <MoveEffective title={'效果絕佳'} type={move.type} targetRate={2} />
      <MoveEffective title={'效果不好'} type={move.type} targetRate={0.5} />
      <MoveEffective title={'沒有效果'} type={move.type} targetRate={0} />
    </div>
  );
}
