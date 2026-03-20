import type { Post } from "./post-types";

async function readErrorText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts", { method: "GET" });
  if (!res.ok) {
    const msg = await readErrorText(res);
    throw new Error(msg || "Impossible de charger les posts.");
  }
  return (await res.json()) as Post[];
}

export async function createPost(payload: {
  title: string;
  description: string;
  image: File;
}): Promise<Post> {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("image", payload.image);

  const res = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const msg = await readErrorText(res);
    throw new Error(msg || "Erreur lors de la création.");
  }

  return (await res.json()) as Post;
}

export async function deletePost(postId: string): Promise<void> {
  const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
  if (!res.ok) {
    const msg = await readErrorText(res);
    throw new Error(msg || "Erreur lors de la suppression.");
  }
}

export async function updatePostImage(postId: string, image: File): Promise<Post> {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(`/api/posts/${postId}/image`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const msg = await readErrorText(res);
    throw new Error(msg || "Erreur lors de la mise à jour de l'image.");
  }

  return (await res.json()) as Post;
}

