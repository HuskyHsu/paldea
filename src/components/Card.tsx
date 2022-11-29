import { clsx } from "clsx";

import { BasePokemon, NameSuffix } from "../models";
import { TypeIcon } from "./TypeIcon";

interface Props {
  pokemon: BasePokemon;
}

export function Card({ pokemon }: Props) {
  const pid = pokemon.nationalId.toString().padStart(3, "0");
  const paldeaId = pokemon.paldeaId.toString().padStart(3, "0");
  const altForm = pokemon.altForm
    ? "-" + NameSuffix[pokemon.altForm as keyof typeof NameSuffix]
    : "";

  return (
    <div className="w-[calc(100%/3-12px)] md:max-w-[180px]">
      <header
        className={clsx(
          "flex flex-col-reverse items-center justify-center",
          "md:flex-row md:items-end md:justify-between",
          "-mb-8 px-3 md:px-4"
        )}
      >
        <span className="hidden md:block leading-none">#{paldeaId}</span>
        <img
          src={`${process.env.PUBLIC_URL}/image/icon/${pid}${altForm}.png`}
          alt={pokemon.nameZh}
        />
      </header>

      <div
        className={clsx(
          "rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.1)] bg-white",
          "px-3 pt-10 md:px-4 text-center md:text-start"
        )}
      >
        <div
          className={clsx(
            "border-0 border-t-[1px] border-[#A29834]",
            "flex flex-col gap-y-1 pt-2 pb-4"
          )}
        >
          <p className="md:hidden">#{paldeaId}</p>
          <p className="">
            {pokemon.nameZh}
            {pokemon.altForm && <sub>({pokemon.altForm})</sub>}
          </p>
          <div className="flex gap-x-2 justify-center md:justify-start">
            {pokemon.types.map((type) => (
              <TypeIcon type={type} key={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
