import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Post } from "@/lib/helpers/post-types";
import { useImagePreview } from "@/hooks/useImagePreview";
import { ImageUploadField } from "@/hooks/useImageUploadField";

interface Props {
  open: boolean;
  target: Post | null;
  image: ReturnType<typeof useImagePreview>;
  busy: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: () => void;
}

export function UpdatePostImageDialog({
  open,
  target,
  image,
  busy,
  onOpenChange,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Mettre à jour l'image
          </DialogTitle>
          {target && (
            <DialogDescription className="text-xs truncate">
              {target.title}
            </DialogDescription>
          )}
        </DialogHeader>

        <ImageUploadField
          id="update-image"
          label="Nouvelle image"
          preview={image.preview}
          fallbackSrc={target?.image_url}
          onChange={image.onChange}
        />

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={busy}
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button size="sm" disabled={busy} onClick={onSubmit}>
            {busy ? (
              <>
                <Spinner className="mr-2" /> Mise à jour…
              </>
            ) : (
              "Mettre à jour"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
