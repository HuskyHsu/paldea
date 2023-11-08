import json
import shutil
import os

json_file_path = '../public/data/base_list_201.json'
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

target_folder = '../public/image/home/normal'

def generate_file_name(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_mf_n_00000000_f_n.png"

def generate_file_name_f(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_fd_n_00000000_f_n.png"

def generate_file_name_m(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_md_n_00000000_f_n.png"

def generate_file_name_uk(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_uk_n_00000000_f_n.png"

def generate_file_name_fo(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_fo_n_00000000_f_n.png"

def generate_file_name_mo(link):
    alt = ""
    if "-" in link:
        (link, alt)= link.split("-")
    return f"poke_capture_{link.zfill(4)}_{alt.zfill(3) if alt else '000'}_mo_n_00000000_f_n.png"

# 遍歷JSON陣列
for item in data:
    link = item.get('link')
    if link:
        file_name = generate_file_name(link)

        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)
            continue

        file_name = generate_file_name_f(link)
        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}-f.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)

            destination_path = os.path.join('../public/image/home_pick', f"{link}.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)

        file_name = generate_file_name_m(link)
        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}-m.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)
            continue

        file_name = generate_file_name_uk(link)
        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)
            continue

        file_name = generate_file_name_fo(link)
        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)
            continue


        file_name = generate_file_name_mo(link)
        if os.path.exists(os.path.join(target_folder, file_name)):
            destination_path = os.path.join('../public/image/home_pick', f"{link}.png")
            shutil.copy(os.path.join(target_folder, file_name), destination_path)
            continue
