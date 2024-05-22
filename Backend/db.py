import gridfs
from pymongo import MongoClient
prod_url="mongodb://mongodb-service-champion.apps.cluster-4kbfb.4kbfb.sandbox1471.opentlc.com/"
client = MongoClient(prod_url)
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


def upload_image(image, filename, profile_id):
    fs.put(image, filename=filename, id=profile_id)


def getfile(filename):
    return fs.find_one({'filename': filename})

def insert_json():
    profiles.insert_one({"f": 1})

