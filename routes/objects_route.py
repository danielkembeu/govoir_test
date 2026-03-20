from uuid import UUID
from backend.models.object_model import Object
from backend.schemas.objects_schema import ObjectImageUpdate, ObjectRead
from backend.utils.handle_upload_image import handle_image
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional


responses = {
    404: {"description": "Objet introuvable"},
    400: {"description": "Requête invalide"},
    500: {"description": "Erreur interne du serveur"},
}


router = APIRouter(prefix="/objects", tags=["Objects Data"])


@router.get(
    "",
    response_model=list[ObjectRead],
    status_code=200,
    responses=responses
)
async def get():
    """
    Récupère tous les objets de la base de données.
    Retourne une liste d'objets.
    """
    return await Object.find_all().to_list()


@router.post(
    "",
    response_model=ObjectRead,
    status_code=201,
    responses=responses
)
async def create_item(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    image: UploadFile = File(...),
):
    """
    Crée un nouvel objet dans la base de données.
    Accepte un formulaire multipart avec une image.
    """
    image_url, image_public_id = await handle_image(image, folder="objects")

    new_object = Object(
        title=title,
        description=description,
        image_url=image_url,
        image_public_id=image_public_id,
    )

    await new_object.insert()

    return new_object


@router.patch(
    "/{object_id}/image",
    response_model=ObjectRead,
    status_code=200,
    responses=responses
)
async def update_image(image: UploadFile, object_id: UUID):
    """
    Met à jour l'image d'un objet existant.
    Retourne l'objet mis à jour.
    """

    item = await Object.get(object_id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    image_url, image_public_id = await handle_image(image, folder="objects")

    await item.set({
        Object.image_url: image_url,
        Object.image_public_id: image_public_id,
    })

    return item


@router.get(
    "/{object_id}",
    response_model=ObjectRead,
    status_code=200,
    responses=responses,
)
async def get_item(object_id: str):
    """
    Récupère un objet par son identifiant unique.
    Retourne l'objet si trouvé, sinon génère une erreur 404.
    """
    item = await Object.get(object_id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    return item


@router.delete(
    "/{object_id}",
    status_code=204,
    responses=responses
)
async def delete_item(object_id: str):
    """
    Supprime un objet de la base de données à partir de son identifiant.
    Retourne un message de confirmation si trouvé et supprimé, sinon erreur 404.
    """
    item = await Object.get(object_id)

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    await item.delete()

    return {"message": "Deleted"}
