import requests
import json


def get_list():
    response = requests.get(
        "https://paldea.fly.dev/api/pokemons?sort=paldeaId&populate=*"
    )
    return response.json()


if __name__ == "__main__":

    base_list = get_list()

    output = []
    for base in base_list["data"]:
        attributes = base["attributes"]
        data = {
            "paldeaId": attributes["paldeaId"],
            "nationalId": attributes["nationalId"],
            "nameZh": attributes["nameZh"],
            "nameJp": attributes["nameJp"],
            "nameEn": attributes["nameEn"],
            "types": [t["attributes"]["Name"] for t in attributes["typeList"]["data"]],
            "stats": [
                attributes["statsHp"],
                attributes["statsAtk"],
                attributes["statsDef"],
                attributes["statsSpAtk"],
                attributes["statsSpDef"],
                attributes["statsSpd"],
                attributes["statsTotal"],
            ],
            "altForm": attributes["altForm"],
        }

        output.append(data)

    with open("../src/data/base_list.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(output))
