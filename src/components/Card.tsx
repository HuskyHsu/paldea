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
    <div className="w-28 md:w-44">
      <header className="flex flex-row items-end justify-between px-4 -mb-8">
        <p>#{paldeaId}</p>
        <img
          className="w-36"
          src={`${process.env.PUBLIC_URL}/image/icon/${pid}${altForm}.png`}
          alt={pokemon.nameZh}
        />
      </header>
      <div
        className={clsx(
          "flex flex-col md:items-stretch items-center",
          "px-2 md:px-4 pb-4 pt-8",
          "rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.1)] bg-white"
        )}
      >
        <p className="pt-2 mt-2 border-0 border-t-[1px] border-[#A29834]">
          {pokemon.nameZh}
          {pokemon.altForm && <sub>({pokemon.altForm})</sub>}
        </p>
        <p className="flex gap-x-2">
          {pokemon.types.map((type) => (
            <TypeIcon type={type} key={type} />
          ))}
        </p>
      </div>
    </div>
  );
}
