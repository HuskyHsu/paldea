import requests
import json
import time

Headers = {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NjA4MDIxLCJleHAiOjE2NzIyMDAwMjF9._Q9uZ6relAQk0E4eAqiAn3y4bp3jilHJtP2kH7aLttI"
}


def get_types():
    response = requests.get("https://paldea.fly.dev/api/types")
    return response.json()


def get_pokemons():
    response = requests.get(
        "https://paldea.fly.dev/api/pokemons?pagination[limit]=1000"
    )
    return response.json()


def put_pokemon(data):
    response = requests.put(
        f"https://paldea.fly.dev/api/pokemons/{data['id']}",
        json={"data": data["attributes"]},
        headers=Headers,
    )
    return response.json()


if __name__ == "__main__":

    types = get_types()

    type_map = {t["attributes"]["Name"]: t["id"] for t in types["data"]}

    print(type_map)

    pms = get_pokemons()

    for pm in pms["data"][:]:
        pm["attributes"]["typeList"] = [type_map[t] for t in pm["attributes"]["types"]]
        result = put_pokemon(pm)
        print(result)

        time.sleep(0.1)
