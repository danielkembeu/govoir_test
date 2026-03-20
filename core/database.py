from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from backend.models.object_model import Object
from dotenv import load_dotenv

import os

load_dotenv()


async def init_db():
    client = AsyncIOMotorClient(os.getenv("DATABASE_URL"))

    await init_beanie(
        database=client[os.getenv("DATABASE_NAME")],
        document_models=[Object]
    )
