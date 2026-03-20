from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel
from fastapi import UploadFile, File


class ObjectRead(BaseModel):
    id: UUID

    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    image_public_id:  Optional[str] = None

    created_at: datetime


class ObjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    image_public_id: str


class ObjectImageUpdate(BaseModel):
    image: UploadFile = File(...)
    id: UUID


# class ObjectCreate(BaseModel):
#     title: str
#     description: str
#     image_url: str
#     image_public_id: str
