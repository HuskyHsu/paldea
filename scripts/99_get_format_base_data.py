import requests
import json


def get_list():
    response = requests.get(
        "https://paldea.fly.dev/api/pokemons?sort[0]=paldeaId&sort[1]=subId&pagination[limit]=500&populate[0]=typeList&populate[1]=abilities&populate[2]=hiddenAbility"
    )
    return response.json()


def get_detail(id):
    response = requests.get(
        f"https://paldea.fly.dev/api/pokemons/{id}?populate[0]=levelingUps.move.type&populate[1]=technicalMachines.move.type&populate[2]=eggMoves.type"
    )
    return response.json()["data"]


NameSuffix = {
    "帕底亞": "p",
    "帕底亞-鬥戰種": "p",
    "帕底亞-火熾種": "b",
    "帕底亞-水瀾種": "a",
    "伽勒爾": "g",
    "雌性": "f",
    "黑夜": "m",
    "黃昏": "d",
    "低調": "l",
    "全能形態": "h",
}

if __name__ == "__main__":

    base_list = get_list()

    output = []
    for base in base_list["data"]:
        attributes = base["attributes"]
        print(attributes["paldeaId"], attributes["nameZh"])

        link_str = str(attributes["nationalId"]).zfill(3)
        if attributes["altForm"] in NameSuffix:
            link_str += "-" + NameSuffix[attributes["altForm"]]

        base_point = {
            "Hp": 0,
            "Atk": 0,
            "Def": 0,
            "SpAtk": 0,
            "SpDef": 0,
            "Spd": 0,
            "Total": 0,
        }

        for bp in attributes["basePoint"].split(","):
            base_point[bp.split("=")[0]] = int(bp.split("=")[1])
            base_point["Total"] += base_point[bp.split("=")[0]]

        data = {
            "link": link_str,
            "paldeaId": "---"
            if attributes["paldeaId"] > 9000
            else str(attributes["paldeaId"]).zfill(3),
            "nationalId": str(attributes["nationalId"]).zfill(3),
            "nameZh": attributes["nameZh"],
            "nameJp": attributes["nameJp"],
            "nameEn": attributes["nameEn"],
            "types": [t["attributes"]["name"] for t in attributes["typeList"]["data"]],
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
            "abilities": [
                t["attributes"]["nameZh"] for t in attributes["abilities"]["data"]
            ],
            "hiddenAbility": attributes["hiddenAbility"]["data"]["attributes"]["nameZh"]
            if attributes["hiddenAbility"]["data"]
            else None,
            "version": attributes["version"],
            "basePoint": base_point,
            "gender": {
                "M": int(attributes["gender"][1]),
                "F": int(attributes["gender"][3]),
            },
        }

        output.append(data)

        if attributes["paldeaId"] > 9990 or True:
            detail = get_detail(base["id"])

            detail_out = {
                "levelingUps": [
                    {
                        "level": item["attributes"]["level"],
                        "nameZh": item["attributes"]["move"]["data"]["attributes"][
                            "nameZh"
                        ],
                        "type": item["attributes"]["move"]["data"]["attributes"][
                            "type"
                        ]["data"]["attributes"]["name"],
                        "category": item["attributes"]["move"]["data"]["attributes"][
                            "category"
                        ],
                        "power": item["attributes"]["move"]["data"]["attributes"][
                            "power"
                        ],
                        "accuracy": item["attributes"]["move"]["data"]["attributes"][
                            "accuracy"
                        ],
                        "PP": item["attributes"]["move"]["data"]["attributes"]["PP"],
                        "description": item["attributes"]["move"]["data"]["attributes"][
                            "description"
                        ],
                    }
                    for item in detail["attributes"]["levelingUps"]["data"]
                ],
                "technicalMachines": sorted(
                    [
                        {
                            "pid": item["attributes"]["pid"],
                            "nameZh": item["attributes"]["move"]["data"]["attributes"][
                                "nameZh"
                            ],
                            "type": item["attributes"]["move"]["data"]["attributes"][
                                "type"
                            ]["data"]["attributes"]["name"],
                            "category": item["attributes"]["move"]["data"][
                                "attributes"
                            ]["category"],
                            "power": item["attributes"]["move"]["data"]["attributes"][
                                "power"
                            ],
                            "accuracy": item["attributes"]["move"]["data"][
                                "attributes"
                            ]["accuracy"],
                            "PP": item["attributes"]["move"]["data"]["attributes"][
                                "PP"
                            ],
                            "description": item["attributes"]["move"]["data"][
                                "attributes"
                            ]["description"],
                        }
                        for item in detail["attributes"]["technicalMachines"]["data"]
                    ],
                    key=lambda row: row["pid"],
                ),
                "eggMoves": [
                    {
                        "nameZh": item["attributes"]["nameZh"],
                        "type": item["attributes"]["type"]["data"]["attributes"][
                            "name"
                        ],
                        "category": item["attributes"]["category"],
                        "power": item["attributes"]["power"],
                        "accuracy": item["attributes"]["accuracy"],
                        "PP": item["attributes"]["PP"],
                        "description": item["attributes"]["description"],
                    }
                    for item in detail["attributes"]["eggMoves"]["data"]
                ],
            }

            with open(
                f"../public/data/pokemon/{link_str}.json",
                "wt",
                encoding="utf-8",
            ) as fout:
                fout.write(json.dumps(detail_out))

    with open("../src/data/base_list.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(output))
