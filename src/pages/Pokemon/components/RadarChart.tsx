import clsx from 'clsx';

const radius = 100;
const center = [radius * 1.5, radius * 1.5];

type RadarPorps = {
  stats: number[];
  color: string;
  EVs: number[];
};

type LinePorps = {
  deg: number;
};

type TextPorps = {
  deg?: number;
  text?: string;
  value: number;
};

const getPosition = (deg: number, radius: number) => {
  const radians = (deg * 2 * Math.PI) / 360;
  return [center[0] + radius * Math.cos(radians), center[1] + radius * Math.sin(radians)];
};

const Line = ({ deg }: LinePorps) => {
  const point1 = getPosition(deg, radius);
  const point2 = getPosition(deg + 180, radius);

  return (
    <line
      x1={point1[0]}
      y1={point1[1]}
      x2={point2[0]}
      y2={point2[1]}
      stroke="#FFFFFF"
      strokeWidth="2"
    />
  );
};

const Text = ({ deg, text, value }: TextPorps) => {
  const point = getPosition(deg as number, radius * 1.25);
  const color =
    (text?.length ?? 0) > 2 ? 'fill-red-600 stroke-[0.5px] stroke-red-600' : 'fill-slate-600';

  return (
    <>
      <text
        x={point[0]}
        y={point[1] - 5}
        fontSize="1.1em"
        textAnchor="middle"
        className={clsx(color)}
      >
        {text}
      </text>
      <text
        x={point[0]}
        y={point[1] + 15}
        fontSize="1.1em"
        textAnchor="middle"
        className={clsx(color)}
      >
        {value}
      </text>
    </>
  );
};

const TotalText = ({ value }: TextPorps) => {
  const point = getPosition(0, 0);

  return (
    <>
      <text x={point[0]} y={point[1] + 10} fontSize="1.5em" textAnchor="middle" fill="#f3f4f6">
        {value}
      </text>
    </>
  );
};

export function RadarChart({
  stats: [hp, atk, def, spAtk, spDef, speed],
  color = '#339DDF',
  EVs: [ev_hp, ev_atk, ev_def, ev_spAtk, ev_spDef, ev_speed],
}: RadarPorps) {
  const total = hp + atk + def + spAtk + spDef + speed;

  const bgPoints = Array.from(Array(6).keys())
    .map((_, i) => 30 + i * 60)
    .map((deg) => getPosition(deg, radius));

  const speciesStrength = [
    getPosition(270, (hp * radius) / 255),
    getPosition(330, (atk * radius) / 170),
    getPosition(30, (def * radius) / 184),
    getPosition(90, (speed * radius) / 200),
    getPosition(150, (spDef * radius) / 184),
    getPosition(210, (spAtk * radius) / 170),
  ];

  const labels = [
    { name: 'HP', value: hp, deg: 270, plus: ev_hp },
    { name: '攻擊', value: atk, deg: 330, plus: ev_atk },
    { name: '防禦', value: def, deg: 30, plus: ev_def },
    { name: '速度', value: speed, deg: 90, plus: ev_speed },
    { name: '特防', value: spDef, deg: 150, plus: ev_spDef },
    { name: '特攻', value: spAtk, deg: 210, plus: ev_spAtk },
  ];

  return (
    <svg className="h-auto w-full" viewBox={`0 0 ${center[0] * 2} ${center[1] * 2}`}>
      <polygon points={bgPoints.flat().join(', ')} fill="#e9e9e9" />
      <g>
        <Line deg={-30} />
        <Line deg={30} />
        <Line deg={90} />
      </g>
      <polygon points={speciesStrength.flat().join(', ')} className={color} fillOpacity="0.6" />
      <g>
        {labels.map((label) => (
          <Text
            key={label.deg}
            text={label.name + (label.plus > 0 ? `+${label.plus}` : '')}
            value={label.value}
            deg={label.deg}
          />
        ))}
        <TotalText text={'total'} value={total} />
      </g>
    </svg>
  );
}
