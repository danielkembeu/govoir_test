import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePostImage,
} from "@/lib/posts/posts";
import type { PickedImage, Post } from "@/lib/posts/types";
import { notify } from "@/lib/notify";

export function usePosts() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newImage, setNewImage] = React.useState<PickedImage | null>(null);

  const [details, setDetails] = React.useState<Post | null>(null);
  const [updateTarget, setUpdateTarget] = React.useState<Post | null>(null);
  const [updateImage, setUpdateImage] = React.useState<PickedImage | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = React.useState<Post | null>(null);

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  React.useEffect(() => {
    if (postsQuery.error) {
      console.log("[usePosts] postsQuery.error", postsQuery.error);

      const message =
        postsQuery.error instanceof Error
          ? postsQuery.error.message
          : "Erreur inconnue.";

      notify(message, "Erreur");
    }
  }, [postsQuery.error]);

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      notify("Post créé.", "Succès");
      setNewTitle("");
      setNewDescription("");
      setNewImage(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue.";

      notify(message, "Erreur");
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: ({ id, image }: { id: string; image: PickedImage }) =>
      updatePostImage(id, image),
    onSuccess: () => {
      notify("Image mise à jour.", "Succès");
      setUpdateTarget(null);
      setUpdateImage(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue.";

      notify(message, "Erreur");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      notify("Post supprimé.", "Succès");
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue.";

      notify(message, "Erreur");
    },
  });

  const submitCreate = React.useCallback(async () => {
    if (!newTitle.trim()) {
      notify("Le titre est requis.", "Erreur");
      return false;
    }

    if (!newDescription.trim()) {
      notify("La description est requise.", "Erreur");
      return false;
    }

    if (!newImage) {
      notify("Une image est requise.", "Erreur");
      return false;
    }

    try {
      await createMutation.mutateAsync({
        title: newTitle.trim(),
        description: newDescription.trim(),
        image: newImage,
      });

      return true;
    } catch {
      return false;
    }
  }, [createMutation, newDescription, newImage, newTitle]);

  const submitUpdateImage = React.useCallback(async () => {
    if (!updateTarget) return;

    if (!updateImage) {
      notify("Sélectionnez une image.", "Erreur");
      return;
    }

    await updateImageMutation.mutateAsync({
      id: updateTarget.id,
      image: updateImage,
    });
  }, [updateImage, updateImageMutation, updateTarget]);

  const confirmDelete = React.useCallback(async () => {
    if (!deleteTarget) return;

    await deleteMutation.mutateAsync(deleteTarget.id);
  }, [deleteMutation, deleteTarget]);

  const refresh = React.useCallback(() => postsQuery.refetch(), [postsQuery]);

  const busy =
    postsQuery.isFetching ||
    createMutation.isPending ||
    updateImageMutation.isPending ||
    deleteMutation.isPending;

  return {
    posts: postsQuery.data ?? [],
    busy,
    refreshing: postsQuery.isRefetching,
    refresh,
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    newImage,
    setNewImage,
    submitCreate,
    details,
    setDetails,
    updateTarget,
    setUpdateTarget,
    updateImage,
    setUpdateImage,
    submitUpdateImage,
    deleteTarget,
    setDeleteTarget,
    confirmDelete,
  };
}
