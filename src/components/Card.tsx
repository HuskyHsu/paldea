import { BasePokemon } from "../models";
import { TypeIcon } from "./TypeIcon";

interface Props {
  pokemon: BasePokemon;
}

export function Card({ pokemon }: Props) {
  const pid = pokemon.nationalId.toString().padStart(3, "0");
  const paldeaId = pokemon.paldeaId.toString().padStart(3, "0");

  return (
    <div className="w-44">
      <header className="flex flex-row-reverse">
        <img
          className="w-36 -mb-8"
          src={`./image/icon/${pid}.png`}
          alt={pokemon.nameZh}
        />
      </header>
      <div className="rounded-lg shadow-lg bg-white p-4 pt-8">
        <p>#{paldeaId}</p>
        <p className="">{pokemon.nameZh}</p>
        <p className="flex gap-x-2">
          {pokemon.types.map((type) => (
            <TypeIcon type={type} />
          ))}
        </p>
      </div>
    </div>
  );
}
