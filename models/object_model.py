from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime, timezone
from beanie import Document
from pydantic import Field


class Object(Document):

    id: UUID = Field(default_factory=uuid4)

    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    image_public_id: Optional[str] = None

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "Objects"
