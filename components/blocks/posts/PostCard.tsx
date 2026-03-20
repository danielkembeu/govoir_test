import * as React from "react";
import Image from "next/image";
import { Eye, ImageIcon, Trash2 } from "lucide-react";
import type { Post } from "@/lib/helpers/post-types";
import { formatPostDate } from "./format-post-date";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  post: Post;
  onDetails: (p: Post) => void;
  onUpdateImage: (p: Post) => void;
  onDelete: (p: Post) => void;
}

export function PostCard({ post, onDetails, onUpdateImage, onDelete }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-foreground/8 bg-card/60 shadow-sm transition-shadow hover:shadow-md">
      {/* Cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/30">
            <ImageIcon className="size-8" />
          </div>
        )}
        {/* Date badge */}
        <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {formatPostDate(post.created_at)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 text-sm font-semibold leading-snug tracking-tight">
          {post.title}
        </p>
        {post.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 border-t border-foreground/6 px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          title="Détails"
          onClick={() => onDetails(post)}
        >
          <Eye className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          title="Changer l'image"
          onClick={() => onUpdateImage(post)}
        >
          <ImageIcon className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-7 text-destructive/70 hover:bg-destructive/10 hover:text-destructive",
          )}
          title="Supprimer"
          onClick={() => onDelete(post)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
