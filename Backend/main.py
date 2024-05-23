import base64
from typing import Union
from fastapi import FastAPI, UploadFile
import db
from Models import Profile
from bson import ObjectId

from random import randint
from re import findall
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/profiles/new_profile")
async def new_profile(profile: Profile):
    print(profile)
    db.new_profile(profile)

@app.get("/profiles/{profile_id}")
async def get_profile(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id}))

@app.get("/profiles/name/{profile_id}")
async def get_name(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["name"])

@app.get("/profiles/age/{profile_id}")
async def get_age(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["age"])

@app.get("/profiles/score/{profile_id}")
async def get_score(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["score"])

@app.get("/profiles/hobbies/{profile_id}")
async def get_hobbies(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["hobbies"])

@app.get("/profiles/trophies/{profile_id}")
async def get_trophies(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["trophies"])

@app.get("/profiles/coins/{profile_id}")
async def get_coins(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["coins"])

@app.get("/profiles/gameids/{profile_id}")
async def get_gameids(profile_id: str):
    mongo_id = ObjectId(profile_id)
    return str(db.profiles.find_one({"_id": mongo_id})["gameids"])


@app.get("/")
async def read_root():
    db.insert_json()
    return {"Hello": "World"}


@app.post("/files/uploadfile")
async def create_upload_file(file: UploadFile, profile_id: int, game_id: int):
    #print(file.file.read())
    db.upload_image(file.file.read(), file.filename, profile_id, game_id)
    #print(db.getfile(file.filename).filename)
    new_file = open(file.filename, 'wb')
    new_file.write(db.getfile(file.filename).read())
    return {"filename": file.filename}


@app.get("/files/get_all")
async def get_all_images():
    pictures_dict = {}
    counter = 0
    for file in db.get_all_images():
        picture = {}
        picture['filename'] = file.filename
        picture['profile_id'] = file.profile_id
        picture['verified'] = file.verified
        picture['game_id'] = file.game_id
        picture['data'] = base64.b64encode(file.read()).decode('utf-8')
        pictures_dict[str(counter)] = picture
        counter += 1

    return pictures_dict

@app.get("/leaderboard")
async def get_leaderboard(id: str):
    leaderboard = db.profiles.find({}).sort("score", -1).limit(10)
    for doc in leaderboard:
        if doc["_id"] == id:
            return str(list(leaderboard))
    mongo_id = ObjectId(id)
    return str(list(leaderboard).append(db.profiles.find_one({"_id": mongo_id})))

@app.get("/games/hayadata")
async def get_hayadata():
    with open('hayadata.txt', 'r') as file:
        all_hayadata = file.read()
        splitted_hayadatas = list(findall(r'\[.*?\]', all_hayadata))
        random_index = randint(0, len(splitted_hayadatas) - 1)
        return str(splitted_hayadatas[random_index][1:-1])
