import { MoveEffective, PokemonBadge } from '@/newComponents/game';
import { FullMove, LevelMap } from '@/types/Pokemon';

type Prop = {
  move: FullMove;
  onlyEvolve: boolean;
};

function LevelingUps({ move, onlyEvolve }: Prop) {
  if (move.levelingUps.length === 0) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">升等 / 進化 / 回憶招式</h6>
      <div className="flex flex-wrap gap-2">
        {move.levelingUps
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            let text = `Lv${pm.level}`;
            if (pm.level < 1) {
              text = LevelMap[pm.level];
            }

            return <PokemonBadge pm={pm} key={pm.link} text={text} />;
          })}
      </div>
    </>
  );
}

function Eggs({ move, onlyEvolve }: Prop) {
  if (move.egg.length === 0) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">遺傳招式(模仿香草)</h6>
      <div className="flex flex-wrap gap-2">
        {move.egg
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

function TMs({ move, onlyEvolve }: Prop) {
  if (move.TM === undefined) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">招式機</h6>
      <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1 pb-2">
        <li>編號：#{move.TM.pid.toString().padStart(3, '0')}</li>
        <li>聯盟點數：{move.TM.leaguePoint === 1 ? '未知' : move.TM.leaguePoint}</li>
        <li>
          材料：
          {move.TM.materials.length === 0
            ? '未知'
            : move.TM.materials.map((pm) => `${pm.part}x${pm.count}`).join('; ')}
        </li>
      </ul>
      <div className="flex flex-wrap gap-2">
        {move.TM?.pm
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

export function MoveDetail({
  move,
  onlyEvolve,
  setOnlyEvolve,
}: Prop & { setOnlyEvolve: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="flex w-full flex-col text-gray-500">
      <h6 className="flex justify-between py-2 text-lg font-bold">
        <span>說明</span>
        <div className="flex items-center">
          <input
            id={'showChild'}
            type="checkbox"
            checked={onlyEvolve}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800 focus:ring-1 focus:ring-blue-800"
            onChange={(e) => setOnlyEvolve(e.target.checked)}
          />
          <label htmlFor={'showChild'} className="ml-2 text-sm">
            僅顯示進化型
          </label>
        </div>
      </h6>
      <p>{move.description}</p>
      {move.category !== '變化' && (
        <>
          <div className="flex gap-4">
            <MoveEffective title={'效果絕佳'} type={move.type} targetRate={2} />
            <MoveEffective title={'效果不好'} type={move.type} targetRate={0.5} />
            <MoveEffective title={'沒有效果'} type={move.type} targetRate={0} />
          </div>
        </>
      )}
      <LevelingUps move={move} onlyEvolve={onlyEvolve} />
      <Eggs move={move} onlyEvolve={onlyEvolve} />
      <TMs move={move} onlyEvolve={onlyEvolve} />
    </div>
  );
}
