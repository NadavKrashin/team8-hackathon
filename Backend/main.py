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
async def get_profile(profile_id: int):
    return str(db.profiles.find_one({"id": profile_id}))

@app.post("/profiles/replace_profile")
async def replace_profile(profile: Profile):
    db.profiles.replace_one({"id": profile.id}, dict(profile))

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

async def get_leaderboard(id: int):
    leaderboard = db.profiles.find({}).sort("trophies", -1).limit(10)
    for doc in leaderboard:
        if doc["id"] == id:
            return str(list(leaderboard))
    return str(list(leaderboard).append(db.profiles.find_one({"id": id})))


@app.get("/games/hayadata")
async def get_hayadata():
    with open('hayadata.txt', 'r') as file:
        all_hayadata = file.read()
        splitted_hayadatas = list(findall(r'\[.*?\]', all_hayadata))
        random_index = randint(0, len(splitted_hayadatas) - 1)
        return str(splitted_hayadatas[random_index][1:-1])
