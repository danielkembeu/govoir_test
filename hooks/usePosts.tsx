"use client";

import * as React from "react";
import { toast } from "sonner";
import type { Post } from "../lib/helpers/post-types";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePostImage,
} from "../lib/helpers/posts-api";
import { useImagePreview } from "./useImagePreview";

export function usePosts(initial: Post[]) {
  const [posts, setPosts] = React.useState<Post[]>(initial);
  const [busy, setBusy] = React.useState(false);

  // create form
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const newImage = useImagePreview();

  // dialogs
  const [details, setDetails] = React.useState<Post | null>(null);
  const [updateTarget, setUpdateTarget] = React.useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Post | null>(null);
  const updateImage = useImagePreview();

  const refresh = React.useCallback(async () => {
    setBusy(true);
    try {
      setPosts(await fetchPosts());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  }, []);

  const submitCreate = async () => {
    if (!newTitle.trim()) return toast.error("Le titre est requis.");
    if (!newImage.file) return toast.error("Une image est requise.");
    setBusy(true);
    try {
      await createPost({
        title: newTitle.trim(),
        description: newDescription.trim(),
        image: newImage.file,
      });
      toast.success("Post créé.");
      setNewTitle("");
      setNewDescription("");
      newImage.reset();
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  };

  const submitUpdateImage = async () => {
    if (!updateTarget) return;
    if (!updateImage.file) return toast.error("Sélectionnez une image.");
    setBusy(true);
    try {
      await updatePostImage(updateTarget.id, updateImage.file);
      toast.success("Image mise à jour.");
      setUpdateTarget(null);
      updateImage.reset();
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      await deletePost(deleteTarget.id);
      toast.success("Post supprimé.");
      setDeleteTarget(null);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  };

  return {
    posts,
    busy,
    refresh,
    // create
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    newImage,
    submitCreate,
    // dialogs
    details,
    setDetails,
    updateTarget,
    setUpdateTarget,
    updateImage,
    submitUpdateImage,
    deleteTarget,
    setDeleteTarget,
    confirmDelete,
  };
}
