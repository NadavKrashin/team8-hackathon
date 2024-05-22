import gridfs
from pymongo import MongoClient
#prod_url="mongodb://mongodb-service-champion.apps.cluster-4kbfb.4kbfb.sandbox1471.opentlc.com/"
client = MongoClient("mongodb://localhost:27017/")
db = client['DB']
profiles = db['profiles']
fs = gridfs.GridFS(db)


def new_profile(profile):
    profiles.insert_one(profile.dict())

def upload_image(image):
    fs.put(image)


