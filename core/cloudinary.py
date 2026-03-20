from io import BytesIO
import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()


CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")


cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_image(
    file_bytes: bytes,
    *,
    folder: str = "posts",
    public_id: str | None = None,
    overwrite: bool = False,
) -> dict:
    return cloudinary.uploader.upload(
        BytesIO(file_bytes),  # ✅ envelopper dans BytesIO
        folder=folder,
        public_id=public_id,
        overwrite=overwrite,
        resource_type="image",
    )


def delete_image(public_id: str) -> dict:
    return cloudinary.uploader.destroy(public_id)
