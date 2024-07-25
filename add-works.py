import json
from os import listdir
from os.path import isfile, join

if __name__=='__main__':
    with open("portfolio_info.json", "r") as jsonFile:
        info = json.load(jsonFile)

    print(info)

    new_json = {}
    title = input('Title: ')
    title_fontsize = int(input('Fontsize blocktitle (18 or smaller): '))
    tags = input("Add tags (separate by space), e.g. AI interactive installation coding: ")
    exhibited_at = input("Exhibited where? (format: title link|title link): ")
    extra_links = input("Extra links? (format: title link|title link): ")
    info_folder = input("Folder with images and txt file (same name): ")
    main_img = input("Main img filename: ")

    number  = str(int(list(info)[-1]) +1) or str(1)
    infofolder = join("imgs",info_folder)
    with open(join(infofolder, info_folder + ".txt"), "r") as d:
        description = d.readlines() 

    imgs = [f for f in listdir(infofolder) 
            if (isfile(join(infofolder, f)) and not f.endswith('txt'))]
    
    tags = [t.lower() for t in tags.split(" ")]
    orig_tags = [t.lower() for t in info['tags']]
    new_tags = list(set(tags) | set(orig_tags))
    info["tags"] = new_tags
        
    exhibited_links = []
    for item in exhibited_at.split("|"):
        item = item.split("\"") 
        if len(item) > 1:
            exhibited_links.append({"title": item[0], "link": item[1]})
        else:
            print(f"did not get exhibited item {item}")
    
    links = []
    for item in extra_links.split("|"):
        item = item.split("\"") 
        if len(item) > 1:
            links.append({"title": item[0], "link": item[1]})
        else:
            print(f"did not get link item {item}")

    new_work = {number: {
        "title": title,
        "title_fontsize": title_fontsize,
        "tags": tags,
        "description": description,
        "exhibited": exhibited_links,
        "extra_links":links,
        "imagefolder": info_folder,
        "images": imgs,
        "main_img": main_img
    }
    }

    info.update(new_work)
    info['works'] += 1

    print(info)

    with open("portfolio_info.json", "w") as jsonFile:
        json.dump(info, jsonFile)



# NOTES:
# option-shift-f to format json in vscode
# to make text nice: https://www.gdoctohtml.com/
