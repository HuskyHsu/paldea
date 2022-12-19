import requests
import json


def get_list():
    response = requests.get(
        "https://paldea.fly.dev/api/pokemons?sort[0]=paldeaId&sort[1]=subId&pagination[limit]=500&populate[0]=typeList&populate[1]=abilities&populate[2]=hiddenAbility"
    )
    return response.json()


def get_abilities_list():
    response = requests.get(
        "https://paldea.fly.dev/api/abilities?populate=*&sort[0]=pid"
    )
    return response.json()


if __name__ == "__main__":

    base_list = get_abilities_list()

    output = []
    for base in base_list["data"]:
        attributes = base["attributes"]
        print(attributes["nameZh"])

        if (
            len(attributes["pokemonList"]["data"]) == 0
            and len(attributes["pokemonList"]["data"]) == 0
        ):
            continue

        data = {
            "nameZh": attributes["nameZh"],
            "nameJp": attributes["nameJp"],
            "nameEn": attributes["nameEn"],
            "pokemonList": [
                pm["attributes"]["link"] for pm in attributes["pokemonList"]["data"]
            ],
            "hiddenList": [
                pm["attributes"]["link"] for pm in attributes["hiddenList"]["data"]
            ],
        }

        output.append(data)

    with open(
        f"../public/data/relation/abilities.json", "wt", encoding="utf-8"
    ) as fout:
        fout.write(json.dumps(output))
