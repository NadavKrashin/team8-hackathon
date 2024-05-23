import gridfs
from pymongo import MongoClient
prod_url="mongodb://admin:password@172.30.8.167:27017/admin"
testing_url = "mongodb://127.0.0.1:27017"
client = MongoClient(testing_url)
db = client['DB']
profiles = db['profiles']
fs = gridfs.GridFS(db)


def new_profile(profile):
    lastid_file = open("lastid.txt", 'r+')
    last_id = lastid_file.read()
    if last_id == '':
        last_id_int = 0
    else:
        last_id_int = int(last_id)
    last_id_int += 1
    lastid_file.seek(0)
    lastid_file.write(str(last_id_int))
    lastid_file.truncate()
    lastid_file.close()
    profile_dict = profile.dict()
    profile_dict['id'] = last_id_int
    profiles.insert_one(profile_dict)



def get_profile(profile_id):
    profile = profiles.find_one({"id": profile_id})
    del profile['_id']
    return profile


def get_top10():
    top10 = []
    for profile in profiles.find().sort("trophies", -1).limit(10):
        del profile['_id']
        top10.append(profile)

    return top10


def upload_image(image, filename, profile_id, game_id):
    fs.put(image, filename=filename, profile_id=profile_id, verified=0, game_id=game_id)


def getfile(filename):
    return fs.find_one({'filename': filename})


def get_all_images():
    return fs.find()

def insert_json():
    profiles.insert_one({"f": 1})

