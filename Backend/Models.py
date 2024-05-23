from typing import Optional

from pydantic import BaseModel

class Profile(BaseModel):
    id: int
    name: str
    age: int
    hobbies: list
    trophies: int
    coins: int
    gameids: list
