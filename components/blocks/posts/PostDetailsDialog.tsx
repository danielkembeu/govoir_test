import * as React from "react";
import Image from "next/image";
import type { Post } from "@/lib/helpers/post-types";
import { formatPostDate } from "../../../lib/helpers/format-post-date";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageIcon } from "lucide-react";

interface Props {
  post: Post | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function PostDetailsDialog({ post, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] p-0 overflow-hidden">
        {/* Hero image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted/40">
          {post?.image_url ? (
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/30">
              <ImageIcon className="size-10" />
            </div>
          )}
        </div>

        <div className="grid gap-4 px-6 pb-6 pt-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold leading-snug">
              {post?.title}
            </DialogTitle>
            <DialogDescription className="text-xs">
              {post ? formatPostDate(post.created_at) : ""}
            </DialogDescription>
          </DialogHeader>

          {post?.description && (
            <ScrollArea className="max-h-48 rounded-lg border border-foreground/8 bg-muted/30">
              <p className="p-3 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </ScrollArea>
          )}

          <DialogFooter>
            <Button size="sm" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
