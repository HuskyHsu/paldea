import requests
import json


def get_list():
    params = {
        "sort[0]": "paldeaId",
        "sort[1]": "subId",
        "pagination[limit]": "500",
        "populate[0]": "typeList",
        "populate[1]": "abilities",
        "populate[2]": "hiddenAbility",
        "populate[3]": "raids.moves.type",
        "populate[4]": "raids.additional.type",
        "populate[5]": "evolutions.to",
        "populate[6]": "source",
    }

    response = requests.get(
        "https://paldea.fly.dev/api/pokemons",
        params=params,
    )
    return response.json()


def get_detail(id):

    params = {
        "populate[0]": "levelingUps.move.type",
        "populate[1]": "technicalMachines.move.type",
        "populate[2]": "eggMoves.type",
        "populate[3]": "raids.moves.type",
        "populate[4]": "raids.additional.type",
    }

    response = requests.get(
        f"https://paldea.fly.dev/api/pokemons/{id}",
        params=params,
    )
    return response.json()["data"]


NameSuffix = {
    "帕底亞": "p",
    "帕底亞-鬥戰種": "p",
    "帕底亞-火熾種": "b",
    "帕底亞-水瀾種": "a",
    "伽勒爾": "g",
    "阿羅拉": "a",
    "洗翠": "h",
    "雌性": "f",
    "黑夜": "m",
    "黃昏": "d",
    "低調": "l",
    "全能形態": "h",
}

def sortPm(base):
    attributes = base["attributes"]
    if attributes["paldeaId"] > 999:
        return (attributes["paldeaId"], attributes["nationalId"], attributes["subId"] or 0)
    else:
        return (attributes["paldeaId"], attributes["subId"] or 0)

if __name__ == "__main__":

    base_list = get_list()

    output = []
    source_move_map = {}

    base_list["data"] = sorted(base_list["data"], key=sortPm)

    for base in base_list["data"]:
        attributes = base["attributes"]
        print(attributes["paldeaId"], attributes["nameZh"])

        link_str = attributes["link"]

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
            "source": attributes["source"]["data"]["attributes"]["link"],
        }

        if len(attributes["raids"]["data"]) > 0:
            data["raids"] = [
                f"{raid['attributes']['level']}_STAR"
                for raid in attributes["raids"]["data"]
            ]

        if len(attributes["evolutions"]["data"]) > 0:
            data["evolutions"] = [
                {
                    "condition": evolutions["attributes"]["condition"],
                    "link": evolutions["attributes"]["to"]["data"]["attributes"][
                        "link"
                    ],
                }
                for evolutions in attributes["evolutions"]["data"]
            ]

        output.append(data)

        if False:
            url = f"https://www.serebii.net/scarletviolet/pokemon/new/{link_str}.png"
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                with open(f"../public/image/pm/{link_str}.png", "wb") as f:
                    f.write(response.content)

            url = f"https://www.serebii.net/Shiny/SV/new/{link_str}.png"
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                with open(f"../public/image/pm/{link_str}-s.png", "wb") as f:
                    f.write(response.content)

        if attributes["nameZh"] == '幽尾玄魚':  # attributes["paldeaId"] > 9990 or True
            detail = get_detail(base["id"])
            # print(data["nameZh"])

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

            if len(detail["attributes"]["raids"]["data"]) > 0:
                detail_out["raidMoves"] = []
                for raidMoves in detail["attributes"]["raids"]["data"]:
                    detail_out["raidMoves"].append(
                        {
                            "level": raidMoves["attributes"]["level"],
                            "moves": [
                                {
                                    "nameZh": item["attributes"]["nameZh"],
                                    "type": item["attributes"]["type"]["data"][
                                        "attributes"
                                    ]["name"],
                                    "category": item["attributes"]["category"],
                                    "power": item["attributes"]["power"],
                                    "accuracy": item["attributes"]["accuracy"],
                                    "PP": item["attributes"]["PP"],
                                    "description": item["attributes"]["description"],
                                }
                                for item in raidMoves["attributes"]["moves"]["data"]
                            ],
                            "addMoves": [
                                {
                                    "nameZh": item["attributes"]["nameZh"],
                                    "type": item["attributes"]["type"]["data"][
                                        "attributes"
                                    ]["name"],
                                    "category": item["attributes"]["category"],
                                    "power": item["attributes"]["power"],
                                    "accuracy": item["attributes"]["accuracy"],
                                    "PP": item["attributes"]["PP"],
                                    "description": item["attributes"]["description"],
                                }
                                for item in raidMoves["attributes"]["additional"][
                                    "data"
                                ]
                            ],
                        }
                    )

                detail_out["raidMoves"] = sorted(
                    detail_out["raidMoves"], key=lambda row: row["level"]
                )

            if "evolutions" in data:
                before_move = []
                for move in detail_out["levelingUps"]:
                    before_move.append(
                        {
                            "from": data["nameZh"],
                            "fromType": "levelingUps",
                            "level": move["level"],
                            "nameZh": move["nameZh"],
                            "type": move["type"],
                            "category": move["category"],
                            "power": move["power"],
                            "accuracy": move["accuracy"],
                            "PP": move["PP"],
                            "description": move["description"],
                        }
                    )

                for move in detail_out["technicalMachines"]:
                    before_move.append(
                        {
                            "from": data["nameZh"],
                            "fromType": "TM",
                            "pid": move["pid"],
                            "nameZh": move["nameZh"],
                            "type": move["type"],
                            "category": move["category"],
                            "power": move["power"],
                            "accuracy": move["accuracy"],
                            "PP": move["PP"],
                            "description": move["description"],
                        }
                    )

                for move in detail_out["eggMoves"]:
                    before_move.append(
                        {
                            "from": data["nameZh"],
                            "fromType": "egg",
                            "nameZh": move["nameZh"],
                            "type": move["type"],
                            "category": move["category"],
                            "power": move["power"],
                            "accuracy": move["accuracy"],
                            "PP": move["PP"],
                            "description": move["description"],
                        }
                    )

                if data["source"] not in source_move_map:
                    source_move_map[data["source"]] = []

                source_move_map[data["source"]] += before_move

            elif data["source"] in source_move_map:
                before_move = source_move_map[data["source"]]
                curr_move = set()
                for move in detail_out["levelingUps"]:
                    curr_move.add(move["nameZh"])

                for move in detail_out["technicalMachines"]:
                    curr_move.add(move["nameZh"])

                for move in detail_out["eggMoves"]:
                    curr_move.add(move["nameZh"])

                loss_move = []
                for move in before_move:
                    if move["nameZh"] in curr_move:
                        continue
                    loss_move.append(move)

                if len(loss_move) > 0:
                    detail_out["beforeMoves"] = loss_move

            with open(
                f"../public/data/pokemon/{link_str}.json",
                "wt",
                encoding="utf-8",
            ) as fout:
                fout.write(json.dumps(detail_out))

    with open("../src/data/base_list.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(output))
