import json
import sqlite3
import gzip


def get_dict(file_name: str, source: int, target: int):
    with open(f"rawdata/mapping/{file_name}.csv", "r") as file:
        names_data = file.readlines()

    replacement_dict = {}
    for line in names_data:
        parts = line.strip().split(",")
        nameEn = parts[source]
        nameZh = parts[target]
        replacement_dict[nameEn] = nameZh

    return replacement_dict


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


def nameEnToZh(names_dict, raw_data):
    for nameEn, nameZh in list(names_dict.items())[::-1]:
        raw_data = raw_data.replace(f" - {nameEn}", f" - {nameZh}")
        raw_data = raw_data.replace(f"{nameEn}-", f"{nameZh}-")

    return raw_data


def rowsToJsonArray(raw_data):
    new_data = []
    name_link_map = {}

    curr = {}
    curr_index = 0
    list_key = None

    TMMap = {}

    # 匯出所有進化條件用來要翻譯的，過程產物
    # 對應到 evolutionItem.csv, evolutionMethod.csv
    evolutionItem = set()
    evolutionMethod = set()

    raw_data = raw_data.split("\n")
    for i, line in enumerate(raw_data):
        curr_index += 1

        if curr_index in [1, 3]:
            continue

        if curr_index == 2:
            line = line.split(" (")[0].split(" - ")
            curr["pid"] = int(line[0])
            line = line[1]

            if " B#" in line:
                [line, curr["Blueberry"]] = line.split(" B#")

            if " K#" in line:
                [line, curr["Kitakami"]] = line.split(" K#")

            if " #" in line:
                [line, curr["Paldea"]] = line.split(" #")

            curr["Name"] = line

        elif ": " in line:
            [key, *value] = line.split(": ")
            curr[key.replace(" ", "")] = ": ".join(value)

        elif line.endswith(":"):
            list_key = line[:-1].replace(" ", "")
            curr[list_key] = []

        elif line.startswith("- "):
            curr[list_key].append(line[2:])

        elif line.startswith("Evolves into "):
            if "Evolves" not in curr:
                curr["Evolves"] = []

            line = line.replace("Evolves into ", "").replace("-0 @ ", " @ ")
            item = line[:-1].split("[")[1]

            evolutionItem.add(item)

            if item not in evolutionItem_dict and not item.isnumeric():
                print(item)

            [linkTo, condition] = line.split(" @ ")

            method = condition.split("(")[1].split(")")[0]
            evolutionMethod.add(method)

            for nameEn, nameZh in evolutionItem_dict.items():
                condition = condition.replace(nameEn, nameZh)

            condition = condition.replace(method, evolutionMethod_dict[method])
            if "<ITEM>" in condition:
                if item.isnumeric():
                    condition = condition.replace("<ITEM>", item)
                else:
                    condition = condition.replace("<ITEM>", evolutionItem_dict[item])
            condition = condition.split(" [")[0]

            if "(等級提升)" in condition:
                condition = condition.split(" ")[0]

            if "lv0 " in condition:
                condition = condition[:-1].split(" (")[1]

            evolution = {"condition": condition, "link": linkTo}

            curr["Evolves"].append(evolution)

        else:
            curr_index = 0

            curr["pid"] = (
                [
                    row["pid"]
                    for row in new_data
                    if row["Name"] == curr["Name"].split("-")[0]
                ][0]
                if "-" in curr["Name"]
                else curr["pid"]
            )

            curr["link"] = str(curr["pid"]) + (
                f'-{curr["Name"].split("-")[1]}' if "-" in curr["Name"] else ""
            )

            name_link_map[curr["Name"]] = curr["link"]

            if "Blueberry" in curr:
                curr["Blueberry"] = int(curr["Blueberry"])

            if "Kitakami" in curr:
                curr["Kitakami"] = int(curr["Kitakami"])

            if "Paldea" in curr:
                curr["Paldea"] = int(curr["Paldea"])

            if curr["link"] in hisui_dict:
                curr["Hisui"] = int(hisui_dict[curr["link"]])

            curr["Type"] = [type_dict[t] for t in curr["Type"].split(" / ")]
            curr["EggGroup"] = [
                egg_group_dict[t] for t in curr["EggGroup"].split(" / ")
            ]

            abilities_ = []
            for ability in curr["Abilities"].split(" | "):
                ability_ = ability.split(" (")
                abilities_.append(ability_dict[ability_[0]])
            if abilities_[0] == abilities_[1]:
                curr["Abilities"] = [abilities_[0]]
            else:
                curr["Abilities"] = abilities_[:2]

            if abilities_[0] != abilities_[2]:
                curr["AbilityHide"] = abilities_[2]

            curr["BaseStats"] = [
                int(s) for s in curr["BaseStats"].split(" (")[0].split(".")
            ]

            curr["EVYield"] = [int(s) for s in curr["EVYield"].split(".")]
            curr["GenderRatio"] = int(curr["GenderRatio"])
            curr["CatchRate"] = int(curr["CatchRate"])
            del curr["Height"]
            del curr["EXPGroup"]

            if "LevelUpMoves" in curr:
                moves_ = []
                for move in curr["LevelUpMoves"]:
                    [level, name] = move[1:].split("] ")
                    moves_.append({"level": int(level), "name": move_dict[name]})
                curr["LevelUpMoves"] = moves_

            if "TMLearn" in curr:
                moves_ = []
                for move in curr["TMLearn"]:
                    [tm, name] = move[1:].split("] ")
                    moves_.append({"tm": tm, "name": move_dict[name]})

                    TMMap[tm] = [move_dict[name], move_id_dict[move_dict[name]]]

                curr["TMLearn"] = moves_

            if "EggMoves" in curr:
                curr["EggMoves"] = [move_dict[move] for move in curr["EggMoves"]]

            if "Reminder" in curr:
                curr["Reminder"] = [move_dict[move] for move in curr["Reminder"]]

            new_data.append(curr)
            curr = {}

    sorted_keys = sorted(TMMap.keys())
    for key in sorted_keys:
        value = TMMap[key]
        print(f"{key},{value[0]},{value[1]}")

    return new_data, name_link_map


def updateEvolves(new_data):
    source_map = {}

    for data in new_data:
        if "Evolves" in data:
            data["Evolves"] = [
                {"condition": e["condition"], "link": name_link_map[e["link"]]}
                for e in data["Evolves"]
            ]

            for e in data["Evolves"]:
                source_map[e["link"]] = data["link"]

    for data in new_data:
        if data["link"] in source_map:
            data["source"] = source_map[data["link"]]
        else:
            data["source"] = data["link"]

    for data in new_data:
        if data["source"] in source_map:
            data["source"] = source_map[data["source"]]

    return source_map


def addLevelUpMoves(data, cursor):
    if "LevelUpMoves" in data:
        for move in data["LevelUpMoves"]:
            cursor.execute(
                f"INSERT INTO pokemon_moves (pokemon_link, move_id, level) VALUES (?, ?, ?)",
                (link, move_id_dict[move["name"]], move["level"]),
            )


def addTMLean(data, cursor):
    if "TMLearn" in data:
        for move in data["TMLearn"]:
            cursor.execute(
                f"INSERT INTO pokemon_TMs (pokemon_link, tm_id) VALUES (?, ?)",
                (link, int(move["tm"].replace("TM", ""))),
            )


def addEggMoves(data, cursor):
    if "EggMoves" in data:
        for move in data["EggMoves"]:
            cursor.execute(
                f"INSERT INTO pokemon_moves (pokemon_link, move_id, level) VALUES (?, ?, ?)",
                (link, move_id_dict[move], -1),
            )


def addReminder(data, cursor):
    if "Reminder" in data:
        for move in data["Reminder"]:
            cursor.execute(
                f"INSERT INTO pokemon_moves (pokemon_link, move_id, level) VALUES (?, ?, ?)",
                (link, move_id_dict[move], -2),
            )


def addEvolves(data, cursor):
    if "Evolves" in data:
        for evolve in data["Evolves"]:
            cursor.execute(
                f"INSERT INTO pokemon_evolves (pokemon_from_link, pokemon_to_link, condition) VALUES (?, ?, ?)",
                (link, evolve["link"], evolve["condition"]),
            )


def addTags(cursor):
    with open("rawdata/mapping/tags.json") as f:
        tags = json.load(f)

    for tag, pokemon_ids in tags.items():
        for pokemon_id in pokemon_ids:
            cursor.execute(
                "INSERT INTO pokemon_tags (pokemon_link, tag) VALUES (?, ?)",
                (pokemon_id, tag),
            )


def init_db():
    conn = sqlite3.connect("rawdata/mapping/sv.db")
    conn.row_factory = dict_factory

    cursor = conn.cursor()

    cursor.execute("DELETE FROM pokemons;")
    cursor.execute("DELETE FROM pokemon_moves;")
    cursor.execute("DELETE FROM pokemon_TMs;")
    cursor.execute("DELETE FROM pokemon_evolves;")
    cursor.execute("DELETE FROM pokemon_tags;")
    conn.commit()

    return conn, cursor


names_dict = get_dict("names", 3, 1)
type_dict = get_dict("types", 0, 1)
ability_dict = get_dict("abilities", 3, 1)
ability_dict["Mind’s Eye"] = ability_dict["Mind's Eye"]
ability_id_dict = get_dict("abilities", 1, 0)
altForm_dict = get_dict("altForm", 0, 1)
evolutionItem_dict = get_dict("evolutionItem", 0, 1)
evolutionMethod_dict = get_dict("evolutionMethod", 0, 1)

move_dict = get_dict("moves", 3, 1)
move_id_dict = get_dict("moves", 1, 0)
egg_group_dict = get_dict("eggGroup", 1, 0)
hisui_dict = get_dict("hisui", 2, 0)

with open("rawdata/3.0.0.txt", "r") as file:
    raw_data = file.read()

if __name__ == "__main__":
    source_map = {}

    raw_data = nameEnToZh(names_dict, raw_data)
    new_data, name_link_map = rowsToJsonArray(raw_data)

    source_map = updateEvolves(new_data)

    # 將初步整理成json的檔案會出查看
    # with open("rawdata/3.0.0_zh.json", "w") as output_file:
    #     output_file.write(json.dumps(new_data, indent=4, ensure_ascii=False))

    conn, cursor = init_db()

    for data in new_data:
        if "-" in data["Name"] and data["Name"] not in altForm_dict:
            print(data["Name"])
            continue

        link = data["link"]

        if "面影輝映" == data["Abilities"][0]:
            data["Kitakami"] = 200

        columns = [
            "pid",
            "link",
            "altForm",
            "paldea",
            "kitakami",
            "blueberry",
            "hisui",
            "type_1",
            "type_2",
            "abilitiy_1",
            "abilitiy_2",
            "hiddenAbility",
            "baseStats_HP",
            "baseStats_Atk",
            "baseStats_Def",
            "baseStats_SpA",
            "baseStats_SpD",
            "baseStats_Spe",
            "EV_HP",
            "EV_Atk",
            "EV_Def",
            "EV_SpA",
            "EV_SpD",
            "EV_Spe",
            "genderRatio",
            "eggGroup_1",
            "eggGroup_2",
            "source",
        ]

        cursor.execute(
            f"INSERT INTO pokemons ({', '.join(columns)}) VALUES ({', '.join(['?']*len(columns))})",
            (
                data["pid"],
                data["link"],
                altForm_dict[data["Name"]] if data["Name"] in altForm_dict else None,
                data["Paldea"] if "Paldea" in data else None,
                data["Kitakami"] if "Kitakami" in data else None,
                data["Blueberry"] if "Blueberry" in data else None,
                data["Hisui"] if "Hisui" in data else None,
                data["Type"][0],
                data["Type"][1] if len(data["Type"]) > 1 else None,
                int(data["Name"].split("-")[1]) + 297
                if "面影輝映" == data["Abilities"][0]
                else ability_id_dict[data["Abilities"][0]],
                ability_id_dict[data["Abilities"][1]]
                if len(data["Abilities"]) > 1
                else None,
                ability_id_dict[data["AbilityHide"]] if "AbilityHide" in data else None,
                data["BaseStats"][0],
                data["BaseStats"][1],
                data["BaseStats"][2],
                data["BaseStats"][3],
                data["BaseStats"][4],
                data["BaseStats"][5],
                data["EVYield"][0],
                data["EVYield"][1],
                data["EVYield"][2],
                data["EVYield"][3],
                data["EVYield"][4],
                data["EVYield"][5],
                data["GenderRatio"],
                data["EggGroup"][0],
                data["EggGroup"][1] if len(data["EggGroup"]) > 1 else None,
                data["source"],
            ),
        )

        # conn.commit()

        addLevelUpMoves(data, cursor)
        addTMLean(data, cursor)
        addEggMoves(data, cursor)
        addReminder(data, cursor)
        addEvolves(data, cursor)

    addTags(cursor)
    conn.commit()

    sourceMap = {}
    eggMoveList = []
    for row in cursor.execute(
        """
SELECT
	*
FROM
	pokemon_moves
WHERE
	pokemon_moves.level = - 1
"""
    ):
        eggMoveList.append(row)

    for row in eggMoveList:
        if not row["pokemon_link"] in sourceMap:
            sourceMap[row["pokemon_link"]] = []
            for row_ in cursor.execute(
                """
SELECT
	pokemons.link
FROM
	pokemons
WHERE
	pokemons.source = ?
	AND pokemons.link != pokemons.source;
        """,
                (row["pokemon_link"],),
            ):
                sourceMap[row["pokemon_link"]].append(row_["link"])

    sourceMap["216"].append("901-1")
    for row in eggMoveList:
        sourceList = sourceMap[row["pokemon_link"]]
        for pm in sourceList:
            cursor.execute(
                f"INSERT INTO pokemon_moves (pokemon_link, move_id, level) VALUES (?, ?, ?)",
                (pm, row["move_id"], -1),
            )

    conn.commit()

    new_data = []
    for row in cursor.execute(
        """
SELECT
	pokemons.pid,
	pokemons.link,
	pokemons.paldea,
	pokemons.kitakami,
    pokemons.blueberry,
	pokemons.hisui,
	names.nameZh,
	names.nameJp,
	names.nameEn,
	pokemons.altForm,
	pokemons.type_1,
	pokemons.type_2,
	a_1.nameZh AS ability_1_NameZh,
	a_2.nameZh AS ability_2_NameZh,
	a_h.nameZh AS hiddenAbility,
	pokemons.baseStats_HP,
	pokemons.baseStats_Atk,
	pokemons.baseStats_Def,
	pokemons.baseStats_SpA,
	pokemons.baseStats_SpD,
	pokemons.baseStats_Spe,
	pokemons.baseStats_HP + pokemons.baseStats_Atk + pokemons.baseStats_Def + pokemons.baseStats_SpA + pokemons.baseStats_SpD + pokemons.baseStats_Spe AS baseStatsTotal,
	pokemons.EV_HP,
	pokemons.EV_Atk,
	pokemons.EV_Def,
	pokemons.EV_SpA,
	pokemons.EV_SpD,
	pokemons.EV_Spe,
    pokemons.eggGroup_1,
    pokemons.eggGroup_2,
	pokemons.genderRatio,
	pokemons.source
FROM
	pokemons
	LEFT JOIN names ON names.pid = pokemons.pid
	LEFT JOIN abilities AS a_1 ON a_1.pid = pokemons.abilitiy_1
	LEFT JOIN abilities AS a_2 ON a_2.pid = pokemons.abilitiy_2
	LEFT JOIN abilities AS a_h ON a_h.pid = pokemons.hiddenAbility
ORDER BY
	pokemons.pid,
	pokemons.link;
"""
    ):
        row["types"] = [row["type_1"]]
        if row["type_2"] != None:
            row["types"].append(row["type_2"])

        del row["type_1"]
        del row["type_2"]

        row["abilities"] = [row["ability_1_NameZh"]]
        if row["ability_2_NameZh"] != None:
            row["abilities"].append(row["ability_2_NameZh"])

        del row["ability_1_NameZh"]
        del row["ability_2_NameZh"]

        row["eggGroups"] = [row["eggGroup_1"]]
        if row["eggGroup_2"] != None:
            row["eggGroups"].append(row["eggGroup_2"])

        del row["eggGroup_1"]
        del row["eggGroup_2"]

        row["baseStats"] = [
            row["baseStats_HP"],
            row["baseStats_Atk"],
            row["baseStats_Def"],
            row["baseStats_SpA"],
            row["baseStats_SpD"],
            row["baseStats_Spe"],
        ]
        del row["baseStats_HP"]
        del row["baseStats_Atk"]
        del row["baseStats_Def"]
        del row["baseStats_SpA"]
        del row["baseStats_SpD"]
        del row["baseStats_Spe"]

        row["EVs"] = [
            row["EV_HP"],
            row["EV_Atk"],
            row["EV_Def"],
            row["EV_SpA"],
            row["EV_SpD"],
            row["EV_Spe"],
        ]
        del row["EV_HP"]
        del row["EV_Atk"]
        del row["EV_Def"]
        del row["EV_SpA"]
        del row["EV_SpD"]
        del row["EV_Spe"]

        new_data.append(row)

    evolveInvMap = {
        evolves["pokemon_to_link"]: evolves["pokemon_from_link"]
        for evolves in cursor.execute("SELECT * from pokemon_evolves;")
    }

    evolveMap = {
        evolves["pokemon_from_link"]: evolves["pokemon_to_link"]
        for evolves in cursor.execute("SELECT * from pokemon_evolves;")
    }

    for row in new_data:
        moveMap = {
            "levelingUps": [],
            "eggMoves": [],
            "TMs": [],
            "beforeEvolve": [],
            "beforeEvolveTMs": [],
        }
        for move in cursor.execute(
            """
SELECT
	pokemon_moves.level,
	moves.*
FROM
	pokemon_moves
	JOIN moves ON pokemon_moves.move_id = moves.pid
WHERE
	pokemon_moves.pokemon_link = ?
ORDER BY
	pokemon_moves.level, moves.pid;
""",
            (row["link"],),
        ):
            if move["level"] < 0:
                moveMap["eggMoves"].append(move)
            else:
                moveMap["levelingUps"].append(move)

        for move in cursor.execute(
            """
SELECT
	TMs.pid as TMPid,
    TMs.leaguePoint,
	moves.*
FROM
	pokemon_TMs
	JOIN TMs ON pokemon_TMs.tm_id = TMs.pid
	JOIN moves ON TMs.move_id = moves.pid
WHERE
	pokemon_TMs.pokemon_link = ?
ORDER BY
	TMs.pid;
""",
            (row["link"],),
        ):
            moveMap["TMs"].append(move)

        for tm in moveMap["TMs"]:
            tm["materials"] = []
            for material in cursor.execute(
                """
SELECT
	names.nameZh || '的' || TM_materials.part AS material,
	TM_materials.count,
	TM_materials.pm_source AS pm
FROM
	TM_materials
	JOIN pokemons ON TM_materials.pm_source = pokemons.link
	JOIN names ON pokemons.pid = names.pid
WHERE
	TM_materials.tm_id = ?
    """,
                (tm["TMPid"],),
            ):
                tm["materials"].append(material)

        if row["link"] in evolveInvMap:
            for move in cursor.execute(
                """
SELECT
    pokemons.link as "pm_link",
    names.nameZh as "pm_nameZh",
    pokemons.altForm as "pm_altForm",
    pokemons.type_1 as "pm_type_1",
    pokemons.type_2 as "pm_type_2",
	pokemon_moves.level,
	moves.*
FROM
	pokemon_moves
	JOIN moves ON pokemon_moves.move_id = moves.pid
	JOIN pokemons on pokemon_moves.pokemon_link = pokemons.link
	join names on names.pid = pokemons.pid
WHERE
	pokemon_moves.pokemon_link = ?
	AND pokemon_moves.move_id not in(
		SELECT
			pokemon_moves.move_id FROM pokemon_moves
		WHERE
			pokemon_moves.pokemon_link = ? UNION SELECT
	TMs.move_id
FROM
	pokemon_TMs
	JOIN TMs ON pokemon_TMs.tm_id = TMs.pid
WHERE
	pokemon_TMs.pokemon_link = ?);
    """,
                (
                    evolveInvMap[row["link"]],
                    row["link"],
                    row["link"],
                ),
            ):
                pm = {"types": []}
                move_ = {}
                for key in move:
                    if key.startswith("pm"):
                        if key.startswith("pm_type"):
                            pm["types"].append(move[key])
                        else:
                            pm[key.split("_")[1]] = move[key]
                    else:
                        move_[key] = move[key]

                move_["pm"] = pm

                if row["link"] in [
                    "157-1",
                    "503-1",
                    "549-1",
                    "628-1",
                    "724-1",
                    "899",
                    "900",
                    "901",
                ]:
                    print(
                        move["pm_nameZh"],
                        move["pm_altForm"],
                        move["nameZh"],
                        "=====洗翠的不匯入",
                    )
                else:
                    moveMap["beforeEvolve"].append(move_)
                    print(move["pm_nameZh"], move["pm_altForm"], move["nameZh"])

        if row["link"] in evolveInvMap and evolveInvMap[row["link"]] in evolveInvMap:
            for move in cursor.execute(
                """
SELECT
    pokemons.link as "pm_link",
    names.nameZh as "pm_nameZh",
    pokemons.altForm as "pm_altForm",
    pokemons.type_1 as "pm_type_1",
    pokemons.type_2 as "pm_type_2",
	pokemon_moves.level,
	moves.*
FROM
	pokemon_moves
	JOIN moves ON pokemon_moves.move_id = moves.pid
	JOIN pokemons on pokemon_moves.pokemon_link = pokemons.link
	join names on names.pid = pokemons.pid
WHERE
	pokemon_moves.pokemon_link = ?
	AND pokemon_moves.move_id not in(
		SELECT
			pokemon_moves.move_id FROM pokemon_moves
		WHERE
			pokemon_moves.pokemon_link = ? UNION SELECT
	TMs.move_id
FROM
	pokemon_TMs
	JOIN TMs ON pokemon_TMs.tm_id = TMs.pid
WHERE
	pokemon_TMs.pokemon_link = ?);
    """,
                (
                    evolveInvMap[evolveInvMap[row["link"]]],
                    evolveInvMap[row["link"]],
                    evolveInvMap[row["link"]],
                ),
            ):
                pm = {"types": []}
                move_ = {}
                for key in move:
                    if key.startswith("pm"):
                        if key.startswith("pm_type"):
                            pm["types"].append(move[key])
                        else:
                            pm[key.split("_")[1]] = move[key]
                    else:
                        move_[key] = move[key]

                move_["pm"] = pm

                if row["link"] in [
                    "157-1",
                    "503-1",
                    "549-1",
                    "628-1",
                    "724-1",
                    "899",
                    "900",
                    "901",
                ]:
                    print(
                        move["pm_nameZh"],
                        move["pm_altForm"],
                        move["nameZh"],
                        "跨兩階",
                        "=====洗翠的不匯入",
                    )
                else:
                    moveMap["beforeEvolve"].append(move_)
                    print(move["pm_nameZh"], move["pm_altForm"], move["nameZh"], "跨兩階")

        if row["link"] in evolveInvMap:
            for tm in cursor.execute(
                """
SELECT
	pokemon_TMs.pokemon_link AS "pm_link",
	names.nameZh AS "pm_nameZh",
	pokemons.altForm AS "pm_altForm",
	pokemons.type_1 AS "pm_type_1",
	pokemons.type_2 AS "pm_type_2",
	TMs.pid as "TMPid",
	TMs.leaguePoint,
	moves.*
FROM
	pokemon_TMs
	JOIN TMs ON pokemon_TMs.tm_id = TMs.pid
	JOIN moves ON TMs.move_id = moves.pid
	JOIN pokemons ON pokemon_TMs.pokemon_link = pokemons.link
	JOIN names ON pokemons.pid = names.pid
WHERE
	pokemon_TMs.tm_id > 0
	AND pokemon_TMs.pokemon_link = ?
	AND pokemon_TMs.tm_id NOT in(
		SELECT
			pokemon_TMs.tm_id FROM pokemon_TMs
		WHERE
			pokemon_TMs.pokemon_link = ?);
        """,
                (
                    evolveInvMap[row["link"]],
                    row["link"],
                ),
            ):
                for tm_ in cursor.execute(
                    """
    SELECT
        count(*) as "count"
    FROM
        pokemon_moves
    WHERE
        pokemon_moves.pokemon_link = ?
        AND pokemon_moves.move_id = ?;
            """,
                    (
                        row["link"],
                        tm["pid"],
                    ),
                ):
                    if tm_["count"] == 0:
                        pm = {"types": []}
                        move = {}
                        for key in tm:
                            if key.startswith("pm"):
                                if key.startswith("pm_type"):
                                    pm["types"].append(tm[key])
                                else:
                                    pm[key.split("_")[1]] = tm[key]
                            else:
                                move[key] = tm[key]

                        move["pm"] = pm
                        move["materials"] = []
                        for material in cursor.execute(
                            """
            SELECT
                names.nameZh || '的' || TM_materials.part AS material,
                TM_materials.count,
                TM_materials.pm_source AS pm
            FROM
                TM_materials
                JOIN pokemons ON TM_materials.pm_source = pokemons.link
                JOIN names ON pokemons.pid = names.pid
            WHERE
                TM_materials.tm_id = ?
                """,
                            (tm["TMPid"],),
                        ):
                            move["materials"].append(material)

                        print(
                            "招式機======>",
                            move["pm"]["nameZh"],
                            move["pm"]["altForm"],
                            move["nameZh"],
                        )
                        moveMap["beforeEvolveTMs"].append(move)

        if row["link"] in evolveInvMap and evolveInvMap[row["link"]] in evolveInvMap:
            tms__ = [
                tm__
                for tm__ in cursor.execute(
                    """
SELECT
	pokemon_TMs.pokemon_link AS "pm_link",
	names.nameZh AS "pm_nameZh",
	pokemons.altForm AS "pm_altForm",
	pokemons.type_1 AS "pm_type_1",
	pokemons.type_2 AS "pm_type_2",
	TMs.pid as "TMPid",
	TMs.leaguePoint,
	moves.*
FROM
	pokemon_TMs
	JOIN TMs ON pokemon_TMs.tm_id = TMs.pid
	JOIN moves ON TMs.move_id = moves.pid
	JOIN pokemons ON pokemon_TMs.pokemon_link = pokemons.link
	JOIN names ON pokemons.pid = names.pid
WHERE
	pokemon_TMs.tm_id > 0
	AND pokemon_TMs.pokemon_link = ?
	AND pokemon_TMs.tm_id NOT in(
		SELECT
			pokemon_TMs.tm_id FROM pokemon_TMs
		WHERE
			pokemon_TMs.pokemon_link = ?);
        """,
                    (
                        evolveInvMap[evolveInvMap[row["link"]]],
                        row["link"],
                    ),
                )
            ]

            for tm__ in tms__:
                for tm___ in cursor.execute(
                    """
        SELECT
            count(*) as "count"
        FROM
            pokemon_moves
        WHERE
            pokemon_moves.pokemon_link = ?
            AND pokemon_moves.move_id = ?;
                """,
                    (
                        row["link"],
                        tm__["pid"],
                    ),
                ):
                    if tm___["count"] == 0:
                        pm = {"types": []}
                        move = {}
                        for key in tm__:
                            if key.startswith("pm"):
                                if key.startswith("pm_type"):
                                    pm["types"].append(tm__[key])
                                else:
                                    pm[key.split("_")[1]] = tm__[key]
                            else:
                                move[key] = tm__[key]

                        move["pm"] = pm
                        move["materials"] = []
                        for material in cursor.execute(
                            """
                SELECT
                    names.nameZh || '的' || TM_materials.part AS material,
                    TM_materials.count,
                    TM_materials.pm_source AS pm
                FROM
                    TM_materials
                    JOIN pokemons ON TM_materials.pm_source = pokemons.link
                    JOIN names ON pokemons.pid = names.pid
                WHERE
                    TM_materials.tm_id = ?
                    """,
                            (tm["TMPid"],),
                        ):
                            move["materials"].append(material)

                        print(
                            "招式機=跨兩階=====>",
                            move["pm"]["nameZh"],
                            move["pm"]["altForm"],
                            move["nameZh"],
                        )
                        moveMap["beforeEvolveTMs"].append(move)

        row["moves"] = moveMap

        row["evolves"] = {"from": {}, "to": []}
        for evolve in cursor.execute(
            """
SELECT
	pokemon_evolves.pokemon_from_link as 'from_link',
	names.nameZh as 'from_nameZh',
	pokemons.altForm as 'from_altForm',
	pokemons.type_1 as 'from_type_1',
	pokemons.type_2 as 'from_type_2',
	pokemon_evolves.pokemon_to_link as 'to_link',
	n_2.nameZh as 'to_nameZh',
	p_2.altForm as 'to_altForm',
	p_2.type_1 as 'to_type_1',
	p_2.type_2 as 'to_type_2',
	pokemon_evolves.condition
FROM
	pokemon_evolves
JOIN pokemons ON pokemon_evolves.pokemon_from_link = pokemons.link
JOIN names ON pokemons.pid = names.pid
JOIN pokemons as p_2 ON pokemon_evolves.pokemon_to_link = p_2.link
JOIN names as n_2 ON p_2.pid = n_2.pid
WHERE
	pokemon_evolves.pokemon_from_link = ?
ORDER BY
	LENGTH(pokemon_evolves.pokemon_to_link), pokemon_evolves.pokemon_to_link;
    """,
            (row["source"],),
        ):
            curr_to = {}
            for key in evolve:
                if key.startswith("from"):
                    key_ = "_".join(key.split("_")[1:])
                    if key_.startswith("type"):
                        row["evolves"]["from"]["types"] = [evolve["from_type_1"]]
                        if evolve["from_type_2"] != None:
                            row["evolves"]["from"]["types"].append(
                                evolve["from_type_2"]
                            )
                    else:
                        row["evolves"]["from"][key_] = evolve[key]

                elif key.startswith("to"):
                    key_ = "_".join(key.split("_")[1:])
                    if key_.startswith("type"):
                        curr_to["types"] = [evolve["to_type_1"]]
                        if evolve["to_type_2"] != None:
                            curr_to["types"].append(evolve["to_type_2"])
                    else:
                        curr_to[key_] = evolve[key]

                else:
                    curr_to[key] = evolve[key]

            row["evolves"]["to"].append(curr_to)

        for evolve in row["evolves"]["to"]:
            for next_evolve in cursor.execute(
                """
                SELECT
                    pokemon_evolves.pokemon_from_link as 'from_link',
                    names.nameZh as 'from_nameZh',
                    pokemons.altForm as 'from_altForm',
                    pokemons.type_1 as 'from_type_1',
                    pokemons.type_2 as 'from_type_2',
                    pokemon_evolves.pokemon_to_link as 'to_link',
                    n_2.nameZh as 'to_nameZh',
                    p_2.altForm as 'to_altForm',
                    p_2.type_1 as 'to_type_1',
                    p_2.type_2 as 'to_type_2',
                    pokemon_evolves.condition
                FROM
                    pokemon_evolves
                JOIN pokemons ON pokemon_evolves.pokemon_from_link = pokemons.link
                JOIN names ON pokemons.pid = names.pid
                JOIN pokemons as p_2 ON pokemon_evolves.pokemon_to_link = p_2.link
                JOIN names as n_2 ON p_2.pid = n_2.pid
                WHERE
                    pokemon_evolves.pokemon_from_link = ?
                ORDER BY
	                LENGTH(pokemon_evolves.pokemon_to_link), pokemon_evolves.pokemon_to_link;
                """,
                (evolve["link"],),
            ):
                if "to" not in evolve:
                    evolve["to"] = []

                curr_to = {}
                for key in next_evolve:
                    if key.startswith("to"):
                        key_ = "_".join(key.split("_")[1:])
                        if key_.startswith("type"):
                            curr_to["types"] = [next_evolve["to_type_1"]]
                            if next_evolve["to_type_2"] != None:
                                curr_to["types"].append(next_evolve["to_type_2"])
                        else:
                            curr_to[key_] = next_evolve[key]

                    elif not key.startswith("from"):
                        curr_to[key] = next_evolve[key]

                evolve["to"].append(curr_to)

        if len(row["evolves"]["to"]) == 0:
            del row["evolves"]

        row["tags"] = []
        for tag in cursor.execute(
            """
SELECT
	tag
FROM
	pokemon_tags
WHERE
	pokemon_tags.pokemon_link = ?
""",
            (row["link"],),
        ):
            row["tags"].append(tag["tag"])

        row["formChangin"] = []
        for pm in cursor.execute(
            """
SELECT
	pokemons. "link",
	names.nameZh,
	pokemons.altForm,
	pokemons.type_1,
	pokemons.type_2
FROM
	pokemons
	JOIN names ON pokemons.pid = "names".pid
WHERE
	pokemons.pid = ?
ORDER BY
	pokemons.pid,
	pokemons.link;
""",
            (row["pid"],),
        ):
            pm["types"] = [pm["type_1"]]
            if pm["type_2"] != None:
                pm["types"].append(pm["type_2"])

            del pm["type_1"]
            del pm["type_2"]

            row["formChangin"].append(pm)

        if len(row["formChangin"]) == 1:
            del row["formChangin"]

        row["hasEvolves"] = row["link"] in evolveMap

        with open(f"../public/data/pm/{row['link']}.json", "w") as output_file:
            output_file.write(json.dumps(row))

    print("save moves >>>>>>")

    for i in range(1, 1000):
        move = {"levelingUps": [], "egg": []}
        if i % 100 == 0:
            print(i)
        for row in cursor.execute(
            """
SELECT
	moves.*,
	pokemon_moves.pokemon_link,
	names.nameZh AS "pokemon_nameZh",
	pokemons.altForm AS "pokemon_altForm",
    pokemons.type_1 AS "pokemon_type_1",
    pokemons.type_2 AS "pokemon_type_2",
	pokemon_moves.level AS "pokemon_level"
FROM
	moves
	JOIN pokemon_moves ON moves.pid = pokemon_moves.move_id
	JOIN pokemons ON pokemons.link = pokemon_moves.pokemon_link
	JOIN names ON pokemons.pid = names.pid
WHERE
	moves.pid = ?
ORDER BY
	pokemons.pid, pokemons.link;
    """,
            (i,),
        ):
            pm = {"types": []}
            for key in row:
                if key.startswith("pokemon"):
                    if key.startswith("pokemon_type"):
                        if row[key] != None:
                            pm["types"].append(row[key])
                    else:
                        pm[key.split("_")[1]] = row[key]
                    del key
                else:
                    move[key] = row[key]

            if pm["level"] != -1:
                move["levelingUps"].append(pm)
            else:
                del pm["level"]
                move["egg"].append(pm)

        TM = {"materials": []}
        for row in cursor.execute(
            """
SELECT
	TMs.pid,
	TMs.leaguePoint
FROM
	TMs
WHERE
	TMs.move_id = ?
	AND TMs.leaguePoint NOT NULL
            """,
            (i,),
        ):
            for key in row:
                TM[key] = row[key]

        if "pid" in TM:
            move["TM"] = TM

        for row in cursor.execute(
            """
SELECT
	TMs.pid,
	TMs.leaguePoint,
	names.nameZh || '的' || TM_materials.part as "materials_part",
	TM_materials."count" as "materials_count",
	names.pid as "materials_link"

FROM
	TMs
	join TM_materials on TM_materials.tm_id = TMs.pid
	join names on names.pid = TM_materials.pm_source
WHERE
	TMs.move_id = ?
	AND TMs.leaguePoint NOT NULL
            """,
            (i,),
        ):
            material = {}
            for key in row:
                if key.startswith("materials"):
                    material[key.split("_")[1]] = row[key]
                else:
                    TM[key] = row[key]
            TM["materials"].append(material)

        # print(TM)
        if "leaguePoint" in TM and TM["leaguePoint"] > 0:
            # move["TM"] = TM
            move["TM"]["pm"] = []
            for row in cursor.execute(
                """
SELECT
	pokemons.link,
	names.nameZh,
	pokemons.altForm,
    pokemons.type_1,
    pokemons.type_2
FROM
	pokemon_TMs
	JOIN pokemons ON pokemon_TMs.pokemon_link = pokemons.link
	JOIN names ON pokemons.pid = names.pid
WHERE
	pokemon_TMs.tm_id = ?
ORDER BY names.pid, pokemons.link;
            """,
                (move["TM"]["pid"],),
            ):
                pm = {"types": []}
                for key in row:
                    if key.startswith("type"):
                        if row[key] != None:
                            pm["types"].append(row[key])
                    else:
                        pm[key] = row[key]

                move["TM"]["pm"].append(pm)

            if not "nameZh" in move:
                for row in cursor.execute(
                    """
        SELECT
            moves.*
        FROM
            moves
        WHERE
            moves.pid = ?;
            """,
                    (i,),
                ):
                    for key in row:
                        move[key] = row[key]

        for pm in move["levelingUps"]:
            if not pm["link"] in evolveMap:
                continue

            nextPm = evolveMap[pm["link"]]
            nextPms = [pm_ for pm_ in move["levelingUps"] if pm_["link"] == nextPm]
            if len(nextPms) > 0:
                pm["child"] = True

        for pm in move["egg"]:
            if not pm["link"] in evolveMap:
                continue

            nextPm = evolveMap[pm["link"]]
            nextPms = [pm_ for pm_ in move["egg"] if pm_["link"] == nextPm]
            if len(nextPms) > 0:
                pm["child"] = True

        if "TM" in move:
            for pm in move["TM"]["pm"]:
                if not pm["link"] in evolveMap:
                    continue

                nextPm = evolveMap[pm["link"]]
                nextPms = [pm_ for pm_ in move["TM"]["pm"] if pm_["link"] == nextPm]
                if len(nextPms) > 0:
                    pm["child"] = True

        if len(move["levelingUps"]) > 0 or len(move["egg"]) > 0 or "TM" in move:
            # print(move)
            with open(f"../public/data/move/{move['nameZh']}.json", "w") as output_file:
                output_file.write(json.dumps(move))

    all_moves = [
        row
        for row in cursor.execute(
            """
SELECT
	moves.*,
	TMs.pid as "TMPid"
FROM
	moves
	FULL OUTER JOIN TMs ON TMs.move_id = moves.pid
WHERE
	moves.pid in( SELECT DISTINCT
			move_id FROM pokemon_moves)
	OR moves.pid in(
		SELECT
			moves.pid FROM TMs
			JOIN moves ON TMs.move_id = moves.pid
		WHERE
			TMs.leaguePoint > 0)
ORDER BY
	moves.pid;
            """,
        )
    ]

    for move in all_moves:
        if move["TMPid"] == 0:
            move["TMPid"] = None

    with open(f"../public/data/move_list_300.json", "w") as output_file:
        output_file.write(json.dumps(all_moves))

    cursor.close()
    conn.close()

    for row in new_data:
        for key in ["moves", "formChangin", "eggGroups", "genderRatio"]:
            if key in row:
                del row[key]

    with open("../public/data/base_list_300.json", "w") as output_file:
        output_file.write(json.dumps(new_data))
