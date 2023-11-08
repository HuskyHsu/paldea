import json
import shutil
import os


json_file_path = "../public/data/base_list_201.json"
target_folder = "/Users/shihchi/Desktop/sleep/[HOME] Pokémon Renders/Normal"
destination_folder = "../public/image/home"


def generate_file_name(link, type_suffix="mf", shiny=False):
    if "-" in link:
        link, alt = link.split("-")
        alt = alt.zfill(3)
    else:
        alt = "000"

    if link == "658" and alt == "001":
        alt = "002"

    if link == "1017" and alt > "003":
        alt = str(int(alt) - 4).zfill(3)

    # mf fd md uk fo mo
    #        poke_capture_0004_000_mf_n_00000000_f_n.png
    if shiny:
        return f"poke_capture_{link.zfill(4)}_{alt}_{type_suffix}_n_00000000_f_r.png"

    return f"poke_capture_{link.zfill(4)}_{alt}_{type_suffix}_n_00000000_f_n.png"


def copy_file(target_folder, destination_folder, link, suffix, shiny=False):
    file_name = generate_file_name(link, suffix, shiny)

    if os.path.exists(os.path.join(target_folder, file_name)):
        destination_path = os.path.join(
            destination_folder, f"{link}{'-s' if shiny else ''}.png"
        )
        shutil.copy(os.path.join(target_folder, file_name), destination_path)


with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

for item in data:
    link = item.get("link")
    if link:
        copy_file(target_folder, destination_folder, link, "mf")
        copy_file(target_folder, destination_folder, link, "fd")
        copy_file(target_folder, destination_folder, link, "md")
        copy_file(target_folder, destination_folder, link, "uk")
        copy_file(target_folder, destination_folder, link, "fo")
        copy_file(target_folder, destination_folder, link, "mo")

        target_folder_ = target_folder.replace("Normal", "Shiny")

        copy_file(target_folder_, destination_folder, link, "mf", True)
        copy_file(target_folder_, destination_folder, link, "fd", True)
        copy_file(target_folder_, destination_folder, link, "md", True)
        copy_file(target_folder_, destination_folder, link, "uk", True)
        copy_file(target_folder_, destination_folder, link, "fo", True)
        copy_file(target_folder_, destination_folder, link, "mo", True)
