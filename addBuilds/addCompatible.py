import pymongo
import certifi
import random

client = pymongo.MongoClient("mongodb+srv://prathamvasani1:MM0g75MvxuNIr2T1@cluster0.ckr5c.mongodb.net/levelup?retryWrites=true&w=majority", tlsCAFile=certifi.where())
db = client['levelup']
motherboard_col = db['compatibles']
build_col = db['builds']
prices_col = db['prices']
avatarChoice = [
    'build_1_2_3_4.png',
    'build_5_6_7.png',
    'build_8.png',
    'build_9.png',
    'build_10_11_12.png',
    'build_13_14_15.png',
    'build_16.png'
]

allBuilds = build_col.find()
newBuildNumber = str(len(list(allBuilds)))

for motherboard in motherboard_col.find():
    for cpu in motherboard['cpuList']:
        for gpu in motherboard['gpuList']:
            newBuildNumber = str(int(newBuildNumber) + 1)

            totalPrice = 0

            ram = random.choice(motherboard['ramList'])
            storage = random.choice(motherboard['ramList'])
            psu = random.choice(motherboard['power_supplyList'])
            avatar = random.choice(avatarChoice)

            motherboard_price = prices_col.find_one({"name": motherboard['motherboard'].lower()})['price']
            cpu_price = prices_col.find_one({"name": cpu.lower()})['price']
            gpu_price = prices_col.find_one({"name": gpu.lower()})['price']
            ram_price = prices_col.find_one({"name": ram.lower()})['price']
            storage_price = prices_col.find_one({"name": storage.lower()})['price']
            psu_price = prices_col.find_one({"name": psu.lower()})['price']

            totalPrice += motherboard_price[2] + cpu_price[2] + gpu_price[2] + ram_price[2] + storage_price[2] + psu_price[2]


            build_col.insert_one({
                "name": "build " + newBuildNumber,
                "motherboard": motherboard_price,
                "cpu": cpu_price,
                "gpu": gpu_price,
                "ram": ram_price,
                "storage": storage_price,
                "psu": psu_price,
                "price": totalPrice,
                "avatar": avatar
            })

            print("Build added successfully")