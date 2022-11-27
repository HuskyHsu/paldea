import requests
import json

Headers = { 
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NTM0MjM1LCJleHAiOjE2NzIxMjYyMzV9.yfdO-3kXsY18ae7t6VdBtGMQj0bx1bHh5tVeocwZM8I" 
}

def get_list():
    response = requests.get("https://paldea.fly.dev/api/pokemons", headers=Headers)
    print(response.json())

def post_list(data):
    post_data = {
        "data": {
            "nationalId": data['National'],
            "paldeaId": data['Paldea'],
            "nameZh": data['NameZh'],
            "nameJp": data['NameJp'],
            "nameEn": data['NameEn'],
            "statsHp": data['stats'][0],
            "statsAtk": data['stats'][1],
            "statsDef": data['stats'][2],
            "statsSpAtk": data['stats'][3],
            "statsSpDef": data['stats'][4],
            "statsSpd": data['stats'][5],
            "statsTotal": data['stats'][6],
            "types": json.dumps(data['types'])
        }
    }
    response = requests.post("https://paldea.fly.dev/api/pokemons", json=post_data, headers=Headers)
    print(response.json())

if __name__ == '__main__':

    with open('../public/data/paldea_list.json', 'rt') as fin:
        data = json.load(fin)
    
    for pm in data[1:]:
        post_list(pm)

    get_list()