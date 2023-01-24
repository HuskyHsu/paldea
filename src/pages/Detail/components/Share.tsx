import { useState } from 'react';

import { useLiffContext } from '@/components';
import { BaseMove, BasePokemon, TypeColor, TypeMap } from '@/models';

type Porps = {
  pokemon: BasePokemon;
  terasType: string | null;
  moves: BaseMove[];
};

const genFlex = ({
  pm,
  code,
  terasType = 'Normal',
  moves,
}: {
  code: string;
  pm: BasePokemon;
  terasType: string | null;
  moves: BaseMove[];
}) => {
  return {
    type: 'bubble',
    size: 'mega',
    hero: {
      type: 'image',
      url: `https://huskyhsu.github.io/paldea/image/icon/${pm.link}.png`,
      size: 'full',
      aspectMode: 'fit',
      aspectRatio: '10:8',
      backgroundColor: `${TypeColor[terasType as keyof typeof TypeMap]}99`,
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: pm.nameZh,
          weight: 'bold',
          size: 'xl',
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'text',
              text: '6星',
              size: 'sm',
              color: '#999999',
              margin: 'md',
              flex: 0,
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '太晶',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 3,
                },
                {
                  type: 'image',
                  url: `https://huskyhsu.github.io/paldea/image/type/${terasType}.svg`,
                  size: '26px',
                  flex: 4,
                  align: 'start',
                },
              ],
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '邀請碼',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 3,
                },
                {
                  type: 'text',
                  text: code,
                  wrap: true,
                  color: '#666666',
                  size: 'lg',
                  flex: 4,
                },
              ],
            },
          ],
        },
        {
          type: 'separator',
          margin: 'md',
        },
        {
          type: 'text',
          text: '招式',
          color: '#aaaaaa',
          size: 'lg',
          margin: 'md',
        },
        ...moves.map((move) => {
          return {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: move.nameZh,
                flex: 3,
              },
              {
                type: 'image',
                url: `https://huskyhsu.github.io/paldea/image/type/${move.type}.svg`,
                size: '20px',
                flex: 1,
              },
              {
                type: 'image',
                url: `https://huskyhsu.github.io/paldea/image/type/${move.category}.svg`,
                size: '20px',
                flex: 1,
              },
              {
                type: 'text',
                text: move.power.toString(),
                align: 'center',
                flex: 1,
              },
              {
                type: 'text',
                text: move.accuracy.toString(),
                align: 'center',
                flex: 1,
              },
            ],
          };
        }),
      ],
    },
  };
};

export function LineShare({ pokemon, terasType, moves }: Porps) {
  const [code, setCode] = useState<string>('');
  const { status, login, logout, share } = useLiffContext();

  return (
    <div>
      {status.isLoggedIn && (
        <>
          <div className="relative z-0 mt-8 w-44">
            <input
              type="text"
              id="floating_standard"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent py-2.5 px-0 text-sm text-gray-100 focus:border-blue-800 focus:outline-none focus:ring-0"
              placeholder=" "
              value={code ?? ''}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
            <label
              htmlFor="floating_standard"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-800"
            >
              太晶團體戰邀請代碼：
            </label>
          </div>
          <button
            className="mr-2 mb-2 mt-2 rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={() => {
              share([
                {
                  type: 'flex',
                  altText: `${pokemon.nameZh}-太晶團戰: ${code}`,
                  contents: JSON.parse(
                    JSON.stringify(
                      genFlex({
                        code: code,
                        pm: pokemon,
                        terasType: terasType,
                        moves: moves,
                      })
                    )
                  ),
                },
              ]);
            }}
          >
            Share
          </button>
          <button
            type="button"
            className="mr-2 mb-2 mt-2 rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={logout}
          >
            登出
          </button>
        </>
      )}

      {!status.isLoggedIn && (
        <button
          type="button"
          className="mr-2 mb-2 mt-8 rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          onClick={login}
        >
          登入Line快速分享
        </button>
      )}
    </div>
  );
}
