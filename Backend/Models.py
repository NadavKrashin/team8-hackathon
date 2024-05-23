from typing import Optional

from pydantic import BaseModel

class Profile(BaseModel):
    name: str
    age: int
    hobbies: list
    trophies: int
    coins: int
    gameids: list


