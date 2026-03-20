import type { PickedImage, Post } from "./types";
import { api } from "@/lib/http/api-client";

export async function fetchPosts(): Promise<Post[]> {
  return api.get<Post[]>("/objects");
}

export async function createPost(payload: {
  title: string;
  description: string;
  image: PickedImage;
}): Promise<Post> {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("image", {
    uri: payload.image.uri,
    name: payload.image.name,
    type: payload.image.type,
  } as unknown as Blob);

  return api.request<Post>("/objects", {
    method: "POST",
    body: formData,
  });
}

export async function updatePostImage(
  postId: string,
  image: PickedImage,
): Promise<Post> {
  const formData = new FormData();

  formData.append("image", {
    uri: image.uri,
    name: image.name,
    type: image.type,
  } as unknown as Blob);

  return api.request<Post>(`/objects/${postId}/image`, {
    method: "PATCH",
    body: formData,
  });
}

export async function deletePost(postId: string): Promise<void> {
  await api.delete<void>(`/objects/${postId}`);
}
