export interface ObjectItem {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  image_public_id?: string;
  created_at: Date;
}

export type ObjectItemCreate = Pick<ObjectItem, "title" | "description"> & {
  image: File;
};

export type ObjectItemImageUpdate = {
  object_id: string;
  image: File;
};
