import type { ObjectItem } from "@/backend/models/object-model";

export type Post = Omit<ObjectItem, "created_at"> & {
  created_at: string;
};

