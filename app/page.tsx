import type { ObjectItem } from "@/backend/models/object-model";
import type { Post } from "@/lib/helpers/post-types";

import { ObjectItemService } from "@/backend/services/objects_service";
import { PostsDashboardClient } from "@/components/blocks/posts/PostsDashboardClient";

function normalizePost(input: ObjectItem): Post {
  const createdAt = input.created_at;

  if (createdAt instanceof Date) {
    return { ...input, created_at: createdAt.toISOString() };
  }

  const d = new Date(createdAt as unknown as string);

  const createdAtIso = Number.isNaN(d.getTime())
    ? String(createdAt)
    : d.toISOString();

  return { ...input, created_at: createdAtIso };
}

export default async function Page() {
  const posts = await ObjectItemService.list();
  const initialPosts = posts.map(normalizePost);

  return <PostsDashboardClient initialPosts={initialPosts} />;
}
