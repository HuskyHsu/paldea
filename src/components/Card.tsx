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
      <header className="flex flex-row-reverse">
        <img
          className="w-36 -mb-8"
          src={`${process.env.PUBLIC_URL}/image/icon/${pid}${altForm}.png`}
          alt={pokemon.nameZh}
        />
      </header>
      <div className="rounded-lg shadow-lg bg-white p-4 pt-8">
        <p>#{paldeaId}</p>
        <p className="">
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
