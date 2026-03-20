import { api } from "../http/api-client";
import type { ObjectItem, ObjectItemCreate } from "../models/object-model";

export class ObjectItemService {
  static async create(objectCreate: ObjectItemCreate): Promise<ObjectItem> {
    const formData = new FormData();

    formData.append("title", objectCreate.title);
    formData.append("description", objectCreate.description);
    formData.append("image", objectCreate.image);

    // Assume backend expects multipart/form-data for file uploads
    return api.request<ObjectItem>("/objects", {
      method: "POST",
      body: formData,
    });
  }

  static async delete(objectId: string): Promise<void> {
    await api.delete<void>(`/objects/${objectId}`);
  }

  static async updateImage(objectId: string, image: File): Promise<ObjectItem> {
    const formData = new FormData();
    formData.append("image", image);

    return api.request<ObjectItem>(`/objects/${objectId}/image`, {
      method: "PATCH",
      body: formData,
    });
  }

  static async list(): Promise<ObjectItem[]> {
    return api.get<ObjectItem[]>("/objects");
  }

  static async getById(objectId: string): Promise<ObjectItem> {
    return api.get<ObjectItem>(`/objects/${objectId}`);
  }
}
