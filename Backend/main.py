from typing import Union
from fastapi import FastAPI, UploadFile
import db
from Models import Profile
from bson import ObjectId

app = FastAPI()

@app.post("/profiles/new_profile")
async def new_profile(profile: Profile):
    print(profile)
    db.new_profile(profile)

@app.get("/profiles/{profile_id}")
async def get_profile(profile_id: int):
    print(profile_id)
    return db.get_profile(profile_id)

@app.get("/")
async def read_root():
    db.insert_json()
    return {"Hello": "World"}

@app.post("profiles/{profile_id}/uploadfile")
async def create_upload_file(file: UploadFile, profile_id: int):
    #print(file.file.read())
    db.upload_image(file.file.read(), file.filename, profile_id)
    #print(db.getfile(file.filename).filename)
    new_file = open(file.filename, 'wb')
    new_file.write(db.getfile(file.filename).read())
    return {"filename": file.filename}

@app.get("/leaderboard")
async def get_leaderboard(id: str):
    leaderboard = db.profiles.find({}).sort("score", -1).limit(10)
    for doc in leaderboard:
        if doc["_id"] == id:
            return str(list(leaderboard))        
    mongo_id = ObjectId(id)
    return str(list(leaderboard).append(db.profiles.find_one({"_id": mongo_id})))