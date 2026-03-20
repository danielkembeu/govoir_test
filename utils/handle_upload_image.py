from fastapi import UploadFile, HTTPException

from backend.core.cloudinary import upload_image


ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


async def handle_image(image: UploadFile, folder: str = "articles", size_mb: int = 5) -> tuple[str, str]:
    MAX_SIZE_MB = size_mb

    if image.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415, detail="Type d'image non supporté")

    contents = await image.read()

    if len(contents) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=413, detail=f"Image trop lourde (max {MAX_SIZE_MB} MB)")

    result = upload_image(contents, folder=folder)
    return result["secure_url"], result["public_id"]
