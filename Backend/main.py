from typing import Union

from fastapi import FastAPI, UploadFile

import db
from Models import Profile

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/profiles/new_profile")
async def new_profile(profile: Profile):
    print(profile)
    db.new_profile(profile)

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile):
    db.upload_image(file)
    return {"filename": file.filename}
