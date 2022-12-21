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


def get_move_list(start):

    params = {
        "populate[0]": "type",
        "populate[1]": "levelingUps.pokemon",
        "populate[2]": "technicalMachine.pokemon",
        "populate[3]": "eggPokemons",
        "sort[0]": "pid",
        "pagination[limit]": 50,
        "pagination[start]": start,
    }

    response = requests.get(
        f"https://paldea.fly.dev/api/moves",
        params=params,
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
            "description": attributes["description"],
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

    for i in range(0, 900, 50):
        base_list = get_move_list(i)

        for base in base_list["data"]:
            attributes = base["attributes"]
            print(attributes["nameZh"])

            if (
                len(attributes["levelingUps"]["data"]) == 0
                and attributes["technicalMachine"]["data"] is None
                and len(attributes["eggPokemons"]["data"]) == 0
            ):
                continue

            technicalMachine = None
            if attributes["technicalMachine"]["data"] is not None:
                technicalMachine = {
                    "leaguePoint": attributes["technicalMachine"]["data"]["attributes"][
                        "leaguePoint"
                    ],
                    "material": attributes["technicalMachine"]["data"]["attributes"][
                        "material"
                    ],
                    "pokemon": [
                        pm["attributes"]["link"]
                        for pm in attributes["technicalMachine"]["data"]["attributes"][
                            "pokemon"
                        ]["data"]
                    ],
                }

            # print(attributes["eggPokemons"])

            data = {
                "nameZh": attributes["nameZh"],
                "nameJp": attributes["nameJp"],
                "nameEn": attributes["nameEn"],
                "type": attributes["type"]["data"]["attributes"]["nameZh"],
                "category": attributes["category"],
                "power": attributes["power"],
                "accuracy": attributes["accuracy"],
                "PP": attributes["PP"],
                "description": attributes["description"],
                "levelingUps": [
                    {
                        "level": levelingUp["attributes"]["level"],
                        "link": levelingUp["attributes"]["pokemon"]["data"][
                            "attributes"
                        ]["link"],
                    }
                    for levelingUp in attributes["levelingUps"]["data"]
                ],
                "technicalMachine": technicalMachine,
                "eggPokemons": [
                    pm["attributes"]["link"] for pm in attributes["eggPokemons"]["data"]
                ],
            }

            with open(
                f"../public/data/relation/moves/{attributes['nameZh']}.json",
                "wt",
                encoding="utf-8",
            ) as fout:
                fout.write(json.dumps(data))
