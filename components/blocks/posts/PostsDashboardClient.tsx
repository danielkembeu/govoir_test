"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CreatePostCard } from "./CreatePostCard";
import { PostCard } from "./PostCard";
import { PostDetailsDialog } from "./PostDetailsDialog";
import { UpdatePostImageDialog } from "./UpdatePostImageDialog";
import { DeletePostAlertDialog } from "./DeletePostAlertDialog";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/lib/helpers/post-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Add the research function
function research(posts: Post[], input: string): Post[] {
  if (!input.trim()) return posts;
  const lower = input.trim().toLowerCase();

  return posts.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(lower)) ||
      (post.description && post.description.toLowerCase().includes(lower)),
  );
}

export function PostsDashboardClient({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const query = usePosts(initialPosts);

  // Input state for search
  const [search, setSearch] = useState("");

  // Filtered posts based on search
  const filteredPosts = research(query.posts, search);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl py-10 border-x">
        {/* Header */}
        <header className="mb-8 flex px-4 items-end justify-between border-b py-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gérez vos publications.
            </p>
          </div>

          <div className="gap-4 items-center flex">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recherche par titre ou description..."
              className="w-[300px]"
            />

            <Button
              variant="ghost"
              onClick={query.refresh}
              disabled={query.busy}
              className="gap-2 text-xs"
            >
              {query.busy ? (
                <Spinner className="size-3.5" />
              ) : (
                <RefreshCw className="size-3.5" />
              )}
              Rafraîchir
            </Button>
          </div>
        </header>

        {/* Layout */}
        <section className="grid px-4 gap-6 lg:grid-cols-[360px_1fr]">
          <aside>
            <CreatePostCard
              title={query.newTitle}
              description={query.newDescription}
              image={query.newImage}
              busy={query.busy}
              onTitleChange={query.setNewTitle}
              onDescriptionChange={query.setNewDescription}
              onSubmit={query.submitCreate}
            />
          </aside>

          <div className="border py-4 rounded-lg">
            <Label className="text-xl font-semibold text-gray-700 mb-4 ml-4">
              Liste des postes
            </Label>
            <ScrollArea className="h-[810px] flex-1 px-4">
              {filteredPosts.length === 0 ? (
                <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-foreground/10 text-sm text-muted-foreground">
                  Aucun post pour le moment.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onDetails={query.setDetails}
                      onUpdateImage={query.setUpdateTarget}
                      onDelete={query.setDeleteTarget}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </section>
      </main>

      <PostDetailsDialog
        post={query.details}
        open={!!query.details}
        onOpenChange={(open) => {
          if (!open) query.setDetails(null);
        }}
      />

      <UpdatePostImageDialog
        open={!!query.updateTarget}
        target={query.updateTarget}
        image={query.updateImage}
        busy={query.busy}
        onOpenChange={(open) => {
          if (!open) {
            query.setUpdateTarget(null);
            query.updateImage.reset();
          }
        }}
        onSubmit={query.submitUpdateImage}
      />

      <DeletePostAlertDialog
        open={!!query.deleteTarget}
        target={query.deleteTarget}
        busy={query.busy}
        onOpenChange={(open) => {
          if (!open) query.setDeleteTarget(null);
        }}
        onConfirm={query.confirmDelete}
      />
    </div>
  );
}
