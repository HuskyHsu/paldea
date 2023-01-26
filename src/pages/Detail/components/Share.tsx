import { useState } from 'react';

import { useLiffContext, getWeaknessType, getAttackRange } from '@/components';
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
  terasType: string;
  moves: BaseMove[];
}) => {
  return {
    type: 'bubble',
    size: 'mega',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: `https://huskyhsu.github.io/paldea/image/icon/${pm.link}.png`,
          size: 'xxl',
          aspectRatio: '10:8',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: pm.nameZh,
              color: '#FFFFFF',
            },
          ],
          position: 'absolute',
          offsetTop: '10%',
          paddingStart: 'lg',
          backgroundColor: '#00000066',
          paddingEnd: 'lg',
          offsetStart: '5%',
          paddingTop: 'xs',
          paddingBottom: 'xs',
          cornerRadius: 'xxl',
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
          ],
          position: 'absolute',
          offsetTop: '35%',
          offsetStart: '6%',
        },
      ],
      backgroundColor: `${TypeColor[terasType as keyof typeof TypeMap]}99`,
      paddingBottom: 'lg',
      paddingTop: 'none',
      paddingStart: 'none',
      paddingEnd: 'none',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '太晶屬性',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 2,
                },
                {
                  type: 'image',
                  url: `https://huskyhsu.github.io/paldea/image/type/png/${terasType}.png`,
                  size: '26px',
                  flex: 4,
                  align: 'start',
                },
              ],
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '團戰密語',
                  color: '#aaaaaa',
                  size: 'lg',
                  flex: 2,
                },
                {
                  type: 'text',
                  text: code.replace(/([A-Za-z0-9]{3})([A-Za-z0-9]{3})/, '$1-$2'),
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
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: '招式',
                      color: '#aaaaaa',
                      size: 'lg',
                      flex: 2,
                    },
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'text',
                          text: '屬性',
                          align: 'center',
                          flex: 1,
                          size: 'xs',
                          color: '#aaaaaa',
                          gravity: 'center',
                        },
                        {
                          type: 'text',
                          text: '分類',
                          align: 'center',
                          flex: 1,
                          size: 'xs',
                          color: '#aaaaaa',
                          gravity: 'center',
                        },
                        {
                          type: 'text',
                          text: '威力',
                          size: 'xs',
                          align: 'center',
                          color: '#aaaaaa',
                          gravity: 'center',
                          flex: 1,
                        },
                        {
                          type: 'text',
                          text: '命中',
                          size: 'xs',
                          align: 'center',
                          color: '#aaaaaa',
                          gravity: 'center',
                          flex: 1,
                        },
                      ],
                      flex: 4,
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: moves.map((move) => {
                    return {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'text',
                          text: move.nameZh,
                          flex: 2,
                        },
                        {
                          type: 'image',
                          url: `https://huskyhsu.github.io/paldea/image/type/png/${move.type}.png`,
                          size: '20px',
                          flex: 1,
                        },
                        {
                          type: 'image',
                          url: `https://huskyhsu.github.io/paldea/image/type/png/${move.category}.png`,
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
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'text',
                          text: '打點',
                          color: '#aaaaaa',
                          flex: 2,
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: getAttackRange(
                            Array.from(new Set(moves.map((move) => move.type)))
                          ).map((type) => {
                            return {
                              type: 'icon',
                              url: `https://huskyhsu.github.io/paldea/image/type/png/${type.type}.png`,
                            };
                          }),
                          flex: 4,
                          justifyContent: 'space-around',
                        },
                      ],
                    },
                  ],
                },
              ],
              margin: 'md',
            },
          ],
          margin: 'md',
        },
        {
          type: 'separator',
          margin: 'md',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: '弱點',
                      color: '#aaaaaa',
                      size: 'lg',
                      flex: 2,
                    },
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: getWeaknessType([terasType])
                        .filter(({ rate }) => rate > 1)
                        .map((weakness) => {
                          return {
                            type: 'image',
                            url: `https://huskyhsu.github.io/paldea/image/type/png/${weakness.type}.png`,
                            size: '26px',
                            align: 'start',
                          };
                        }),
                      flex: 4,
                      alignItems: 'flex-start',
                    },
                  ],
                },
              ],
            },
          ],
          margin: 'md',
        },
      ],
      paddingStart: 'xl',
      paddingEnd: 'xl',
    },
  };
};

export function LineShare({ pokemon, terasType, moves }: Porps) {
  const [code, setCode] = useState<string>('');
  const { status, login, logout, share } = useLiffContext();

  return (
    <div className="pt-4">
      {status.isLoggedIn && (
        <div className="flex items-end justify-between gap-4">
          <div className="relative z-0 mt-8 w-28 md:w-40">
            <input
              type="text"
              id="floating_standard"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent px-0 pt-2 pb-1 text-sm text-gray-100 focus:border-green-800 focus:outline-none focus:ring-0"
              placeholder=" "
              value={code ?? ''}
              onChange={(e) =>
                setCode(
                  e.target.value
                    .replace(/[^A-Za-z0-9\s]/g, '')
                    .toUpperCase()
                    .slice(0, 6)
                )
              }
            />
            <label
              htmlFor="floating_standard"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-800"
            >
              團戰密語：
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="whitespace-nowrap rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-1 focus:ring-green-300"
              onClick={() => {
                if (terasType === null) {
                  return alert('請選擇太晶屬性');
                }

                if (code.length !== 6) {
                  return alert('請檢查密語長度');
                }

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
              傳送Line訊息
            </button>
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-1 focus:ring-green-300"
              onClick={logout}
            >
              登出
            </button>
          </div>
        </div>
      )}

      {!status.isLoggedIn && (
        <button
          type="button"
          className="rounded-lg bg-custom-green px-2 py-1 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-1 focus:ring-green-300"
          onClick={login}
        >
          登入Line，分享團戰密語與資訊
        </button>
      )}
    </div>
  );
}
