export type Post = {
  id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  image_public_id?: string | null;
  created_at: string;
};

export type PickedImage = {
  uri: string;
  name: string;
  type: string;
};
